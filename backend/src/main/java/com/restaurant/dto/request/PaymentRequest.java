package com.restaurant.dto.request;

import com.restaurant.enums.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class PaymentRequest {

    @NotNull(message = "Mã đơn hàng không được để trống")
    private Long orderId;

    @NotNull(message = "Phương thức thanh toán không được để trống (CASH hoặc BANK_TRANSFER)")
    private PaymentMethod paymentMethod;

    @NotNull(message = "Số tiền thanh toán không được để trống")
    @DecimalMin(value = "0.00", message = "Số tiền thanh toán không được âm")
    private BigDecimal amountPaid;

    public PaymentRequest() {
    }

    public PaymentRequest(Long orderId, PaymentMethod paymentMethod, BigDecimal amountPaid) {
        this.orderId = orderId;
        this.paymentMethod = paymentMethod;
        this.amountPaid = amountPaid;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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
}
