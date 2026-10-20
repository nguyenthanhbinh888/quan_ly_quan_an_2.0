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

## 4. Hướng dẫn chạy dự án (Getting Started)

### 4.1. Khởi chạy Backend (Spring Boot)
1. Di chuyển vào thư mục backend:
   ```bash
   cd backend
   ```
2. Chạy kiểm thử tự động:
   ```bash
   mvn test
   ```
3. Chạy ứng dụng ở chế độ local:
   ```bash
   mvn spring-boot:run
   ```
   Backend sẽ lắng nghe tại: `http://localhost:8080`  
   Endpoint Health Check: `http://localhost:8080/api/health`

### 4.2. Khởi chạy Frontend (React + TypeScript)
1. Di chuyển vào thư mục frontend:
   ```bash
   cd frontend
   ```
2. Cài đặt các thư viện:
   ```bash
   npm.cmd install
   ```
3. Khởi chạy môi trường Dev:
   ```bash
   npm.cmd run dev
   ```
   Frontend sẽ mở tại: `http://localhost:3000`
4. Đóng gói bản Production:
   ```bash
   npm.cmd run build
   ```

---

## 5. Lộ trình triển khai (14 giai đoạn)

- **Giai đoạn 0:** Chuẩn bị môi trường & Git (Hoàn tất)
- **Giai đoạn 1:** Phân tích yêu cầu (`docs/REQUIREMENTS.md` - Hoàn tất)
- **Giai đoạn 2:** Thiết kế kiến trúc, Database & API (`docs/DATABASE.md`, `docs/API.md` - Hoàn tất)
- **Giai đoạn 3:** Khởi tạo Backend & Frontend skeleton (Hoàn tất)
- **Giai đoạn 4:** Kết nối MySQL & cấu trúc nền tảng Backend (Tiếp theo)
- **Giai đoạn 5:** Xác thực & phân quyền (Spring Security)
- **Giai đoạn 6:** Khung giao diện Frontend & API client
- **Giai đoạn 7:** Quản lý danh mục & món ăn
- **Giai đoạn 8:** Quản lý bàn & đơn hàng
- **Giai đoạn 9:** Thanh toán & hóa đơn
- **Giai đoạn 10:** Dashboard & báo cáo doanh thu
- **Giai đoạn 11:** Kiểm thử tổng thể & rà soát bảo mật
- **Giai đoạn 12:** Đóng gói & triển khai
- **Giai đoạn 13:** Bảo trì & tính năng mở rộng

