package com.restaurant.entity;

import com.restaurant.enums.OrderItemStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false)
    private OrderEntity order;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "menu_item_id", nullable = false)
    private MenuItemEntity menuItem;

    @Column(name = "item_name", nullable = false, length = 150)
    private String itemName;

    @Column(name = "price_at_order", nullable = false, precision = 12, scale = 2)
    private BigDecimal priceAtOrder;

    @Column(nullable = false)
    private Integer quantity = 1;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotal;

    @Column(length = 255)
    private String note;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderItemStatus status = OrderItemStatus.PENDING;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (subtotal == null && priceAtOrder != null && quantity != null) {
            subtotal = priceAtOrder.multiply(BigDecimal.valueOf(quantity));
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public MenuItemEntity getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(MenuItemEntity menuItem) {
        this.menuItem = menuItem;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
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
}
