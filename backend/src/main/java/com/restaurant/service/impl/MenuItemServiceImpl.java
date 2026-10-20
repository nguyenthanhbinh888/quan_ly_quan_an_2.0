package com.restaurant.service.impl;

import com.restaurant.dto.request.MenuItemRequest;
import com.restaurant.dto.response.MenuItemResponse;
import com.restaurant.entity.CategoryEntity;
import com.restaurant.entity.MenuItemEntity;
import com.restaurant.enums.MenuItemStatus;
import com.restaurant.exception.ConflictException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.CategoryRepository;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.repository.OrderItemRepository;
import com.restaurant.service.MenuItemService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuItemServiceImpl implements MenuItemService {

    private final MenuItemRepository menuItemRepository;
    private final CategoryRepository categoryRepository;
    private final OrderItemRepository orderItemRepository;

    public MenuItemServiceImpl(
            MenuItemRepository menuItemRepository,
            CategoryRepository categoryRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.menuItemRepository = menuItemRepository;
        this.categoryRepository = categoryRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<MenuItemResponse> getMenuItems(Long categoryId, MenuItemStatus status, String keyword) {
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        List<MenuItemEntity> items = menuItemRepository.searchMenuItems(categoryId, status, cleanKeyword);
        return items.stream()
                .map(MenuItemResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MenuItemResponse getMenuItemById(Long id) {
        MenuItemEntity entity = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy món ăn có ID = " + id));
        return MenuItemResponse.fromEntity(entity);
    }

    @Override
    @Transactional
    public MenuItemResponse createMenuItem(MenuItemRequest request) {
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + request.getCategoryId()));

        MenuItemEntity entity = new MenuItemEntity();
        entity.setCategory(category);
        entity.setName(request.getName().trim());
        entity.setDescription(request.getDescription());
        entity.setPrice(request.getPrice());
        entity.setImageUrl(request.getImageUrl());
        entity.setStatus(request.getStatus() != null ? request.getStatus() : MenuItemStatus.AVAILABLE);

        MenuItemEntity saved = menuItemRepository.save(entity);
        return MenuItemResponse.fromEntity(saved);
    }

    @Override
    @Transactional
    public MenuItemResponse updateMenuItem(Long id, MenuItemRequest request) {
        MenuItemEntity entity = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy món ăn có ID = " + id));

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + request.getCategoryId()));

        entity.setCategory(category);
        entity.setName(request.getName().trim());
        entity.setDescription(request.getDescription());
        entity.setPrice(request.getPrice());
        entity.setImageUrl(request.getImageUrl());
        if (request.getStatus() != null) {
            entity.setStatus(request.getStatus());
        }

        MenuItemEntity updated = menuItemRepository.save(entity);
        return MenuItemResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public MenuItemResponse updateMenuItemStatus(Long id, MenuItemStatus status) {
        MenuItemEntity entity = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy món ăn có ID = " + id));

        entity.setStatus(status);
        MenuItemEntity updated = menuItemRepository.save(entity);
        return MenuItemResponse.fromEntity(updated);
    }

    @Override
    @Transactional
    public void deleteMenuItem(Long id) {
        MenuItemEntity entity = menuItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy món ăn có ID = " + id));

        if (orderItemRepository.existsByMenuItemId(id)) {
            throw new ConflictException("Không thể xóa món ăn đã từng được gọi trong đơn hàng. Bạn có thể chuyển sang trạng thái Hết món để ngừng bán.");
        }

        menuItemRepository.delete(entity);
    }
}
