package com.restaurant.dto.request;

import com.restaurant.enums.OrderType;
import jakarta.validation.constraints.Size;

public class CreateOrderRequest {

    private Long tableId;

    private OrderType orderType = OrderType.DINE_IN;

    @Size(max = 255, message = "Ghi chú không vượt quá 255 ký tự")
    private String note;

    public CreateOrderRequest() {
    }

    public CreateOrderRequest(Long tableId, OrderType orderType, String note) {
        this.tableId = tableId;
        this.orderType = orderType;
        this.note = note;
    }

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

    public OrderType getOrderType() {
        return orderType;
    }

    public void setOrderType(OrderType orderType) {
        this.orderType = orderType;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
