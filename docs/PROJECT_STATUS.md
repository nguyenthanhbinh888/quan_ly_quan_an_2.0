# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 10 — Báo Cáo và Thống Kê Doanh Thu (Dashboard & Reports)**

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
- [x] **Giai đoạn 9:** Thanh toán và hóa đơn (Payments & Invoices):
  - **Backend DTOs & Validation:** `PaymentRequest`, `PaymentResponse`, `PaymentPreviewResponse`.
  - **Business Services:** `PaymentService` & `PaymentServiceImpl`:
    - API xem trước thanh toán (`/api/payments/preview/{orderId}`) bảo đảm tính toán chính xác số tiền cần thu.
    - Quy trình xác nhận thanh toán chạy trong 1 Transaction `@Transactional` duy nhất: Kiểm tra trạng thái đơn phải là `PENDING`, xác minh số tiền đưa vào (`amountPaid >= finalAmount`), sinh mã số hóa đơn tự động `INV-yyyyMMdd-XXXX`, cập nhật trạng thái đơn hàng sang `PAID`, và tự động giải phóng bàn ăn về trạng thái `EMPTY`.
    - Chặn thanh toán trùng lặp (trả về lỗi `409 Conflict`), chặn thanh toán đơn rỗng hoặc đơn đã hủy (trả về `400 Bad Request`).
    - Lưu trữ đầy đủ lịch sử hóa đơn: số tiền thực thu, tiền thối lại (`changeAmount`), phương thức thanh toán (`CASH` / `BANK_TRANSFER`), thời gian thanh toán và thu ngân thực hiện.
  - **REST Controllers:** `PaymentController` (`/api/payments`): `preview`, thanh toán, tra cứu hóa đơn theo đơn hàng hoặc mã hóa đơn, danh sách lịch sử hóa đơn kèm phân trang và lọc theo ngày.
  - **Backend Integration Tests:** [PaymentManagementTest.java](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/PaymentManagementTest.java) gồm 6 kịch bản kiểm thử: Thanh toán tiền mặt + giải phóng bàn, thanh toán chuyển khoản, chặn thanh toán lặp 409, chặn trả thiếu tiền 400, chặn thanh toán đơn hủy 400, tra cứu biên lai theo mã. Tổng 28/28 backend tests **PASS**.
  - **Frontend UI & Features:**
    - Types [payment.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/types/payment.ts) & Service [paymentService.ts](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/services/paymentService.ts).
    - Tích hợp luồng thanh toán trực tiếp ngay trong [PosPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/PosPage.tsx):
      - Nút "💳 Thanh toán" tiện lợi trên giỏ món đơn hàng.
      - Modal thanh toán hỗ trợ 2 hình thức: **Tiền mặt** (nhập tiền khách đưa, phím bấm nhanh mệnh giá 50k, 100k, 200k, 500k, tự động tính tiền thối) hoặc **Chuyển khoản QR** (mô phỏng quét mã VietQR kèm số tài khoản và cú pháp chuyển khoản).
      - Modal biên lai thanh toán thành công (Receipt Modal) với nút xem và in hóa đơn `🖨 In hóa đơn`. Bàn ăn trên sơ đồ tự động đổi ngay sang màu xanh `EMPTY`.
    - Màn hình [OrdersPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/OrdersPage.tsx) quản lý lịch sử hóa đơn:
      - Bảng danh sách hóa đơn chuyên nghiệp: mã hóa đơn, mã đơn, bàn ăn, thời gian, hình thức thanh toán, thu ngân, tổng tiền.
      - Bộ lọc theo ngày linh hoạt (Hôm nay, Từ ngày -> Đến ngày) và phân trang.
      - Modal xem lại biên lai chi tiết của bất kỳ hóa đơn nào trong quá khứ.
    - Cập nhật định tuyến `App.tsx` cho `/orders` trỏ tới `OrdersPage`.
  - **Frontend Build Test:** `npm.cmd run build` -> **PASS (0 lỗi TypeScript, đóng gói hoàn tất trong 660ms)**.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (28/28 tests passed)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 9 để tiến hành triển khai **Giai đoạn 10 — Dashboard và Báo Cáo Doanh Thu (Dashboard & Reports)**.

## Next step
Triển khai **Giai đoạn 10 — Dashboard và Báo Cáo Doanh Thu**:
- Backend:
  - Repository & Service tính toán các chỉ số kinh doanh thực tế từ CSDL:
    - Doanh thu hôm nay, tổng số hóa đơn hôm nay, số bàn đang phục vụ.
    - Doanh thu theo khoảng thời gian (7 ngày qua, tháng này).
    - Top món ăn bán chạy nhất (Top Selling Dishes).
  - Controller `/api/dashboard/stats` và `/api/dashboard/top-items`.
  - Viết Integration Test kiểm tra tính toán chỉ số thống kê từ dữ liệu đơn hàng và hóa đơn thật.
- Frontend:
  - Hoàn thiện trang [DashboardPage.tsx](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/pages/DashboardPage.tsx) thay thế `DashboardPlaceholder.tsx`:
    - 4 thẻ KPI nổi bật: Doanh thu hôm nay, Số hóa đơn đã thu, Số bàn đang có khách, Tỷ lệ lấp đầy bàn.
    - Biểu đồ / Bảng phân tích doanh thu các ngày gần nhất.
    - Danh sách Top 5 món ăn được gọi nhiều nhất kèm doanh số.
    - Danh sách các hóa đơn thanh toán gần nhất (Recent Transactions).
