package com.restaurant.dto.response;

import java.math.BigDecimal;

public class DashboardSummaryResponse {

    private BigDecimal todayRevenue;
    private Long todayOrderCount;
    private BigDecimal averageOrderValue;
    private Long occupiedTables;
    private Long totalTables;
    private Double occupancyRate;

    public DashboardSummaryResponse() {
    }

    public DashboardSummaryResponse(BigDecimal todayRevenue, Long todayOrderCount, BigDecimal averageOrderValue,
                                    Long occupiedTables, Long totalTables, Double occupancyRate) {
        this.todayRevenue = todayRevenue;
        this.todayOrderCount = todayOrderCount;
        this.averageOrderValue = averageOrderValue;
        this.occupiedTables = occupiedTables;
        this.totalTables = totalTables;
        this.occupancyRate = occupancyRate;
    }

    public BigDecimal getTodayRevenue() {
        return todayRevenue;
    }

    public void setTodayRevenue(BigDecimal todayRevenue) {
        this.todayRevenue = todayRevenue;
    }

    public Long getTodayOrderCount() {
        return todayOrderCount;
    }

    public void setTodayOrderCount(Long todayOrderCount) {
        this.todayOrderCount = todayOrderCount;
    }

    public BigDecimal getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(BigDecimal averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }

    public Long getOccupiedTables() {
        return occupiedTables;
    }

    public void setOccupiedTables(Long occupiedTables) {
        this.occupiedTables = occupiedTables;
    }

    public Long getTotalTables() {
        return totalTables;
    }

    public void setTotalTables(Long totalTables) {
        this.totalTables = totalTables;
    }

    public Double getOccupancyRate() {
        return occupancyRate;
    }

    public void setOccupancyRate(Double occupancyRate) {
        this.occupancyRate = occupancyRate;
    }
}
