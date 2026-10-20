package com.restaurant.dto.response;

import com.restaurant.enums.PaymentMethod;
import com.restaurant.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PaymentResponse {

    private Long id;
    private Long orderId;
    private String invoiceCode;
    private String orderCode;
    private Long tableId;
    private String tableCode;
    private String tableName;
    private PaymentMethod paymentMethod;
    private BigDecimal subtotalAmount;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;
    private BigDecimal amountPaid;
    private BigDecimal changeAmount;
    private PaymentStatus paymentStatus;
    private Long processedByUserId;
    private String processedByName;
    private LocalDateTime paidAt;
    private List<OrderItemResponse> items = new ArrayList<>();

    public PaymentResponse() {
    }

    public PaymentResponse(Long id, Long orderId, String invoiceCode, String orderCode,
                           Long tableId, String tableCode, String tableName,
                           PaymentMethod paymentMethod, BigDecimal subtotalAmount,
                           BigDecimal discountAmount, BigDecimal finalAmount, BigDecimal amountPaid,
                           BigDecimal changeAmount, PaymentStatus paymentStatus,
                           Long processedByUserId, String processedByName,
                           LocalDateTime paidAt, List<OrderItemResponse> items) {
        this.id = id;
        this.orderId = orderId;
        this.invoiceCode = invoiceCode;
        this.orderCode = orderCode;
        this.tableId = tableId;
        this.tableCode = tableCode;
        this.tableName = tableName;
        this.paymentMethod = paymentMethod;
        this.subtotalAmount = subtotalAmount;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.amountPaid = amountPaid;
        this.changeAmount = changeAmount;
        this.paymentStatus = paymentStatus;
        this.processedByUserId = processedByUserId;
        this.processedByName = processedByName;
        this.paidAt = paidAt;
        this.items = items != null ? items : new ArrayList<>();
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

    public String getInvoiceCode() {
        return invoiceCode;
    }

    public void setInvoiceCode(String invoiceCode) {
        this.invoiceCode = invoiceCode;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

    public String getTableCode() {
        return tableCode;
    }

    public void setTableCode(String tableCode) {
        this.tableCode = tableCode;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
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

    public BigDecimal getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(BigDecimal amountPaid) {
        this.amountPaid = amountPaid;
    }

    public BigDecimal getChangeAmount() {
        return changeAmount;
    }

    public void setChangeAmount(BigDecimal changeAmount) {
        this.changeAmount = changeAmount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Long getProcessedByUserId() {
        return processedByUserId;
    }

    public void setProcessedByUserId(Long processedByUserId) {
        this.processedByUserId = processedByUserId;
    }

    public String getProcessedByName() {
        return processedByName;
    }

    public void setProcessedByName(String processedByName) {
        this.processedByName = processedByName;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}
