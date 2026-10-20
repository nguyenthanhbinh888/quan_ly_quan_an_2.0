package com.restaurant.entity;

import com.restaurant.enums.PaymentMethod;
import com.restaurant.enums.PaymentStatus;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "order_id", nullable = false, unique = true)
    private OrderEntity order;

    @Column(name = "invoice_code", nullable = false, unique = true, length = 30)
    private String invoiceCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 20)
    private PaymentMethod paymentMethod;

    @Column(name = "amount_paid", nullable = false, precision = 12, scale = 2)
    private BigDecimal amountPaid;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = false, length = 20)
    private PaymentStatus paymentStatus = PaymentStatus.SUCCESS;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "processed_by_user_id", nullable = false)
    private UserEntity processedByUser;

    @Column(name = "paid_at", nullable = false, updatable = false)
    private LocalDateTime paidAt = LocalDateTime.now();

    @PrePersist
    public void prePersist() {
        if (paidAt == null) paidAt = LocalDateTime.now();
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

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public UserEntity getProcessedByUser() {
        return processedByUser;
    }

    public void setProcessedByUser(UserEntity processedByUser) {
        this.processedByUser = processedByUser;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }
}
