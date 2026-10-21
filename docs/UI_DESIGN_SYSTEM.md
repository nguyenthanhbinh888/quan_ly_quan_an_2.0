# Hệ Thống Thiết Kế Giao Diện (UI Design System)

> **Dự án:** Quản Lý Quán Ăn (Restaurant Management)  
> **Phong cách chủ đạo:** **Light Editorial & Modern Restaurant Operations**  
> **Nguyên tắc cốt lõi:** Sáng sủa • Thực dụng • Tinh tế • Tối ưu thao tác • Không phô trương

---

## 1. Triết Lý Thiết Kế (Design Philosophy)

Khác với các trang landing page quảng cáo, phần mềm quản lý nhà hàng là **công cụ làm việc hàng ngày** của thu ngân, quản lý và nhân viên phục vụ:
1. **Nền sáng dịu mắt làm chủ đạo:** Sử dụng tông nền xám trắng ấm (`#F8F9FA` và `#FFFFFF`) thay thế hoàn toàn nền đen tối (`#0b0f19`) cũ. Giúp mắt không bị mỏi khi nhìn màn hình liên tục trong ca trực.
2. **Loại bỏ hiệu ứng AI nghiệp dư:** Tuyệt đối không dùng gradient nhiều màu, không dùng nền kính mờ (`backdrop-filter`), không đổ bóng dày phát sáng (glow neon), không bo tròn mọi thứ thành hình viên thuốc.
3. **Thay thế toàn bộ Emoji bằng Icon Vector SVG:** Chuẩn hóa toàn bộ biểu tượng trên hệ thống thành icon đường nét mảnh (1.75px stroke), kích thước cố định (16x16px hoặc 20x20px), màu sắc biến đổi theo trạng thái (`currentColor`).
4. **Phân cấp thị giác rành mạch:** Sử dụng đường viền mảnh (1px border) và khoảng trắng (white-space) để phân tách các khu vực chức năng, hạn chế bọc mọi thứ vào card.

---

## 2. Hệ Thống Token Thiết Kế (Design Tokens)

### 2.1. Bảng màu (Color Tokens)

```css
:root {
  /* Nền và bề mặt (Light Surface) */
  --bg-canvas: #f8f9fa;            /* Nền tổng thể toàn trang */
  --bg-surface: #ffffff;           /* Bề mặt thẻ, bảng, biểu mẫu, modal */
  --bg-surface-subtle: #f1f3f5;    /* Nền phụ: tiêu đề bảng, thanh tìm kiếm */
  --bg-surface-hover: #e9ecef;     /* Nền khi hover chuột vào hàng hoặc mục */
  --bg-surface-active: #dee2e6;

  /* Màu chữ và nội dung (High Contrast Typography) */
  --text-main: #111827;            /* Chữ chính: độ tương phản cao, chuẩn WCAG AAA */
  --text-muted: #4b5563;           /* Chữ phụ, mô tả, ngày giờ */
  --text-dim: #9ca3af;             /* Chữ gợi ý, placeholder, disabled */

  /* Viền và đường phân cách (Hairline Borders) */
  --border-subtle: #e5e7eb;        /* Đường kẻ ngăn cách mảnh 1px */
  --border-strong: #d1d5db;        /* Viền ô nhập liệu input, bảng */
  --border-focus: #234e3a;         /* Vòng viền khi focus bằng bàn phím */

  /* Màu thương hiệu & Nút bấm chính (Forest Slate Accent) */
  --primary: #234e3a;              /* Xanh rêu trầm lịch lãm, tin cậy */
  --primary-hover: #1a3b2c;        /* Màu khi hover nút chính */
  --primary-subtle: #edf4f0;       /* Nền nhạt cho mục đang chọn, badge */
  --primary-text: #ffffff;

  /* Màu trạng thái nghiệp vụ (Operational States) */
  /* 1. Bàn trống / Còn bán / Thành công */
  --status-empty: #15803d;
  --status-empty-bg: #dcfce7;
  --status-empty-border: #bbf7d0;

  /* 2. Bàn có khách / Đang phục vụ */
  --status-occupied: #c2410c;
  --status-occupied-bg: #ffedd5;
  --status-occupied-border: #fed7aa;

  /* 3. Bàn đặt trước / Chờ xử lý */
  --status-reserved: #a16207;
  --status-reserved-bg: #fef9c3;
  --status-reserved-border: #fef08a;

  /* 4. Hủy / Hết món / Thao tác nguy hiểm */
  --status-danger: #b91c1c;
  --status-danger-bg: #fee2e2;
  --status-danger-border: #fecaca;

  /* 5. Thông tin / Chuyển khoản */
  --status-info: #1d4ed8;
  --status-info-bg: #dbeafe;
  --status-info-border: #bfdbfe;
}
```

