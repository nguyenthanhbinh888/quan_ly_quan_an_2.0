package com.restaurant.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class AddOrderItemRequest {

    @NotNull(message = "Mã món ăn không được để trống")
    private Long menuItemId;

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng gọi món tối thiểu là 1")
    private Integer quantity = 1;

    @Size(max = 255, message = "Ghi chú món không vượt quá 255 ký tự")
    private String note;

    public AddOrderItemRequest() {
    }

    public AddOrderItemRequest(Long menuItemId, Integer quantity, String note) {
        this.menuItemId = menuItemId;
        this.quantity = quantity;
        this.note = note;
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
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
}
