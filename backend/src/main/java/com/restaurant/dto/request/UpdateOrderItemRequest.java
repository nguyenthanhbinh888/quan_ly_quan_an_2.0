package com.restaurant.dto.request;

import com.restaurant.enums.OrderItemStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class UpdateOrderItemRequest {

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng món tối thiểu là 1")
    private Integer quantity;

    @Size(max = 255, message = "Ghi chú món không vượt quá 255 ký tự")
    private String note;

    private OrderItemStatus status;

    public UpdateOrderItemRequest() {
    }

    public UpdateOrderItemRequest(Integer quantity, String note, OrderItemStatus status) {
        this.quantity = quantity;
        this.note = note;
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
}
