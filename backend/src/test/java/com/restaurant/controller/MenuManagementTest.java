package com.restaurant.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.restaurant.dto.request.CategoryRequest;
import com.restaurant.dto.request.LoginRequest;
import com.restaurant.dto.request.MenuItemRequest;
import com.restaurant.dto.request.UpdateMenuItemStatusRequest;
import com.restaurant.enums.MenuItemStatus;
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

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MenuManagementTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

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
        adminToken = adminJson.path("data").path("token").asText();

        // Get staff token
        MvcResult staffLogin = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("staff01", "Admin123@"))))
                .andExpect(status().isOk())
                .andReturn();
        JsonNode staffJson = objectMapper.readTree(staffLogin.getResponse().getContentAsString());
        staffToken = staffJson.path("data").path("token").asText();
    }

    @Test
    @DisplayName("GET /api/categories should return list of categories")
    void shouldGetAllCategories() throws Exception {
        mockMvc.perform(get("/api/categories")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("POST /api/categories as ADMIN should create new category")
    void shouldCreateCategoryAsAdmin() throws Exception {
        String uniqueName = "Món Nướng " + System.currentTimeMillis();
        CategoryRequest request = new CategoryRequest(uniqueName, "Các món nướng than hoa", 5, true);

        mockMvc.perform(post("/api/categories")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.name", is(uniqueName)));
    }

    @Test
    @DisplayName("POST /api/categories as STAFF should return 403 Forbidden")
    void shouldRejectCreateCategoryAsStaff() throws Exception {
        CategoryRequest request = new CategoryRequest("Danh mục staff", "Mô tả", 10, true);

        mockMvc.perform(post("/api/categories")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.errorCode", is("FORBIDDEN")));
    }

    @Test
    @DisplayName("POST /api/menu-items as ADMIN should create menu item")
    void shouldCreateMenuItemAsAdmin() throws Exception {
        MenuItemRequest request = new MenuItemRequest(
                1L,
                "Salad Cá Hồi Na Uy",
                "Salad cá hồi sốt mè rang",
                new BigDecimal("95000.00"),
                "https://images.unsplash.com/photo-1540420773420-3366772f4999",
                MenuItemStatus.AVAILABLE
        );

        mockMvc.perform(post("/api/menu-items")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.name", is("Salad Cá Hồi Na Uy")));
    }

    @Test
    @DisplayName("POST /api/menu-items with negative price should return 400 Bad Request")
    void shouldRejectNegativePrice() throws Exception {
        MenuItemRequest request = new MenuItemRequest(
                1L,
                "Món Lỗi Giá Âm",
                "Mô tả",
                new BigDecimal("-50000.00"),
                null,
                MenuItemStatus.AVAILABLE
        );

        mockMvc.perform(post("/api/menu-items")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.errorCode", is("VALIDATION_FAILED")));
    }

    @Test
    @DisplayName("PATCH /api/menu-items/{id}/status as STAFF should toggle availability")
    void shouldAllowStaffToUpdateStatus() throws Exception {
        // First create item as admin
        MenuItemRequest createReq = new MenuItemRequest(
                1L,
                "Gỏi Ngó Sen Tôm Thịt",
                "Gỏi chua ngọt truyền thống",
                new BigDecimal("85000.00"),
                null,
                MenuItemStatus.AVAILABLE
        );

        MvcResult createRes = mockMvc.perform(post("/api/menu-items")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createReq)))
                .andExpect(status().isCreated())
                .andReturn();

        JsonNode createdJson = objectMapper.readTree(createRes.getResponse().getContentAsString());
        long itemId = createdJson.path("data").path("id").asLong();

        // Staff updates status to OUT_OF_STOCK
        UpdateMenuItemStatusRequest updateReq = new UpdateMenuItemStatusRequest(MenuItemStatus.OUT_OF_STOCK);

        mockMvc.perform(patch("/api/menu-items/" + itemId + "/status")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateReq)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.data.status", is("OUT_OF_STOCK")));
    }
}
