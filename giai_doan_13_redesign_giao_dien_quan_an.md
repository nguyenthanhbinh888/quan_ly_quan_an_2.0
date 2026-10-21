# Giai đoạn 13 — Thiết kế lại toàn bộ giao diện website quản lý quán ăn

> **Mục tiêu:** Nâng cấp giao diện hiện tại để sáng sủa, chuyên nghiệp, nhất quán và có cảm giác được thiết kế có chủ đích — không giống giao diện AI tạo tự động, không tối nặng nề, không lạm dụng gradient, card bo tròn hoặc hiệu ứng trang trí.
>
> **Stack:** React.js + TypeScript, HTML/CSS; Backend Java Spring Boot; database MySQL.
>
> **Nguyên tắc:** Đây là một đợt redesign UI/UX trên ứng dụng đang tồn tại, không phải xây lại dự án từ đầu. Giữ nguyên nghiệp vụ, API, dữ liệu và phân quyền đang hoạt động.

## 1. Cách giao việc cho Antigravity

Thực hiện theo từng bước. Trước tiên yêu cầu Antigravity kiểm tra giao diện hiện tại và lập kế hoạch redesign, chưa sửa code ngay. Sau khi duyệt kế hoạch, triển khai theo từng nhóm màn hình và kiểm thử sau mỗi nhóm.

### Prompt khởi động

Sao chép prompt sau vào Antigravity:

```text
Tôi muốn redesign toàn bộ giao diện của website quản lý quán ăn hiện tại vì giao diện đang xấu, quá tối, thiếu tính chuyên nghiệp và trông giống sản phẩm AI tạo tự động.

Đây là redesign UI/UX của dự án đang tồn tại, KHÔNG phải tạo một dự án mới.

Stack hiện tại:
- Frontend: React.js + TypeScript, HTML/CSS.
- Backend: Java + Spring Boot.
- Database: MySQL.

MỤC TIÊU THIẾT KẾ
- Sáng, thoáng, sạch sẽ, chuyên nghiệp, dễ sử dụng.
- Phù hợp với phần mềm quản lý nhà hàng/quán ăn thực tế.
- Phân cấp thị giác rõ ràng, typography tốt, khoảng cách nhất quán.
- Tông màu sáng làm mặc định; không dùng nền đen/xám đậm làm chủ đạo.
- Tinh tế, thực dụng, không phô trương, không giống landing page quảng cáo.
- Tránh phong cách dashboard AI đại trà: gradient nhiều màu, nền kính mờ, quá nhiều card bo tròn, đổ bóng dày, icon trang trí vô nghĩa, tiêu đề quá lớn, mọi thành phần đều nằm trong card.
- Không dùng emoji làm icon giao diện. Ưu tiên bộ icon thống nhất đã có trong dự án; nếu chưa có, đề xuất thư viện phù hợp trước khi cài.
- Không dùng dữ liệu giả như thể là dữ liệu thật.

QUY TẮC BẮT BUỘC
1. Trước khi sửa code, kiểm tra cấu trúc frontend, route, layout, component dùng chung, CSS, thư viện UI và các màn hình hiện có.
2. Lập danh sách màn hình và mô tả vấn đề UX/UI hiện tại.
3. Đề xuất design system cụ thể: màu sắc, typography, spacing, border, radius, shadow, trạng thái tương tác, button, input, table, modal và responsive.
4. Đưa ra kế hoạch theo từng nhóm màn hình và danh sách file dự kiến thay đổi.
5. Không sửa Backend, API, schema database hoặc quy tắc nghiệp vụ chỉ để làm đẹp giao diện.
6. Không xóa chức năng đang hoạt động. Không thay URL route, tên field API hoặc quy trình nghiệp vụ nếu không có lý do được duyệt.
7. Không thay toàn bộ CSS bằng một bộ CSS mới mà không kiểm tra ảnh hưởng đến component hiện tại.
8. Không thêm thư viện lớn hoặc thay UI framework trước khi giải thích lợi ích và rủi ro.
9. Ưu tiên tái sử dụng component và token thiết kế, tránh CSS trùng lặp và selector toàn cục gây lỗi.
10. Sau mỗi nhóm màn hình, chạy lint, test và build hiện có; kiểm tra desktop, tablet và mobile.
11. Nếu có browser/preview, mở từng route và kiểm tra trước/sau. Không tuyên bố đã kiểm tra trực quan nếu chưa thực sự mở giao diện.
12. Nếu thiếu thông tin hoặc có nhiều hướng thiết kế, hãy đưa ra phương án và hỏi tôi trước khi triển khai diện rộng.

TRƯỚC MẮT CHỈ THỰC HIỆN:
- Audit UI hiện tại.
- Đề xuất design direction.
- Đề xuất design tokens.
- Lập danh sách màn hình, component cần sửa.
- Lập kế hoạch triển khai và kiểm thử.

Chưa chỉnh sửa file nào cho đến khi tôi duyệt kế hoạch.
```

