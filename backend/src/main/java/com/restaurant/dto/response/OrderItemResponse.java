package com.restaurant.dto.response;

import com.restaurant.enums.OrderItemStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class OrderItemResponse {

    private Long id;
    private Long orderId;
    private Long menuItemId;
    private String itemName;
    private String imageUrl;
    private BigDecimal priceAtOrder;
    private Integer quantity;
    private BigDecimal subtotal;
    private String note;
    private OrderItemStatus status;
    private LocalDateTime createdAt;

    public OrderItemResponse() {
    }

    public OrderItemResponse(Long id, Long orderId, Long menuItemId, String itemName, String imageUrl,
                             BigDecimal priceAtOrder, Integer quantity, BigDecimal subtotal,
                             String note, OrderItemStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.menuItemId = menuItemId;
        this.itemName = itemName;
        this.imageUrl = imageUrl;
        this.priceAtOrder = priceAtOrder;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.note = note;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public BigDecimal getPriceAtOrder() {
        return priceAtOrder;
    }

    public void setPriceAtOrder(BigDecimal priceAtOrder) {
        this.priceAtOrder = priceAtOrder;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public OrderItemStatus getStatus() {
        return status;
    }

    public void setStatus(OrderItemStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
