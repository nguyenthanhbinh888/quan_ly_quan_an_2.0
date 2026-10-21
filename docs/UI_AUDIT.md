# Báo Cáo Khảo Sát & Audit Giao Diện Người Dùng (UI/UX Audit)

> **Dự án:** Hệ thống Quản Lý Quán Ăn (Restaurant Management System)  
> **Phiên bản:** v1.0.0 (Pre-Redesign)  
> **Thời điểm audit:** Giai đoạn 13 — Redesign UI/UX  
> **Người thực hiện:** Antigravity AI Pair Programmer

---

## 1. Tổng Quan Kiến Trúc Giao Diện Hiện Tại

### 1.1. Cấu trúc Route & Màn hình
Hệ thống frontend hiện tại chạy trên **React 18 + TypeScript + Vite**, sử dụng hệ thống routing tùy biến qua `RouterContext` và chia layout qua `MainLayout`:

| Đường dẫn (Route) | Màn hình (Page) | Vai trò truy cập | Trạng thái hiện tại |
|---|---|---|---|
| `/login` | `LoginPage.tsx` | Khách / Chưa đăng nhập | `EXISTS` |
| `/` | `DashboardPage.tsx` | `ADMIN`, `STAFF` | `EXISTS` |
| `/pos` | `PosPage.tsx` | `ADMIN`, `STAFF` | `EXISTS` |
| `/menu` | `MenuPage.tsx` | `ADMIN` (Staff xem) | `EXISTS` |
| `/orders` | `OrdersPage.tsx` | `ADMIN`, `STAFF` | `EXISTS` |
| `/reports` | `DashboardPage.tsx` | `ADMIN` | `EXISTS` |
| `*` (other) | `NotFoundPage.tsx` | Tất cả | `EXISTS` |

### 1.2. Thư viện UI & Stylesheet
- **CSS Framework:** Không sử dụng TailwindCSS hay UI kit bên ngoài; toàn bộ giao diện đang dùng **Vanilla CSS** tập trung tại file đơn `frontend/src/index.css` (hơn 1.620 dòng CSS).
- **Icon Library:** Chưa cài đặt bất kỳ thư viện icon vector nào (như Lucide, Heroicons hay FontAwesome); toàn bộ icon hiện tại đang lạm dụng **Emoji ký tự Unicode** trực tiếp trong JSX.
- **Font chữ:** Khai báo `'Plus Jakarta Sans'`, sans-serif nhưng chưa tối ưu hoá kiểu hiển thị số tiền bảng kế toán (`tabular-nums`).

---

## 2. Nhận Diện Các Vấn Đề UI/UX Trọng Yếu Hiện Tại

Sau khi rà soát toàn bộ mã nguồn thực tế tại các file `index.css`, `MainLayout.tsx`, `LoginPage.tsx`, `PosPage.tsx`, `MenuPage.tsx`, `OrdersPage.tsx`, `DashboardPage.tsx`, các điểm yếu được phân loại như sau:

### 2.1. Vấn đề thẩm mỹ & Cảm giác "AI Template / Nghiệp Dư"
1. **Tông màu tối đen (Dark Theme) làm chủ đạo:**
   * CSS hiện tại đặt `--bg-primary: #0b0f19`, `--bg-surface: #111827`, `--bg-card: rgba(17, 24, 39, 0.75)`. Tông màu này tạo cảm giác u tối, nặng nề, hoàn toàn không phù hợp với môi trường vận hành thực tế của nhà hàng/quán ăn ban ngày (nhân viên đứng tại quầy thu ngân khó nhìn dưới ánh đèn, mắt nhanh mỏi).
2. **Lạm dụng Gradient và hiệu ứng phát sáng neon (Neon Glow / Cyberpunk):**
   * Tiêu đề chữ dùng `background: linear-gradient(135deg, #ffffff 40%, #fdba74 100%)` với `-webkit-text-fill-color: transparent`.
   * Thẻ KPI và thanh biểu đồ dùng viền neon phát sáng `filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))`.
   * Nền kính mờ `backdrop-filter: blur(12px)` xuất hiện ở hầu hết mọi thanh header, sidebar và card.
