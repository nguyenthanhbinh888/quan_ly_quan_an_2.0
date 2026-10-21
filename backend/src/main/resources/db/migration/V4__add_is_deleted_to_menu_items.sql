-- =========================================================================
-- Migration V4: Thêm trường is_deleted hỗ trợ Xóa mềm (Soft Delete) cho món ăn
-- Giúp món ăn biến mất hoàn toàn khỏi thực đơn và POS khi bấm xóa,
-- đồng thời bảo toàn dữ liệu lịch sử cho các hóa đơn và báo cáo doanh thu.
-- =========================================================================

ALTER TABLE menu_items ADD COLUMN is_deleted BOOLEAN NOT NULL DEFAULT FALSE;
CREATE INDEX idx_menu_items_is_deleted ON menu_items (is_deleted);
