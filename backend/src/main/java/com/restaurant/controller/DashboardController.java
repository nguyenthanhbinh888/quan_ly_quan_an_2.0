package com.restaurant.controller;

import com.restaurant.dto.response.ApiResponse;
import com.restaurant.dto.response.DailyRevenueResponse;
import com.restaurant.dto.response.DashboardSummaryResponse;
import com.restaurant.dto.response.TopSellingItemResponse;
import com.restaurant.service.DashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getDashboardSummary() {
        DashboardSummaryResponse summary = dashboardService.getDashboardSummary();
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<List<DailyRevenueResponse>>> getRevenueAnalytics(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<DailyRevenueResponse> revenue = dashboardService.getRevenueAnalytics(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(revenue));
    }

    @GetMapping("/top-items")
    public ResponseEntity<ApiResponse<List<TopSellingItemResponse>>> getTopSellingItems(
            @RequestParam(defaultValue = "5") int limit) {
        List<TopSellingItemResponse> topItems = dashboardService.getTopSellingItems(limit);
        return ResponseEntity.ok(ApiResponse.success(topItems));
    }
}