3. **Lạm dụng Emoji làm Icon giao diện:**
   * Emoji xuất hiện ở menu (📊, 🪑, 🍲, 🧾, 📈, 🚪), nút bấm (🔄, ➕, 💳, 🖨, ⚡), thẻ KPI (💰, 🧾, 📈, 🪑) và huy chương (🥇, 🥈, 🥉).
   * **Hậu quả:** Emoji hiển thị không đồng nhất trên các hệ điều hành (Windows, macOS, iOS, Android hiển thị màu sắc và nét vẽ khác nhau), làm giảm tính chuyên nghiệp và nghiêm túc của phần mềm nghiệp vụ.
4. **Hội chứng "Card hóa mọi thứ" (Card Overuse):**
   * Mọi khối thông tin đều bị đóng khung trong các thẻ card bo góc tròn lớn (`16px`), viền mờ và đổ bóng dày, chiếm dụng diện tích hiển thị và làm giao diện bị phân mảnh, rời rạc.

### 2.2. Vấn đề Trải nghiệm Người dùng (UX & Usability)
1. **Phân cấp thị giác kém (Visual Hierarchy):**
   * Tương phản giữa nhãn (label) và nội dung (value) trong bảng dữ liệu chưa đủ rõ.
   * Trên trang POS, danh sách bàn và giỏ gọi món có quá nhiều nút bấm cùng màu nổi bật, khiến nhân viên thu ngân dễ bấm nhầm giữa nút "In tạm tính", "Giảm giá", "Thanh toán", và "Hủy đơn".
2. **Bảng dữ liệu & Số tiền:**
   * Cột đơn giá và thành tiền chưa được căn phải (right-aligned) chuẩn mực và chưa dùng font số đơn cách (tabular-nums), gây khó khăn khi so sánh các con số trên hóa đơn.
3. **Biểu mẫu & Input:**
   * Trường nhập liệu trong Modal chỉ dựa vào placeholder, nhãn form chữ nhỏ và thiếu focus ring tiêu chuẩn tiếp cận (accessibility).
4. **Trạng thái bàn ăn:**
   * Hiện tại các ô bàn ăn trong sơ đồ POS có kích thước lớn và mang tính chất card trang trí hơn là một bàn điều khiển tốc độ cao (quick grid).

---

## 3. Ma Trận Đánh Giá Theo Từng Màn Hình

| Màn hình | Route | Thành phần chính | Vấn đề UI/UX phát hiện | Mức độ ưu tiên |
|---|---|---|---|---|
| **Khung App (Layout)** | Toàn bộ app | `MainLayout.tsx`, Header, Sidebar | Nền sidebar và header đen kịt; icon emoji; nút toggle mobile thô sơ; thiếu trạng thái active thanh lịch. | **P0** |
| **Đăng nhập** | `/login` | `LoginPage.tsx` | Nền tối gradient neon; card đăng nhập đóng khung kính mờ; emoji logo; nút test nhanh lòe loẹt. | **P1** |
| **Sơ đồ bàn & POS** | `/pos` | `PosPage.tsx`, Bàn ăn, Giỏ món, Modal Order | Quá nhiều emoji; màu bàn ăn neon tương phản gắt; giỏ gọi món đóng khung card dày; modal thanh toán chia cột chưa tối ưu cho thao tác cảm ứng/bàn phím. | **P0** |
| **Thực đơn & Danh mục** | `/menu` | `MenuPage.tsx`, Bảng món ăn, Form CRUD | Bảng dữ liệu nền tối khó quét mắt; nút sửa/xóa dùng emoji; thanh lọc danh mục dạng pill màu cam neon; modal thêm món thiếu phân nhóm rõ ràng. | **P1** |
| **Lịch sử Hóa đơn** | `/orders` | `OrdersPage.tsx`, Bộ lọc ngày, Modal Receipt | Bảng hóa đơn nền xám đen; nút xem chi tiết emoji; modal biên lai hóa đơn chưa được định dạng theo chuẩn hóa đơn giấy thanh lịch khi in ấn. | **P1** |
| **Dashboard & Báo cáo** | `/`, `/reports` | `DashboardPage.tsx`, KPI, CSS Bar Chart | Thẻ KPI bo tròn lớn, thanh tiến trình neon tím; biểu đồ cột CSS thuần thiếu trục tọa độ rõ ràng; tiêu đề gradient màu đồng. | **P1** |
| **Trang 404** | `*` | `NotFoundPage.tsx` | Thiết kế tối, emoji lớn, thiếu sự liên kết điều hướng mượt mà. | **P2** |
| **Component dùng chung** | N/A | `Button`, `Badge`, `Modal`, `EmptyState` | Bán kính bo góc không đồng nhất; badge dùng dot neon; button thiếu biến thể `ghost` thanh lịch. | **P0** |

