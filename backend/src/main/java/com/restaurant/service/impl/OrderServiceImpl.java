package com.restaurant.service.impl;

import com.restaurant.dto.request.*;
import com.restaurant.dto.response.OrderItemResponse;
import com.restaurant.dto.response.OrderResponse;
import com.restaurant.entity.*;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.enums.OrderItemStatus;
import com.restaurant.enums.OrderStatus;
import com.restaurant.enums.OrderType;
import com.restaurant.enums.TableStatus;
import com.restaurant.exception.BadRequestException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.*;
import com.restaurant.service.OrderService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final DiningTableRepository diningTableRepository;
    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            OrderItemRepository orderItemRepository,
                            DiningTableRepository diningTableRepository,
                            MenuItemRepository menuItemRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.diningTableRepository = diningTableRepository;
        this.menuItemRepository = menuItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, String username) {
        UserEntity currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy thông tin người dùng: " + username));

        DiningTableEntity table = null;
        if (request.getOrderType() == OrderType.DINE_IN) {
            if (request.getTableId() == null) {
                throw new BadRequestException("Vui lòng chọn bàn ăn khi tạo đơn tại bàn (DINE_IN)");
            }
            table = diningTableRepository.findById(request.getTableId())
                    .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy bàn ăn với ID: " + request.getTableId()));

            if (orderRepository.existsByTableIdAndStatus(table.getId(), OrderStatus.PENDING)) {
                throw new BadRequestException("Bàn " + table.getCode() + " hiện đã có đơn hàng đang hoạt động");
            }

            table.setStatus(TableStatus.OCCUPIED);
            diningTableRepository.save(table);
        }

        OrderEntity order = new OrderEntity();
        order.setOrderCode(generateOrderCode());
        order.setTable(table);
        order.setOrderType(request.getOrderType() != null ? request.getOrderType() : OrderType.DINE_IN);
        order.setStatus(OrderStatus.PENDING);
        order.setCreatedByUser(currentUser);
        order.setSubtotalAmount(BigDecimal.ZERO);
        order.setDiscountAmount(BigDecimal.ZERO);
        order.setFinalAmount(BigDecimal.ZERO);
        order.setNote(request.getNote());

        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + id));
        return mapToOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getActiveOrderByTableId(Long tableId) {
        OrderEntity order = orderRepository.findFirstByTableIdAndStatusOrderByCreatedAtDesc(tableId, OrderStatus.PENDING)
                .orElseThrow(() -> new ResourceNotFoundException("Không có đơn hàng nào đang phục vụ tại bàn này"));
        return mapToOrderResponse(order);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<OrderResponse> getOrders(OrderStatus status, Long tableId, Pageable pageable) {
        Page<OrderEntity> page;
        if (status != null && tableId != null) {
            page = orderRepository.findByStatusAndTableId(status, tableId, pageable);
        } else if (status != null) {
            page = orderRepository.findByStatus(status, pageable);
        } else if (tableId != null) {
            page = orderRepository.findByTableId(tableId, pageable);
        } else {
            page = orderRepository.findAll(pageable);
        }

        return page.map(this::mapToOrderResponse);
    }

    @Override
    @Transactional
    public OrderResponse addOrderItem(Long orderId, AddOrderItemRequest request) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Không thể thêm món vào đơn hàng có trạng thái " + order.getStatus());
        }

        MenuItemEntity menuItem = menuItemRepository.findById(request.getMenuItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy món ăn với ID: " + request.getMenuItemId()));

        if (Boolean.TRUE.equals(menuItem.getIsDeleted())) {
            throw new BadRequestException("Món ăn '" + menuItem.getName() + "' đã bị xóa khỏi thực đơn");
        }

        if (menuItem.getStatus() != MenuItemStatus.AVAILABLE) {
            throw new BadRequestException("Món ăn '" + menuItem.getName() + "' hiện đã hết hàng (OUT_OF_STOCK)");
        }

        // Kiểm tra xem món ăn với cùng ghi chú đã tồn tại trong đơn chưa
        Optional<OrderItemEntity> existingItemOpt = order.getItems().stream()
                .filter(item -> Objects.equals(item.getMenuItem().getId(), menuItem.getId()))
                .filter(item -> Objects.equals(item.getNote(), request.getNote()))
                .filter(item -> item.getStatus() == OrderItemStatus.PENDING)
                .findFirst();

        if (existingItemOpt.isPresent()) {
            OrderItemEntity existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            existingItem.setQuantity(newQuantity);
            existingItem.setSubtotal(existingItem.getPriceAtOrder().multiply(BigDecimal.valueOf(newQuantity)));
        } else {
            OrderItemEntity newItem = new OrderItemEntity();
            newItem.setMenuItem(menuItem);
            newItem.setItemName(menuItem.getName());
            newItem.setPriceAtOrder(menuItem.getPrice());
            newItem.setQuantity(request.getQuantity());
            newItem.setSubtotal(menuItem.getPrice().multiply(BigDecimal.valueOf(request.getQuantity())));
            newItem.setNote(request.getNote());
            newItem.setStatus(OrderItemStatus.PENDING);
            order.addItem(newItem);
        }

        recalculateOrderAmounts(order);
        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse updateOrderItem(Long orderId, Long itemId, UpdateOrderItemRequest request) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Không thể chỉnh sửa món của đơn hàng có trạng thái " + order.getStatus());
        }

        OrderItemEntity item = order.getItems().stream()
                .filter(i -> Objects.equals(i.getId(), itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dòng món với ID: " + itemId + " trong đơn hàng"));

        item.setQuantity(request.getQuantity());
        item.setSubtotal(item.getPriceAtOrder().multiply(BigDecimal.valueOf(request.getQuantity())));
        item.setNote(request.getNote());
        if (request.getStatus() != null) {
            item.setStatus(request.getStatus());
        }

        recalculateOrderAmounts(order);
        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse removeOrderItem(Long orderId, Long itemId) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Không thể xóa món của đơn hàng có trạng thái " + order.getStatus());
        }

        OrderItemEntity item = order.getItems().stream()
                .filter(i -> Objects.equals(i.getId(), itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dòng món với ID: " + itemId + " trong đơn hàng"));

        order.removeItem(item);
        recalculateOrderAmounts(order);
        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse applyDiscount(Long orderId, DiscountOrderRequest request) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Không thể áp dụng giảm giá cho đơn hàng có trạng thái " + order.getStatus());
        }

        if (request.getDiscountAmount().compareTo(order.getSubtotalAmount()) > 0) {
            throw new BadRequestException("Số tiền giảm giá (" + request.getDiscountAmount() + 
                    ") không được vượt quá tổng tiền món (" + order.getSubtotalAmount() + ")");
        }

        order.setDiscountAmount(request.getDiscountAmount());
        recalculateOrderAmounts(order);
        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse cancelOrder(Long orderId, CancelOrderRequest request) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng với ID: " + orderId));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new BadRequestException("Chỉ có thể hủy đơn hàng đang ở trạng thái PENDING");
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setCancelReason(request.getCancelReason());

        // Giải phóng bàn ăn nếu có
        if (order.getTable() != null) {
            DiningTableEntity table = order.getTable();
            table.setStatus(TableStatus.EMPTY);
            diningTableRepository.save(table);
        }

        OrderEntity saved = orderRepository.save(order);
        return mapToOrderResponse(saved);
    }

    private void recalculateOrderAmounts(OrderEntity order) {
        BigDecimal subtotal = order.getItems().stream()
                .filter(item -> item.getStatus() != OrderItemStatus.CANCELLED)
                .map(OrderItemEntity::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setSubtotalAmount(subtotal);
        BigDecimal discount = order.getDiscountAmount() != null ? order.getDiscountAmount() : BigDecimal.ZERO;
        BigDecimal finalAmount = subtotal.subtract(discount).max(BigDecimal.ZERO);
        order.setFinalAmount(finalAmount);
    }

    private String generateOrderCode() {
        String datePart = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        for (int i = 0; i < 10; i++) {
            int randomSeq = (int) (Math.random() * 9000) + 1000;
            String code = "ORD-" + datePart + "-" + randomSeq;
            if (!orderRepository.findByOrderCode(code).isPresent()) {
                return code;
            }
        }
        return "ORD-" + datePart + "-" + System.currentTimeMillis() % 10000;
    }

    private OrderResponse mapToOrderResponse(OrderEntity order) {
        var itemsResponse = order.getItems().stream()
                .map(item -> new OrderItemResponse(
                        item.getId(),
                        order.getId(),
                        item.getMenuItem() != null ? item.getMenuItem().getId() : null,
                        item.getItemName(),
                        item.getMenuItem() != null ? item.getMenuItem().getImageUrl() : null,
                        item.getPriceAtOrder(),
                        item.getQuantity(),
                        item.getSubtotal(),
                        item.getNote(),
                        item.getStatus(),
                        item.getCreatedAt()
                ))
                .collect(Collectors.toList());

        return new OrderResponse(
                order.getId(),
                order.getOrderCode(),
                order.getTable() != null ? order.getTable().getId() : null,
                order.getTable() != null ? order.getTable().getCode() : null,
                order.getTable() != null ? order.getTable().getName() : null,
                order.getOrderType(),
                order.getStatus(),
                order.getCreatedByUser() != null ? order.getCreatedByUser().getId() : null,
                order.getCreatedByUser() != null ? order.getCreatedByUser().getFullName() : null,
                order.getSubtotalAmount(),
                order.getDiscountAmount(),
                order.getFinalAmount(),
                order.getNote(),
                order.getCancelReason(),
                itemsResponse,
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}
