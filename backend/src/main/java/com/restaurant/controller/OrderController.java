package com.restaurant.controller;

import com.restaurant.dto.request.*;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.OrderResponse;
import com.restaurant.enums.OrderStatus;
import com.restaurant.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        OrderResponse response = orderService.createOrder(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Mở bàn / tạo đơn hàng thành công", response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderById(@PathVariable Long id) {
        OrderResponse response = orderService.getOrderById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/active-by-table/{tableId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getActiveOrderByTableId(@PathVariable Long tableId) {
        OrderResponse response = orderService.getActiveOrderByTableId(tableId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<OrderResponse>>> getOrders(
            @RequestParam(required = false) OrderStatus status,
            @RequestParam(required = false) Long tableId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<OrderResponse> orders = orderService.getOrders(status, tableId, pageable);
        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @PostMapping("/{id}/items")
    public ResponseEntity<ApiResponse<OrderResponse>> addOrderItem(
            @PathVariable Long id,
            @Valid @RequestBody AddOrderItemRequest request) {
        OrderResponse response = orderService.addOrderItem(id, request);
        return ResponseEntity.ok(ApiResponse.success("Thêm món vào đơn thành công", response));
    }

    @PutMapping("/{id}/items/{itemId}")
    public ResponseEntity<ApiResponse<OrderResponse>> updateOrderItem(
            @PathVariable Long id,
            @PathVariable Long itemId,
            @Valid @RequestBody UpdateOrderItemRequest request) {
        OrderResponse response = orderService.updateOrderItem(id, itemId, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật món thành công", response));
    }

    @DeleteMapping("/{id}/items/{itemId}")
    public ResponseEntity<ApiResponse<OrderResponse>> removeOrderItem(
            @PathVariable Long id,
            @PathVariable Long itemId) {
        OrderResponse response = orderService.removeOrderItem(id, itemId);
        return ResponseEntity.ok(ApiResponse.success("Hủy món khỏi đơn thành công", response));
    }

    @PostMapping("/{id}/discount")
    public ResponseEntity<ApiResponse<OrderResponse>> applyDiscount(
            @PathVariable Long id,
            @Valid @RequestBody DiscountOrderRequest request) {
        OrderResponse response = orderService.applyDiscount(id, request);
        return ResponseEntity.ok(ApiResponse.success("Áp dụng giảm giá thành công", response));
    }

    @PostMapping("/{id}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable Long id,
            @Valid @RequestBody CancelOrderRequest request) {
        OrderResponse response = orderService.cancelOrder(id, request);
        return ResponseEntity.ok(ApiResponse.success("Hủy đơn hàng thành công", response));
    }
}
