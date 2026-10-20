# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 1 — Phân tích yêu cầu (Requirements Analysis)**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và file cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md`:
  - Xác định các vai trò: Quản trị viên (`ADMIN`), Nhân viên phục vụ (`STAFF`), Thu ngân (`CASHIER`), Bếp (`KITCHEN`).
  - Lập danh sách 20 Use Cases chuẩn hóa (`UC_01` -> `UC_20`).
  - Thiết kế State Machine chi tiết cho Bàn ăn (`EMPTY`, `OCCUPIED`, `RESERVED`), Đơn hàng (`PENDING`, `PAID`, `CANCELLED`), Dòng món và Hóa đơn.
  - Định nghĩa quy tắc nghiệp vụ tài chính (Snapshot pricing, `BigDecimal`/`DECIMAL`, tính doanh thu, transaction an toàn).
  - Phân chia ranh giới rõ ràng giữa bản MVP và giai đoạn mở rộng.
  - Quy định các yêu cầu phi chức năng (bảo mật, hiệu năng, toàn vẹn dữ liệu).

## Tests and commands
- Kiểm tra tạo file và cấu trúc tài liệu `docs/REQUIREMENTS.md`: Pass.
- Kiểm tra tính nhất quán với lộ trình hướng dẫn: Pass.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
1. **Phân quyền MVP:** Bắt đầu bằng 2 vai trò (`ADMIN` và `STAFF` kiêm thu ngân) hay tách riêng ngay 4 vai trò?
2. **Hình ảnh món ăn:** Sử dụng Image URL (hoặc static asset) cho MVP hay triển khai file upload multipart ngay từ đầu?
3. **Phương thức thanh toán:** Chấp nhận Tiền mặt + Quét mã QR tĩnh của quán (xác nhận thủ công) cho phiên bản MVP?

## Next step
Chủ quán duyệt 3 quyết định trên -> Nghiệm thu Giai đoạn 1 -> Chuyển sang **Giai đoạn 2: Thiết kế kiến trúc, database (ERD) và REST API** (`docs/DATABASE.md`, `docs/API.md`).
