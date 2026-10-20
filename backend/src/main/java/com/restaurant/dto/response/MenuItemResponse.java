package com.restaurant.dto.response;

import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class MenuItemResponse {

    private Long id;
    private Long categoryId;
    private String categoryName;
    private String name;
    private String description;
    private BigDecimal price;
    private String imageUrl;
    private MenuItemStatus status;
    private LocalDateTime createdAt;

    public MenuItemResponse() {}

    public MenuItemResponse(Long id, Long categoryId, String categoryName, String name, String description, BigDecimal price, String imageUrl, MenuItemStatus status, LocalDateTime createdAt) {
        this.id = id;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.status = status;
        this.createdAt = createdAt;
    }

    public static MenuItemResponse fromEntity(MenuItemEntity entity) {
        return new MenuItemResponse(
                entity.getId(),
                entity.getCategory().getId(),
                entity.getCategory().getName(),
                entity.getName(),
                entity.getDescription(),
                entity.getPrice(),
                entity.getImageUrl(),
                entity.getStatus(),
                entity.getCreatedAt()
        );
    }

    public Long getId() {
        return id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public MenuItemStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
