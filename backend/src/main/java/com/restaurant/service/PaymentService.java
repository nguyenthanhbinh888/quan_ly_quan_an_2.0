package com.restaurant.service;

import com.restaurant.dto.request.PaymentRequest;
import com.restaurant.dto.response.PaymentPreviewResponse;
import com.restaurant.dto.response.PaymentResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface PaymentService {
    PaymentPreviewResponse getPaymentPreview(Long orderId);
    PaymentResponse processPayment(PaymentRequest request, String username);
    PaymentResponse getPaymentByOrderId(Long orderId);
    PaymentResponse getPaymentByInvoiceCode(String invoiceCode);
    Page<PaymentResponse> getPaymentHistory(LocalDate startDate, LocalDate endDate, Pageable pageable);
}