*Quy ước mức độ ưu tiên:*
* **P0:** Ảnh hưởng trực tiếp đến layout nền tảng và tốc độ thao tác vận hành hàng ngày (Bàn, POS, Layout).
* **P1:** Ảnh hưởng lớn đến tính thẩm mỹ chuyên nghiệp và khả năng đọc dữ liệu (Menu, Orders, Dashboard, Login).
* **P2:** Thành phần phụ trợ hoặc màn hình ít thao tác thường xuyên.

---

## 4. Đề Xuất Giải Pháp Icon Vector (Thay thế Emoji)

Để tuân thủ triệt để Quy tắc 34 ("Không dùng emoji làm icon giao diện"):
* **Phương án A (Khuyến nghị cao nhất):** Xây dựng bộ icon SVG nội bộ dạng component React sạch (`src/components/common/Icons.tsx`) với các icon nghiệp vụ chuẩn: `IconDashboard`, `IconTable`, `IconMenu`, `IconReceipt`, `IconChart`, `IconLogout`, `IconSearch`, `IconPlus`, `IconCheck`, `IconCash`, `IconQr`, `IconPrinter`, `IconTrash`, `IconEdit`, `IconClose`.
  * **Ưu điểm:** Kích thước siêu nhẹ (0 KB thư viện ngoài), không phụ thuộc mạng/npm download (tránh lỗi 404 Playwright/sandbox offline), hoàn toàn đồng nhất về nét vẽ (stroke 1.75px, 20x20px hoặc 16x16px), đổi màu mượt mà theo CSS `currentColor`.
* **Phương án B:** Cài đặt gói `lucide-react`.
  * **Rủi ro:** Cần chạy `npm install` trong môi trường local có thể gặp sự cố kết nối mạng nếu offline.

👉 **Đề xuất lựa chọn Phương án A** để đảm bảo ứng dụng độc lập 100%, tải tức thì và nét vẽ đồng bộ chuẩn xác.

---

## 5. Rủi Ro & Chiến Lược Kiểm Soát

1. **Rủi ro vỡ logic nghiệp vụ khi đổi CSS:**
   * **Biện pháp:** Không sửa cấu trúc state, không đổi props/handlers của các component. Giữ nguyên toàn bộ logic gọi API trong `orderService`, `tableService`, `paymentService`, `menuService`.
2. **Rủi ro xung đột selector CSS toàn cục:**
   * **Biện pháp:** Tổ chức lại CSS có phạm vi cụ thể theo tiền tố chuẩn (BEM hoặc component-scoped classes như `.app-*`, `.pos-*`, `.menu-*`, `.kpi-*`).
3. **Rủi ro mất kết nối hoặc hỏng in hóa đơn:**
   * **Biện pháp:** Bảo toàn thẻ `@media print` cho hóa đơn thanh toán để tính năng `window.print()` vẫn in sắc nét trên khổ giấy in nhiệt K80/A5.
