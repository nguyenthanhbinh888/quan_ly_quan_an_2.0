package com.restaurant.repository;

import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItemEntity, Long> {
    List<MenuItemEntity> findByCategoryId(Long categoryId);
    List<MenuItemEntity> findByCategoryIdAndIsDeletedFalse(Long categoryId);
    Page<MenuItemEntity> findByStatus(MenuItemStatus status, Pageable pageable);
    Page<MenuItemEntity> findByStatusAndIsDeletedFalse(MenuItemStatus status, Pageable pageable);
    boolean existsByCategoryId(Long categoryId);
    boolean existsByCategoryIdAndIsDeletedFalse(Long categoryId);
    long countByCategoryId(Long categoryId);
    long countByCategoryIdAndIsDeletedFalse(Long categoryId);

    @org.springframework.data.jpa.repository.Query("SELECT m FROM MenuItemEntity m WHERE " +
           "(m.isDeleted = false) AND " +
           "(:categoryId IS NULL OR m.category.id = :categoryId) AND " +
           "(:status IS NULL OR m.status = :status) AND " +
           "(:keyword IS NULL OR LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "ORDER BY m.category.displayOrder ASC, m.name ASC")
    List<MenuItemEntity> searchMenuItems(
            @org.springframework.data.repository.query.Param("categoryId") Long categoryId,
            @org.springframework.data.repository.query.Param("status") MenuItemStatus status,
            @org.springframework.data.repository.query.Param("keyword") String keyword
    );
}
