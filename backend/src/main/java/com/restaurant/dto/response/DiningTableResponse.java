package com.restaurant.dto.response;

import com.restaurant.enums.TableStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DiningTableResponse {

    private Long id;
    private String code;
    private String name;
    private Integer capacity;
    private TableStatus status;
    private Long currentOrderId;
    private String currentOrderCode;
    private BigDecimal currentOrderTotal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public DiningTableResponse() {
    }

    public DiningTableResponse(Long id, String code, String name, Integer capacity, TableStatus status,
                               Long currentOrderId, String currentOrderCode, BigDecimal currentOrderTotal,
                               LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.capacity = capacity;
        this.status = status;
        this.currentOrderId = currentOrderId;
        this.currentOrderCode = currentOrderCode;
        this.currentOrderTotal = currentOrderTotal;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public TableStatus getStatus() {
        return status;
    }

    public void setStatus(TableStatus status) {
        this.status = status;
    }

    public Long getCurrentOrderId() {
        return currentOrderId;
    }

    public void setCurrentOrderId(Long currentOrderId) {
        this.currentOrderId = currentOrderId;
    }

    public String getCurrentOrderCode() {
        return currentOrderCode;
    }

    public void setCurrentOrderCode(String currentOrderCode) {
        this.currentOrderCode = currentOrderCode;
    }

    public BigDecimal getCurrentOrderTotal() {
        return currentOrderTotal;
    }

    public void setCurrentOrderTotal(BigDecimal currentOrderTotal) {
        this.currentOrderTotal = currentOrderTotal;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
