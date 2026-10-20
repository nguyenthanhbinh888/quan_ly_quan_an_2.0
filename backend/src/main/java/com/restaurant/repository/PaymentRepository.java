package com.restaurant.repository;

import com.restaurant.entity.PaymentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    Optional<PaymentEntity> findByOrderId(Long orderId);
    Optional<PaymentEntity> findByInvoiceCode(String invoiceCode);
    boolean existsByOrderId(Long orderId);
    boolean existsByInvoiceCode(String invoiceCode);
    Page<PaymentEntity> findByPaidAtBetween(LocalDateTime start, LocalDateTime end, Pageable pageable);
    List<PaymentEntity> findByPaidAtBetween(LocalDateTime start, LocalDateTime end);
    Page<PaymentEntity> findAllByOrderByPaidAtDesc(Pageable pageable);

    @Query("SELECT COALESCE(SUM(p.order.finalAmount), 0) FROM PaymentEntity p WHERE p.paidAt BETWEEN :start AND :end")
    BigDecimal sumFinalAmountBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT COUNT(p) FROM PaymentEntity p WHERE p.paidAt BETWEEN :start AND :end")
    long countPaidBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
