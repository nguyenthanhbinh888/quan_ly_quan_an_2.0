package com.restaurant.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.dto.request.AddOrderItemRequest;
import com.restaurant.dto.request.CancelOrderRequest;
import com.restaurant.dto.request.CreateOrderRequest;
import com.restaurant.dto.request.LoginRequest;
import com.restaurant.dto.request.PaymentRequest;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.enums.OrderType;
import com.restaurant.enums.PaymentMethod;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PaymentManagementTest {

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

    private String staffToken;

    @BeforeEach
    void setUp() throws Exception {
        userRepository.findByUsername("staff01").ifPresent(u -> {
            u.setPasswordHash(passwordEncoder.encode("Admin123@"));
            userRepository.save(u);
        });

        // Get staff token
        MvcResult staffLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("staff01", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode staffJson = objectMapper.readTree(staffLogin.getResponse().getContentAsString());
        this.staffToken = staffJson.get("data").get("token").asText();
    }

    private Long createTestOrderWithItems(BigDecimal itemPrice, int quantity) throws Exception {
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("PAY_" + (System.currentTimeMillis() % 100000));
        table.setName("Bàn Thanh Toán Test");
        table.setCapacity(4);
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

        AddOrderItemRequest itemReq = new AddOrderItemRequest(menuItem.getId(), quantity, null);
        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(itemReq)))
                .andExpect(status().isOk());

        return orderId;
    }

    @Test
    @DisplayName("Xem trước thanh toán (Payment Preview) trả về đầy đủ tiền và danh sách món")
    void testGetPaymentPreview_Success() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(50000), 2);

        mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.orderId", is(orderId.intValue())))
                .andExpect(jsonPath("$.data.items", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.data.finalAmount", notNullValue()));
    }

    @Test
    @DisplayName("Thanh toán tiền mặt thành công: Đơn sang PAID, Bàn trở về EMPTY, sinh mã INV và tính tiền thối")
    void testProcessPayment_Cash_Success() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(50000), 2);

        // Lấy số tiền cần thanh toán
        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        double finalAmount = objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asDouble();
        Long tableId = objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("tableId").asLong();

        // Khách đưa tiền mặt nhiều hơn (ví dụ đưa thêm 20000 đ)
        double tenderAmount = finalAmount + 20000.0;
        PaymentRequest paymentRequest = new PaymentRequest(orderId, PaymentMethod.CASH, BigDecimal.valueOf(tenderAmount));

        MvcResult payResult = mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.invoiceCode", startsWith("INV-")))
                .andExpect(jsonPath("$.data.paymentMethod", is("CASH")))
                .andExpect(jsonPath("$.data.changeAmount").value(20000.0))
                .andReturn();

        String invoiceCode = objectMapper.readTree(payResult.getResponse().getContentAsString())
                .get("data").get("invoiceCode").asText();

        // Kiểm tra đơn hàng đã sang PAID
        mockMvc.perform(get("/api/orders/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status", is("PAID")));

        // Kiểm tra bàn ăn đã được giải phóng về EMPTY
        mockMvc.perform(get("/api/tables/" + tableId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.status", is("EMPTY")));

        // Tra cứu lại hóa đơn theo mã invoiceCode
        mockMvc.perform(get("/api/payments/invoice/" + invoiceCode)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.invoiceCode", is(invoiceCode)))
                .andExpect(jsonPath("$.data.orderId", is(orderId.intValue())));
    }

    @Test
    @DisplayName("Thanh toán chuyển khoản ngân hàng (BANK_TRANSFER) thành công")
    void testProcessPayment_BankTransfer_Success() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(60000), 1);

        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        double finalAmount = objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asDouble();

        PaymentRequest paymentRequest = new PaymentRequest(orderId, PaymentMethod.BANK_TRANSFER, BigDecimal.valueOf(finalAmount));

        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.paymentMethod", is("BANK_TRANSFER")))
                .andExpect(jsonPath("$.data.changeAmount").value(0));
    }

    @Test
    @DisplayName("Chặn thanh toán lặp: Cố tình thanh toán lại đơn đã thanh toán -> 409 Conflict")
    void testProcessPayment_DuplicatePayment_Fails() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(50000), 1);

        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        double finalAmount = objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asDouble();

        PaymentRequest paymentRequest = new PaymentRequest(orderId, PaymentMethod.CASH, BigDecimal.valueOf(finalAmount));

        // Lần 1: Thành công
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isCreated());

        // Lần 2: 409 Conflict
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Chặn thanh toán thiếu tiền (Underpaid) -> 400 Bad Request")
    void testProcessPayment_Underpaid_Fails() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(50000), 2);

        // Khách trả 1000 đ trong khi đơn hàng hàng chục nghìn
        PaymentRequest paymentRequest = new PaymentRequest(orderId, PaymentMethod.CASH, BigDecimal.valueOf(1000));

        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }

    @Test
    @DisplayName("Chặn thanh toán đơn đã bị hủy -> 400 Bad Request")
    void testProcessPayment_CancelledOrder_Fails() throws Exception {
        Long orderId = createTestOrderWithItems(BigDecimal.valueOf(50000), 1);

        // Hủy đơn
        CancelOrderRequest cancelReq = new CancelOrderRequest("Khách đổi ý");
        mockMvc.perform(post("/api/orders/" + orderId + "/cancel")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cancelReq)))
                .andExpect(status().isOk());

        // Cố thanh toán đơn đã hủy -> 400 Bad Request
        PaymentRequest paymentRequest = new PaymentRequest(orderId, PaymentMethod.CASH, BigDecimal.valueOf(100000));
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)));
    }
}