### 2.2. Typography (Kiểu chữ & Cỡ chữ)

* **Font gia đình:** `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
* **Hiển thị số liệu tiền tệ:** Áp dụng bắt buộc `font-variant-numeric: tabular-nums` cho toàn bộ cột giá tiền, mã hóa đơn, giờ và chỉ số đếm. Nhờ đó các chữ số luôn thẳng hàng trên bảng tính.

| Cấp bậc (Scale) | Kích thước | Độ đậm (Weight) | Ứng dụng |
|---|---|---|---|
| `Page Title` | 20px – 22px | 700 (Bold) | Tiêu đề đầu mỗi trang (Header) |
| `Section Title` | 16px – 17px | 600 (Semibold) | Tiêu đề nhóm chức năng, tên modal |
| `Item / Card Title`| 14px – 15px | 600 (Semibold) | Tên món ăn, mã bàn, mã đơn |
| `Body Text` | 14px | 400 (Regular) | Nội dung bảng, mô tả, nội dung văn bản |
| `Label / Header` | 12px – 13px | 600 (Semibold) | Nhãn form, tiêu đề cột bảng (`uppercase`) |
| `Caption / Hint` | 12px | 400 (Regular) | Ghi chú nhỏ, thời gian phụ trợ |

### 2.3. Bán kính góc (Radius) & Đổ bóng (Shadow)

* **Bán kính góc bo:**
  * Thẻ bảng, modal, container: **`6px` hoặc `8px`** (Gọn gàng, cứng cáp).
  * Nút bấm, ô input: **`6px`**.
  * Badge trạng thái: **`4px`** hoặc bo tròn nhẹ (tuyệt đối không bo 999px như viên thuốc đồ chơi).
* **Đổ bóng (Elevation):**
  * Bình thường: Không đổ bóng, dùng viền mảnh `1px solid var(--border-subtle)`.
  * Modal và Dropdown nổi: Đổ bóng cực nhẹ `box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.08)`.

---

## 3. Quy Chuẩn Các Thành Phần Dùng Chung (Component Specifications)

### 3.1. Nút bấm (Button)
* **`primary`:** Nền `--primary` (`#234E3A`), chữ trắng, viền trong suốt. Dùng cho hành động quan trọng nhất trên màn hình (Đăng nhập, Mở bàn, Thanh toán).
* **`secondary`:** Nền `--bg-surface-subtle`, chữ `--text-main`, viền `--border-strong`. Dùng cho thao tác phụ trợ (Thêm món, Làm mới).
* **`outline`:** Nền trong suốt, viền `--border-strong`, chữ `--text-muted`. Dùng cho hủy bỏ, đóng modal.
* **`danger`:** Nền nhạt `--status-danger-bg` viền `--status-danger-border`, chữ `--status-danger`. Dùng cho thao tác hủy đơn, xóa món.
* **`ghost`:** Nền trong suốt, không viền, đổi màu nền nhẹ khi hover.

### 3.2. Ô nhập liệu (Input & Select)
* Chiều cao chuẩn: **`38px`** (vừa vặn, không quá to, không quá nhỏ).
* Luôn có thẻ `<label>` rành mạch đặt phía trên, màu `--text-muted`, font size `13px`.
* Trạng thái focus: Viền đổi sang `--primary` kèm vòng phát quang mảnh `box-shadow: 0 0 0 3px rgba(35, 78, 58, 0.15)`.

### 3.3. Bảng dữ liệu (Data Table)
* Header bảng: Nền `--bg-surface-subtle`, chữ in hoa nhỏ `12px`, `font-weight: 600`, căn trái cho chữ, căn phải cho số tiền.
* Hàng dữ liệu: Chiều cao `48px`, viền đáy `1px solid var(--border-subtle)`. Hover chuột đổi sang `--bg-surface-hover`.
* Phân trang: Đặt ở góc dưới bên phải, gồm nút Trang trước/sau và chỉ số trang hiện tại.

### 3.4. Thẻ trạng thái (Badge)
* Cấu trúc: Nền nhạt (10% tint), chữ đậm (80% shade), viền đồng màu (20% tint).
* Không lạm dụng icon emoji; hiển thị nhãn chữ rõ ràng (Ví dụ: `Còn bán`, `Hết món`, `Bàn trống`, `Đang có khách`, `Đã thanh toán`).

