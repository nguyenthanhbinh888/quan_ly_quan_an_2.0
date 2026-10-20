-- ====================================================================
-- V2__seed_initial_data.sql: Khởi tạo dữ liệu mẫu cho Quán Ăn
-- ====================================================================

-- 1. Dữ liệu danh mục món ăn
INSERT INTO categories (name, description, display_order, active) VALUES
('Món Khai Vị', 'Salad, súp và các món ăn nhẹ trước bữa chính', 1, TRUE),
('Món Chính', 'Các món lẩu, nướng, cơm và mì đặc sản', 2, TRUE),
('Đồ Uống', 'Bia, nước ngọt, trà và nước ép hoa quả', 3, TRUE),
('Tráng Miệng', 'Chè, hoa quả tươi và kem mát lạnh', 4, TRUE)
ON DUPLICATE KEY UPDATE name=name;

-- 2. Dữ liệu bàn ăn mẫu (10 bàn)
INSERT INTO dining_tables (code, name, capacity, status) VALUES
('B01', 'Bàn 01 (Tầng 1)', 4, 'EMPTY'),
('B02', 'Bàn 02 (Tầng 1)', 4, 'EMPTY'),
('B03', 'Bàn 03 (Tầng 1)', 6, 'EMPTY'),
('B04', 'Bàn 04 (Tầng 1)', 6, 'EMPTY'),
('B05', 'Bàn 05 (Tầng 1)', 2, 'EMPTY'),
('B06', 'Bàn 06 (Tầng 2)', 4, 'EMPTY'),
('B07', 'Bàn 07 (Tầng 2)', 4, 'EMPTY'),
('B08', 'Bàn 08 (Tầng 2)', 8, 'EMPTY'),
('B09', 'Bàn 09 (Tầng 2)', 10, 'EMPTY'),
('VIP01', 'Phòng VIP 01', 12, 'EMPTY')
ON DUPLICATE KEY UPDATE code=code;

-- 3. Tài khoản quản trị ban đầu (mật khẩu băm BCrypt của "Admin123@")
INSERT INTO users (username, password_hash, full_name, phone, role, status) VALUES
('admin', '$2a$10$WdZfXy7WqK43sLz11t2gK.472wKq0g4VbUcb/gJ37f1XmE0k4LpQe', 'Quản Trị Viên', '0901234567', 'ADMIN', 'ACTIVE'),
('staff01', '$2a$10$WdZfXy7WqK43sLz11t2gK.472wKq0g4VbUcb/gJ37f1XmE0k4LpQe', 'Nhân Viên Phục Vụ 1', '0908765432', 'STAFF', 'ACTIVE')
ON DUPLICATE KEY UPDATE username=username;
