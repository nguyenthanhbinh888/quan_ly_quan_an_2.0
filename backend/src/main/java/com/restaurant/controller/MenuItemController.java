package com.restaurant.controller;

import com.restaurant.dto.request.MenuItemRequest;
import com.restaurant.dto.request.UpdateMenuItemStatusRequest;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.MenuItemResponse;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.service.MenuItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<MenuItemResponse>>> getMenuItems(
            @RequestParam(name = "categoryId", required = false) Long categoryId,
            @RequestParam(name = "status", required = false) MenuItemStatus status,
            @RequestParam(name = "keyword", required = false) String keyword
    ) {
        List<MenuItemResponse> items = menuItemService.getMenuItems(categoryId, status, keyword);
        return ResponseEntity.ok(ApiResponse.ok("Lấy danh sách món ăn thành công", items));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<MenuItemResponse>> getMenuItemById(@PathVariable Long id) {
        MenuItemResponse item = menuItemService.getMenuItemById(id);
        return ResponseEntity.ok(ApiResponse.ok("Lấy thông tin món ăn thành công", item));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MenuItemResponse>> createMenuItem(@Valid @RequestBody MenuItemRequest request) {
        MenuItemResponse item = menuItemService.createMenuItem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Thêm món ăn thành công", item));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItem(
            @PathVariable Long id,
            @Valid @RequestBody MenuItemRequest request
    ) {
        MenuItemResponse item = menuItemService.updateMenuItem(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật thông tin món ăn thành công", item));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<ApiResponse<MenuItemResponse>> updateMenuItemStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateMenuItemStatusRequest request
    ) {
        MenuItemResponse item = menuItemService.updateMenuItemStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.ok("Cập nhật trạng thái món thành công", item));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteMenuItem(@PathVariable Long id) {
        menuItemService.deleteMenuItem(id);
        return ResponseEntity.ok(ApiResponse.ok("Xóa món ăn thành công", null));
    }
}