## 2. Định hướng thiết kế đề xuất

### Phong cách tổng thể

**Light editorial + modern restaurant operations**: giao diện sáng, bố cục gọn, typography rõ, màu nhấn có chủ đích, ưu tiên tốc độ thao tác và khả năng đọc dữ liệu.

Đây là phần mềm vận hành, không phải trang giới thiệu nhà hàng. Thiết kế phải tối ưu cho nhân viên thao tác liên tục, đọc bảng dữ liệu, xử lý đơn và tìm thông tin nhanh.

### Bảng màu gợi ý

Dùng màu nền sáng và trung tính. Màu nhấn có thể là xanh lá trầm hoặc xanh teal nhẹ. Đây là định hướng ban đầu; Antigravity cần đối chiếu giao diện thực tế trước khi áp dụng.

| Token | Màu gợi ý | Mục đích |
|---|---|---|
| `--color-bg` | `#F7F8F6` | Nền tổng thể sáng nhẹ |
| `--color-surface` | `#FFFFFF` | Bề mặt chính, form và panel |
| `--color-text` | `#202923` | Nội dung chính |
| `--color-muted` | `#68736B` | Nội dung phụ |
| `--color-border` | `#E3E8E3` | Viền nhẹ |
| `--color-primary` | `#2F6B4F` | Nút chính và điểm nhấn |
| `--color-primary-hover` | `#25563F` | Trạng thái hover |
| `--color-primary-soft` | `#EAF3ED` | Nền nhấn nhẹ |
| `--color-success` | `#287A50` | Thành công |
| `--color-warning` | `#9A6414` | Cảnh báo |
| `--color-danger` | `#B33A3A` | Lỗi, thao tác nguy hiểm |
| `--color-info` | `#356C9A` | Thông tin |

Các màu trên chỉ là giá trị khởi đầu. Kiểm tra contrast và trạng thái disabled/hover/focus trước khi chốt.

### Typography

- Ưu tiên font dễ đọc và hỗ trợ tiếng Việt tốt.
- Nếu dự án đã có font phù hợp, đánh giá trước khi thay.
- Có thể dùng `Inter` hoặc font sans-serif hệ thống; tránh tải nhiều font và nhiều biến thể không cần thiết.
- Nội dung thường khoảng 14–16 px; nhãn và mô tả không nên quá nhỏ; tiêu đề rõ nhưng không quá lớn.
- Không dùng quá nhiều kiểu chữ đậm, chữ in hoa hoặc màu sắc để nhấn cùng lúc.
- Kiểm tra dấu tiếng Việt, số tiền, ngày tháng và tên món dài.

### Bố cục

- Sidebar sáng, gọn, có trạng thái mục đang chọn rõ ràng.
- Header vừa đủ cao, ưu tiên tiêu đề trang, thông tin người dùng và thao tác cần thiết.
- Nội dung căn theo hệ thống spacing nhất quán.
- Không bọc mọi vùng nội dung trong card. Dùng khoảng trắng, đường phân cách và nhóm nội dung để tạo cấu trúc.
- Bảng dữ liệu dễ quét bằng mắt, hàng tiêu đề rõ, chiều cao hàng hợp lý và trạng thái hover nhẹ.
- Dùng card khi có mục đích cụ thể như số liệu tổng quan hoặc nhóm thông tin độc lập.
- Modal dành cho thao tác ngắn; biểu mẫu dài nên có trang riêng hoặc panel phù hợp.
- Giữ thao tác chính ở vị trí dễ tìm và nhất quán giữa các trang.

### Radius, border và shadow

