package com.restaurant.service.impl;

import com.restaurant.dto.response.DailyRevenueResponse;
import com.restaurant.dto.response.DashboardSummaryResponse;
import com.restaurant.dto.response.TopSellingItemResponse;
import com.restaurant.entity.PaymentEntity;
import com.restaurant.enums.PaymentStatus;
import com.restaurant.enums.TableStatus;
import com.restaurant.exception.BadRequestException;
import com.restaurant.repository.DiningTableRepository;
import com.restaurant.repository.OrderItemRepository;
import com.restaurant.repository.PaymentRepository;
import com.restaurant.service.DashboardService;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    private final PaymentRepository paymentRepository;
    private final OrderItemRepository orderItemRepository;
    private final DiningTableRepository diningTableRepository;

    public DashboardServiceImpl(PaymentRepository paymentRepository,
                                OrderItemRepository orderItemRepository,
                                DiningTableRepository diningTableRepository) {
        this.paymentRepository = paymentRepository;
        this.orderItemRepository = orderItemRepository;
        this.diningTableRepository = diningTableRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryResponse getDashboardSummary() {
        LocalDateTime todayStart = LocalDate.now().atStartOfDay();
        LocalDateTime todayEnd = LocalDate.now().atTime(23, 59, 59);

        BigDecimal todayRevenue = paymentRepository.sumFinalAmountBetween(todayStart, todayEnd);
        if (todayRevenue == null) todayRevenue = BigDecimal.ZERO;

        long todayOrderCount = paymentRepository.countPaidBetween(todayStart, todayEnd);

        BigDecimal averageOrderValue = todayOrderCount > 0
                ? todayRevenue.divide(BigDecimal.valueOf(todayOrderCount), 0, RoundingMode.HALF_UP)
                : BigDecimal.ZERO;

        long totalTables = diningTableRepository.count();
        long occupiedTables = diningTableRepository.countByStatus(TableStatus.OCCUPIED);
        double occupancyRate = totalTables > 0 ? Math.round(((double) occupiedTables / totalTables) * 1000.0) / 10.0 : 0.0;

        return new DashboardSummaryResponse(
                todayRevenue,
                todayOrderCount,
                averageOrderValue,
                occupiedTables,
                totalTables,
                occupancyRate
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<DailyRevenueResponse> getRevenueAnalytics(LocalDate startDate, LocalDate endDate) {
        if (endDate == null) endDate = LocalDate.now();
        if (startDate == null) startDate = endDate.minusDays(6);

        if (startDate.isAfter(endDate)) {
            throw new BadRequestException("Ngày bắt đầu không được lớn hơn ngày kết thúc");
        }

        LocalDateTime startDt = startDate.atStartOfDay();
        LocalDateTime endDt = endDate.atTime(23, 59, 59);

        List<PaymentEntity> payments = paymentRepository.findByPaidAtBetween(startDt, endDt);

        // Group theo từng ngày
        Map<LocalDate, List<PaymentEntity>> paymentsByDate = payments.stream()
                .filter(p -> p.getPaymentStatus() == PaymentStatus.SUCCESS)
                .collect(Collectors.groupingBy(p -> p.getPaidAt().toLocalDate()));

        List<DailyRevenueResponse> result = new ArrayList<>();
        LocalDate cur = startDate;
        while (!cur.isAfter(endDate)) {
            List<PaymentEntity> dayPayments = paymentsByDate.getOrDefault(cur, Collections.emptyList());
            BigDecimal dayRevenue = dayPayments.stream()
                    .map(p -> p.getOrder().getFinalAmount())
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            long dayCount = dayPayments.size();

            result.add(new DailyRevenueResponse(cur, dayRevenue, dayCount));
            cur = cur.plusDays(1);
        }

        return result;
    }

    @Override
    @Transactional(readOnly = true)
    public List<TopSellingItemResponse> getTopSellingItems(int limit) {
        int effectiveLimit = limit > 0 ? limit : 5;
        List<Object[]> rows = orderItemRepository.findTopSellingItems(PageRequest.of(0, effectiveLimit));

        return rows.stream().map(row -> {
            Long menuItemId = (Long) row[0];
            String itemName = (String) row[1];
            String categoryName = (String) row[2];
            Long quantitySold = row[3] instanceof Number ? ((Number) row[3]).longValue() : 0L;
            BigDecimal totalRevenue = row[4] instanceof BigDecimal ? (BigDecimal) row[4] : BigDecimal.ZERO;

            return new TopSellingItemResponse(menuItemId, itemName, categoryName, quantitySold, totalRevenue);
        }).collect(Collectors.toList());
    }
}
