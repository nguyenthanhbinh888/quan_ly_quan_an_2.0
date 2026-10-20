package com.restaurant.service;

import com.restaurant.dto.response.DailyRevenueResponse;
import com.restaurant.dto.response.DashboardSummaryResponse;
import com.restaurant.dto.response.TopSellingItemResponse;

import java.time.LocalDate;
import java.util.List;

public interface DashboardService {
    DashboardSummaryResponse getDashboardSummary();
    List<DailyRevenueResponse> getRevenueAnalytics(LocalDate startDate, LocalDate endDate);
    List<TopSellingItemResponse> getTopSellingItems(int limit);
}