- Dùng radius nhỏ đến vừa, có hệ thống; không bo tròn mọi thứ như viên thuốc.
- Ưu tiên border mảnh, shadow rất nhẹ hoặc không dùng shadow.
- Chỉ dùng nút dạng pill khi phù hợp, chẳng hạn bộ lọc hoặc badge trạng thái.
- Không dùng hiệu ứng kính mờ, gradient lớn hoặc animation gây phân tâm.

## 3. Audit toàn bộ màn hình trước khi thiết kế

Antigravity cần tìm tất cả route, page và component để tránh chỉ sửa dashboard.

Rà soát các nhóm sau nếu dự án đã có:

1. Đăng nhập/đăng xuất.
2. Dashboard.
3. Danh sách và form danh mục món ăn.
4. Danh sách và form món ăn.
5. Sơ đồ bàn ăn và trạng thái bàn.
6. Danh sách đơn hàng.
7. Chi tiết đơn hàng và thao tác gọi món.
8. Thanh toán và hóa đơn.
9. Lịch sử hóa đơn.
10. Báo cáo doanh thu.
11. Quản lý nhân viên/tài khoản và phân quyền.
12. Trang lỗi, loading, empty state và access denied.

Không tự tạo màn hình chưa có chỉ để bản audit trông đầy đủ. Ghi trạng thái từng màn hình là `EXISTS`, `MISSING` hoặc `NOT IN SCOPE`.

### Prompt audit

```text
Tiếp tục audit giao diện dự án hiện tại. Chưa thay đổi mã nguồn.

Hãy:
1. Tìm các route, page, layout, component dùng chung, stylesheet và thư viện giao diện.
2. Lập bảng route → màn hình → component chính → vấn đề hiện tại → mức ưu tiên.
3. Kiểm tra sự nhất quán về màu sắc, font, spacing, radius, shadow, button, input, bảng, modal, badge và icon.
4. Kiểm tra UX: phân cấp thị giác, số bước thao tác, thông báo lỗi, loading, empty state, responsive và nội dung tiếng Việt dài.
5. Phân loại lỗi: P0 (cản trở thao tác), P1 (ảnh hưởng lớn), P2 (không nhất quán/thẩm mỹ), P3 (tinh chỉnh).
6. Xác định CSS/component có nguy cơ ảnh hưởng nhiều trang.
7. Đọc mã nguồn thực tế, không suy đoán từ tên file.
8. Nếu browser preview có sẵn, kiểm tra trực tiếp route. Nếu không thể preview, ghi rõ giới hạn.

Tạo docs/UI_AUDIT.md, gồm danh sách route, vấn đề và bằng chứng, mức ưu tiên, component có thể tái sử dụng, rủi ro và thứ tự sửa.

Chưa chỉnh sửa mã nguồn cho tới khi tôi duyệt.
```

## 4. Xây dựng design system trước khi sửa từng trang

### Thành phần cần chuẩn hóa

- Color tokens.
- Typography scale.
- Spacing scale.
- Border, radius và shadow.
- Button: primary, secondary, ghost, danger.
- Input, select, textarea, checkbox.
- Table và pagination.
- Badge/trạng thái.
- Modal/dialog.
- Toast/notification.
- Dropdown/menu.
- Loading.
- Empty state và error state.
- Confirm dialog.
- Sidebar, header và page container.

Nên dùng CSS variables hoặc hệ thống token phù hợp với cấu trúc hiện tại. Không tạo một file CSS khổng lồ chứa mọi thứ nếu dự án đã có cấu trúc tốt.

### Prompt thiết kế design system

```text
Dựa trên docs/UI_AUDIT.md, hãy đề xuất design system cho toàn bộ ứng dụng.

Yêu cầu:
1. Tông sáng, trung tính, chuyên nghiệp, phù hợp phần mềm quản lý quán ăn.
2. Màu nhấn có chủ đích; không dùng gradient trang trí.
3. Định nghĩa token cho màu, font, cỡ chữ, spacing, radius, border, shadow, focus ring và trạng thái.
4. Chuẩn hóa Button, Input, Select, Table, Badge, Modal, Toast, Loading, Empty state và Error state.
5. Đề xuất responsive cho desktop, tablet và mobile.
6. Kiểm tra contrast và trạng thái focus bằng bàn phím.
7. Ưu tiên tái sử dụng component hiện có; không tạo component trùng chức năng.
8. Không cài thư viện mới hoặc thay framework khi chưa có lý do rõ ràng.
9. Nêu file cụ thể dự kiến tạo/sửa và cách tránh phá vỡ layout hiện tại.

Tạo docs/UI_DESIGN_SYSTEM.md trước. Chưa triển khai code cho đến khi tôi duyệt.
```

