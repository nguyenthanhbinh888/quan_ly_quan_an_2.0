package com.restaurant.repository;

import com.restaurant.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {
    List<CategoryEntity> findByActiveTrueOrderByDisplayOrderAsc();
    boolean existsByName(String name);
}
