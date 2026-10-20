# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 12 — Đóng Gói và Triển Khai Hosting (Packaging & Deployment)**

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
- [x] **Giai đoạn 10:** Dashboard và báo cáo thống kê (Dashboard & Analytics Reports, 33/33 backend tests passed).
- [x] **Giai đoạn 11:** Kiểm thử tích hợp toàn diện & Hoàn thiện hệ thống (E2E Integration Testing & System Hardening):
  - **Tài liệu kiểm thử:** Tạo mới [`docs/TEST_PLAN.md`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/docs/TEST_PLAN.md) bao gồm ma trận truy vết từ 6 Use Cases chính (`UC_01` -> `UC_06`) sang các phương thức kiểm thử cụ thể.
  - **Bộ kiểm thử E2E tích hợp tự động:**
    - [`RestaurantE2ETest.java`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/backend/src/test/java/com/restaurant/controller/RestaurantE2ETest.java) gồm 9 kịch bản kiểm thử:
      1. *Luồng khép kín trọn vẹn (Happy Path):* Admin tạo danh mục + món ăn -> Staff kiểm tra bàn `EMPTY` -> Mở bàn tạo đơn `PENDING` -> Bàn chuyển `OCCUPIED` -> Gọi món -> Cập nhật số lượng -> Xem trước tính tiền (`subtotalAmount`, `finalAmount`) -> Thanh toán tiền mặt (tính tiền thối `changeAmount`) -> Bàn tự động giải phóng về `EMPTY` -> Tra cứu hóa đơn theo mã `INV-...` -> Dashboard cập nhật tức thì doanh thu và số hóa đơn.
      2. *Luồng Hủy đơn hàng:* Mở bàn -> Hủy đơn có lý do -> Bàn tự động giải phóng về `EMPTY`.
      3. *Luồng Thanh toán chuyển khoản QR:* Thanh toán qua phương thức `BANK_TRANSFER`, giải phóng bàn và sinh hóa đơn.
      4. *Chặn thanh toán trùng lặp (Concurrency & Idempotency):* Đơn đã thanh toán cố tình gửi thanh toán lại bị từ chối với lỗi `409 Conflict`.
      5. *Chặn thanh toán thiếu tiền:* Khách đưa số tiền nhỏ hơn `finalAmount` bị từ chối với lỗi `400 Bad Request`.
      6. *Chặn gọi món hết hàng:* Món ăn ở trạng thái `OUT_OF_STOCK` bị chặn khi thêm vào đơn (trả về lỗi `400 Bad Request`).
      7. *Phân quyền RBAC:* Tài khoản nhân viên (`STAFF`) cố tình gọi API tạo món ăn bị từ chối với lỗi `403 Forbidden`.
      8. *Bảo vệ API xác thực:* Truy cập các endpoint nghiệp vụ khi chưa đăng nhập bị từ chối với lỗi `401 Unauthorized`.
      9. *Endpoint công khai:* `/api/health` truy cập bình thường không cần token (trả về `200 OK`).
    - Tổng cộng: **42/42 backend tests PASS (0 failures, 0 errors)**.
  - **Frontend Verification:**
    - `npm.cmd run build` -> **PASS (0 lỗi TypeScript, đóng gói thành công trong 674ms)**.
  - **Rà soát an ninh & Hoàn thiện:**
    - Toàn bộ mật khẩu băm BCrypt, JWT Stateless Auth, tham số hóa JPQL chống SQL Injection, Transaction tài chính an toàn tự động Rollback nếu gặp lỗi, CORS bảo vệ domain Frontend.

## Tests and commands
- Backend tests: `mvn test` trong `backend/` -> **PASS (42/42 tests passed, 0 failures, 0 errors)**.
- Frontend build: `npm.cmd run build` trong `frontend/` -> **PASS (tsc & vite build thành công)**.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Nghiệm thu hoàn tất Giai đoạn 11.
- Duyệt phương án triển khai để tiến hành **Giai đoạn 12 — Đóng gói và Triển khai Hosting (Packaging & Deployment)**.

## Next step
Triển khai **Giai đoạn 12 — Đóng gói và Triển khai Hosting**:
1. Đóng gói Backend thành file JAR thực thi: `mvn clean package -DskipTests` -> Sinh file `restaurant-backend-0.0.1-SNAPSHOT.jar`.
2. Tạo `Dockerfile` đa tầng (multi-stage build) cho Backend (Eclipse Temurin 21 JRE).
3. Tạo `Dockerfile` và cấu hình Nginx cho Frontend React (phục vụ static build + reverse proxy `/api` tới backend).
4. Tạo file điều phối `docker-compose.yml` liên kết cả 3 dịch vụ (MySQL 8.0, Backend Spring Boot, Frontend Nginx).
5. Soạn thảo tài liệu hướng dẫn triển khai chi tiết `docs/DEPLOYMENT.md`.

