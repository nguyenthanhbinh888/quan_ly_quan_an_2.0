package com.restaurant.repository;

import com.restaurant.entity.OrderItemEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItemEntity, Long> {
    List<OrderItemEntity> findByOrderId(Long orderId);
    boolean existsByMenuItemId(Long menuItemId);

    @Query("SELECT oi.menuItem.id, oi.itemName, oi.menuItem.category.name, SUM(oi.quantity), SUM(oi.subtotal) " +
           "FROM OrderItemEntity oi " +
           "WHERE oi.order.status = com.restaurant.enums.OrderStatus.PAID " +
           "GROUP BY oi.menuItem.id, oi.itemName, oi.menuItem.category.name " +
           "ORDER BY SUM(oi.quantity) DESC")
    List<Object[]> findTopSellingItems(Pageable pageable);
}
