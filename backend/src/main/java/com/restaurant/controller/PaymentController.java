package com.restaurant.controller;

import com.restaurant.dto.request.PaymentRequest;
import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.PaymentPreviewResponse;
import com.restaurant.dto.response.PaymentResponse;
import com.restaurant.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/preview/{orderId}")
    public ResponseEntity<ApiResponse<PaymentPreviewResponse>> getPaymentPreview(@PathVariable Long orderId) {
        PaymentPreviewResponse preview = paymentService.getPaymentPreview(orderId);
        return ResponseEntity.ok(ApiResponse.success(preview));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<PaymentResponse>> processPayment(
            @Valid @RequestBody PaymentRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        PaymentResponse response = paymentService.processPayment(request, userDetails.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success("Thanh toán đơn hàng thành công", response));
    }

    @GetMapping("/by-order/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByOrderId(@PathVariable Long orderId) {
        PaymentResponse response = paymentService.getPaymentByOrderId(orderId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/invoice/{invoiceCode}")
    public ResponseEntity<ApiResponse<PaymentResponse>> getPaymentByInvoiceCode(@PathVariable String invoiceCode) {
        PaymentResponse response = paymentService.getPaymentByInvoiceCode(invoiceCode);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<PaymentResponse>>> getPaymentHistory(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "paidAt"));
        Page<PaymentResponse> history = paymentService.getPaymentHistory(startDate, endDate, pageable);
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
