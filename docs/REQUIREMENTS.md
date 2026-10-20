# Tài Liệu Phân Tích Yêu Cầu - Hệ Thống Quản Lý Quán Ăn
(Restaurant Management System - Requirements Specification)

- **Mã tài liệu:** `DOC_REQ_01`
- **Phiên bản:** 1.0 (MVP)
- **Trạng thái:** Chờ phê duyệt (Pending Approval)
- **Công nghệ nền tảng:** Java Spring Boot, React.js + TypeScript, MySQL.

---

## 1. Mục tiêu hệ thống

Hệ thống cung cấp giải pháp vận hành tập trung cho quán ăn vừa và nhỏ, giải quyết các bài toán:
- Tối ưu hóa quy trình tiếp nhận gọi món (order) tại bàn, tránh thất thoát hoặc nhầm lẫn món.
- Quản lý sơ đồ bàn trực quan theo thời gian thực (bàn trống, bàn có khách).
- Chuẩn hóa quy trình tính tiền, áp dụng ưu đãi và xuất hóa đơn chính xác.
- Cung cấp số liệu doanh thu tức thì cho chủ quán/quản lý để đưa ra quyết định kinh doanh.

---

## 2. Các vai trò người dùng (User Roles)

| Mã vai trò | Tên vai trò | Mô tả phạm vi quyền hạn |
|---|---|---|
| `ROLE_ADMIN` | **Quản trị viên / Chủ quán** | Toàn quyền hệ thống: quản lý nhân viên, cấu hình bàn, danh mục, thực đơn, xem báo cáo doanh thu chi tiết, hủy hóa đơn/hoàn tiền. |
| `ROLE_STAFF` | **Nhân viên phục vụ** | Xem sơ đồ bàn, mở bàn, tạo đơn gọi món, thêm/sửa món, chuyển bàn, gửi yêu cầu thanh toán. |
| `ROLE_CASHIER` | **Thu ngân** | Tiếp nhận yêu cầu thanh toán từ phục vụ, kiểm tra đơn, áp dụng giảm giá, xác nhận thanh toán (tiền mặt / chuyển khoản), in hóa đơn. *(Lưu ý: Với mô hình quán nhỏ, `ROLE_STAFF` hoặc `ROLE_ADMIN` có thể kiêm nhiệm vai trò này).* |
| `ROLE_KITCHEN` | **Nhân viên bếp** *(Dự kiến mở rộng)* | Xem màn hình các món cần chế biến theo thứ tự gọi món, cập nhật trạng thái món (đang nấu / hoàn thành). |

---

## 3. Danh sách Use Case chuẩn hóa

### Nhóm 1: Xác thực & Quản trị tài khoản
- **`UC_01` - Đăng nhập hệ thống:** Người dùng nhập username/password để truy cập hệ thống. Hệ thống trả về token/session cùng quyền hạn tương ứng.
- **`UC_02` - Đăng xuất hệ thống:** Hủy phiên làm việc an toàn.
- **`UC_03` - Quản lý tài khoản nhân viên (Admin):** Tạo mới, chỉnh sửa thông tin, khóa tài khoản, cấp vai trò cho nhân viên.

### Nhóm 2: Quản lý Thực đơn & Bàn ăn
- **`UC_04` - Quản lý danh mục món ăn (Category):** Thêm, sửa, xóa danh mục (ví dụ: Món khai vị, Món chính, Đồ uống, Tráng miệng). Ràng buộc: Không được xóa danh mục khi còn món ăn đang thuộc về danh mục đó.
- **`UC_05` - Quản lý món ăn (Menu Item):** Thêm món mới, cập nhật giá niêm yết, hình ảnh minh họa, mô tả, và trạng thái (Còn bán / Hết món).
- **`UC_06` - Quản lý bàn ăn (Dining Table):** Cấu hình danh sách bàn, khu vực/tầng (nếu có), số lượng ghế mỗi bàn.

