# Project Status - Tiến Độ Dự Án Quản Lý Quán Ăn

## Current phase
**Giai đoạn 0 — Chuẩn bị môi trường và Git**

## Completed
- [x] Kiểm tra và xác minh phiên bản các công cụ phát triển cần thiết (JDK 21, Maven 3.9, Node.js 24, npm 11, MySQL 8.0, Git 2.55).
- [x] Khởi tạo Git repository (`git init`).
- [x] Tạo `.gitignore` bảo vệ mã nguồn, chống lộ secrets (`.env`, credentials) và chặn commit `node_modules`, `target`, file build.
- [x] Tạo `README.md` mô tả dự án, kiến trúc công nghệ và cấu trúc thư mục đề xuất.
- [x] Khởi tạo hệ thống theo dõi tiến độ `docs/PROJECT_STATUS.md`.

## Tests and commands
- `git init`: Pass (Khởi tạo kho chứa Git thành công).
- `java -version`: Pass (Oracle OpenJDK 21.0.12 LTS).
- `mvn -version`: Pass (Apache Maven 3.9.16).
- `node -v`: Pass (Node.js v24.21.0).
- `npm.cmd -v`: Pass (npm 11.19.0).
- `mysql --version`: Pass (MySQL Server 8.0.46 Win64).
- `git status`: Pass (Kiểm tra trạng thái cây thư mục).

## Known issues
- **Lưu ý PowerShell trên Windows:** Nếu gõ `npm` trực tiếp bị lỗi *PSSecurityException* (chặn file script `.ps1`), có thể chạy lệnh bằng `npm.cmd` hoặc mở PowerShell cấp quyền: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Decisions awaiting approval
- Xác nhận cấu trúc thư mục đề xuất: `backend/`, `frontend/`, `docs/`.
- Xác nhận nghiệm thu Giai đoạn 0 để chuyển sang Giai đoạn 1.

## Next step
Chuyển sang **Giai đoạn 1 — Phân tích yêu cầu** (Tạo `docs/REQUIREMENTS.md` chi tiết các use case, vai trò, trạng thái bàn/đơn, quy tắc tính tiền).
