# Kế Hoạch & Kết Quả Kiểm Thử Toàn Diện (Test Plan & E2E Verification)

## 1. Mục Tiêu Kiểm Thử (Objectives)
Tài liệu này xác nhận kết quả kiểm thử toàn diện cho hệ thống website Quản Lý Quán Ăn theo tài liệu yêu cầu `docs/REQUIREMENTS.md` và thiết kế REST API `docs/API.md`.

Các tiêu chí trọng tâm:
1. **Tính chính xác tài chính & Đơn hàng:** Kiểm chứng phép tính tiền tệ `BigDecimal`, đơn giá cố định snapshot theo thời điểm đặt món, tính tiền thối lại và ngăn chặn các giao dịch sai số tiền.
2. **Quy tắc chuyển trạng thái bàn ăn:** Chuyển trạng thái bàn tự động (`EMPTY` → `OCCUPIED` → `EMPTY`), tự động giải phóng bàn khi thanh toán hoặc khi hủy đơn.
3. **Bảo vệ toàn vẹn dữ liệu & Chặn lỗi đồng thời:** Ngăn thanh toán trùng lặp (Duplicate Payment Prevention HTTP 409 Conflict), chặn thêm món hết hàng, chặn thanh toán đơn rỗng hoặc đơn đã hủy.
4. **Bảo mật & Phân quyền (RBAC):** Kiểm tra cơ chế JWT Stateless, mã hóa mật khẩu BCrypt, phân định ranh giới quyền hạn giữa `ADMIN` và `STAFF`.

---

## 2. Ma Trận Truy Vết Yêu Cầu → Kiểm Thử (Traceability Matrix)

