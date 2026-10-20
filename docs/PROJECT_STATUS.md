# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 4 — Kết nối MySQL và Nền tảng Backend**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL và nền tảng Backend:
  - Tạo CSDL MySQL local: `restaurant_management` (`utf8mb4`).
  - Thiết lập Flyway Migration:
    - `V1__init_schema.sql`: Khởi tạo toàn bộ 7 bảng chuẩn (`users`, `categories`, `menu_items`, `dining_tables`, `orders`, `order_items`, `payments`).
    - `V2__seed_initial_data.sql`: Dữ liệu mẫu danh mục, 10 bàn ăn và tài khoản quản trị `admin`.
  - Thiết lập Hibernate an toàn: `ddl-auto: validate` (chặn tự ý thay đổi schema ngoài migration).
  - Chuẩn hóa lỗi API: Tạo `ApiErrorResponse`, các ngoại lệ tùy chỉnh (`ResourceNotFoundException`, `BadRequestException`, `ConflictException`) và `GlobalExceptionHandler`.
  - Tạo 7 JPA Entities và 7 Spring Data JPA Repositories.
  - Viết Integration Test `DatabaseIntegrationTest` kiểm tra Flyway migration và truy vấn dữ liệu từ MySQL thật.

## Tests and commands
- Kiểm tra MySQL service: `Get-Service -Name *mysql*` -> **PASS (MySQL80 Running)**.
- Tạo CSDL: `CREATE DATABASE restaurant_management` -> **PASS**.
- Backend integration test: `mvn test` trong `backend/` -> **PASS (BUILD SUCCESS, 4/4 tests passed, 0 failures, 0 errors)**:
  - `HealthCheckControllerTest.shouldReturnHealthStatusUp`: Passed
  - `DatabaseIntegrationTest.shouldFindSeededCategories`: Passed
  - `DatabaseIntegrationTest.shouldFindSeededTables`: Passed
  - `DatabaseIntegrationTest.shouldFindAdminUser`: Passed

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 4 để chuyển sang **Giai đoạn 5 — Đăng nhập, xác thực và phân quyền (Spring Security & JWT)**.

## Next step
Chuyển sang **Giai đoạn 5 — Đăng nhập, xác thực và phân quyền**:
- Cấu hình Spring Security với băm mật khẩu `BCrypt`.
- Tạo cơ chế JWT token (hoặc Session) an toàn.
- Xây dựng API `POST /api/auth/login` và `GET /api/auth/me`.
- Phân quyền các endpoint theo vai trò `ADMIN` và `STAFF`.
- Viết test kiểm tra đăng nhập đúng/sai và quyền truy cập API.
