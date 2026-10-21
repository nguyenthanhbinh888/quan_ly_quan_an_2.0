-- =========================================================================
-- Migration V5: Thêm trường is_deleted hỗ trợ Xóa mềm (Soft Delete) cho danh mục
-- =========================================================================

ALTER TABLE categories ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
CREATE INDEX idx_categories_is_deleted ON categories (is_deleted);