### Nhóm 3: Vận hành Phục vụ & Gọi món (Order)
- **`UC_07` - Xem sơ đồ bàn trực quan:** Hiển thị danh sách tất cả các bàn kèm trạng thái màu sắc (Trống, Đang có khách, Chờ thanh toán).
- **`UC_08` - Mở bàn & Tạo đơn hàng (Order):** Khi khách vào bàn, nhân viên chọn bàn và bấm tạo đơn hàng mới. Trạng thái bàn tự động chuyển sang `OCCUPIED`.
- **`UC_09` - Đặt món mang về (Takeaway Order):** Tạo đơn hàng trực tiếp mà không cần gắn với bàn ăn.
- **`UC_10` - Thêm món & Cập nhật số lượng món:** Nhân viên thêm món vào đơn, kèm ghi chú (ví dụ: "ít cay", "không hành"). Giá món tại thời điểm gọi được lưu cố định vào dòng món (`order_items`).
- **`UC_11` - Hủy món ăn trong đơn:** Cho phép hủy dòng món nếu bếp chưa chế biến; ghi nhận lý do hủy và người thực hiện.
- **`UC_12` - Chuyển bàn / Ghép bàn (Mở rộng):** Chuyển toàn bộ đơn hàng từ bàn A sang bàn B trống hoặc gộp hai bàn.

### Nhóm 4: Thanh toán & Hóa đơn (Payment & Invoice)
- **`UC_13` - Tạm tính & Xem trước hóa đơn:** Nhân viên/Thu ngân kiểm tra lại danh sách món và tổng tiền do Backend tính toán trước khi in phiếu tạm tính cho khách.
- **`UC_14` - Áp dụng giảm giá / Chiết khấu:** Nhập % hoặc số tiền giảm giá trực tiếp (có ghi nhận quyền hạn áp dụng).
- **`UC_15` - Xác nhận thanh toán:** Thu ngân chọn phương thức (Tiền mặt, Chuyển khoản ngân hàng/QR) và bấm hoàn tất thanh toán. 
  - Đơn hàng chuyển sang `PAID`.
  - Bàn tương ứng tự động chuyển về trạng thái `EMPTY` (Trống).
- **`UC_16` - Tra cứu lịch sử hóa đơn:** Cho phép tìm kiếm lại các hóa đơn đã thanh toán theo mã hóa đơn, ngày tháng, bàn hoặc nhân viên.
- **`UC_17` - Hủy đơn hàng đã tạo:** Chỉ `ROLE_ADMIN` mới có quyền hủy đơn kèm lý do bắt buộc.

### Nhóm 5: Báo cáo & Thống kê (Dashboard & Reporting)
- **`UC_18` - Trang tổng quan vận hành:** Xem nhanh số bàn đang phục vụ, doanh thu trong ngày, số lượng đơn đã phục vụ.
- **`UC_19` - Báo cáo doanh thu theo mốc thời gian:** Lọc doanh thu theo ngày, tuần, tháng hoặc khoảng ngày tùy chọn.
- **`UC_20` - Thống kê món ăn bán chạy (Top Selling Items):** Thống kê các món có số lượng gọi nhiều nhất để quán tối ưu nhập hàng.

---

## 4. Máy trạng thái (State Machine) & Quy tắc chuyển trạng thái

### 4.1. Trạng thái Bàn ăn (`DiningTable`)
- `EMPTY` (Trống - Màu xanh lá): Bàn sẵn sàng đón khách mới.
- `OCCUPIED` (Đang có khách - Màu đỏ/cam): Đang có khách ngồi và có đơn hàng `PENDING` gắn với bàn.
- `RESERVED` (Đã đặt trước - Màu vàng): Bàn được giữ trước cho khách.

