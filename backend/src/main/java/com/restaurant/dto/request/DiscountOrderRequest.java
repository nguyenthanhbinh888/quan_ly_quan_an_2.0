package com.restaurant.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class DiscountOrderRequest {

    @NotNull(message = "Số tiền giảm giá không được để trống")
    @DecimalMin(value = "0.00", message = "Số tiền giảm giá không được âm")
    private BigDecimal discountAmount;

    public DiscountOrderRequest() {
    }

    public DiscountOrderRequest(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }

    public BigDecimal getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(BigDecimal discountAmount) {
        this.discountAmount = discountAmount;
    }
}