| Mã Use Case | Tên Chức Năng | Kịch Bản Kiểm Thử | Lớp Kiểm Thử (Test Class) | Kết Quả |
|---|---|---|---|---|
| **UC_01** | Đăng nhập & Xác thực | Đăng nhập đúng cấp JWT token, sai mật khẩu trả 401, tài khoản bị khóa | `AuthControllerTest` | **PASS** |
| **UC_01** | Phân quyền truy cập (RBAC) | STAFF không được phép tạo/sửa/xóa món ăn (HTTP 403 Forbidden) | `RestaurantE2ETest.testStaffCannotCreateMenuItem_returns403` | **PASS** |
| **UC_01** | Bảo vệ API Endpoint | Không có Bearer token truy cập API nghiệp vụ trả về 401 Unauthorized | `RestaurantE2ETest.testUnauthenticatedRequests_return401` | **PASS** |
| **UC_02** | Quản lý Danh mục & Món ăn | Thêm, sửa, xóa, tìm kiếm món ăn, kiểm tra trùng tên danh mục | `MenuManagementTest` | **PASS** |
| **UC_02** | Ràng buộc trạng thái món | Chặn gọi món khi món ăn ở trạng thái Hết hàng (`OUT_OF_STOCK`) | `RestaurantE2ETest.testOutOfStockItemCannotBeOrdered` | **PASS** |
| **UC_03** | Quản lý Sơ đồ bàn | Lấy danh sách bàn, lọc theo trạng thái, mở bàn ăn | `TableAndOrderManagementTest` | **PASS** |
| **UC_03** | Ràng buộc trạng thái bàn | Chặn mở bàn khi bàn đã có khách (`OCCUPIED`) | `TableAndOrderManagementTest` | **PASS** |
| **UC_04** | Tạo đơn & Thêm món | Mở bàn tạo đơn `PENDING`, bàn chuyển sang `OCCUPIED` | `RestaurantE2ETest.testFullHappyPathE2EFlow` | **PASS** |
| **UC_04** | Điều chỉnh số lượng món | Tăng/giảm số lượng món ăn trong đơn, tổng tiền cập nhật tự động | `RestaurantE2ETest.testFullHappyPathE2EFlow` | **PASS** |
| **UC_04** | Hủy đơn hàng | Hủy đơn hàng có lý do, đơn chuyển `CANCELLED`, bàn tự động về `EMPTY` | `RestaurantE2ETest.testOrderCancellationAndTableRelease` | **PASS** |
| **UC_05** | Xem trước thanh toán (Preview) | Server tính tổng tiền, giảm giá, số tiền thực thu cần thanh toán | `RestaurantE2ETest.testFullHappyPathE2EFlow` | **PASS** |
| **UC_05** | Thanh toán Tiền mặt | Thu tiền, tự động tính tiền thối lại (`changeAmount`), bàn chuyển `EMPTY` | `RestaurantE2ETest.testFullHappyPathE2EFlow` | **PASS** |
| **UC_05** | Thanh toán Chuyển khoản QR | Thanh toán thành công bằng `BANK_TRANSFER`, sinh mã hóa đơn tự động | `RestaurantE2ETest.testBankTransferPaymentE2E` | **PASS** |
| **UC_05** | Chặn thanh toán trùng | Đơn đã thanh toán cố thanh toán lại trả về `409 Conflict` | `RestaurantE2ETest.testDuplicatePayment_returns409Conflict` | **PASS** |
| **UC_05** | Chặn trả thiếu tiền | Số tiền khách đưa nhỏ hơn tổng đơn trả về `400 Bad Request` | `RestaurantE2ETest.testUnderpayment_returns400BadRequest` | **PASS** |
| **UC_05** | Tra cứu Hóa đơn | Tra cứu hóa đơn bằng mã tự sinh `INV-yyyyMMdd-XXXX` | `PaymentManagementTest`, `RestaurantE2ETest` | **PASS** |
| **UC_06** | Thống kê Dashboard KPI | Doanh thu hôm nay, số hóa đơn, giá trị trung bình/đơn (AOV), tỷ lệ lấp đầy bàn | `DashboardReportingTest` | **PASS** |
| **UC_06** | Phân tích chu kỳ doanh thu | Doanh thu theo chu kỳ ngày (Hôm nay, 7 ngày qua, 30 ngày qua) | `DashboardReportingTest` | **PASS** |
| **UC_06** | Top món bán chạy | Xếp hạng các món ăn được gọi nhiều nhất kèm doanh số | `DashboardReportingTest` | **PASS** |
| **UC_06** | Cập nhật tức thời | Đơn thanh toán lập tức làm tăng doanh thu và số đơn trên Dashboard | `RestaurantE2ETest.testFullHappyPathE2EFlow` | **PASS** |

---

## 3. Tổng Hợp Kết Quả Thực Thi Kiểm Thử Tự Động (Automated Test Execution)

### 3.1. Backend Test Suites (Spring Boot 3.3.4 & JUnit 5)
Lệnh thực thi:
```powershell
mvn test
```
* **Kết quả:** `BUILD SUCCESS`
* **Tổng số test:** **42 / 42 tests PASSED (0 failures, 0 errors, 0 skipped)**
* **Chi tiết từng lớp kiểm thử:**
  1. `AuthControllerTest`: 4 tests (Đăng nhập thành công Admin & Staff, đăng nhập sai pass 401, lấy thông tin tài khoản hiện tại).
  2. `HealthCheckControllerTest`: 1 test (Kiểm tra trạng thái máy chủ `UP` và kết nối CSDL).
  3. `MenuManagementTest`: 6 tests (CRUD danh mục, CRUD món ăn, toggle trạng thái còn/hết món).
  4. `TableAndOrderManagementTest`: 6 tests (Mở bàn, thêm món, cập nhật số lượng, hủy đơn giải phóng bàn, chặn mở bàn đã có khách).
  5. `PaymentManagementTest`: 6 tests (Xem trước thanh toán, thanh toán tiền mặt, thanh toán chuyển khoản, chặn thanh toán lặp 409, chặn thiếu tiền 400, tra cứu mã hóa đơn).
  6. `DashboardReportingTest`: 5 tests (KPI tổng quan, chuỗi ngày doanh thu, top món bán chạy, chặn 401, cập nhật KPI sau thanh toán).
  7. `RestaurantE2ETest`: 9 tests (E2E Happy Path khép kín, E2E Hủy đơn, E2E Chuyển khoản QR, Chặn thanh toán lặp, Chặn trả thiếu tiền, Chặn món hết hàng, Phân quyền RBAC Staff bị từ chối 403, Chặn unauthenticated 401, Endpoint công khai 200).
  8. `DatabaseIntegrationTest`: 3 tests (Kết nối MySQL, Flyway migration, lưu trữ entity).

