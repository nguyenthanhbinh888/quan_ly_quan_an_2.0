package com.restaurant.service.impl;

import com.restaurant.dto.request.PaymentRequest;
import com.restaurant.dto.response.OrderItemResponse;
import com.restaurant.dto.response.PaymentPreviewResponse;
import com.restaurant.dto.response.PaymentResponse;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.OrderEntity;
import com.restaurant.entity.PaymentEntity;
import com.restaurant.entity.UserEntity;
import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.PaymentStatus;
import com.restaurant.enums.TableStatus;
import com.restaurant.exception.BadRequestException;
import com.restaurant.exception.ConflictException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.DiningTableRepository;
import com.restaurant.repository.OrderRepository;
import com.restaurant.repository.PaymentRepository;
import com.restaurant.repository.UserRepository;
import com.restaurant.service.PaymentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;
    private final DiningTableRepository diningTableRepository;
    private final UserRepository userRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository,
                              OrderRepository orderRepository,
                              DiningTableRepository diningTableRepository,
                              UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.diningTableRepository = diningTableRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentPreviewResponse getPaymentPreview(Long orderId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        List<OrderItemResponse> itemResponses = mapOrderItems(order);

        return new PaymentPreviewResponse(
                order.getId(),
                order.getOrderCode(),
                order.getTable() != null ? order.getTable().getId() : null,
                order.getTable() != null ? order.getTable().getCode() : null,
                order.getTable() != null ? order.getTable().getName() : null,
                order.getSubtotalAmount(),
                order.getDiscountAmount(),
                order.getFinalAmount(),
                itemResponses
        );
    }

    @Override
    @Transactional
    public PaymentResponse processPayment(PaymentRequest request, String username) {
        UserEntity currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng: " + username));

        OrderEntity order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + request.getOrderId()));

        if (order.getStatus() == OrderStatus.PAID || paymentRepository.existsByOrderId(order.getId())) {
            throw new ConflictException("Đơn hàng '" + order.getOrderCode() + "' đã được thanh toán trước đó");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Chỉ có thể thanh toán đơn hàng có trạng thái PENDING. Trạng thái hiện tại: " + order.getStatus());
        }

        if (order.getItems().isEmpty()) {
            throw new BadRequestException("Đơn hàng chưa có món ăn nào, không thể thanh toán");
        }

        BigDecimal finalAmount = order.getFinalAmount();
        if (request.getAmountPaid().compareTo(finalAmount) < 0) {
            throw new BadRequestException("Số tiền thanh toán (" + request.getAmountPaid() + 
                    ") không đủ để thanh toán tổng tiền (" + finalAmount + ")");
        }

        BigDecimal changeAmount = request.getAmountPaid().subtract(finalAmount);

        // 1. Tạo bản ghi Payment
        PaymentEntity payment = new PaymentEntity();
        payment.setOrder(order);
        payment.setInvoiceCode(generateInvoiceCode());
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setAmountPaid(request.getAmountPaid());
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        payment.setProcessedByUser(currentUser);
        payment.setPaidAt(LocalDateTime.now());

        PaymentEntity savedPayment = paymentRepository.save(payment);

        // 2. Chuyển trạng thái đơn hàng sang PAID
        order.setStatus(OrderStatus.PAID);
        orderRepository.save(order);

        // 3. Giải phóng bàn ăn về EMPTY
        if (order.getTable() != null) {
            DiningTableEntity table = order.getTable();
            table.setStatus(TableStatus.EMPTY);
            diningTableRepository.save(table);
        }

        return mapToPaymentResponse(savedPayment, changeAmount);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByOrderId(Long orderId) {
        PaymentEntity payment = paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin thanh toán cho đơn hàng: " + orderId));
        return mapToPaymentResponse(payment, BigDecimal.ZERO);
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPaymentByInvoiceCode(String invoiceCode) {
        PaymentEntity payment = paymentRepository.findByInvoiceCode(invoiceCode)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy hóa đơn với mã: " + invoiceCode));
        return mapToPaymentResponse(payment, BigDecimal.ZERO);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PaymentResponse> getPaymentHistory(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        Page<PaymentEntity> page;
        if (startDate != null && endDate != null) {
            page = paymentRepository.findByPaidAtBetween(
                    startDate.atStartOfDay(),
                    endDate.atTime(23, 59, 59),
                    pageable
            );
        } else {
            page = paymentRepository.findAllByOrderByPaidAtDesc(pageable);
        }

        return page.map(p -> mapToPaymentResponse(p, BigDecimal.ZERO));
    }

    private String generateInvoiceCode() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        for (int i = 0; i < 10; i++) {
            int randomSeq = (int) (Math.random() * 9000) + 1000;
            String code = "INV-" + datePart + "-" + randomSeq;
            if (!paymentRepository.existsByInvoiceCode(code)) {
                return code;
            }
        }
        return "INV-" + datePart + "-" + (System.currentTimeMillis() % 10000);
    }

    private List<OrderItemResponse> mapOrderItems(OrderEntity order) {
        return order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        order.getId(),
                        item.getMenuItem() != null ? item.getMenuItem().getId() : null,
                        item.getItemName(),
                        item.getMenuItem() != null ? item.getMenuItem().getImageUrl() : null,
                        item.getPriceAtOrder(),
                        item.getQuantity(),
                        item.getSubtotal(),
                        item.getNote(),
                        item.getStatus(),
                        item.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    private PaymentResponse mapToPaymentResponse(PaymentEntity payment, BigDecimal changeAmount) {
        OrderEntity order = payment.getOrder();
        List<OrderItemResponse> itemResponses = mapOrderItems(order);

        BigDecimal finalAmount = order.getFinalAmount();
        BigDecimal effectiveChange = changeAmount != null && changeAmount.compareTo(BigDecimal.ZERO) > 0
                ? changeAmount
                : payment.getAmountPaid().subtract(finalAmount).max(BigDecimal.ZERO);

        return new PaymentResponse(
                payment.getId(),
                order.getId(),
                payment.getInvoiceCode(),
                order.getOrderCode(),
                order.getTable() != null ? order.getTable().getId() : null,
                order.getTable() != null ? order.getTable().getCode() : null,
                order.getTable() != null ? order.getTable().getName() : null,
                payment.getPaymentMethod(),
                order.getSubtotalAmount(),
                order.getDiscountAmount(),
                finalAmount,
                payment.getAmountPaid(),
                effectiveChange,
                payment.getPaymentStatus(),
                payment.getProcessedByUser() != null ? payment.getProcessedByUser().getId() : null,
                payment.getProcessedByUser() != null ? payment.getProcessedByUser().getFullName() : null,
                payment.getPaidAt(),
                itemResponses
        );
    }
}
