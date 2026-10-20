package com.restaurant.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.dto.request.AddOrderItemRequest;
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
import java.time.LocalDate;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardReportingTest {

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

        MvcResult adminLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("admin", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode adminJson = objectMapper.readTree(adminLogin.getResponse().getContentAsString());
        this.adminToken = adminJson.get("data").get("token").asText();

        MvcResult staffLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("staff01", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode staffJson = objectMapper.readTree(staffLogin.getResponse().getContentAsString());
        this.staffToken = staffJson.get("data").get("token").asText();
    }

    @Test
    @DisplayName("Thống kê tổng quan KPI trả về đầy đủ các chỉ số hợp lệ")
    void getDashboardSummary_success() throws Exception {
        mockMvc.perform(get("/api/dashboard/summary")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.todayRevenue").exists())
                .andExpect(jsonPath("$.data.todayOrderCount").exists())
                .andExpect(jsonPath("$.data.averageOrderValue").exists())
                .andExpect(jsonPath("$.data.occupiedTables").exists())
                .andExpect(jsonPath("$.data.totalTables").exists())
                .andExpect(jsonPath("$.data.occupancyRate").exists());
    }

    @Test
    @DisplayName("Báo cáo doanh thu theo dải ngày trả về danh sách phân tích ngày")
    void getRevenueAnalytics_success() throws Exception {
        LocalDate end = LocalDate.now();
        LocalDate start = end.minusDays(6);

        mockMvc.perform(get("/api/dashboard/revenue")
                        .header("Authorization", "Bearer " + staffToken)
                        .param("startDate", start.toString())
                        .param("endDate", end.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data", hasSize(7)))
                .andExpect(jsonPath("$.data[0].date").exists())
                .andExpect(jsonPath("$.data[0].revenue").exists())
                .andExpect(jsonPath("$.data[0].orderCount").exists());
    }

    @Test
    @DisplayName("Lấy danh sách Top món ăn bán chạy nhất")
    void getTopSellingItems_success() throws Exception {
        mockMvc.perform(get("/api/dashboard/top-items")
                        .header("Authorization", "Bearer " + adminToken)
                        .param("limit", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("Truy cập thống kê khi chưa đăng nhập sẽ bị từ chối 401")
    void getDashboardSummary_unauthorized_returns401() throws Exception {
        mockMvc.perform(get("/api/dashboard/summary"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Tạo đơn, thanh toán và kiểm tra doanh số cập nhật tức thời trên Dashboard")
    void orderAndPayment_updatesDashboardStats() throws Exception {
        // Lấy chỉ số trước khi thanh toán
        MvcResult summaryBefore = mockMvc.perform(get("/api/dashboard/summary")
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode beforeNode = objectMapper.readTree(summaryBefore.getResponse().getContentAsString()).get("data");
        long initialCount = beforeNode.get("todayOrderCount").asLong();

        // Tạo bàn và đơn
        DiningTableEntity table = new DiningTableEntity();
        table.setCode("DASH_" + (System.currentTimeMillis() % 100000));
        table.setName("Bàn Thống Kê Test");
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

        // Thêm món
        mockMvc.perform(post("/api/orders/" + orderId + "/items")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new AddOrderItemRequest(menuItem.getId(), 2, null))))
                .andExpect(status().isOk());

        // Lấy số tiền cần thanh toán
        MvcResult previewResult = mockMvc.perform(get("/api/payments/preview/" + orderId)
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andReturn();
        BigDecimal finalAmount = new BigDecimal(objectMapper.readTree(previewResult.getResponse().getContentAsString())
                .get("data").get("finalAmount").asText());

        // Thanh toán tiền mặt
        PaymentRequest paymentReq = new PaymentRequest(orderId, PaymentMethod.CASH, finalAmount.add(BigDecimal.valueOf(10000)));
        mockMvc.perform(post("/api/payments")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(paymentReq)))
                .andExpect(status().isCreated());

        // Kiểm tra lại summary sau khi thanh toán: số đơn phải tăng ít nhất 1
        mockMvc.perform(get("/api/dashboard/summary")
                        .header("Authorization", "Bearer " + staffToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.todayOrderCount", greaterThanOrEqualTo((int) initialCount + 1)));
    }
}