### 3.5. Hộp thoại (Modal)
* Backdrop xám tối nhẹ `rgba(15, 23, 42, 0.45)` (bỏ hiệu ứng làm mờ nhòe kính).
* Thân modal: Nền trắng sạch, tiêu đề rõ ràng kèm nút đóng [X] gọn gàng.
* Chân modal: Thanh công cụ cố định (Action Footer) căn phải, khoảng cách phím bấm hợp lý.

### 3.6. Biểu tượng vector nội bộ (Icons Collection)
Xây dựng file [`src/components/common/Icons.tsx`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/frontend/src/components/common/Icons.tsx) cung cấp các biểu tượng SVG chuẩn hóa:
* `IconDashboard` (Tổng quan)
* `IconTable` (Sơ đồ bàn)
* `IconMenu` (Thực đơn)
* `IconReceipt` (Hóa đơn)
* `IconReport` (Báo cáo)
* `IconLogout` (Đăng xuất)
* `IconSearch` (Tìm kiếm)
* `IconPlus` (Thêm mới)
* `IconEdit` (Chỉnh sửa)
* `IconTrash` (Xóa)
* `IconCheck` (Xác nhận)
* `IconPrinter` (In ấn)
* `IconCash` (Tiền mặt)
* `IconQr` (Mã QR)
* `IconClose` (Đóng)

---

## 4. Kế Hoạch Triển Khai Theo Từng Nhóm Màn Hình (Phased Plan)

Theo chỉ dẫn trong tài liệu hướng dẫn Giai đoạn 13, quá trình sửa code sẽ được chia thành **7 nhóm nối tiếp nhau**, nghiệm thu và build thành công sau từng nhóm:

| Nhóm | Tên nhóm | Phạm vi file can thiệp | Mục tiêu nghiệm thu |
|---|---|---|---|
| **Nhóm A** | **Nền tảng giao diện & Tokens** | `index.css`, `MainLayout.tsx`, `Icons.tsx`, `Button.tsx`, `Badge.tsx`, `Modal.tsx` | Nền sáng toàn hệ thống, sidebar và header mới không emoji, components dùng chung chuẩn hóa. |
| **Nhóm B** | **Đăng nhập & Dashboard** | `LoginPage.tsx`, `DashboardPage.tsx` | Trang đăng nhập tối giản thanh lịch; Dashboard 4 KPI gọn gàng, biểu đồ cột CSS rõ ràng, top món bán chạy. |
| **Nhóm C** | **Thực đơn & Danh mục** | `MenuPage.tsx` | Bảng quản lý món sáng sủa, bộ lọc danh mục tinh tế, modal thêm/sửa món rõ ràng, không còn emoji. |
| **Nhóm D** | **Sơ đồ bàn ăn & Gọi món (POS)** | `PosPage.tsx` | Sơ đồ bàn ăn trực quan, màu sắc dễ nhận biết nhanh; giỏ gọi món phân cấp rõ ràng; thao tác thêm/sửa món mượt mà. |
| **Nhóm E** | **Thanh toán & Hóa đơn** | `PosPage.tsx` (phần thanh toán), `OrdersPage.tsx` | Modal thanh toán tiền mặt/QR tiện dụng; biên lai in chuẩn K80; bảng lịch sử hóa đơn dễ tra cứu. |
| **Nhóm F** | **Phân quyền & Tinh chỉnh Báo cáo** | `DashboardPage.tsx`, kiểm tra quyền `ADMIN` vs `STAFF` | Hiển thị chính xác theo vai trò, biểu đồ doanh thu chu kỳ không lỗi. |
| **Nhóm G** | **Hoàn thiện Responsive & Trạng thái** | Toàn bộ các trang, `NotFoundPage.tsx` | Kiểm tra Desktop, Tablet, Mobile; kiểm tra Loading, Empty state, Toast thông báo. |

---

## 5. Quy Trình Kiểm Thử Sau Mỗi Nhóm (Verification Protocol)

1. Sau mỗi nhóm màn hình, chạy:
   ```powershell
   npm.cmd run build
   ```
   Bảo đảm **0 lỗi TypeScript, build thành công trong < 1.5 giây**.
2. Kiểm tra Backend tests:
   ```powershell
   mvn test
   ```
   Bảo đảm **42/42 tests PASS**, không bị ảnh hưởng do sửa frontend.
3. Cập nhật tiến độ vào `docs/PROJECT_STATUS.md`.
