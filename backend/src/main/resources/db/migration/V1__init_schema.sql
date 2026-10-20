-- ====================================================================
-- V1__init_schema.sql: Khởi tạo cấu trúc bảng cho Quản Lý Quán Ăn
-- ====================================================================

-- 1. Bảng users (Tài khoản người dùng & phân quyền)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'STAFF',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng categories (Danh mục món ăn)
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255) NULL,
    display_order INT NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Bảng menu_items (Món ăn / Đồ uống)
CREATE TABLE IF NOT EXISTS menu_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT NULL,
    price DECIMAL(12, 2) NOT NULL,
    image_url VARCHAR(500) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'AVAILABLE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_menu_items_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
    INDEX idx_menu_items_category (category_id),
    INDEX idx_menu_items_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng dining_tables (Bàn ăn)
CREATE TABLE IF NOT EXISTS dining_tables (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL DEFAULT 4,
    status VARCHAR(20) NOT NULL DEFAULT 'EMPTY',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tables_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng orders (Đơn hàng)
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(30) NOT NULL UNIQUE,
    table_id BIGINT NULL,
    order_type VARCHAR(20) NOT NULL DEFAULT 'DINE_IN',
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_by_user_id BIGINT NOT NULL,
    subtotal_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    final_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    note VARCHAR(255) NULL,
    cancel_reason VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_table FOREIGN KEY (table_id) REFERENCES dining_tables (id) ON DELETE SET NULL,
    CONSTRAINT fk_orders_user FOREIGN KEY (created_by_user_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_orders_table_status (table_id, status),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng order_items (Chi tiết dòng món trong đơn)
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    menu_item_id BIGINT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    price_at_order DECIMAL(12, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    subtotal DECIMAL(12, 2) NOT NULL,
    note VARCHAR(255) NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_menu_item FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE RESTRICT,
    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bảng payments (Lịch sử thanh toán & hóa đơn)
CREATE TABLE IF NOT EXISTS payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    invoice_code VARCHAR(30) NOT NULL UNIQUE,
    payment_method VARCHAR(20) NOT NULL,
    amount_paid DECIMAL(12, 2) NOT NULL,
    payment_status VARCHAR(20) NOT NULL DEFAULT 'SUCCESS',
    processed_by_user_id BIGINT NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT,
    CONSTRAINT fk_payments_user FOREIGN KEY (processed_by_user_id) REFERENCES users (id) ON DELETE RESTRICT,
    INDEX idx_payments_paid_at (paid_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
