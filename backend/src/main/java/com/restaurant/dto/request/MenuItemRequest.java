package com.restaurant.dto.request;

import com.restaurant.enums.MenuItemStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class MenuItemRequest {

    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    @NotBlank(message = "Tên món ăn không được để trống")
    @Size(max = 150, message = "Tên món không được vượt quá 150 ký tự")
    private String name;

    private String description;

    @NotNull(message = "Đơn giá món ăn không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Đơn giá món ăn không được nhỏ hơn 0")
    private BigDecimal price;

    @Size(max = 500, message = "Đường dẫn hình ảnh không được vượt quá 500 ký tự")
    private String imageUrl;

    private MenuItemStatus status = MenuItemStatus.AVAILABLE;

    public MenuItemRequest() {}

    public MenuItemRequest(Long categoryId, String name, String description, BigDecimal price, String imageUrl, MenuItemStatus status) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.status = status != null ? status : MenuItemStatus.AVAILABLE;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public MenuItemStatus getStatus() {
        return status;
    }

    public void setStatus(MenuItemStatus status) {
        this.status = status;
    }
}
