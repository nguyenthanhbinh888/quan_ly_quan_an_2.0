package com.restaurant.repository;

import com.restaurant.entity.DiningTableEntity;
import com.restaurant.enums.TableStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DiningTableRepository extends JpaRepository<DiningTableEntity, Long> {
    Optional<DiningTableEntity> findByCode(String code);
    List<DiningTableEntity> findByStatus(TableStatus status);
    boolean existsByCode(String code);
    boolean existsByCodeAndIdNot(String code, Long id);
    long countByStatus(TableStatus status);
}
