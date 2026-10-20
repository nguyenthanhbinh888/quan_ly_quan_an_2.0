package com.restaurant.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CancelOrderRequest {

    @NotBlank(message = "Lý do hủy đơn không được để trống")
    @Size(max = 255, message = "Lý do hủy đơn không vượt quá 255 ký tự")
    private String cancelReason;

    public CancelOrderRequest() {
    }

    public CancelOrderRequest(String cancelReason) {
        this.cancelReason = cancelReason;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }
}
