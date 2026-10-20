package com.restaurant.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.dto.request.*;
import com.restaurant.entity.CategoryEntity;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.enums.OrderType;
import com.restaurant.enums.PaymentMethod;
import com.restaurant.enums.TableStatus;
import com.restaurant.repository.CategoryRepository;
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
import java.util.UUID;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class RestaurantE2ETest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private DiningTableRepository diningTableRepository;

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

        MvcResult adminLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("admin", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        this.adminToken = objectMapper.readTree(adminLogin.getResponse().getContentAsString())
                .get("data").get("token").asText();

        MvcResult staffLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("staff01", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        this.staffToken = objectMapper.readTree(staffLogin.getResponse().getContentAsString())
                .get("data").get("token").asText();
    }

    @Test
    @DisplayName("E2E Luồng khép kín: Tạo bàn/món -> Mở bàn -> Gọi món -> Cập nhật số lượng -> Thanh toán tiền mặt -> Giải phóng bàn -> Cập nhật Dashboard")
    void testFullHappyPathE2EFlow() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        // 1. Admin tạo danh mục và món ăn mới
        CategoryEntity category = new CategoryEntity();
        category.setName("Danh Mục E2E " + testSuffix);
        category = categoryRepository.save(category);

        MenuItemRequest createDishReq = new MenuItemRequest();
        createDishReq.setName("Bò né sốt tiêu đen " + testSuffix);
        createDishReq.setCategoryId(category.getId());
        createDishReq.setPrice(new BigDecimal("95000.00"));
        createDishReq.setDescription("Món ăn kiểm thử tự động E2E");

        MvcResult dishResult = mockMvc.perform(post("/api/menu-items")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDishReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long dishId = objectMapper.readTree(dishResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // 2. Tạo bàn ăn mới (trạng thái EMPTY)
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_" + testSuffix);
        table.setName("Bàn E2E " + testSuffix);
        table.setCapacity(4);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        // 3. Nhân viên kiểm tra bàn đang EMPTY
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("EMPTY"));

        // 4. Nhân viên mở bàn tạo đơn hàng mới
        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, "Khách đặt bàn E2E");
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Kiểm tra bàn tự động chuyển sang OCCUPIED
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("OCCUPIED"));

        // 5. Thêm món vào đơn hàng (số lượng 2)
        MvcResult addItemResult = mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(dishId, 2, "Ít cay"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items", hasSize(1)))
                .andExpect(jsonPath("$.data.finalAmount").value(190000.00))
                .andReturn();
        Long orderItemId = objectMapper.readTree(addItemResult.getResponse().getContentAsString())
                .get("data").get("items").get(0).get("id").asLong();

        // 6. Điều chỉnh số lượng món (từ 2 lên 3 phần: 3 * 95,000 = 285,000)
        mockMvc.perform(put("/api/orders/" + orderId + "/items/" + orderItemId)
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new UpdateOrderItemRequest(3, "Bình thường", null))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.finalAmount").value(285000.00));

        // 7. Nhân viên xem trước thông tin thanh toán (Preview)
        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.subtotalAmount").value(285000.00))
                .andExpect(jsonPath("$.data.finalAmount").value(285000.00))
                .andReturn();

        BigDecimal finalAmount = new BigDecimal(objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asText());

        // 8. Thực hiện thanh toán tiền mặt (khách đưa 300,000đ, tiền thối 15,000đ)
        PaymentRequest paymentReq = new PaymentRequest(orderId, PaymentMethod.CASH, new BigDecimal("300000.00"));
        MvcResult paymentResult = mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.finalAmount").value(285000.00))
                .andExpect(jsonPath("$.data.amountPaid").value(300000.00))
                .andExpect(jsonPath("$.data.changeAmount").value(15000.00))
                .andExpect(jsonPath("$.data.paymentMethod").value("CASH"))
                .andExpect(jsonPath("$.data.invoiceCode", startsWith("INV-")))
                .andReturn();

        String invoiceCode = objectMapper.readTree(paymentResult.getResponse().getContentAsString())
                .get("data").get("invoiceCode").asText();

        // 9. Kiểm tra bàn ăn đã được tự động giải phóng về trạng thái EMPTY
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("EMPTY"));

        // 10. Tra cứu hóa đơn bằng mã số tự sinh (INV-...)
        mockMvc.perform(get("/api/payments/invoice/" + invoiceCode)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.invoiceCode").value(invoiceCode))
                .andExpect(jsonPath("$.data.finalAmount").value(285000.00));

        // 11. Kiểm tra Dashboard: doanh thu trong ngày và số đơn đã thanh toán được tính hợp lệ
        mockMvc.perform(get("/api/dashboard/summary")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.todayRevenue", greaterThanOrEqualTo(285000.00)))
                .andExpect(jsonPath("$.data.todayOrderCount", greaterThanOrEqualTo(1)));
    }

    @Test
    @DisplayName("E2E Luồng Hủy đơn hàng và Giải phóng bàn tự động")
    void testOrderCancellationAndTableRelease() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_CANCEL_" + testSuffix);
        table.setName("Bàn Hủy Test " + testSuffix);
        table.setCapacity(2);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        // Mở bàn
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
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("OCCUPIED"));

        // Hủy đơn hàng
        mockMvc.perform(post("/api/orders/" + orderId + "/cancel")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new CancelOrderRequest("Khách bận đột xuất"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("CANCELLED"));

        // Bàn phải được giải phóng về EMPTY
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("EMPTY"));
    }

    @Test
    @DisplayName("E2E Luồng Thanh toán Chuyển khoản QR (BANK_TRANSFER)")
    void testBankTransferPaymentE2E() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_QR_" + testSuffix);
        table.setName("Bàn QR " + testSuffix);
        table.setCapacity(4);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        MenuItemEntity menuItem = menuItemRepository.findAll().stream()
                .filter(m -> m.getStatus() == MenuItemStatus.AVAILABLE)
                .findFirst()
                .orElseThrow();

        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, "Thanh toán QR");
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(menuItem.getId(), 1, null))))
                .andExpect(status().isOk());

        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        BigDecimal finalAmount = new BigDecimal(objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asText());

        // Thanh toán chuyển khoản QR
        PaymentRequest paymentReq = new PaymentRequest(orderId, PaymentMethod.BANK_TRANSFER, finalAmount);
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.paymentMethod").value("BANK_TRANSFER"))
                .andExpect(jsonPath("$.data.changeAmount").value(0.00))
                .andExpect(jsonPath("$.data.invoiceCode", startsWith("INV-")));

        // Bàn tự động EMPTY
        mockMvc.perform(get("/api/tables/" + savedTable.getId())
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("EMPTY"));
    }

    @Test
    @DisplayName("Ngoại lệ: Chặn thanh toán trùng lặp (trả về 409 Conflict)")
    void testDuplicatePayment_returns409Conflict() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_DUP_" + testSuffix);
        table.setName("Bàn Lặp " + testSuffix);
        table.setCapacity(2);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        MenuItemEntity menuItem = menuItemRepository.findAll().stream()
                .filter(m -> m.getStatus() == MenuItemStatus.AVAILABLE)
                .findFirst()
                .orElseThrow();

        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(menuItem.getId(), 1, null))))
                .andExpect(status().isOk());

        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        BigDecimal finalAmount = new BigDecimal(objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asText());

        // Lần 1: Thanh toán thành công
        PaymentRequest paymentReq = new PaymentRequest(orderId, PaymentMethod.CASH, finalAmount);
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isCreated());

        // Lần 2: Cố gắng thanh toán lại đơn đã thanh toán -> Chặn 409 Conflict
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.errorCode").value("CONFLICT"));
    }

    @Test
    @DisplayName("Ngoại lệ: Chặn thanh toán khi số tiền khách đưa không đủ (trả về 400 Bad Request)")
    void testUnderpayment_returns400BadRequest() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_UNDER_" + testSuffix);
        table.setName("Bàn Thiếu Tiền " + testSuffix);
        table.setCapacity(2);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        MenuItemEntity menuItem = menuItemRepository.findAll().stream()
                .filter(m -> m.getStatus() == MenuItemStatus.AVAILABLE)
                .findFirst()
                .orElseThrow();

        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(menuItem.getId(), 2, null))))
                .andExpect(status().isOk());

        // Gửi số tiền chỉ 1,000 VND (chắc chắn nhỏ hơn tổng đơn)
        PaymentRequest paymentReq = new PaymentRequest(orderId, PaymentMethod.CASH, new BigDecimal("1000.00"));
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errorCode").value("BAD_REQUEST"));
    }

    @Test
    @DisplayName("Ngoại lệ: Chặn thêm món khi món ăn có trạng thái OUT_OF_STOCK (400 Bad Request)")
    void testOutOfStockItemCannotBeOrdered() throws Exception {
        String testSuffix = UUID.randomUUID().toString().substring(0, 8);

        CategoryEntity category = categoryRepository.findAll().get(0);

        // Tạo món hết hàng
        MenuItemEntity outOfStockItem = new MenuItemEntity();
        outOfStockItem.setName("Món Hết Hàng E2E " + testSuffix);
        outOfStockItem.setCategory(category);
        outOfStockItem.setPrice(new BigDecimal("50000.00"));
        outOfStockItem.setStatus(MenuItemStatus.OUT_OF_STOCK);
        outOfStockItem = menuItemRepository.save(outOfStockItem);

        DiningTableEntity table = new DiningTableEntity();
        table.setCode("TB_OOS_" + testSuffix);
        table.setName("Bàn Test OOS " + testSuffix);
        table.setCapacity(2);
        table.setStatus(TableStatus.EMPTY);
        DiningTableEntity savedTable = diningTableRepository.save(table);

        CreateOrderRequest orderReq = new CreateOrderRequest(savedTable.getId(), OrderType.DINE_IN, null);
        MvcResult orderResult = mockMvc.perform(post("/api/orders")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(orderReq)))
                .andExpect(status().isCreated())
                .andReturn();
        Long orderId = objectMapper.readTree(orderResult.getResponse().getContentAsString())
                .get("data").get("id").asLong();

        // Cố thêm món hết hàng vào đơn
        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(outOfStockItem.getId(), 1, null))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message", containsString("hết hàng")));
    }

    @Test
    @DisplayName("Bảo mật & Phân quyền: STAFF không thể tạo món ăn mới (403 Forbidden)")
    void testStaffCannotCreateMenuItem_returns403() throws Exception {
        CategoryEntity category = categoryRepository.findAll().get(0);

        MenuItemRequest createDishReq = new MenuItemRequest();
        createDishReq.setName("Món nhân viên tạo trái phép");
        createDishReq.setCategoryId(category.getId());
        createDishReq.setPrice(new BigDecimal("50000.00"));

        mockMvc.perform(post("/api/menu-items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createDishReq)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Bảo mật: Truy cập các endpoint yêu cầu xác thực khi không có token (401 Unauthorized)")
    void testUnauthenticatedRequests_return401() throws Exception {
        mockMvc.perform(get("/api/tables")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/orders")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/payments")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/api/dashboard/summary")).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Bảo mật: Endpoint công khai (/api/health) có thể truy cập mà không cần token (200 OK)")
    void testPublicEndpoints_accessible() throws Exception {
        mockMvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status").value("UP"));
    }
}
