# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 6 — Khung Giao Diện và Tích Hợp API Nền Tảng (Frontend Shell)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL, Flyway migration và nền tảng Backend.
- [x] **Giai đoạn 5:** Xác thực và phân quyền (Spring Security & JWT, 10/10 tests passed).
- [x] **Giai đoạn 6:** Khung giao diện và tích hợp API nền tảng:
  - **Type contracts:** [api.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/api.ts) (`ApiResponse<T>`, `ApiErrorResponse`, `User`, `LoginResponse`).
  - **Centralized API Client:** [apiClient.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/apiClient.ts) tự động đính kèm `Bearer token`, bắt timeout, xử lý mã lỗi 401 tự động logout, chuẩn hóa `ApiError`.
  - **Auth State Management:** [AuthContext.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/context/AuthContext.tsx) lưu trữ token, phục hồi phiên làm việc qua `GET /api/auth/me`.
  - **Routing & Navigation:** [RouterContext.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/context/RouterContext.tsx) hỗ trợ điều hướng mượt mà, đồng bộ hash URL và Route Guard.
  - **Reusable Components:** `Button`, `Badge`, `Modal`, `LoadingSpinner`, `EmptyState`.
  - **Main Layout:** [MainLayout.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/layouts/MainLayout.tsx) gồm Top Header (avatar, tên, vai trò ADMIN/STAFF, nút Đăng xuất), Sidebar phân quyền, Drawer responsive trên mobile/tablet.
  - **Màn hình giao diện:**
    - [LoginPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/LoginPage.tsx): Form đăng nhập chuẩn, xử lý lỗi API, nút thử nhanh với Admin / Staff.
    - [DashboardPlaceholder.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/DashboardPlaceholder.tsx): Thẻ chỉ số vận hành, nút kiểm tra ping Backend trực tiếp.
    - `PosPlaceholder.tsx`, `MenuPlaceholder.tsx`, `OrdersPlaceholder.tsx`, `NotFoundPage.tsx`.
  - **Frontend Build Test:** `npm.cmd run build` -> **PASS (0 lỗi TypeScript, đóng gói hoàn tất trong 607ms)**.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (10/10 tests passed)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 6 để chuyển sang **Giai đoạn 7 — Quản lý danh mục và món ăn (CRUD Menu & Categories)**.

## Next step
Chuyển sang **Giai đoạn 7 — Quản lý danh mục và món ăn**:
- Backend: Xây dựng Service, Controller cho `/api/categories` và `/api/menu-items` (CRUD, validation tên, giá không âm, lọc theo danh mục, trạng thái còn/hết món, phân quyền `ROLE_ADMIN`).
- Frontend: Xây dựng giao diện Danh sách món ăn trực quan, bộ lọc danh mục, tìm kiếm, modal form thêm/sửa món ăn, bật/tắt còn/hết món.
- Viết integration test cho CRUD món ăn và danh mục.
