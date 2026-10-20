# Quy Chuẩn REST API - Hệ Thống Quản Lý Quán Ăn
(REST API Specification & Contract)

- **Mã tài liệu:** `DOC_API_01`
- **Phiên bản:** 1.0 (MVP)
- **Base URL:** `/api`
- **Định dạng dữ liệu:** `application/json`
- **Múi giờ mặc định:** `Asia/Ho_Chi_Minh` (ISO-8601: `yyyy-MM-dd'T'HH:mm:ssXXX`)

---

## 1. Quy ước chung (General Conventions)

### 1.1. Xác thực & Phân quyền
Mọi yêu cầu đến các API được bảo vệ phải gửi kèm HTTP Header:
```http
Authorization: Bearer <access_token>
```

### 1.2. Định dạng phản hồi thành công chuẩn (Standard Success Response)
```json
{
  "success": true,
  "message": "Thao tác thành công",
  "data": { ... },
  "timestamp": "2026-10-20T23:15:00+07:00"
}
```

Đối với danh sách có phân trang:
```json
{
  "success": true,
  "message": "Lấy danh sách thành công",
  "data": [ ... ],
  "pagination": {
    "page": 0,
    "size": 10,
    "totalElements": 45,
    "totalPages": 5,
    "isLast": false
  },
  "timestamp": "2026-10-20T23:15:00+07:00"
}
```

### 1.3. Định dạng phản hồi lỗi chuẩn (Standard Error Response)
```json
{
  "success": false,
  "errorCode": "RESOURCE_NOT_FOUND",
  "message": "Không tìm thấy món ăn với ID = 15",
  "errors": [
    {
      "field": "price",
      "rejectedValue": -50000,
      "message": "Giá món ăn không được nhỏ hơn 0"
    }
  ],
  "timestamp": "2026-10-20T23:15:00+07:00"
}
```

### 1.4. Bảng mã trạng thái HTTP chuẩn
- `200 OK`: Truy vấn hoặc cập nhật thành công.
- `201 Created`: Tạo mới tài nguyên thành công.
- `400 Bad Request`: Dữ liệu gửi lên sai định dạng hoặc vi phạm validation.
- `401 Unauthorized`: Chưa đăng nhập hoặc token không hợp lệ/hết hạn.
- `403 Forbidden`: Đã đăng nhập nhưng không đủ quyền hạn thực hiện.
- `404 Not Found`: Không tìm thấy tài nguyên yêu cầu.
- `409 Conflict`: Xung đột dữ liệu (ví dụ: trùng username, trùng mã bàn, bàn đang có khách).
- `500 Internal Server Error`: Lỗi hệ thống nội bộ (không để lộ stack trace).

---

## 2. Chi tiết các Endpoints

### 2.1. Authentication (`/api/auth`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/auth/login` | Public | Đăng nhập tài khoản, trả về JWT Token và thông tin user |
| `GET` | `/api/auth/me` | Authenticated | Lấy thông tin tài khoản đang đăng nhập |

#### Request `POST /api/auth/login`:
```json
{
  "username": "admin",
  "password": "Password123@"
}
```

#### Response `200 OK`:
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer",
    "user": {
      "id": 1,
      "username": "admin",
      "fullName": "Chủ quán",
      "role": "ADMIN"
    }
  }
}
```

---

### 2.2. Danh mục món ăn (`/api/categories`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/categories` | Authenticated | Danh sách tất cả danh mục (có lọc active) |
| `POST` | `/api/categories` | `ADMIN` | Tạo danh mục mới |
| `PUT` | `/api/categories/{id}` | `ADMIN` | Chỉnh sửa tên, mô tả, thứ tự danh mục |
| `DELETE` | `/api/categories/{id}` | `ADMIN` | Xóa danh mục (chặn nếu danh mục đang có món) |

---