### Tiêu chí nghiệm thu design system

- [ ] Có bảng màu thống nhất.
- [ ] Có typography và spacing scale.
- [ ] Trạng thái thành công, cảnh báo, lỗi và thông tin phân biệt rõ.
- [ ] Component cơ bản có hover, focus, disabled và loading phù hợp.
- [ ] Có quy tắc responsive và accessibility.
- [ ] Không có quyết định thay đổi stack chưa được duyệt.

## 5. Triển khai redesign theo từng nhóm

Không sửa toàn bộ giao diện trong một lượt. Triển khai theo thứ tự dưới đây.

### Nhóm A — Nền tảng giao diện

Phạm vi: CSS variables/design tokens, font, layout tổng thể, sidebar, header, vùng nội dung, button, input, table, badge và modal dùng chung.

```text
Triển khai nhóm A theo docs/UI_DESIGN_SYSTEM.md đã được duyệt.

Trước khi sửa, xác nhận file/component dùng chung, nêu file sẽ thay đổi và ảnh hưởng dự kiến.

Khi thực hiện:
- Thêm/cập nhật design tokens tập trung.
- Làm sáng nền và bề mặt, cải thiện phân cấp thị giác.
- Chuẩn hóa sidebar, header, page container và component dùng chung.
- Không dùng CSS global quá rộng gây thay đổi ngoài ý muốn.
- Giữ nguyên API, nghiệp vụ và hành vi.
- Không thay route hoặc xóa chức năng.
- Tránh gradient, glassmorphism, shadow nặng, radius quá lớn và animation không cần thiết.

Sau khi sửa, chạy lint/test/build hiện có, kiểm tra các trang dùng component chung và ghi rõ lỗi hoặc chỗ chưa kiểm tra trực quan. Cập nhật docs/PROJECT_STATUS.md.
```

**Nghiệm thu:** layout nhất quán, màu sáng, không tràn nội dung, không làm hỏng trang cũ.

### Nhóm B — Đăng nhập và dashboard

```text
Redesign trang đăng nhập và dashboard theo design system đã duyệt.

- Giao diện gọn, dễ đọc, chuyên nghiệp; không biến dashboard thành landing page.
- Ưu tiên số liệu quan trọng, thứ bậc nội dung rõ ràng.
- Chỉ giữ KPI có ý nghĩa vận hành.
- Không dùng số liệu giả như dữ liệu thật.
- Không dùng biểu đồ chỉ để trang trí.
- Nhãn, số tiền, ngày tháng và trạng thái phải dễ đọc.
- Trang đăng nhập có trạng thái lỗi/loading và phù hợp màn hình nhỏ.
- Không thay API xác thực, quy tắc bảo mật hoặc logic tính KPI.

Chạy test/build và kiểm tra trực quan nếu browser preview khả dụng. Báo cáo từng trang đạt/chưa đạt.
```

**Nghiệm thu:** thông tin quan trọng dễ nhận biết, không có KPI giả, đăng nhập vẫn hoạt động.

### Nhóm C — Thực đơn và danh mục

```text
Redesign các trang quản lý món ăn và danh mục.

- Bảng/danh sách dễ quét, không quá nhiều card.
- Tên món, danh mục, giá và trạng thái có thứ bậc rõ.
- Bộ lọc và tìm kiếm ở vị trí dễ thấy.
- Form có label rõ, nhóm trường hợp lý, thông báo lỗi gần trường nhập.
- Thao tác xóa/ngừng bán phải phân biệt rõ và có xác nhận khi cần.
- Hiển thị ảnh món nếu dự án đã có dữ liệu ảnh; xử lý ảnh thiếu bằng fallback tinh tế.
- Bảo toàn CRUD, validation, phân trang, API và quyền hiện có.
- Không đổi cấu trúc dữ liệu chỉ để phục vụ thiết kế.

Kiểm tra tên món dài, giá tiền, danh mục rỗng và màn hình nhỏ.
```

**Nghiệm thu:** CRUD không bị mất, form dễ hiểu, dữ liệu không bị che khuất.

### Nhóm D — Bàn ăn và gọi món

