package com.restaurant.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;

public class DailyRevenueResponse {

    private LocalDate date;
    private BigDecimal revenue;
    private Long orderCount;

    public DailyRevenueResponse() {
    }

    public DailyRevenueResponse(LocalDate date, BigDecimal revenue, Long orderCount) {
        this.date = date;
        this.revenue = revenue;
        this.orderCount = orderCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }

    public Long getOrderCount() {
        return orderCount;
    }

    public void setOrderCount(Long orderCount) {
        this.orderCount = orderCount;
    }
}
