# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 9 — Thanh Toán và Hóa Đơn (Payments & Invoices)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL, Flyway migration và nền tảng Backend.
- [x] **Giai đoạn 5:** Xác thực và phân quyền (Spring Security & JWT, 10/10 tests passed).
- [x] **Giai đoạn 6:** Khung giao diện và tích hợp API nền tảng (Frontend Shell & Reusable components).
- [x] **Giai đoạn 7:** Quản lý danh mục và món ăn (Menu & Category Management, 16/16 backend tests passed).
- [x] **Giai đoạn 8:** Quản lý bàn ăn và gọi món (Tables & Orders Management):
  - **Backend DTOs & Validation:** `DiningTableRequest`, `DiningTableResponse`, `CreateOrderRequest`, `AddOrderItemRequest`, `UpdateOrderItemRequest`, `DiscountOrderRequest`, `CancelOrderRequest`, `OrderItemResponse`, `OrderResponse`.
  - **Business Services:** `DiningTableService` & `DiningTableServiceImpl`, `OrderService` & `OrderServiceImpl`.
    - Tự động sinh mã đơn hàng chuẩn quy cách `ORD-yyyyMMdd-XXXX`.
    - Bắt buộc kiểm tra trạng thái bàn và tính khả dụng của món (`AVAILABLE` vs `OUT_OF_STOCK`).
    - **Snapshot Pricing Integrity:** Lưu tên món (`item_name`) và đơn giá tại thời điểm gọi món (`price_at_order`), không bị ảnh hưởng khi giá menu thay đổi sau này.
    - **Server Single Source of Truth:** Tự động tính toán tổng tiền tạm tính (`subtotalAmount`), chiết khấu (`discountAmount`) và tổng thực thu (`finalAmount`) hoàn toàn trên Server.
    - Hủy đơn an toàn (`POST /api/orders/{id}/cancel`) kèm lý do hủy bắt buộc và tự động giải phóng bàn về `EMPTY`.
  - **REST Controllers & Security:** `DiningTableController` (`/api/tables`), `OrderController` (`/api/orders`), phân quyền chặt chẽ (Admin sửa/xóa bàn, Staff mở đơn/gọi món).
  - **Backend Integration Tests:** [TableAndOrderManagementTest.java](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/TableAndOrderManagementTest.java) gồm 6 kịch bản kiểm thử toàn diện: RBAC phân quyền tạo bàn, mở bàn -> OCCUPIED, chặn tạo đơn trùng lặp, snapshot giá & tính tiền Server, từ chối món hết hàng, hủy đơn giải phóng bàn. Tổng 22/22 backend tests **PASS**.
  - **Frontend UI & Features:**
    - Types [table.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/table.ts), [order.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/order.ts) & Services [tableService.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/tableService.ts), [orderService.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/orderService.ts).
    - Màn hình [PosPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/PosPage.tsx) thiết kế hiện đại:
      - Thanh thống kê nhanh (Tổng bàn, Bàn trống, Đang phục vụ, Đã đặt).
      - Bộ lọc trạng thái bàn nhanh dạng tabs/pills.
      - Lưới sơ đồ bàn trực quan (Table Cards) hiển thị màu nhận diện trạng thái, số ghế, mã đơn và tổng tiền tạm tính.
      - Bảng POS Gọi món (Order & Menu Split Interface): Cột trái chọn món nhanh theo danh mục và tìm kiếm; Cột phải giỏ món đơn hàng với nút điều chỉnh số lượng `+/-`, nhập ghi chú món, nút xóa món, xem tổng tiền do Server tính, nút áp dụng giảm giá và nút hủy đơn kèm modal lý do.
      - Modal thêm/sửa bàn ăn cho Admin.
    - Tích hợp định tuyến tại `App.tsx` và bổ sung styles `.table-card`, `.btn-warning` trong `index.css`.
  - **Frontend Build Test:** `npm.cmd run build` -> **PASS (0 lỗi TypeScript, build thành công)**.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (22/22 tests passed)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 8 để tiến hành triển khai **Giai đoạn 9 — Thanh Toán và Hóa Đơn (Payments & Invoices)**.

## Next step
Triển khai **Giai đoạn 9 — Thanh Toán và Hóa Đơn**:
- Backend:
  - DTOs, Service, Controller cho Thanh toán (`/api/payments`): Xem trước thanh toán (`preview`), xác nhận thanh toán (`CASH`, `BANK_TRANSFER`), sinh mã hóa đơn duy nhất `INV-yyyyMMdd-XXXX`, cập nhật trạng thái đơn sang `PAID` và giải phóng bàn về `EMPTY` trong cùng một Transaction `@Transactional`.
  - Ngăn chặn thanh toán lặp hoặc thanh toán đơn đã đóng/hủy.
  - Lấy lịch sử hóa đơn thanh toán kèm thông tin nhân viên thu ngân.
  - Viết Integration Test cho luồng thanh toán và xuất hóa đơn.
- Frontend:
  - Modal / Màn hình Thanh toán đơn hàng: chọn phương thức thanh toán (Tiền mặt, Chuyển khoản QR), nhập tiền khách đưa, tự động tính tiền thừa trả khách.
  - Màn hình / Modal xem & in hóa đơn thanh toán chuẩn mực, chuyên nghiệp cho quán ăn.
  - Cập nhật trang Lịch sử hóa đơn (`OrdersPlaceholder` -> `OrdersPage` / `InvoicesPage`).
