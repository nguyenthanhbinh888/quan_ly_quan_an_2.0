package com.restaurant.service.impl;

import com.restaurant.dto.request.DiningTableRequest;
import com.restaurant.dto.response.DiningTableResponse;
import com.restaurant.entity.DiningTableEntity;
import com.restaurant.entity.OrderEntity;
import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.TableStatus;
import com.restaurant.exception.BadRequestException;
import com.restaurant.exception.ConflictException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.DiningTableRepository;
import com.restaurant.repository.OrderRepository;
import com.restaurant.service.DiningTableService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DiningTableServiceImpl implements DiningTableService {

    private final DiningTableRepository diningTableRepository;
    private final OrderRepository orderRepository;

    public DiningTableServiceImpl(DiningTableRepository diningTableRepository, OrderRepository orderRepository) {
        this.diningTableRepository = diningTableRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DiningTableResponse> getAllTables() {
        List<DiningTableEntity> tables = diningTableRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        
        // Lấy tất cả các đơn hàng PENDING để map nhanh vào bàn
        List<OrderEntity> pendingOrders = orderRepository.findByStatus(OrderStatus.PENDING);
        Map<Long, OrderEntity> orderMapByTableId = pendingOrders.stream()
                .filter(o -> o.getTable() != null)
                .collect(Collectors.toMap(o -> o.getTable().getId(), o -> o, (existing, replacement) -> existing));

        return tables.stream()
                .map(table -> mapToResponse(table, orderMapByTableId.get(table.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public DiningTableResponse getTableById(Long id) {
        DiningTableEntity table = diningTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bàn ăn với ID: " + id));

        OrderEntity activeOrder = orderRepository.findFirstByTableIdAndStatusOrderByCreatedAtDesc(id, OrderStatus.PENDING)
                .orElse(null);

        return mapToResponse(table, activeOrder);
    }

    @Override
    @Transactional
    public DiningTableResponse createTable(DiningTableRequest request) {
        String code = request.getCode().trim().toUpperCase();
        if (diningTableRepository.existsByCode(code)) {
            throw new ConflictException("Mã bàn '" + code + "' đã tồn tại trong hệ thống");
        }

        DiningTableEntity table = new DiningTableEntity();
        table.setCode(code);
        table.setName(request.getName().trim());
        table.setCapacity(request.getCapacity());
        table.setStatus(request.getStatus() != null ? request.getStatus() : TableStatus.EMPTY);

        DiningTableEntity saved = diningTableRepository.save(table);
        return mapToResponse(saved, null);
    }

    @Override
    @Transactional
    public DiningTableResponse updateTable(Long id, DiningTableRequest request) {
        DiningTableEntity table = diningTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bàn ăn với ID: " + id));

        String code = request.getCode().trim().toUpperCase();
        if (diningTableRepository.existsByCodeAndIdNot(code, id)) {
            throw new ConflictException("Mã bàn '" + code + "' đã được sử dụng bởi bàn khác");
        }

        table.setCode(code);
        table.setName(request.getName().trim());
        table.setCapacity(request.getCapacity());
        if (request.getStatus() != null) {
            table.setStatus(request.getStatus());
        }

        DiningTableEntity saved = diningTableRepository.save(table);

        OrderEntity activeOrder = orderRepository.findFirstByTableIdAndStatusOrderByCreatedAtDesc(id, OrderStatus.PENDING)
                .orElse(null);

        return mapToResponse(saved, activeOrder);
    }

    @Override
    @Transactional
    public void deleteTable(Long id) {
        DiningTableEntity table = diningTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bàn ăn với ID: " + id));

        if (orderRepository.existsByTableIdAndStatus(id, OrderStatus.PENDING)) {
            throw new BadRequestException("Không thể xóa bàn đang có đơn hàng hoạt động");
        }

        if (table.getStatus() != TableStatus.EMPTY) {
            throw new BadRequestException("Chỉ có thể xóa bàn khi đang ở trạng thái Trống (EMPTY)");
        }

        diningTableRepository.delete(table);
    }

    @Override
    @Transactional
    public DiningTableResponse updateTableStatus(Long id, TableStatus status) {
        DiningTableEntity table = diningTableRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bàn ăn với ID: " + id));

        table.setStatus(status);
        DiningTableEntity saved = diningTableRepository.save(table);

        OrderEntity activeOrder = orderRepository.findFirstByTableIdAndStatusOrderByCreatedAtDesc(id, OrderStatus.PENDING)
                .orElse(null);

        return mapToResponse(saved, activeOrder);
    }

    private DiningTableResponse mapToResponse(DiningTableEntity table, OrderEntity activeOrder) {
        return new DiningTableResponse(
                table.getId(),
                table.getCode(),
                table.getName(),
                table.getCapacity(),
                table.getStatus(),
                activeOrder != null ? activeOrder.getId() : null,
                activeOrder != null ? activeOrder.getOrderCode() : null,
                activeOrder != null ? activeOrder.getFinalAmount() : null,
                table.getCreatedAt(),
                table.getUpdatedAt()
        );
    }
}