Đây là khu vực thao tác thường xuyên nên ưu tiên tính thực dụng.

```text
Redesign màn hình bàn ăn và gọi món, ưu tiên tốc độ thao tác tại quán.

- Trạng thái bàn phải phân biệt bằng nhãn/chữ và màu, không chỉ dựa vào màu.
- Dùng màu sáng, tương phản tốt; tránh biến mỗi bàn thành card lớn bo tròn quá mức.
- Phân cấp rõ giữa khu vực bàn, chi tiết đơn, danh sách món và tổng tiền.
- Thao tác thêm món, tăng/giảm số lượng và xem đơn phải dễ tìm.
- Nút chính nhất quán, tránh nhiều nút cùng nổi bật.
- Hiển thị loading và ngăn gửi lặp khi đang xử lý.
- Trên tablet, vùng chạm đủ lớn.
- Không thay đổi trạng thái nghiệp vụ, API, cách tính tiền hoặc quyền truy cập.
- Hỗ trợ tên món dài, nhiều món và đơn có ghi chú.

Kiểm tra luồng từ chọn bàn đến cập nhật đơn. Báo rõ những bước đã thử.
```

**Nghiệm thu:** nhân viên phân biệt trạng thái bàn nhanh, thao tác không rối và không mất chức năng gọi món.

### Nhóm E — Đơn hàng, thanh toán và hóa đơn

```text
Redesign danh sách đơn hàng, chi tiết đơn, thanh toán và hóa đơn.

- Trạng thái đơn và trạng thái thanh toán dễ phân biệt.
- Tổng tiền, giảm giá và số tiền cần trả nổi bật vừa đủ.
- Thao tác thanh toán/hủy có xác nhận phù hợp.
- Trạng thái đã thanh toán, chưa thanh toán, đã hủy nhất quán trên mọi trang.
- Bảng lịch sử dễ đọc, hỗ trợ nội dung dài và responsive.
- Hóa đơn có thứ bậc rõ, phù hợp xem trên màn hình và in nếu tính năng in hiện có.
- Không tự tạo số hóa đơn hoặc dữ liệu thanh toán giả.
- Không thay phép tính tiền, giao dịch, API, transaction hoặc quy tắc nghiệp vụ.
- Tránh đặt thao tác nguy hiểm sát nút thường dùng gây nhấn nhầm.

Chạy test liên quan và kiểm tra lại luồng thanh toán sau redesign.
```

**Nghiệm thu:** dễ xác định số tiền và trạng thái; thao tác thanh toán không bị thay đổi.

### Nhóm F — Nhân viên, tài khoản và báo cáo

```text
Redesign các màn hình quản lý nhân viên, tài khoản, phân quyền và báo cáo hiện có.

- Bảng dữ liệu rõ ràng, lọc và tìm kiếm dễ dùng.
- Quyền hạn và trạng thái tài khoản không mơ hồ.
- Không làm lộ dữ liệu nhạy cảm.
- Form tạo/sửa nhân viên có label và thông báo lỗi rõ.
- Báo cáo có tiêu đề, đơn vị, bộ lọc ngày và trạng thái tải/lỗi.
- Biểu đồ dễ đọc, có nhãn/tooltip hợp lý, không dùng quá nhiều màu.
- Không thay phép tính báo cáo hoặc phân quyền.
- Không tự thêm màn hình/chức năng chưa tồn tại mà chưa hỏi tôi.

Kiểm tra quyền của từng vai trò và hiển thị trên màn hình nhỏ.
```

**Nghiệm thu:** bảng và báo cáo thống nhất, phân quyền vẫn đúng.

### Nhóm G — Hoàn thiện trạng thái và responsive

```text
Thực hiện vòng hoàn thiện UI/UX cho toàn bộ route sau khi các nhóm A–F đã được nghiệm thu.

Kiểm tra:
1. Loading, empty state, error state, success feedback và disabled state.
2. Responsive trên desktop, tablet và mobile.
3. Bảng rộng, tên món dài, nội dung tiếng Việt, form dài, modal và dropdown.
4. Focus ring, điều hướng bàn phím, label input và contrast.
5. Khoảng cách, typography, màu sắc, radius và icon giữa các trang.
6. CSS overflow, nội dung bị che, nút quá nhỏ hoặc thao tác khó chạm.
7. Route còn dùng style cũ.

Chỉ sửa lỗi UI/UX; không đổi nghiệp vụ/API/database. Chạy lint, test và build. Nếu có browser preview, kiểm tra trực tiếp từng route; ghi rõ route chưa thể kiểm tra.
```