### 2.3. Thực đơn món ăn (`/api/menu-items`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/menu-items` | Authenticated | Danh sách món ăn (hỗ trợ lọc theo `categoryId`, `status`, `keyword`, phân trang) |
| `GET` | `/api/menu-items/{id}` | Authenticated | Chi tiết một món ăn |
| `POST` | `/api/menu-items` | `ADMIN` | Thêm món ăn mới |
| `PUT` | `/api/menu-items/{id}` | `ADMIN` | Cập nhật thông tin món ăn (tên, giá, ảnh, mô tả) |
| `PATCH` | `/api/menu-items/{id}/status` | `ADMIN`, `STAFF` | Đổi trạng thái: `AVAILABLE` (còn) / `OUT_OF_STOCK` (hết món) |
| `DELETE` | `/api/menu-items/{id}` | `ADMIN` | Xóa món ăn |

#### Request `POST /api/menu-items`:
```json
{
  "categoryId": 2,
  "name": "Bò lúc lắc khoai tây",
  "description": "Thịt bò thăn mềm xào rau củ kèm khoai tây chiên",
  "price": 120000.00,
  "imageUrl": "https://example.com/images/bo_luc_lac.jpg",
  "status": "AVAILABLE"
}
```

---

### 2.4. Bàn ăn & Sơ đồ bàn (`/api/tables`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/tables` | Authenticated | Lấy danh sách tất cả các bàn kèm trạng thái và thông tin đơn hiện tại |
| `GET` | `/api/tables/{id}` | Authenticated | Xem chi tiết thông tin bàn ăn |
| `POST` | `/api/tables` | `ADMIN` | Thêm bàn ăn mới |
| `PUT` | `/api/tables/{id}` | `ADMIN` | Chỉnh sửa tên bàn, số ghế |
| `DELETE` | `/api/tables/{id}` | `ADMIN` | Xóa bàn ăn (chỉ xóa khi bàn đang `EMPTY`) |

#### Response `GET /api/tables` (Minh họa cho sơ đồ bàn):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "B01",
      "name": "Bàn 1 (Tầng 1)",
      "capacity": 4,
      "status": "OCCUPIED",
      "currentOrderId": 12,
      "currentOrderCode": "ORD-20261020-0005"
    },
    {
      "id": 2,
      "code": "B02",
      "name": "Bàn 2 (Tầng 1)",
      "capacity": 6,
      "status": "EMPTY",
      "currentOrderId": null,
      "currentOrderCode": null
    }
  ]
}
```

---

### 2.5. Đơn hàng & Gọi món (`/api/orders`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `POST` | `/api/orders` | Authenticated | Mở bàn & tạo đơn mới (tại bàn hoặc mang về) |
| `GET` | `/api/orders` | Authenticated | Danh sách đơn hàng (lọc theo `status`, `tableId`, ngày, phân trang) |
| `GET` | `/api/orders/{id}` | Authenticated | Chi tiết đơn hàng và các dòng món |
| `GET` | `/api/orders/active-by-table/{tableId}` | Authenticated | Lấy đơn đang phục vụ của một bàn |
| `POST` | `/api/orders/{id}/items` | Authenticated | Thêm món ăn vào đơn hàng |
| `PUT` | `/api/orders/{id}/items/{itemId}` | Authenticated | Cập nhật số lượng hoặc ghi chú của món trong đơn |
| `DELETE` | `/api/orders/{id}/items/{itemId}` | Authenticated | Hủy dòng món khỏi đơn |
| `POST` | `/api/orders/{id}/discount` | `ADMIN`, `STAFF` | Cập nhật số tiền giảm giá cho đơn |
| `POST` | `/api/orders/{id}/cancel` | `ADMIN` | Hủy toàn bộ đơn hàng kèm lý do hủy |

#### Request `POST /api/orders` (Mở đơn):
```json
{
  "tableId": 1,
  "orderType": "DINE_IN",
  "note": "Khách ngồi bàn 1 gồm 3 người"
}
```

#### Request `POST /api/orders/{id}/items` (Thêm món):
```json
{
  "menuItemId": 5,
  "quantity": 2,
  "note": "Ít cay"
}
```

---

### 2.6. Thanh toán & Hóa đơn (`/api/payments`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/payments/preview/{orderId}` | Authenticated | Xem trước số tiền phải thanh toán |
| `POST` | `/api/payments` | Authenticated | Xác nhận thanh toán đơn hàng (Transaction) |
| `GET` | `/api/payments/by-order/{orderId}` | Authenticated | Xem thông tin hóa đơn thanh toán của đơn |
| `GET` | `/api/payments` | `ADMIN` | Danh sách lịch sử hóa đơn thanh toán (phân trang, lọc theo ngày) |

