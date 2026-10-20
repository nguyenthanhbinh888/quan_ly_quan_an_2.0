# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 5 — Đăng nhập, Xác thực và Phân quyền (Spring Security & JWT)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL, Flyway migration và nền tảng Backend.
- [x] **Giai đoạn 5:** Xác thực và phân quyền bằng Spring Security:
  - Tích hợp Spring Security 6 & thư viện JWT (JJWT 0.12.6).
  - Thuật toán mã hóa mật khẩu `BCryptPasswordEncoder` (độ dài an toàn, không lưu mật khẩu thuần).
  - Cơ chế tạo và xác thực Token JWT Stateless (`JwtTokenProvider`, `JwtAuthenticationFilter`).
  - Xử lý lỗi bảo mật tập trung: `JwtAuthenticationEntryPoint` (401 Unauthorized JSON) và `CustomAccessDeniedHandler` (403 Forbidden JSON).
  - Tạo Controller và DTO:
    - `POST /api/auth/login`: Xác thực username, password, kiểm tra trạng thái tài khoản `ACTIVE`, trả về JWT token và thông tin người dùng (`LoginResponse`).
    - `GET /api/auth/me`: Lấy thông tin tài khoản hiện tại từ token `Bearer`.
  - Cấu hình CORS cho phép React Frontend (`http://localhost:3000`).
  - Viết Integration Test [AuthControllerTest.java](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/AuthControllerTest.java) kiểm thử đầy đủ các kịch bản xác thực.

## Tests and commands
- Chạy toàn bộ kiểm thử: `mvn test` trong `backend/` -> **PASS (BUILD SUCCESS, 10/10 tests passed, 0 failures, 0 errors)**:
  - `AuthControllerTest.shouldLoginSuccessfullyWithAdmin`: Passed (200 OK + JWT Token)
  - `AuthControllerTest.shouldLoginSuccessfullyWithStaff`: Passed (200 OK + Role STAFF)
  - `AuthControllerTest.shouldFailLoginWithIncorrectPassword`: Passed (400 Bad Request)
  - `AuthControllerTest.shouldFailLoginWithNonExistentUser`: Passed (400 Bad Request)
  - `AuthControllerTest.shouldRejectMeWithoutToken`: Passed (401 Unauthorized)
  - `AuthControllerTest.shouldAccessMeWithValidToken`: Passed (200 OK)
  - `HealthCheckControllerTest.shouldReturnHealthStatusUp`: Passed
  - `DatabaseIntegrationTest.shouldFindSeededCategories`: Passed
  - `DatabaseIntegrationTest.shouldFindSeededTables`: Passed
  - `DatabaseIntegrationTest.shouldFindAdminUser`: Passed

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 5 để chuyển sang **Giai đoạn 6 — Khung giao diện và tích hợp API nền tảng**.

## Next step
Chuyển sang **Giai đoạn 6 — Khung giao diện và tích hợp API nền tảng (Frontend Shell)**:
- Xây dựng Layout quản trị chuyên nghiệp: Sidebar, Header (hiển thị thông tin người dùng, nút đăng xuất), Content Area.
- Tạo màn hình Đăng nhập (`LoginPage`) tích hợp gọi API `POST /api/auth/login`.
- Quản lý phiên đăng nhập (lưu token an toàn, Route Guard chuyển hướng người dùng khi chưa đăng nhập).
- Xây dựng `apiClient` tập trung tự động đính kèm `Authorization: Bearer <token>` vào request.
- Thiết kế responsive cho desktop, tablet và màn hình POS.