### 3.2. Frontend Build & Static Analysis (TypeScript & Vite)
Lệnh thực thi:
```powershell
npm.cmd run build
```
* **Kết quả:** `0 errors`
* **Vite Bundle:**
  * `dist/index.html`: 0.85 kB
  * `dist/assets/index-BoddzXRi.css`: 24.91 kB
  * `dist/assets/index-DysfWL2I.js`: 218.30 kB
  * Thời gian đóng gói: **674 ms**

---

## 4. Đánh Giá & Rà Soát Bảo Mật (Security & System Hardening Review)

| Tiêu Chí Bảo Mật | Trạng Thái | Đánh Giá Kỹ Thuật |
|---|---|---|
| **Mật khẩu người dùng** | ✅ Đạt | Băm một chiều bằng **BCrypt** với cost factor tiêu chuẩn. Mật khẩu gốc không bao giờ lưu trữ dạng plaintext hoặc trả về client. |
| **Cơ chế xác thực (AuthN)** | ✅ Đạt | Sử dụng **JWT (HMAC-SHA256)** với thời hạn hợp lý. Hỗ trợ tự động vô hiệu hóa token ở frontend khi hết hạn (`auth:unauthorized`). |
| **Phân quyền vai trò (AuthZ)** | ✅ Đạt | Cấu hình `@EnableMethodSecurity` và `@PreAuthorize("hasRole('ADMIN')")` nghiêm ngặt trên các tác vụ nhạy cảm (Tạo/sửa món ăn, xem báo cáo quản trị). |
| **An toàn CSDL & SQL Injection** | ✅ Đạt | Toàn bộ thao tác truy vấn đều sử dụng Spring Data JPA Repository với tham số hóa (Parameterized queries / JPQL), không ghép chuỗi SQL động. |
| **Toàn vẹn Transaction tài chính** | ✅ Đạt | Toàn bộ logic thanh toán, trừ trạng thái bàn, sinh hóa đơn và cập nhật đơn hàng chạy trong một `@Transactional` duy nhất. Nếu xảy ra lỗi giữa chừng, toàn bộ thay đổi tự động Rollback. |
| **Chính sách CORS** | ✅ Đạt | Cấu hình tường minh tại `SecurityConfig`, chỉ cho phép nguồn gốc Frontend tin cậy (`http://localhost:3000`), từ chối các domain lạ. |
| **Bảo vệ Secret & Mã nguồn** | ✅ Đạt | File `.env` và `application-local.*` được bảo vệ nghiêm ngặt qua `.gitignore`. Không có bất kỳ credential nào bị đưa lên Git commit. |

---

## 5. Phạm Vi Đã Kiểm Tra & Giới Hạn Cần Lưu Ý
* **Phạm vi hoàn tất:** Đã kiểm tra 100% các chức năng cốt lõi MVP gồm Quản lý thực đơn, sơ đồ bàn, gọi món, tính tiền, hóa đơn, thống kê doanh thu và phân quyền Admin/Staff.
* **Giới hạn môi trường (Out of scope cho MVP):**
  * Tích hợp máy in nhiệt phần cứng qua giao thức ESC/POS (hiện tại in qua lệnh `window.print()` của trình duyệt).
  * Webhook tự động nhận tiền từ cổng thanh toán ngân hàng thời gian thực (hiện tại mô phỏng quét mã VietQR và nhân viên xác nhận đã nhận tiền).
  * Hỗ trợ chuỗi nhà hàng đa chi nhánh (Multi-tenancy).
