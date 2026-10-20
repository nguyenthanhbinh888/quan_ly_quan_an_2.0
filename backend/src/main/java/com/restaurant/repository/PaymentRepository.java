package com.restaurant.repository;

import com.restaurant.entity.PaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    Optional<PaymentEntity> findByOrderId(Long orderId);
    Optional<PaymentEntity> findByInvoiceCode(String invoiceCode);
    boolean existsByOrderId(Long orderId);
    boolean existsByInvoiceCode(String invoiceCode);
    Page<PaymentEntity> findByPaidAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    Page<PaymentEntity> findAllByOrderByPaidAtDesc(Pageable pageable);
}
