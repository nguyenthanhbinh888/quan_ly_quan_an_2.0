package com.restaurant.service.impl;

import com.restaurant.dto.request.CategoryRequest;
import com.restaurant.dto.response.CategoryResponse;
import com.restaurant.entity.CategoryEntity;
import com.restaurant.exception.ConflictException;
import com.restaurant.exception.ResourceNotFoundException;
import com.restaurant.repository.CategoryRepository;
import com.restaurant.repository.MenuItemRepository;
import com.restaurant.service.CategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, MenuItemRepository menuItemRepository) {
        this.categoryRepository = categoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories(boolean onlyActive) {
        List<CategoryEntity> categories = onlyActive
                ? categoryRepository.findByActiveTrueAndIsDeletedFalseOrderByDisplayOrderAsc()
                : categoryRepository.findByIsDeletedFalseOrderByDisplayOrderAsc();

        return categories.stream()
                .map(cat -> {
                    long count = menuItemRepository.countByCategoryIdAndIsDeletedFalse(cat.getId());
                    return CategoryResponse.fromEntity(cat, count);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        CategoryEntity entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + id));
        if (Boolean.TRUE.equals(entity.getIsDeleted())) {
            throw new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + id);
        }
        long count = menuItemRepository.countByCategoryIdAndIsDeletedFalse(entity.getId());
        return CategoryResponse.fromEntity(entity, count);
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByNameAndIsDeletedFalse(request.getName().trim())) {
            throw new ConflictException("Tên danh mục '" + request.getName().trim() + "' đã tồn tại");
        }

        CategoryEntity entity = new CategoryEntity();
        entity.setName(request.getName().trim());
        entity.setDescription(request.getDescription());
        entity.setDisplayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0);
        entity.setActive(request.getActive() != null ? request.getActive() : true);
        entity.setIsDeleted(false);

        CategoryEntity saved = categoryRepository.save(entity);
        return CategoryResponse.fromEntity(saved, 0);
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        CategoryEntity entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + id));

        if (Boolean.TRUE.equals(entity.getIsDeleted())) {
            throw new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + id);
        }

        String newName = request.getName().trim();
        if (!entity.getName().equalsIgnoreCase(newName) && categoryRepository.existsByNameAndIsDeletedFalse(newName)) {
            throw new ConflictException("Tên danh mục '" + newName + "' đã tồn tại");
        }

        entity.setName(newName);
        entity.setDescription(request.getDescription());
        if (request.getDisplayOrder() != null) {
            entity.setDisplayOrder(request.getDisplayOrder());
        }
        if (request.getActive() != null) {
            entity.setActive(request.getActive());
        }

        CategoryEntity updated = categoryRepository.save(entity);
        long count = menuItemRepository.countByCategoryIdAndIsDeletedFalse(updated.getId());
        return CategoryResponse.fromEntity(updated, count);
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        CategoryEntity entity = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy danh mục có ID = " + id));

        if (menuItemRepository.existsByCategoryIdAndIsDeletedFalse(id)) {
            throw new ConflictException("Không thể xóa danh mục đang có món ăn. Vui lòng chuyển hoặc xóa các món ăn trước.");
        }

        // Xóa mềm danh mục: đánh dấu isDeleted = true, active = false
        // Đổi tên kèm hậu tố để giải phóng tên danh mục cho lần tạo mới sau này nếu cần
        entity.setIsDeleted(true);
        entity.setActive(false);
        entity.setName(entity.getName() + " [DELETED_" + System.currentTimeMillis() + "]");
        categoryRepository.save(entity);
    }
}
