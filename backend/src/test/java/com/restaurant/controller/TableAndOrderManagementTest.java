package com.restaurant.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.dto.request.*;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.OrderType;
import com.restaurant.enums.TableStatus;
import com.restaurant.repository.DiningTableRepository;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.math.BigDecimal;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TableAndOrderManagementTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DiningTableRepository diningTableRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String adminToken;
    private String staffToken;

    @BeforeEach
    void setUp() throws Exception {
        userRepository.findByUsername("admin").ifPresent(u -> {
            u.setPasswordHash(passwordEncoder.encode("Admin123@"));
            userRepository.save(u);
        });
        userRepository.findByUsername("staff01").ifPresent(u -> {
            u.setPasswordHash(passwordEncoder.encode("Admin123@"));
            userRepository.save(u);
        });

        // Get admin token
        MvcResult adminLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("admin", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode adminJson = objectMapper.readTree(adminLogin.getResponse().getContentAsString());
        this.adminToken = adminJson.get("data").get("token").asText();

        // Get staff token
        MvcResult staffLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("staff01", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode staffJson = objectMapper.readTree(staffLogin.getResponse().getContentAsString());
        this.staffToken = staffJson.get("data").get("token").asText();
    }

    @Test
    @DisplayName("Staff xem danh sách bàn ăn thành công")
    void testGetAllTables_Success() throws Exception {
        mockMvc.perform(get("/api/tables")
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data", not(empty())));
    }

    @Test
    @DisplayName("Admin tạo bàn mới thành công, Staff bị cấm 403 Forbidden")
    void testCreateTable_RBAC() throws Exception {
        String testCode = "T" + (System.currentTimeMillis() % 10000);
        DiningTableRequest request = new DiningTableRequest(testCode, "Bàn Test " + testCode, 4, TableStatus.EMPTY);

        // Staff creates table -> 403 Forbidden
        mockMvc.perform(post("/api/tables")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());

        // Admin creates table -> 201 Created
        mockMvc.perform(post("/api/tables")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.code", is(testCode)));
    }

    @Test
    @DisplayName("Luồng: Mở bàn -> Tạo đơn -> Đổi trạng thái bàn sang OCCUPIED -> Chặn tạo trùng")
    void testCreateOrderAndTableStatus() throws Exception {
        // Tạo bàn mới riêng cho test
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB" + (System.currentTimeMillis() % 10000));
        table.setName("Bàn Thử Nghiệm");
        table.setCapacity(4);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        // Mở đơn tại bàn
        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, "Bàn 2 khách");
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.tableId", is(savedTable.getId().intValue())))
                .andExpect(jsonPath("$.data.status", is("PENDING")))
                .andExpect(jsonPath("$.data.subtotalAmount").value(0))
                .andReturn();

        // Kiểm tra bàn đã chuyển sang OCCUPIED
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status", is("OCCUPIED")))
                .andExpect(jsonPath("$.data.currentOrderId", notNullValue()));

        // Thử tạo đơn trùng lặp trên bàn đang OCCUPIED -> 400 Bad Request
        mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Thêm món vào đơn: Snapshot giá thành công, Server tự động tính subtotal và finalAmount")
    void testAddOrderItem_SnapshotPricingAndCalculation() throws Exception {
        // 1. Tạo bàn & món ăn có giá xác định
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_CALC_" + (System.currentTimeMillis() % 10000));
        table.setName("Bàn Tính Tiền");
        table.setCapacity(4);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        MenuItemEntity menuItem = menuItemRepository.findAll().stream()
                .filter(m -> m.getStatus() == MenuItemStatus.AVAILABLE)
                .findFirst()
                .orElseThrow();

        // 2. Mở đơn
        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();

        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // 3. Thêm 2 phần món ăn
        AddOrderItemRequest itemReq = new AddOrderItemRequest(menuItem.getId(), 2, "Ít đá ít ngọt");
        BigDecimal expectedSubtotal = menuItem.getPrice().multiply(BigDecimal.valueOf(2));

        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.items", hasSize(1)))
                .andExpect(jsonPath("$.data.items[0].itemName", is(menuItem.getName())))
                .andExpect(jsonPath("$.data.items[0].priceAtOrder").value(menuItem.getPrice().doubleValue()))
                .andExpect(jsonPath("$.data.items[0].quantity", is(2)))
                .andExpect(jsonPath("$.data.subtotalAmount").value(expectedSubtotal.doubleValue()))
                .andExpect(jsonPath("$.data.finalAmount").value(expectedSubtotal.doubleValue()));

        // 4. Áp dụng giảm giá
        DiscountOrderRequest discountReq = new DiscountOrderRequest(BigDecimal.valueOf(10000));
        BigDecimal expectedFinal = expectedSubtotal.subtract(BigDecimal.valueOf(10000));
        mockMvc.perform(post("/api/orders/" + orderId + "/discount")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(discountReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.discountAmount").value(10000.0))
                .andExpect(jsonPath("$.data.finalAmount").value(expectedFinal.doubleValue()));
    }

    @Test
    @DisplayName("Từ chối gọi món khi món ăn ở trạng thái OUT_OF_STOCK")
    void testAddOrderItem_OutOfStock_Fails() throws Exception {
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_OOS_" + (System.currentTimeMillis() % 10000));
        table.setName("Bàn Thử Hết Món");
        table.setCapacity(2);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        // Tạo món ăn giả định hết hàng
        MenuItemEntity oosItem = new MenuItemEntity();
        oosItem.setCategory(menuItemRepository.findAll().get(0).getCategory());
        oosItem.setName("Món Hết Hàng " + System.currentTimeMillis());
        oosItem.setPrice(BigDecimal.valueOf(80000));
        oosItem.setStatus(MenuItemStatus.OUT_OF_STOCK);
        MenuItemEntity savedItem = menuItemRepository.save(oosItem);

        // Mở đơn
        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Thêm món hết hàng -> 400 Bad Request
        AddOrderItemRequest itemReq = new AddOrderItemRequest(savedItem.getId(), 1, null);
        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemReq)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Hủy đơn hàng: Chuyển trạng thái đơn sang CANCELLED và tự động giải phóng bàn về EMPTY")
    void testCancelOrder_ReleasesTable() throws Exception {
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_CANCEL_" + (System.currentTimeMillis() % 10000));
        table.setName("Bàn Thử Hủy");
        table.setCapacity(4);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        // Mở đơn
        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Bàn đang OCCUPIED
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(jsonPath("$.data.status", is("OCCUPIED")));

        // Hủy đơn
        CancelOrderRequest cancelReq = new CancelOrderRequest("Khách có việc đột xuất xin hủy");
        mockMvc.perform(post("/api/orders/" + orderId + "/cancel")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cancelReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status", is("CANCELLED")))
                .andExpect(jsonPath("$.data.cancelReason", is("Khách có việc đột xuất xin hủy")));

        // Bàn tự động trở về EMPTY
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(jsonPath("$.data.status", is("EMPTY")))
                .andExpect(jsonPath("$.data.currentOrderId", nullValue()));
    }
}
