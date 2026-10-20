# Hướng Dẫn Vận Hành & Khởi Chạy Local Hoàn Chỉnh (Deployment & Local Operations Guide)

Tài liệu này hướng dẫn chi tiết cách khởi chạy, vận hành và quản lý hệ thống **Quản Lý Quán Ăn** trên môi trường máy tính nội bộ (Local Environment).

---

## 1. Kiến Trúc Vận Hành Hệ Thống

Hệ thống hoạt động theo mô hình 3 lớp (3-tier Architecture):

```text
┌─────────────────────────────────┐
│     Trình Duyệt (Web Browser)   │
│      http://localhost:3000      │
└───────────────┬─────────────────┘
                │ HTTP / REST / JSON (Bearer JWT)
                ▼
┌─────────────────────────────────┐
│   Frontend React 18 + TS Vite   │ ◄── [Cổng 3000]
└───────────────┬─────────────────┘
                │ API Requests (/api/*)
                ▼
┌─────────────────────────────────┐
│  Backend Spring Boot 3.3.4 JAR  │ ◄── [Cổng 8080]
│     (Java 21 LTS, Flyway)       │
└───────────────┬─────────────────┘
                │ JDBC / JPA Connection Pool (HikariCP)
                ▼
┌─────────────────────────────────┐
│         MySQL Server 8.0        │ ◄── [Cổng 3306]
│     restaurant_management       │
└─────────────────────────────────┘
```

---

## 2. Yêu Cầu Môi Trường (Prerequisites)

Để chạy hệ thống trực tiếp trên Windows, máy tính cần cài sẵn:

1. **Java JDK 21 LTS:** Kiểm tra bằng lệnh `java -version`.
2. **Node.js 20+ & npm:** Kiểm tra bằng lệnh `node -v` và `npm.cmd -v`.
3. **MySQL Server 8.0:** Đang chạy tại cổng `3306`, thông tin cấu hình mặc định:
   * **Database:** `restaurant_management`
   * **User:** `root`
   * **Password:** `123456`
   *(Nếu bạn dùng mật khẩu MySQL khác, chỉ cần chỉnh sửa tại file `backend/src/main/resources/application-local.properties`)*.

---

## 3. Các Cách Khởi Chạy Hệ Thống Tại Local

### Cách 1: Sử Dụng File Script Tự Động (Khuyến khích - 1 Click)

Thư mục gốc của dự án đã tích hợp sẵn các file script tự động:

* **Chạy toàn bộ hệ thống:** Nhấp đúp chuột vào file **`start-all.bat`**.
  * File script sẽ tự động mở 2 cửa sổ Command Prompt riêng biệt cho Backend và Frontend.
  * Tự động điều hướng và khởi động đúng cổng.
* **Hoặc chạy từng thành phần độc lập:**
  * Khởi chạy Backend: Chạy file **`start-backend.bat`** (Lắng nghe tại `http://localhost:8080`).
  * Khởi chạy Frontend: Chạy file **`start-frontend.bat`** (Mở giao diện tại `http://localhost:3000`).

---

### Cách 2: Khởi Chạy Bằng Dòng Lệnh Thủ Công (Manual CLI)

#### Bước 1: Khởi chạy Backend (Spring Boot)
Mở cửa sổ PowerShell/CMD tại thư mục dự án:
```powershell
# 1. Di chuyển vào thư mục backend
cd backend

# 2. Khởi chạy trực tiếp từ mã nguồn qua Maven:
mvn spring-boot:run

# HOẶC khởi chạy từ file JAR đã đóng gói sẵn:
java -jar target/restaurant-backend-0.0.1-SNAPSHOT.jar
```
> Khi màn hình hiển thị log: `Started RestaurantApplication in ... seconds` là Backend đã sẵn sàng tại `http://localhost:8080`.

#### Bước 2: Khởi chạy Frontend (React + TypeScript)
Mở một cửa sổ PowerShell/CMD thứ hai:
```powershell
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Khởi chạy Vite Dev Server:
npm.cmd run dev
```
> Truy cập trình duyệt tại địa chỉ: **`http://localhost:3000`**

---

### Cách 3: Khởi Chạy Trọn Gói Bằng Docker Compose (Tùy chọn)

Nếu máy tính của bạn đã cài đặt **Docker Desktop**, bạn có thể khởi chạy toàn bộ MySQL + Backend + Frontend mà không cần cài đặt JDK hay Node.js trên máy chủ:

