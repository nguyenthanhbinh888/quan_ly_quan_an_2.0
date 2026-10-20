# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 8 — Quản Lý Bàn Ăn và Gọi Món (Tables & Orders Management)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL, Flyway migration và nền tảng Backend.
- [x] **Giai đoạn 5:** Xác thực và phân quyền (Spring Security & JWT, 10/10 tests passed).
- [x] **Giai đoạn 6:** Khung giao diện và tích hợp API nền tảng (Frontend Shell & Reusable components).
- [x] **Giai đoạn 7:** Quản lý danh mục và món ăn (Menu & Category Management):
  - **Backend DTOs & Validation:** `CategoryRequest`, `CategoryResponse`, `MenuItemRequest`, `MenuItemResponse`, `UpdateMenuItemStatusRequest`.
  - **Business Services:** `CategoryService` & `CategoryServiceImpl`, `MenuItemService` & `MenuItemServiceImpl` kiểm tra trùng tên, bắt buộc giá không âm (`BigDecimal`), chặn xóa danh mục khi còn món ăn liên kết.
  - **REST Controllers & RBAC:** `CategoryController` (`/api/categories`), `MenuItemController` (`/api/menu-items`), cho phép xem tự do sau đăng nhập, thao tác ghi (thêm, sửa, xóa, đổi trạng thái) yêu cầu quyền `ROLE_ADMIN`.
  - **Database Migration:** `V3__seed_menu_items.sql` bổ sung 8 món ăn truyền thống phong phú phục vụ thử nghiệm.
  - **Backend Tests:** [MenuManagementTest.java](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/MenuManagementTest.java) kiểm thử 6 kịch bản gồm phân quyền, CRUD, validation tên trống, giá âm. Tổng 16/16 backend tests **PASS**.
  - **Frontend UI & Features:**
    - Types [menu.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/menu.ts) & Service [menuService.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/menuService.ts).
    - Màn hình [MenuPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/MenuPage.tsx) phong cách ẩm thực cao cấp: bộ lọc danh mục dạng pills có đếm số lượng, tìm kiếm tức thì theo tên, lọc trạng thái Còn món / Hết món, lưới thẻ món ăn hiển thị giá VND định dạng chuẩn.
    - Modal thêm/sửa món ăn, modal quản lý danh mục (thêm/xóa danh mục), modal xác nhận xóa món, nút gạt nhanh Còn món/Hết món (Availability Toggle).
    - Cập nhật định tuyến tự động trong `App.tsx` và styles trau chuốt trong `index.css`.
  - **Frontend Build Test:** `npm.cmd run build` -> **PASS (0 lỗi TypeScript)**.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (16/16 tests passed)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 7 để tiến hành triển khai **Giai đoạn 8 — Quản Lý Bàn Ăn và Gọi Món (Tables & Orders Management)**.

## Next step
Triển khai **Giai đoạn 8 — Quản Lý Bàn Ăn và Gọi Món**:
- Backend:
  - DTOs, Service, Controller cho Bàn ăn (`/api/tables`): danh sách bàn, lọc theo trạng thái (`EMPTY`, `OCCUPIED`, `RESERVED`), thêm/sửa/xóa bàn, đổi trạng thái.
  - DTOs, Service, Controller cho Đơn hàng (`/api/orders`): mở bàn/tạo đơn, thêm món vào đơn kèm snapshot giá (`price_at_order`), cập nhật số lượng/ghi chú món, hủy món, chuyển trạng thái đơn (`PENDING`, `PREPARING`, `SERVED`, `COMPLETED`, `CANCELLED`).
  - Viết Integration Test cho quy trình Đặt bàn -> Mở bàn -> Thêm món với snapshot giá -> Tính tổng tiền tự động trên Server.
- Frontend:
  - Màn hình Sơ đồ bàn ăn (Table Map / Grid): màu sắc trực quan theo trạng thái bàn (Trống, Đang dùng, Đã đặt), số ghế, tổng tiền tạm tính.
  - Màn hình / Modal Gọi món (POS Order): chọn bàn, tìm & chọn món từ thực đơn nhanh, tăng/giảm số lượng, thêm ghi chú (ít cay, không hành...), xem giỏ hàng tạm tính và gửi bếp/lưu đơn.
