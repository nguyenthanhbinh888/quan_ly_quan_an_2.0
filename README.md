# Hệ Thống Quản Lý Quán Ăn (Restaurant Management System)

Hệ thống phần mềm hỗ trợ vận hành và quản lý hoạt động quán ăn toàn diện từ gọi món tại bàn, chế biến, thanh toán, đến báo cáo thống kê doanh thu.

---

## 1. Công nghệ sử dụng (Tech Stack)

- **Backend:** Java (JDK 21 LTS), Spring Boot 3.x, Spring Data JPA, Spring Security, Flyway Migration, Maven.
- **Frontend:** React.js + TypeScript, HTML5 / Vanilla CSS, Vite.
- **Database:** MySQL 8.0+.
- **Version Control:** Git.
- **Môi trường triển khai:** Ưu tiên local development & testing; đóng gói Docker / Docker Compose cho production.

---

## 2. Cấu trúc thư mục dự án

```text
quan_ly_quan_an/
├── backend/                  # Mã nguồn Spring Boot REST API
├── frontend/                 # Mã nguồn React + TypeScript
├── docs/                     # Tài liệu kỹ thuật & quản lý tiến độ
│   ├── REQUIREMENTS.md       # Phân tích yêu cầu & use case
│   ├── DATABASE.md           # Thiết kế ERD, schema, migration
│   ├── API.md                # Quy chuẩn REST API contract
│   ├── TEST_PLAN.md          # Kế hoạch & kết quả kiểm thử
│   ├── PROJECT_STATUS.md     # Báo cáo tiến độ nghiệm thu từng giai đoạn
│   └── DEPLOYMENT.md         # Hướng dẫn đóng gói & triển khai
├── .gitignore                # Chặn commit secret, build output, dependencies
└── README.md                 # Giới thiệu & hướng dẫn chung
```

---

## 3. Yêu cầu môi trường phát triển (Prerequisites)

- **Java JDK:** 21 LTS (`java -version`)
- **Apache Maven:** 3.9+ (`mvn -version`) hoặc dùng Maven Wrapper (`./mvnw`)
- **Node.js & npm:** Node LTS v20+ (`node -v`, `npm.cmd -v`)
- **MySQL Server:** 8.0+ (`mysql --version`)
- **Git:** 2.x+ (`git --version`)

---

## 4. Tài khoản kiểm thử mặc định (Local Test Accounts)

| Tài khoản (Username) | Mật khẩu (Password) | Vai trò (Role) | Quyền hạn |
|---|---|---|---|
| `admin` | `Admin123@` | `ADMIN` | Toàn quyền quản trị thực đơn, bàn, nhân viên, báo cáo |
| `staff01` | `Admin123@` | `STAFF` | Nhân viên phục vụ gọi món, mở bàn, kiểm tra đơn |

---

## 5. Hướng dẫn chạy dự án (Getting Started)

### Cách 1: Khởi chạy nhanh bằng 1-Click Script (Khuyến khích)
Tại thư mục gốc dự án:
- Nhấp đúp chuột vào file **`start-all.bat`** để tự động khởi chạy cả Backend (port 8080) và Frontend (port 3000).
- Hoặc chạy độc lập: `start-backend.bat` / `start-frontend.bat`.

### Cách 2: Khởi chạy bằng Dòng Lệnh Thủ Công
1. **Khởi chạy Backend:**
   ```bash
   cd backend
   mvn spring-boot:run
   # hoặc chạy trực tiếp file JAR:
   java -jar target/restaurant-backend-0.0.1-SNAPSHOT.jar
   ```
   Backend lắng nghe tại: `http://localhost:8080` (Health: `/api/health`)

2. **Khởi chạy Frontend:**
   ```bash
   cd frontend
   npm.cmd run dev
   ```
   Frontend giao diện mở tại: `http://localhost:3000`

3. **Khởi chạy trọn gói qua Docker Compose:**
   ```bash
   docker compose up -d
   ```

*Xem chi tiết hướng dẫn vận hành, sao lưu và xử lý sự cố tại:* [`docs/DEPLOYMENT.md`](file:///c:/Users/Admin/.gemini/antigravity-ide/scratch/quan_ly_quan_an/docs/DEPLOYMENT.md).

---

## 6. Lộ trình triển khai (Project Roadmap)

- [x] **Giai đoạn 0:** Chuẩn bị môi trường & Git
- [x] **Giai đoạn 1:** Phân tích yêu cầu (`docs/REQUIREMENTS.md`)
- [x] **Giai đoạn 2:** Thiết kế kiến trúc, Database & API (`docs/DATABASE.md`, `docs/API.md`)
- [x] **Giai đoạn 3:** Khởi tạo Backend & Frontend skeleton
- [x] **Giai đoạn 4:** Kết nối MySQL & cấu trúc nền tảng Backend
- [x] **Giai đoạn 5:** Xác thực & phân quyền (Spring Security & JWT)
- [x] **Giai đoạn 6:** Khung giao diện Frontend & API client
- [x] **Giai đoạn 7:** Quản lý danh mục & món ăn
- [x] **Giai đoạn 8:** Quản lý bàn & đơn hàng (POS)
- [x] **Giai đoạn 9:** Thanh toán & hóa đơn (Tiền mặt / QR VietQR)
- [x] **Giai đoạn 10:** Dashboard & báo cáo doanh thu
- [x] **Giai đoạn 11:** Kiểm thử tổng thể & rà soát bảo mật (`docs/TEST_PLAN.md`, 42/42 tests PASS)
- [x] **Giai đoạn 12:** Đóng gói & triển khai (`docs/DEPLOYMENT.md`, JAR, Dockerfile, Docker Compose, 1-Click scripts)
- [ ] **Giai đoạn 13:** Bảo trì & tính năng mở rộng