```powershell
# Khởi chạy toàn bộ dịch vụ trong background
docker compose up -d --build

# Xem log các dịch vụ đang chạy
docker compose logs -f

# Dừng và tắt toàn bộ dịch vụ
docker compose down
```

---

## 4. Tài Khoản Đăng Nhập Mặc Định

Dữ liệu mẫu đã được khởi tạo tự động qua Flyway Migration (`V3__seed_demo_data.sql`):

| Tên Đăng Nhập | Mật Khẩu | Vai Trò (Role) | Chức Năng Chính |
|---|---|---|---|
| **`admin`** | **`Admin123@`** | **Quản Trị Viên (ADMIN)** | Toàn quyền xem Dashboard doanh thu, quản lý danh mục, thêm/sửa món ăn, đổi giá bán, xem lịch sử hóa đơn. |
| **`staff01`** | **`Admin123@`** | **Nhân Viên (STAFF)** | Xem sơ đồ bàn, mở bàn, gọi món cho khách, in hóa đơn tạm tính, thu tiền mặt/chuyển khoản VietQR. |

---

## 5. Quy Trình Kiểm Tra Nhanh (Smoke Test Vận Hành)

Sau khi khởi chạy thành công, hãy thực hiện kiểm tra nhanh các chức năng:

1. **Kiểm tra trạng thái máy chủ (Health Check):**
   * Truy cập: `http://localhost:8080/api/health`
   * Kết quả mong đợi: `{"success": true, "data": {"status": "UP", ...}}`
2. **Đăng nhập hệ thống:**
   * Truy cập `http://localhost:3000` -> Nhập `staff01` / `Admin123@`.
3. **Thao tác nghiệp vụ POS:**
   * Chuyển sang mục **Sơ đồ bàn & POS** (`/pos`).
   * Chọn một bàn đang **Trống** (`Bàn 01`) -> Bấm **Mở bàn / Đặt món**.
   * Chọn các món ăn trong thực đơn để thêm vào đơn hàng.
   * Bấm **💳 Thanh toán** -> Chọn hình thức **Tiền mặt** -> Nhập số tiền khách đưa -> Bấm **Xác nhận thanh toán**.
   * Hóa đơn biên lai thanh toán xuất hiện kèm nút **🖨 In hóa đơn**, đồng thời bàn ăn lập tức tự động chuyển về màu xanh **TRỐNG**.
4. **Kiểm tra Báo cáo & Thống kê:**
   * Đăng xuất và đăng nhập lại bằng tài khoản **`admin`**.
   * Xem mục **Tổng quan** (`/` hoặc `/reports`): 4 thẻ KPI, biểu đồ cột doanh thu trong ngày và danh sách Top món bán chạy nhất tự động cập nhật chính xác.

---

## 6. Hướng Dẫn Sao Lưu (Backup) & Phục Hồi (Restore) Cơ Sở Dữ Liệu

### Sao lưu dữ liệu ra file SQL:
Mở PowerShell tại thư mục bất kỳ:
```powershell
mysqldump -u root -p123456 restaurant_management > backup_restaurant_db.sql
```

### Phục hồi dữ liệu từ file sao lưu:
```powershell
mysql -u root -p123456 restaurant_management < backup_restaurant_db.sql
```

---

## 7. Xử Lý Sự Cố Thường Gặp (Troubleshooting)

| Tình Huống | Nguyên Nhân | Cách Khắc Phục |
|---|---|---|
| **Port 8080 already in use** | Có ứng dụng khác đang chiếm cổng 8080. | Chạy lệnh `netstat -ano \| findstr :8080` để tìm PID, sau đó tắt tiến trình bằng `taskkill /PID <PID> /F`. |
| **Communications link failure (MySQL)** | Dịch vụ MySQL chưa được khởi động hoặc sai cổng/mật khẩu. | Mở `Services.msc` trên Windows -> Tìm dịch vụ `MySQL80` và chọn **Start**. Kiểm tra lại mật khẩu `root` trong file `application-local.properties`. |
| **Không thể tải danh sách món / Mất kết nối** | Backend chưa khởi động xong hoặc bị chặn bởi Firewall. | Đảm bảo cửa sổ Backend đã báo `Started RestaurantApplication`. Mở `http://localhost:8080/api/health` trên trình duyệt để kiểm tra trực tiếp. |
