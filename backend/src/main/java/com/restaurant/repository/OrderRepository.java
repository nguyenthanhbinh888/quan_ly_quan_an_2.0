package com.restaurant.repository;

import com.restaurant.entity.OrderEntity;
import com.restaurant.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByOrderCode(String orderCode);
    Optional<OrderEntity> findByTableIdAndStatus(Long tableId, OrderStatus status);
    Page<OrderEntity> findByStatus(OrderStatus status, Pageable pageable);
}
