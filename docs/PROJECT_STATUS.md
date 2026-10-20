# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 2 — Thiết kế kiến trúc, Database và REST API**

## Completed
- [x] **Giai đoạn 0:** Chuẩn bị môi trường, kiểm tra công cụ, khởi tạo Git và file cấu hình cơ sở.
- [x] **Giai đoạn 1:** Phân tích toàn diện yêu cầu và tạo tài liệu `docs/REQUIREMENTS.md` (Đã được duyệt).
- [x] **Giai đoạn 2:** Thiết kế kiến trúc CSDL và giao tiếp API:
  - Tạo `docs/DATABASE.md`: Sơ đồ ERD (Mermaid), chi tiết 7 bảng (`users`, `categories`, `menu_items`, `dining_tables`, `orders`, `order_items`, `payments`), khóa ngoại, chỉ mục, Snapshot pricing, và quy tắc transaction chống lỗi đồng thời.
  - Tạo `docs/API.md`: Chuẩn hóa hợp đồng REST API (`ApiResponse`, `ApiErrorResponse`), đầy đủ endpoint theo 7 nhóm tài nguyên, đề xuất cấu trúc package Backend (Spring Boot) và Frontend (React TS).

## Tests and commands
- Kiểm tra cú pháp Mermaid ERD trong `docs/DATABASE.md`: Pass.
- Kiểm tra tính nhất quán giữa `docs/REQUIREMENTS.md`, `docs/DATABASE.md` và `docs/API.md`: Pass.

## Known issues
- Không có lỗi kỹ thuật phát sinh.

## Decisions awaiting approval
- Xác nhận nghiệm thu Giai đoạn 2 để bắt đầu **Giai đoạn 3 — Khởi tạo Backend và Frontend skeleton**.

## Next step
Chuyển sang **Giai đoạn 3 — Khởi tạo Backend và Frontend skeleton** (Tạo dự án Spring Boot Maven với health check và dự án React + TypeScript với Vite).
