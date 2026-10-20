package com.restaurant.dto.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PaymentPreviewResponse {

    private Long orderId;
    private String orderCode;
    private Long tableId;
    private String tableCode;
    private String tableName;
    private BigDecimal subtotalAmount;
    private BigDecimal discountAmount;
    private BigDecimal finalAmount;
    private List<OrderItemResponse> items = new ArrayList<>();

    public PaymentPreviewResponse() {
    }

    public PaymentPreviewResponse(Long orderId, String orderCode, Long tableId, String tableCode, String tableName,
                                  BigDecimal subtotalAmount, BigDecimal discountAmount, BigDecimal finalAmount,
                                  List<OrderItemResponse> items) {
        this.orderId = orderId;
        this.orderCode = orderCode;
        this.tableId = tableId;
        this.tableCode = tableCode;
        this.tableName = tableName;
        this.subtotalAmount = subtotalAmount;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.items = items != null ? items : new ArrayList<>();
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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

    public List<OrderItemResponse> getItems() {
        return items;
    }

    public void setItems(List<OrderItemResponse> items) {
        this.items = items;
    }
}
