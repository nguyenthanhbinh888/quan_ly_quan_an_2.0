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
    Page<MenuItemEntity> findByStatus(MenuItemStatus status, Pageable pageable);
    boolean existsByCategoryId(Long categoryId);
}
