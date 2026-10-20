package com.restaurant.dto.response;

import com.restaurant.entity.CategoryEntity;
import java.time.LocalDateTime;

public class CategoryResponse {

    private Long id;
    private String name;
    private String description;
    private Integer displayOrder;
    private Boolean active;
    private LocalDateTime createdAt;
    private long itemCount;

    public CategoryResponse() {}

    public CategoryResponse(Long id, String name, String description, Integer displayOrder, Boolean active, LocalDateTime createdAt, long itemCount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.displayOrder = displayOrder;
        this.active = active;
        this.createdAt = createdAt;
        this.itemCount = itemCount;
    }

    public static CategoryResponse fromEntity(CategoryEntity entity, long itemCount) {
        return new CategoryResponse(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getDisplayOrder(),
                entity.getActive(),
                entity.getCreatedAt(),
                itemCount
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public Boolean getActive() {
        return active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getItemCount() {
        return itemCount;
    }
}
