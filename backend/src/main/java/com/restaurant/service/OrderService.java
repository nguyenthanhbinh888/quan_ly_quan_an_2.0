package com.restaurant.service;

import com.restaurant.dto.request.*;
import com.restaurant.dto.response.OrderResponse;
import com.restaurant.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponse createOrder(CreateOrderRequest request, String username);
    OrderResponse getOrderById(Long id);
    OrderResponse getActiveOrderByTableId(Long tableId);
    Page<OrderResponse> getOrders(OrderStatus status, Long tableId, Pageable pageable);
    OrderResponse addOrderItem(Long orderId, AddOrderItemRequest request);
    OrderResponse updateOrderItem(Long orderId, Long itemId, UpdateOrderItemRequest request);
    OrderResponse removeOrderItem(Long orderId, Long itemId);
    OrderResponse applyDiscount(Long orderId, DiscountOrderRequest request);
    OrderResponse cancelOrder(Long orderId, CancelOrderRequest request);
}