**Nghiệm thu:** các route có phong cách nhất quán, responsive và không có lỗi hiển thị nghiêm trọng.

## 6. Checklist tránh giao diện “AI nghiệp dư”

### Tránh

- Gradient tím/xanh hoặc gradient nhiều màu không có ý nghĩa.
- Nền đen/xám đậm làm nền chính khi mục tiêu là giao diện sáng.
- Mọi khu vực đều nằm trong card bo tròn lớn.
- Shadow dày, glow, glassmorphism và hover phô trương.
- Quá nhiều màu nhấn trên cùng màn hình.
- Emoji hoặc icon từ nhiều bộ không đồng nhất.
- Tiêu đề khổng lồ, khoảng trắng vô lý hoặc nội dung dàn trải.
- Card KPI chỉ để lấp đầy dashboard.
- Quá nhiều kiểu nút, màu và bán kính.
- Badge cho mọi đoạn text.
- Biểu đồ trang trí không giúp ra quyết định.
- Placeholder thay cho label.
- Dữ liệu giả, nút không hoạt động hoặc link dẫn đến trang rỗng.
- Chỉ làm đẹp desktop mà bỏ qua tablet/mobile.
- CSS `!important` tràn lan để vá xung đột.
- Thêm thư viện mới chỉ để làm một hiệu ứng đơn giản.

### Nên làm

- Mỗi trang có một mục tiêu chính và thao tác chính rõ ràng.
- Dùng một màu nhấn, màu trạng thái và hệ trung tính nhất quán.
- Dùng khoảng trắng và đường phân cách để tổ chức nội dung.
- Căn lề, chiều cao input/nút và khoảng cách nhất quán.
- Dùng icon cùng một bộ và cùng kích thước.
- Bảng có hàng tiêu đề, căn chỉnh số tiền hợp lý và trạng thái dễ quét.
- Form có label, helper text và lỗi đặt đúng vị trí.
- Ưu tiên tốc độ thao tác, tính đọc được và phản hồi rõ ràng.
- Giữ giao diện phù hợp phần mềm vận hành, không cố làm mọi trang “ấn tượng”.
- Chỉ dùng hình ảnh món ăn khi hỗ trợ nghiệp vụ và có nguồn dữ liệu phù hợp.

## 7. Kiểm tra trực quan bằng Antigravity

Nếu Antigravity có khả năng mở ứng dụng bằng browser/preview, yêu cầu kiểm tra giao diện thật. Đừng chỉ đánh giá dựa trên mã CSS.

### Quy trình

1. Chạy Backend và Frontend theo hướng dẫn dự án.
2. Đăng nhập bằng tài khoản thử nghiệm hợp lệ.
3. Mở lần lượt từng route.
4. Kiểm tra trạng thái có dữ liệu và không có dữ liệu.
5. Thử validation, modal, dropdown, toast và thao tác chính.
6. Kiểm tra desktop, tablet và mobile.
7. Ghi nhận lỗi cụ thể và sửa từng nhóm.
8. Chụp ảnh trước/sau nếu công cụ hỗ trợ, đặt tên theo route và kích thước màn hình.

### Prompt kiểm tra trực quan

```text
Hãy chạy ứng dụng và kiểm tra giao diện thực tế bằng browser/preview nếu môi trường hỗ trợ.

Với mỗi route:
- Mở trang, kiểm tra bố cục.
- Kiểm tra tiêu đề, typography, màu, spacing, alignment và tương phản.
- Kiểm tra hover, focus, loading, error, empty và disabled nếu có.
- Thử thao tác chính để xác nhận UI không làm hỏng chức năng.
- Kiểm tra viewport desktop, tablet và mobile.
- Ghi lỗi theo route, bước tái hiện và mức độ ưu tiên.
- Sửa theo từng nhóm, sau đó mở lại trang để xác minh.

Không ghi “đã kiểm tra trực quan” nếu chỉ đọc mã nguồn mà không mở giao diện. Nếu không thể dùng browser/preview, ghi rõ giới hạn và hướng dẫn tôi tự kiểm tra.
```