#### Request `POST /api/payments`:
```json
{
  "orderId": 12,
  "paymentMethod": "CASH",
  "amountPaid": 240000.00
}
```

#### Response `200 OK`:
```json
{
  "success": true,
  "message": "Thanh toán thành công",
  "data": {
    "invoiceCode": "INV-20261020-0012",
    "orderCode": "ORD-20261020-0005",
    "paymentMethod": "CASH",
    "amountPaid": 240000.00,
    "paidAt": "2026-10-20T23:20:00+07:00",
    "processedBy": "Nguyễn Văn A"
  }
}
```

---

### 2.7. Báo cáo & Thống kê (`/api/reports` - Chỉ `ADMIN`)

| Method | Endpoint | Quyền | Mô tả |
|---|---|---|---|
| `GET` | `/api/reports/summary` | `ADMIN` | Thống kê nhanh trong ngày (doanh thu, số đơn, số bàn đang phục vụ) |
| `GET` | `/api/reports/revenue` | `ADMIN` | Doanh thu theo khoảng ngày (`startDate`, `endDate`) |
| `GET` | `/api/reports/top-selling` | `ADMIN` | Thống kê top món bán chạy nhất theo số lượng và doanh thu |

---

## 3. Kiến trúc mã nguồn đề xuất

### 3.1. Cấu trúc Backend (Java Spring Boot)
```text
backend/src/main/java/com/restaurant/
├── config/             # Cấu hình Security, WebMvc, Flyway, OpenAPI/Swagger
├── controller/         # REST Controllers xử lý HTTP request & validation
├── dto/
│   ├── request/        # Request payload DTOs (@Valid, @NotNull...)
│   └── response/       # Response payload DTOs
├── entity/             # JPA Entities ánh xạ CSDL
├── enums/              # RoleEnum, TableStatus, OrderStatus, PaymentMethod...
├── exception/          # GlobalExceptionHandler, Custom Exceptions (BadRequest, NotFound...)
├── mapper/             # MapStruct hoặc Converter chuyển đổi Entity <-> DTO
├── repository/         # Spring Data JPA Repositories
└── service/            # Interface & Service Implementation chứa Business Logic & Transaction
```

### 3.2. Cấu trúc Frontend (React + TypeScript)
```text
frontend/src/
├── assets/             # Hình ảnh mẫu, icons, fonts
├── components/         # UI components dùng chung (Button, Modal, Table, Badge, Input...)
├── layouts/            # MainLayout (Sidebar, Header, Content Area), AuthLayout
├── pages/
│   ├── auth/           # LoginPage
│   ├── dashboard/      # DashboardPage (Doanh thu & Thống kê)
│   ├── pos/            # Sơ đồ bàn, Màn hình gọi món tại bàn, Tạm tính
│   ├── menu/           # Quản lý danh mục & món ăn
│   ├── tables/         # Quản lý danh sách bàn ăn
│   └── orders/         # Lịch sử đơn hàng & Hóa đơn
├── services/           # apiClient (Axios / Fetch wrapper), authService, orderService...
├── types/              # TypeScript interfaces (User, Table, MenuItem, Order, Payment...)
└── utils/              # Định dạng tiền tệ VND, định dạng ngày tháng, helpers
```
