package com.restaurant.dto.request;

import com.restaurant.enums.MenuItemStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateMenuItemStatusRequest {

    @NotNull(message = "Trạng thái món không được để trống")
    private MenuItemStatus status;

    public UpdateMenuItemStatusRequest() {}

    public UpdateMenuItemStatusRequest(MenuItemStatus status) {
        this.status = status;
    }

    public MenuItemStatus getStatus() {
        return status;
    }

    public void setStatus(MenuItemStatus status) {
        this.status = status;
    }
}
