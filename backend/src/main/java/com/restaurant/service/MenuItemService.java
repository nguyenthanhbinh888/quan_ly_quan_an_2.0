package com.restaurant.service;

import com.restaurant.dto.request.MenuItemRequest;
import com.restaurant.dto.response.MenuItemResponse;
import com.restaurant.enums.MenuItemStatus;

import java.util.List;

public interface MenuItemService {
    List<MenuItemResponse> getMenuItems(Long categoryId, MenuItemStatus status, String keyword);
    MenuItemResponse getMenuItemById(Long id);
    MenuItemResponse createMenuItem(MenuItemRequest request);
    MenuItemResponse updateMenuItem(Long id, MenuItemRequest request);
    MenuItemResponse updateMenuItemStatus(Long id, MenuItemStatus status);
    void deleteMenuItem(Long id);
}
