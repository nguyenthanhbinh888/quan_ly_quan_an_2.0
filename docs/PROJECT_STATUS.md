# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 11 — Kiểm Thử Tích Hợp Toàn Diện, Tối Ưu & Bảo Mật (E2E Testing & Hardening)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`.
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL (`docs/DATABASE.md`) và REST API (`docs/API.md`).
- [x] **Giai đoạn 3:** Khởi tạo Backend (Spring Boot 3.3.4) & Frontend (React TS Vite) skeleton.
- [x] **Giai đoạn 4:** Kết nối MySQL, Flyway migration và nền tảng Backend.
- [x] **Giai đoạn 5:** Xác thực và phân quyền (Spring Security & JWT, 10/10 tests passed).
- [x] **Giai đoạn 6:** Khung giao diện và tích hợp API nền tảng (Frontend Shell & Reusable components).
- [x] **Giai đoạn 7:** Quản lý danh mục và món ăn (Menu & Category Management, 16/16 backend tests passed).
- [x] **Giai đoạn 8:** Quản lý bàn ăn và gọi món (Tables & Orders Management, 22/22 backend tests passed).
- [x] **Giai đoạn 9:** Thanh toán và hóa đơn (Payments & Invoices, 28/28 backend tests passed).
- [x] **Giai đoạn 10:** Dashboard và báo cáo thống kê (Dashboard & Analytics Reports):
  - **Backend DTOs & Business Layer:**
    - `DashboardSummaryResponse`, `DailyRevenueResponse`, `TopSellingItemResponse`.
    - `PaymentRepository`: tính tổng doanh thu và đếm số hóa đơn trong ngày/chu kỳ.
    - `OrderItemRepository`: truy vấn Top món ăn bán chạy nhất (`findTopSellingItems`) nhóm theo món và sắp xếp theo doanh thu/số lượng.
    - `DiningTableRepository`: đếm số lượng bàn đang phục vụ (`OCCUPIED`) so với tổng số bàn để tính tỷ lệ lấp đầy (`occupancyRate`).
    - `DashboardService` & `DashboardServiceImpl`: thống kê tổng hợp hôm nay, phân tích doanh thu theo chu kỳ ngày (Hôm nay, 7 ngày, 30 ngày) và xếp hạng Top món bán chạy.
  - **REST API Controller:**
    - `DashboardController` (`/api/dashboard`):
      - `GET /api/dashboard/summary`: Trả về 4 KPI chính.
      - `GET /api/dashboard/revenue?startDate=...&endDate=...`: Trả về mảng doanh thu chi tiết theo từng ngày.
      - `GET /api/dashboard/top-items?limit=5`: Trả về danh sách Top món ăn bán chạy nhất.
  - **Backend Integration Tests:**
    - [DashboardReportingTest.java](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/DashboardReportingTest.java) gồm 5 kịch bản kiểm thử:
      1. Lấy chỉ số tổng quan KPI (doanh thu hôm nay, số đơn, AOV, bàn bận, công suất).
      2. Lấy phân tích doanh thu theo dải ngày chính xác.
      3. Lấy Top món ăn bán chạy.
      4. Chặn truy cập trái phép 401 Unauthorized khi không có token.
      5. Tạo đơn hàng mới, thanh toán tiền mặt và kiểm chứng doanh thu và số đơn trên Dashboard cập nhật tức thì.
    - Tổng 33/33 backend tests **PASS** (`BUILD SUCCESS`).
  - **Frontend UI & Visualizations:**
    - Types [dashboard.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/dashboard.ts) & Service [dashboardService.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/dashboardService.ts).
    - Màn hình [DashboardPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/DashboardPage.tsx):
      - 4 thẻ KPI nổi bật: Doanh thu hôm nay (₫), Hóa đơn hoàn tất, Giá trị trung bình/đơn (AOV), Hiệu suất phục vụ bàn (kèm thanh phần trăm occupancy rate).
      - Biểu đồ cột CSS thuần (CSS Bar Chart) trực quan với hiệu ứng hover tooltip, hỗ trợ bộ lọc nhanh (Hôm nay, 7 ngày, 30 ngày) và thẻ thống kê tổng quan chu kỳ (Tổng doanh thu, Tổng đơn, TB/ngày).
      - Bảng xếp hạng Top 5 món ăn bán chạy nhất (Huy chương 🥇🥈🥉, tên món, danh mục, số lượng phần bán và doanh thu đóng góp).
      - Phím tắt điều hướng nhanh (Launchpad Shortcuts) tới POS, Quản lý Thực đơn, và Lịch sử Hóa đơn.
    - Cập nhật định tuyến `App.tsx` trỏ `/` và `/reports` sang `DashboardPage`.
  - **Frontend Build Test:** `npm.cmd run build` -> **PASS (0 lỗi TypeScript, đóng gói trong 1.05s)**.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (33/33 tests passed, 0 failures, 0 errors)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Nghiệm thu hoàn tất Giai đoạn 10.
- Xác nhận kế hoạch triển khai **Giai đoạn 11 — Kiểm thử tích hợp toàn diện & Hoàn thiện hệ thống (E2E Integration Testing & System Hardening)**.

## Next step
Triển khai **Giai đoạn 11 — Kiểm thử tích hợp toàn diện & Hoàn thiện hệ thống**:
1. Kiểm tra luồng nghiệp vụ khép kín từ đầu đến cuối (E2E Flow): Đăng nhập -> Kiểm tra bàn trống -> Mở bàn tạo đơn -> Thêm món & cập nhật số lượng -> Tính tiền & in hóa đơn -> Giải phóng bàn -> Kiểm tra cập nhật trên Dashboard và Lịch sử hóa đơn.
2. Kiểm tra các trường hợp ngoại lệ (Edge cases): Mở bàn đã có khách, hủy đơn có món, thanh toán đơn đã thanh toán/đã hủy, nhập tiền thiếu, hết món trong ca trực.
3. Rà soát bảo mật & phân quyền (Role checks: ADMIN vs STAFF).
4. Tối ưu hiệu năng và dọn dẹp mã nguồn trước khi sang Giai đoạn 12 (Đóng gói & Triển khai).