**Quy tắc chuyển:**
1. `EMPTY` → `OCCUPIED`: Khi nhân viên tạo đơn hàng mới cho bàn đó.
2. `OCCUPIED` → `EMPTY`: Khi đơn hàng cuối cùng của bàn đó chuyển sang trạng thái `PAID` hoặc `CANCELLED`.
3. Không được phép tạo đơn hàng mới vào một bàn đang ở trạng thái `OCCUPIED` (tránh ghi đè/nhầm lẫn khách).

### 4.2. Trạng thái Đơn hàng (`Order`)
- `PENDING`: Đơn vừa tạo, đang phục vụ, cho phép thêm/sửa món liên tục.
- `PAID`: Đơn đã được thanh toán thành công. Không thể thêm bớt món sau khi đã `PAID`.
- `CANCELLED`: Đơn bị hủy (chỉ Admin thực hiện). Không tính vào doanh thu.

### 4.3. Trạng thái Dòng món trong đơn (`OrderItem`)
- `PENDING`: Món mới được thêm vào đơn.
- `COOKING`: Bếp đã tiếp nhận và đang chế biến.
- `SERVED`: Món đã được mang ra phục vụ tại bàn.
- `CANCELLED`: Món đã bị hủy khỏi đơn.

---

## 5. Quy tắc nghiệp vụ tính tiền & Dữ liệu tài chính

1. **Lưu vết giá tại thời điểm đặt (Snapshot Pricing):**
   - Khi thêm món vào đơn, hệ thống sao chép `price` của món từ bảng `menu_items` sang `order_items.price_at_order`.
   - Nếu sau này Admin tăng hoặc giảm giá trên thực đơn, giá trị các đơn hàng cũ và hóa đơn đã lập **tuyệt đối không bị thay đổi**.
2. **Kiểu dữ liệu tiền tệ:**
   - Trong MySQL: Kiểu `DECIMAL(12, 2)`.
   - Trong Java: Kiểu `java.math.BigDecimal`.
   - Tuyệt đối không dùng `float` hoặc `double` để tính tiền nhằm tránh sai số làm tròn thập phân.
3. **Công thức tính tổng tiền:**
   - $\text{Subtotal} = \sum (\text{item.quantity} \times \text{item.price\_at\_order})$ (Chỉ tính các món không bị `CANCELLED`).
   - $\text{DiscountAmount} = \text{Subtotal} \times \frac{\text{DiscountPercent}}{100} + \text{FlatDiscount}$.
   - $\text{FinalAmount} = \max(0, \text{Subtotal} - \text{DiscountAmount})$.
   - **Backend là nơi duy nhất tính toán và xác thực số tiền.** Frontend chỉ gửi mã món và số lượng, không gửi tổng tiền tự tính.
4. **Quy tắc xác định Doanh thu:**
   - Doanh thu chỉ được tính từ các đơn hàng có `OrderStatus = PAID`.
   - Thời gian ghi nhận doanh thu dựa trên thời điểm thanh toán (`paid_at`), không dựa trên thời điểm tạo đơn (`created_at`).
   - Các đơn có trạng thái `CANCELLED` bị loại trừ hoàn toàn khỏi báo cáo doanh thu.
5. **Giao dịch an toàn (ACID Transaction):**
   - Nghiệp vụ thanh toán phải chạy trong 1 Database Transaction duy nhất gồm: Cập nhật đơn (`PAID`), tạo bản ghi thanh toán (`payments`), cập nhật trạng thái bàn (`EMPTY`). Nếu 1 trong 3 bước thất bại, toàn bộ phải rollback.
   - Cơ chế phòng chống thanh toán lặp (Idempotency): Khóa đơn khi đang tiến hành thanh toán, chặn gửi 2 request thanh toán đồng thời cho cùng 1 đơn.

---

## 6. Phân kỳ triển khai (MVP vs Giai đoạn mở rộng)

