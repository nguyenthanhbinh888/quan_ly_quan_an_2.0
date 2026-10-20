package com.restaurant.entity;

import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.OrderType;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_code", nullable = false, unique = true, length = 30)
    private String orderCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "table_id")
    private DiningTableEntity table;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_type", nullable = false, length = 20)
    private OrderType orderType = OrderType.DINE_IN;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private OrderStatus status = OrderStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by_user_id", nullable = false)
    private UserEntity createdByUser;

    @Column(name = "subtotal_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal subtotalAmount = BigDecimal.ZERO;

    @Column(name = "discount_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal discountAmount = BigDecimal.ZERO;

    @Column(name = "final_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal finalAmount = BigDecimal.ZERO;

    @Column(length = 255)
    private String note;

    @Column(name = "cancel_reason", length = 255)
    private String cancelReason;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> items = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (updatedAt == null) updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public void addItem(OrderItemEntity item) {
        items.add(item);
        item.setOrder(this);
    }

    public void removeItem(OrderItemEntity item) {
        items.remove(item);
        item.setOrder(null);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public DiningTableEntity getTable() {
        return table;
    }

    public void setTable(DiningTableEntity table) {
        this.table = table;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public UserEntity getCreatedByUser() {
        return createdByUser;
    }

    public void setCreatedByUser(UserEntity createdByUser) {
        this.createdByUser = createdByUser;
    }

    public BigDecimal getSubtotalAmount() {
        return subtotalAmount;
    }

    public void setSubtotalAmount(BigDecimal subtotalAmount) {
        this.subtotalAmount = subtotalAmount;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public BigDecimal getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(BigDecimal finalAmount) {
        this.finalAmount = finalAmount;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public List<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(List<OrderItemEntity> items) {
        this.items = items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