## 8. Kiểm thử hồi quy sau redesign

Sau mỗi nhóm, kiểm tra ít nhất:

- [ ] Đăng nhập và đăng xuất.
- [ ] Điều hướng giữa các route.
- [ ] Phân quyền theo vai trò.
- [ ] Tìm kiếm và lọc.
- [ ] Tạo/sửa/ngừng bán món.
- [ ] Chọn bàn và cập nhật đơn.
- [ ] Tổng tiền hiển thị khớp API.
- [ ] Thanh toán và xem hóa đơn.
- [ ] Dashboard/báo cáo lấy dữ liệu thật.
- [ ] Loading, error và empty state.
- [ ] Responsive, không có horizontal overflow ngoài chủ đích.
- [ ] Không có lỗi mới trong console.
- [ ] Build, lint và test thành công.

### Prompt nghiệm thu cuối giai đoạn

```text
Hãy nghiệm thu toàn bộ giai đoạn redesign UI/UX.

1. Đối chiếu từng route với docs/UI_AUDIT.md.
2. Kiểm tra tuân thủ docs/UI_DESIGN_SYSTEM.md.
3. Chạy lint, test và build Frontend; chạy test Backend liên quan nếu có ảnh hưởng tích hợp.
4. Kiểm tra luồng nghiệp vụ quan trọng để bảo đảm redesign không làm hỏng chức năng.
5. Nếu browser preview có sẵn, mở từng route và kiểm tra trực quan; ghi route và viewport đã kiểm tra.
6. Phân loại từng tiêu chí: PASS, FAIL hoặc NOT TESTED.
7. Kiểm tra git diff, loại bỏ thay đổi ngoài phạm vi và xác nhận không có secret.
8. Cập nhật docs/PROJECT_STATUS.md, docs/UI_AUDIT.md và docs/UI_DESIGN_SYSTEM.md nếu cần.
9. Báo cáo trang đã redesign, component thay đổi, test đã chạy, lỗi còn lại và việc chưa kiểm tra.
10. Không tự commit nếu tôi chưa yêu cầu; không tuyên bố hoàn thành khi còn lỗi nghiêm trọng.

Không thay đổi API, database hoặc quy tắc nghiệp vụ để làm UI dễ triển khai hơn.
```

## 9. Tiêu chí hoàn thành giai đoạn 13

- [ ] Tất cả route hiện có đã được audit.
- [ ] Design system được thống nhất và áp dụng nhất quán.
- [ ] Giao diện sáng, dễ đọc, không còn tông tối làm chủ đạo nếu không có lý do nghiệp vụ.
- [ ] Không còn gradient, shadow, radius và card trang trí quá mức.
- [ ] Sidebar, header, form, table, modal, button và trạng thái thống nhất.
- [ ] Các màn hình vận hành quan trọng dễ thao tác hơn.
- [ ] Không mất chức năng, route, API hoặc phân quyền.
- [ ] Không có dữ liệu giả được trình bày như dữ liệu thật.
- [ ] Responsive trên các kích thước mục tiêu.
- [ ] Lint, test và build có kết quả được ghi nhận.
- [ ] Route quan trọng được kiểm tra trực quan hoặc ghi rõ chưa thể kiểm tra.
- [ ] Tài liệu audit, design system và trạng thái dự án được cập nhật.
- [ ] Lỗi còn lại được ghi rõ.

## 10. Cách bắt đầu ngay

1. Mở dự án hiện tại trong Antigravity.
2. Sao chép **Prompt khởi động** ở mục 1.
3. Để Antigravity audit và lập kế hoạch, chưa cho sửa code.
4. Xem `docs/UI_AUDIT.md` và `docs/UI_DESIGN_SYSTEM.md`, duyệt định hướng màu sắc và bố cục.
5. Triển khai nhóm A, nghiệm thu rồi mới sang nhóm B, C, D, E, F và G.
6. Chạy kiểm thử hồi quy và nghiệm thu cuối giai đoạn.

**Lưu ý:** Màu sắc trong tài liệu là định hướng ban đầu. Antigravity phải khảo sát code và giao diện thực tế trước khi quyết định chi tiết. Mục tiêu không chỉ là “đổi màu sáng”, mà là tạo ra hệ thống giao diện nhất quán, dễ đọc, thao tác nhanh và phù hợp với công việc quản lý quán ăn.