### Giai đoạn MVP (Cần hoàn thành ngay)
- Đăng nhập/Đăng xuất cho 2 vai trò: Quản trị viên (`ADMIN`) và Nhân viên/Thu ngân (`STAFF`).
- Quản lý danh mục & Món ăn (CRUD đầy đủ, tải ảnh qua URL, bật/tắt còn bán).
- Quản lý bàn ăn (Cấu hình bàn, sơ đồ bàn hiển thị Trống / Có khách).
- Tạo đơn tại bàn, gọi món, chỉnh số lượng, ghi chú món.
- Thanh toán đơn hàng (Tiền mặt / Chuyển khoản QR thủ công), in/xem hóa đơn.
- Dashboard báo cáo doanh thu theo ngày/tháng và danh sách món bán chạy.

### Giai đoạn mở rộng (Post-MVP)
- Tách riêng màn hình Bếp (`KITCHEN`) nhận món theo thời gian thực (WebSocket).
- Tích hợp quét mã VietQR tự động xác nhận chuyển khoản ngân hàng qua Webhook.
- Quản lý kho, nguyên liệu thô, định lượng xuất kho theo từng món ăn.
- Quản lý khách hàng thân thiết, tích điểm thành viên, thẻ giảm giá.
- In hóa đơn qua máy in nhiệt (ESC/POS 80mm).

---

## 7. Yêu cầu phi chức năng (Non-Functional Requirements)

1. **Bảo mật:**
   - Mật khẩu mã hóa bằng thuật toán `BCrypt` với salt ngẫu nhiên.
   - Xác thực API bằng JSON Web Token (JWT) hoặc Session bảo mật.
   - Mọi API nghiệp vụ đều kiểm tra quyền hạn (Role-based Authorization) ở tầng Backend.
   - Không để lộ thông tin nhạy cảm hoặc stack trace trong response lỗi.
2. **Hiệu năng & Khả năng mở rộng:**
   - Thời gian đáp ứng API < 200ms đối với các tác vụ thao tác đơn hàng thông thường.
   - Hỗ trợ tối thiểu 30-50 bàn hoạt động đồng thời mà không bị trễ.
   - Thiết kế phân trang (`page`, `size`) cho danh sách món ăn, hóa đơn và báo cáo.
3. **Giao diện người dùng (UI/UX):**
   - Thiết kế thân thiện, màu sắc phân biệt rõ ràng (Xanh = Trống, Cam/Đỏ = Có khách).
   - Tối ưu cho thao tác chạm trên máy tính bảng (Tablet) hoặc màn hình cảm ứng POS tại quầy.
4. **Tính sẵn sàng & Toàn vẹn:**
   - Hỗ trợ script sao lưu cơ sở dữ liệu tự động (`mysqldump`).

---

## 8. Các quyết định cần bạn (Chủ quán/Product Owner) duyệt

Trước khi chuyển sang Giai đoạn 2 (Thiết kế Database ERD và REST API), xin vui lòng xem xét và duyệt các điểm sau:

1. **Phân quyền trong phiên bản MVP:**
   - Bạn có đồng ý ở bản MVP chỉ cần 2 vai trò: **Quản trị viên (Chủ quán)** và **Nhân viên (kiêm thu ngân & phục vụ)** để hệ thống tinh gọn nhất, sau đó mới tách riêng vai trò Thu ngân và Bếp ở giai đoạn sau không?
2. **Hình ảnh món ăn:**
   - Trong phiên bản MVP, bạn muốn lưu hình ảnh món ăn dưới dạng **URL link ảnh** (nhập link ảnh trực tiếp) hay muốn làm luôn tính năng **Upload file ảnh từ máy tính** lên server? (Khuyến nghị: MVP dùng URL hoặc thư mục static asset cục bộ để tập trung vào logic gọi món).
3. **Phương thức thanh toán:**
   - Phiên bản đầu tiên sẽ hỗ trợ 2 phương thức: **Tiền mặt** và **Chuyển khoản ngân hàng (hiển thị QR tĩnh của quán để khách quét)**, nhân viên bấm xác nhận đã nhận tiền. Bạn có đồng ý phương án này không?
