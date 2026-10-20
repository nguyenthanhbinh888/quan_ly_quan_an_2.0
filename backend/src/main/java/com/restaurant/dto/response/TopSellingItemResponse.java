package com.restaurant.dto.response;

import java.math.BigDecimal;

public class TopSellingItemResponse {

    private Long menuItemId;
    private String itemName;
    private String categoryName;
    private Long quantitySold;
    private BigDecimal totalRevenue;

    public TopSellingItemResponse() {
    }

    public TopSellingItemResponse(Long menuItemId, String itemName, String categoryName, Long quantitySold, BigDecimal totalRevenue) {
        this.menuItemId = menuItemId;
        this.itemName = itemName;
        this.categoryName = categoryName;
        this.quantitySold = quantitySold;
        this.totalRevenue = totalRevenue;
    }

    public Long getMenuItemId() {
        return menuItemId;
    }

    public void setMenuItemId(Long menuItemId) {
        this.menuItemId = menuItemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Long getQuantitySold() {
        return quantitySold;
    }

    public void setQuantitySold(Long quantitySold) {
        this.quantitySold = quantitySold;
    }

    public BigDecimal getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(BigDecimal totalRevenue) {
        this.totalRevenue = totalRevenue;
    }
}
