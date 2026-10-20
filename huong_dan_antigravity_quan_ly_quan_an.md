# Hướng dẫn xây dựng website quản lý quán ăn bằng Antigravity

> **Mục tiêu:** Xây dựng website quản lý quán ăn theo từng giai đoạn bằng Antigravity, với Backend Java + Spring Boot, Frontend React + TypeScript, HTML/CSS và cơ sở dữ liệu MySQL. Hosting sẽ được quyết định sau khi ứng dụng chạy ổn định ở môi trường local.
>
> **Cách sử dụng:** Thực hiện tuần tự từng giai đoạn. Dán prompt tương ứng vào Antigravity, xem xét kế hoạch trước khi cho phép chỉnh sửa, chạy thử, đọc kết quả và chỉ chuyển giai đoạn khi đã đạt tiêu chí nghiệm thu.

---

## 1. Nguyên tắc làm việc với Antigravity

Antigravity là môi trường hỗ trợ phát triển phần mềm bằng AI. Hãy dùng nó để lập kế hoạch, tạo/sửa mã nguồn, chạy lệnh và hỗ trợ kiểm thử; tuy nhiên, bạn vẫn cần kiểm tra kết quả thay vì mặc định rằng mã do AI tạo ra là chính xác.

### Quy tắc quan trọng

1. **Một giai đoạn tại một thời điểm.** Không yêu cầu AI xây dựng toàn bộ hệ thống trong một prompt lớn.
2. **Lập kế hoạch trước khi sửa mã.** Yêu cầu Antigravity nêu các file sẽ tạo/sửa, quyết định kỹ thuật, rủi ro và lệnh kiểm thử.
3. **Không bỏ qua lỗi.** Không chuyển sang giai đoạn mới nếu ứng dụng không build, không khởi động hoặc kiểm thử quan trọng đang thất bại.
4. **Giữ Git làm điểm khôi phục.** Tạo commit sau mỗi giai đoạn nghiệm thu.
5. **Không để bí mật trong mã nguồn.** Không đưa mật khẩu thật, token, khóa API hay thông tin nhạy cảm vào prompt, Git hoặc file cấu hình được commit.
6. **Không tự ý thay đổi stack.** Nếu AI đề xuất thay Java/Spring Boot, React/TypeScript hoặc MySQL, yêu cầu giải thích và xin xác nhận trước.
7. **Yêu cầu giải thích.** Với phần quan trọng, yêu cầu AI nêu chức năng, cách chạy, các file liên quan và cách kiểm thử.
8. **Xác minh phiên bản.** Dùng phiên bản ổn định tương thích tại thời điểm triển khai; tránh phụ thuộc vào số phiên bản do AI đoán.
9. **Đánh giá diff.** Xem những file đã thay đổi trước khi chấp nhận. Không chạy lệnh phá hủy dữ liệu nếu chưa hiểu tác động.
10. **Lưu tiến độ trong tài liệu.** Duy trì `docs/PROJECT_STATUS.md` và cập nhật sau mỗi giai đoạn.

### Prompt khung dùng chung

Sao chép đoạn này vào đầu mỗi yêu cầu lớn nếu cần:

```text
Bạn là kỹ sư phần mềm cấp cao, hỗ trợ tôi phát triển website quản lý quán ăn.

Stack bắt buộc:
- Backend: Java + Spring Boot, REST API.
- Frontend: React.js + TypeScript, HTML/CSS.
- Database: MySQL.
- Quản lý mã nguồn: Git.
- Hosting chưa quyết định; hiện ưu tiên phát triển và kiểm thử local.

Quy tắc:
1. Trước khi sửa file, hãy kiểm tra cấu trúc dự án hiện tại.
2. Đề xuất kế hoạch ngắn, danh sách file sẽ tạo/sửa và tiêu chí kiểm thử.
3. Không thay đổi stack hoặc thêm thư viện lớn nếu chưa giải thích lý do.
4. Không để mật khẩu/token/secret trong mã nguồn.
5. Không xóa hoặc ghi đè dữ liệu hiện có khi chưa hỏi.
6. Viết mã dễ đọc, có xử lý lỗi và kiểm tra dữ liệu đầu vào.
7. Sau khi làm, chạy các kiểm thử phù hợp và báo cáo rõ lệnh đã chạy, kết quả, lỗi còn tồn tại.
8. Nếu có yêu cầu mơ hồ hoặc có nhiều lựa chọn kiến trúc, hãy hỏi trước khi quyết định.
9. Không tuyên bố đã kiểm thử thành công nếu chưa thực sự chạy kiểm thử.
10. Cập nhật docs/PROJECT_STATUS.md khi tôi yêu cầu nghiệm thu giai đoạn.

Trước mắt chỉ thực hiện đúng nhiệm vụ tôi giao trong prompt hiện tại. Không triển khai trước các giai đoạn tiếp theo.
```

---

## 2. Phạm vi hệ thống đề xuất

### Vai trò người dùng

- **Quản trị viên/chủ quán:** quản lý tài khoản, nhân viên, thực đơn, bàn, đơn hàng, hóa đơn và báo cáo.
- **Nhân viên phục vụ:** xem bàn, tạo đơn, thêm món và cập nhật trạng thái đơn theo quyền được cấp.
- **Thu ngân:** kiểm tra đơn, thanh toán và lập hóa đơn.
- **Nhân viên bếp** (có thể triển khai sau): xem món cần chế biến và cập nhật trạng thái món.

Với phiên bản đầu tiên, có thể bắt đầu bằng quản trị viên và nhân viên. Không nhất thiết phải tạo tất cả vai trò ngay từ đầu.

### Chức năng theo thứ tự ưu tiên

**MVP — phiên bản tối thiểu cần chạy được**

1. Đăng nhập, đăng xuất và phân quyền.
2. Quản lý danh mục và món ăn.
3. Quản lý bàn ăn và trạng thái bàn.
4. Tạo đơn hàng, thêm/xóa món và cập nhật số lượng.
5. Thanh toán, lập hóa đơn và lưu lịch sử.
6. Trang tổng quan và báo cáo doanh thu cơ bản.

**Có thể bổ sung sau MVP**

- Quản lý nhân viên đầy đủ.
- Quản lý nguyên liệu, nhập/xuất kho.
- Khách hàng và lịch sử mua hàng.
- In hóa đơn, mã QR, tích hợp thanh toán điện tử.
- Quản lý nhiều chi nhánh.
- Thông báo thời gian thực cho bếp.
- Ứng dụng hoặc giao diện dành cho khách đặt món.

### Quy tắc nghiệp vụ cần thống nhất sớm

- Một đơn hàng thuộc một bàn hoặc được đánh dấu là mang đi.
- Một đơn có nhiều dòng món; mỗi dòng lưu tên/giá tại thời điểm đặt để lịch sử không thay đổi khi sửa giá món.
- Trạng thái bàn và trạng thái đơn hàng là hai thông tin khác nhau.
- Không xóa cứng đơn hàng đã thanh toán; nên lưu lịch sử và trạng thái hủy/hoàn tiền nếu có.
- Chỉ người có quyền mới được thanh toán, hủy đơn hoặc quản lý tài khoản.
- Tiền cần dùng kiểu dữ liệu phù hợp, tránh phép tính tiền bằng số thực dấu phẩy động. Ở Java có thể dùng `BigDecimal`; database dùng `DECIMAL`.
- Các thao tác tạo đơn/thanh toán cần có transaction phù hợp.
- Mật khẩu phải được băm bằng cơ chế phù hợp, không lưu mật khẩu thuần.
- Báo cáo doanh thu cần định nghĩa rõ: doanh thu theo thời điểm thanh toán, có tính đơn hủy/hoàn tiền hay không.

---

## 3. Chuẩn bị môi trường phát triển

Cài đặt và xác minh các công cụ sau trước khi tạo dự án:

- **Antigravity:** môi trường làm việc chính.
- **JDK:** phiên bản LTS tương thích với phiên bản Spring Boot được chọn.
- **Maven:** dùng Maven Wrapper (`mvnw`/`mvnw.cmd`) nếu dự án có để mọi máy dùng phiên bản Maven nhất quán.
- **Node.js LTS và npm:** cho React/TypeScript.
- **MySQL Server** và một công cụ quản lý database như MySQL Workbench (tùy chọn).
- **Git:** quản lý lịch sử mã nguồn.
- **Trình duyệt hiện đại** để kiểm thử giao diện.
- **API client** như Postman, Bruno hoặc REST Client (tùy chọn).

Kiểm tra phiên bản bằng terminal:

```bash
java -version
node -v
npm -v
git --version
```

Nếu có Maven cài toàn hệ thống, có thể kiểm tra:

```bash
mvn -version
```

### Cấu trúc repository gợi ý

```text
restaurant-management/
├── backend/
├── frontend/
├── docs/
│   ├── REQUIREMENTS.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── TEST_PLAN.md
│   └── PROJECT_STATUS.md
├── .gitignore
└── README.md
```

Không nhất thiết phải tạo tất cả file ngay ở bước đầu; hãy để chúng được hình thành theo các giai đoạn.

---

## 4. Lộ trình tổng quan

| Giai đoạn | Công việc | Kết quả cần có |
|---|---|---|
| 0 | Chuẩn bị công cụ và Git | Môi trường sẵn sàng |
| 1 | Phân tích yêu cầu | Tài liệu chức năng và quy tắc nghiệp vụ |
| 2 | Thiết kế kiến trúc và database | ERD, bảng, quan hệ và API sơ bộ |
| 3 | Khởi tạo dự án | Backend, frontend chạy độc lập |
| 4 | Kết nối MySQL và cấu trúc backend | Kết nối DB, migration, cấu trúc lớp |
| 5 | Đăng nhập và phân quyền | API bảo mật, vai trò |
| 6 | Giao diện và tích hợp API nền tảng | Layout, routing, gọi API |
| 7 | Quản lý danh mục và món ăn | CRUD món ăn hoạt động |
| 8 | Quản lý bàn và đơn hàng | Quy trình gọi món hoạt động |
| 9 | Thanh toán và hóa đơn | Thanh toán, lịch sử hóa đơn |
| 10 | Dashboard và báo cáo | Thống kê cơ bản đúng nghiệp vụ |
| 11 | Kiểm thử và hoàn thiện | Sửa lỗi, kiểm thử hồi quy |
| 12 | Đóng gói và triển khai | Bản chạy thử hoặc production |
| 13 | Bảo trì và mở rộng | Quy trình sao lưu, giám sát, phát triển tiếp |

Thứ tự có thể điều chỉnh theo yêu cầu, nhưng nên hoàn thành yêu cầu, dữ liệu và xác thực trước khi xây dựng nhiều màn hình nghiệp vụ.

---

# 5. Hướng dẫn chi tiết từng giai đoạn

## Giai đoạn 0 — Chuẩn bị môi trường và Git

### Việc cần làm

1. Cài công cụ ở phần 3.
2. Tạo thư mục dự án `restaurant-management`.
3. Mở thư mục bằng Antigravity.
4. Khởi tạo Git.
5. Tạo `.gitignore` phù hợp cho Java, Node.js, IDE và file môi trường.
6. Chưa cần viết chức năng nghiệp vụ.

Lệnh khởi tạo Git (chạy tại thư mục gốc):

```bash
git init
git status
```

### Prompt cho Antigravity

```text
Hãy kiểm tra môi trường và thư mục dự án hiện tại. Chưa viết chức năng nghiệp vụ.

Nhiệm vụ:
1. Đề xuất cấu trúc repository gồm backend, frontend và docs.
2. Tạo .gitignore phù hợp với Java/Spring Boot, Maven, Node.js, React, IDE và file chứa secret.
3. Tạo README.md ngắn mô tả dự án và các công nghệ dự kiến.
4. Không tạo hoặc ghi đè file đang có mà chưa kiểm tra nội dung.
5. Cho tôi biết lệnh cần chạy để kiểm tra JDK, Node.js, npm, Git và MySQL.
6. Nêu các bước tôi cần tự xác nhận trước khi sang giai đoạn 1.

Không tự cài đặt phần mềm hoặc chạy lệnh có tác động phá hủy dữ liệu.
```

### Tiêu chí nghiệm thu

- [ ] Antigravity mở đúng thư mục gốc.
- [ ] Git hoạt động.
- [ ] `.gitignore` không cho commit file secret, build output và `node_modules`.
- [ ] Các công cụ đã cài có phiên bản tương thích.
- [ ] Tạo commit ban đầu nếu repository đã có nội dung phù hợp.

---

## Giai đoạn 1 — Phân tích yêu cầu

### Mục tiêu

Chốt website sẽ phục vụ ai, giải quyết nghiệp vụ nào và giới hạn phiên bản đầu tiên ra sao.

### Việc cần làm

1. Liệt kê vai trò người dùng.
2. Viết danh sách use case.
3. Mô tả luồng chính: đăng nhập → chọn bàn → tạo đơn → thêm món → thanh toán → xem hóa đơn.
4. Xác định trạng thái bàn, đơn hàng, dòng món và hóa đơn.
5. Định nghĩa quy tắc tính tổng tiền, giảm giá, hủy đơn và doanh thu.
6. Phân biệt chức năng bắt buộc với chức năng để sau.
7. Ghi các giả định chưa rõ thành câu hỏi, không tự quyết định thay người dùng.

### Prompt cho Antigravity

```text
Hãy phân tích yêu cầu cho website quản lý một quán ăn. Stack: Java Spring Boot, React.js + TypeScript, MySQL.

Trong giai đoạn này chỉ tạo tài liệu, chưa viết mã chức năng.

Hãy:
1. Xác định các vai trò: quản trị viên/chủ quán, nhân viên phục vụ, thu ngân; đề xuất vai trò bếp nếu thực sự cần.
2. Lập danh sách use case có mã UC_01, UC_02... và mô tả ngắn.
3. Viết luồng nghiệp vụ chi tiết cho đăng nhập, quản lý món, quản lý bàn, tạo đơn, thanh toán và báo cáo.
4. Xác định trạng thái và quy tắc chuyển trạng thái của bàn, đơn hàng và hóa đơn.
5. Nêu quy tắc tính tiền, giảm giá, hủy đơn, hoàn tiền và cách xác định doanh thu.
6. Phân loại chức năng thành MVP và giai đoạn mở rộng.
7. Nêu yêu cầu phi chức năng: bảo mật, hiệu năng cơ bản, khả năng sao lưu, khả năng sử dụng và xử lý lỗi.
8. Ghi rõ các câu hỏi còn thiếu thông tin; không tự suy diễn các quyết định ảnh hưởng nghiệp vụ.

Tạo docs/REQUIREMENTS.md với nội dung rõ ràng, có bảng use case và tiêu chí nghiệm thu. Sau đó tóm tắt các quyết định cần tôi duyệt.
```

### Tiêu chí nghiệm thu

- [ ] Mỗi chức năng chính có mục tiêu và luồng sử dụng.
- [ ] Quy tắc trạng thái không mâu thuẫn.
- [ ] MVP có phạm vi vừa phải.
- [ ] Các quyết định chưa rõ được đánh dấu để người dùng duyệt.
- [ ] Lưu commit: `docs: define restaurant requirements`.

---

## Giai đoạn 2 — Thiết kế kiến trúc, database và API

### Mục tiêu

Thống nhất cấu trúc dữ liệu và giao tiếp giữa Frontend với Backend trước khi viết nhiều mã.

### Bảng dữ liệu có thể cần

| Bảng | Vai trò |
|---|---|
| `users` | Tài khoản đăng nhập |
| `roles` / `user_roles` | Vai trò và quan hệ tài khoản-vai trò, nếu dùng mô hình nhiều vai trò |
| `categories` | Danh mục món ăn |
| `menu_items` | Món ăn, giá, trạng thái |
| `dining_tables` | Bàn ăn và trạng thái |
| `orders` | Thông tin chung của đơn |
| `order_items` | Các món thuộc đơn, số lượng, giá tại thời điểm đặt |
| `payments` | Giao dịch thanh toán |
| `invoices` | Thông tin hóa đơn nếu cần tách riêng |
| `audit_logs` | Nhật ký các thao tác quan trọng, có thể bổ sung sau |

Không bắt buộc tạo mọi bảng ngay. Ví dụ `roles`/`user_roles` có thể đơn giản hóa nếu một tài khoản chỉ có một vai trò; bảng hóa đơn có thể gộp hoặc tách dựa trên yêu cầu thực tế. Quyết định phải được ghi rõ.

### Nguyên tắc thiết kế

- Dùng khóa chính, khóa ngoại và unique constraint hợp lý.
- Lưu giá tiền bằng `DECIMAL` ở MySQL và `BigDecimal` ở Java.
- Xác định kiểu thời gian và múi giờ rõ ràng.
- Dùng migration (ví dụ Flyway hoặc công cụ tương đương) để quản lý thay đổi schema; tránh dựa vào tự động cập nhật schema trong môi trường production.
- Dùng phân trang, lọc và sắp xếp cho danh sách lớn khi cần.
- Thiết kế API thống nhất về đường dẫn, status code và định dạng lỗi.
- Không trả mật khẩu băm hoặc dữ liệu nội bộ không cần thiết về Frontend.

### Prompt cho Antigravity

```text
Dựa trên docs/REQUIREMENTS.md, hãy thiết kế kiến trúc, database và REST API. Chưa triển khai nghiệp vụ.

Hãy:
1. Đề xuất ERD bằng Mermaid và giải thích quan hệ.
2. Liệt kê từng bảng, cột, kiểu dữ liệu, PK, FK, unique constraint và index cần thiết.
3. Giải thích các quyết định về trạng thái bàn/đơn, giá món tại thời điểm đặt, thanh toán và hóa đơn.
4. Đề xuất API theo tài nguyên, ví dụ /api/auth, /api/categories, /api/menu-items, /api/tables, /api/orders, /api/payments và /api/reports.
5. Với mỗi API, nêu method, quyền truy cập, request, response, validation và lỗi có thể trả về.
6. Định nghĩa quy ước lỗi JSON thống nhất.
7. Đề xuất cấu trúc package backend theo controller, service, repository, entity, DTO, mapper, config và exception; chỉ thêm lớp thật sự cần.
8. Đề xuất cấu trúc frontend theo pages, components, features, services/api, hooks, types và layouts.
9. Xác định transaction cần có cho tạo đơn, cập nhật đơn và thanh toán.
10. Liệt kê các rủi ro dữ liệu và cách ngăn lỗi cập nhật đồng thời nếu có nhiều nhân viên.

Tạo docs/DATABASE.md và docs/API.md. Nếu có quyết định ảnh hưởng nghiệp vụ chưa rõ, hãy hỏi tôi trước khi chốt.
```

### Tiêu chí nghiệm thu

- [ ] ERD thể hiện đúng quan hệ.
- [ ] Các bảng có khóa và kiểu dữ liệu phù hợp.
- [ ] API có request/response và quyền truy cập.
- [ ] Không có mâu thuẫn giữa tài liệu yêu cầu, database và API.
- [ ] Lưu commit: `docs: design database and api`.

---

## Giai đoạn 3 — Khởi tạo Backend và Frontend

### Mục tiêu

Tạo hai ứng dụng tối thiểu có thể chạy độc lập trước khi thêm nghiệp vụ.

### Backend

Khởi tạo Spring Boot với các dependency phù hợp, thường gồm:

- Spring Web
- Spring Data JPA
- MySQL Driver
- Validation
- Spring Security (có thể cấu hình ở giai đoạn bảo mật)
- Migration tool, ví dụ Flyway
- Spring Boot Test

Dùng Maven và Java tương thích. Chọn phiên bản ổn định theo tài liệu chính thức tại thời điểm tạo dự án.

### Frontend

Khởi tạo React + TypeScript bằng công cụ build phù hợp, ví dụ Vite. Chọn thư viện routing và gọi API sau khi đã thống nhất kiến trúc. Không thêm nhiều thư viện UI chỉ vì AI đề xuất.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 3: khởi tạo skeleton Backend và Frontend theo tài liệu đã duyệt.

Backend:
- Java + Spring Boot + Maven.
- REST API.
- Tạo endpoint health-check đơn giản.
- Có cấu hình môi trường local và ví dụ file cấu hình không chứa secret thật.
- Có test tối thiểu cho endpoint health-check.

Frontend:
- React.js + TypeScript.
- Có trang chào hoặc trang khung ứng dụng đơn giản.
- Có cấu hình biến môi trường cho URL Backend.
- Có lệnh chạy dev và build production.

Yêu cầu:
1. Kiểm tra file hiện có trước khi tạo.
2. Chọn phiên bản tương thích, giải thích lựa chọn.
3. Không triển khai chức năng nghiệp vụ ở giai đoạn này.
4. Cung cấp chính xác lệnh cài dependency, chạy và build.
5. Chạy kiểm thử/build nếu môi trường cho phép; báo rõ mọi lệnh chưa chạy được và nguyên nhân.
6. Cập nhật README.md với hướng dẫn chạy Backend và Frontend.
```

### Tiêu chí nghiệm thu

- [ ] Backend khởi động thành công.
- [ ] Health-check trả kết quả dự kiến.
- [ ] Frontend khởi động và hiển thị trang.
- [ ] Build frontend thành công.
- [ ] Test backend chạy được.
- [ ] Lưu commit: `chore: initialize backend and frontend`.

---

## Giai đoạn 4 — Kết nối MySQL và nền tảng Backend

### Mục tiêu

Tạo kết nối database an toàn, quản lý schema có thể lặp lại và chuẩn hóa xử lý lỗi.

### Việc cần làm

1. Tạo database local, ví dụ `restaurant_management`.
2. Tạo user database riêng cho ứng dụng, chỉ cấp quyền cần thiết.
3. Đặt thông tin kết nối trong biến môi trường hoặc file local không commit.
4. Thiết lập migration đầu tiên.
5. Tạo cấu trúc lớp và quy tắc validation.
6. Chuẩn hóa response lỗi.
7. Kiểm tra việc mở/đóng transaction.

Ví dụ các biến cấu hình (giá trị minh họa, không phải mật khẩu thật):

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=restaurant_management
DB_USERNAME=restaurant_app
DB_PASSWORD=replace_with_local_secret
```

Không commit file `.env` có secret. Có thể commit `.env.example` với giá trị giả.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 4: cấu hình MySQL và nền tảng Backend.

1. Dùng biến môi trường để cấu hình kết nối MySQL.
2. Không ghi thông tin xác thực thật vào Git.
3. Thiết lập migration bằng công cụ đã thống nhất trong docs/DATABASE.md.
4. Tạo schema ban đầu đúng với tài liệu đã duyệt; không tự đổi tên bảng/cột mà không cập nhật tài liệu.
5. Cấu hình validation, xử lý lỗi API và logging cơ bản.
6. Tạo test kiểm tra cấu hình hoặc repository ở mức phù hợp.
7. Giữ cấu hình schema an toàn; không dùng chế độ tự động xóa/tạo lại dữ liệu.
8. Cập nhật hướng dẫn tạo database, cấu hình biến môi trường và chạy migration.

Trước khi thực hiện migration, hãy cho biết migration sẽ tạo/thay đổi những gì. Không chạy thao tác phá hủy dữ liệu.
```

### Tiêu chí nghiệm thu

- [ ] Backend kết nối được MySQL local.
- [ ] Migration chạy lặp lại theo quy trình đã thiết kế.
- [ ] Schema phù hợp tài liệu.
- [ ] Secret không nằm trong Git.
- [ ] Lỗi validation được trả về có cấu trúc.
- [ ] Lưu commit: `feat: configure mysql and backend foundation`.

---

## Giai đoạn 5 — Đăng nhập, xác thực và phân quyền

### Mục tiêu

Bảo vệ API và giới hạn chức năng theo vai trò.

### Việc cần làm

- Chốt cách xác thực, chẳng hạn session hoặc access token; không kết hợp nhiều cơ chế không cần thiết.
- Băm mật khẩu bằng thuật toán phù hợp, ví dụ BCrypt hoặc cơ chế được Spring Security hỗ trợ.
- Tạo luồng đăng nhập/đăng xuất và lấy thông tin người dùng hiện tại.
- Phân quyền ở Backend, không chỉ ẩn nút trên giao diện.
- Xử lý sai mật khẩu, tài khoản vô hiệu hóa và lỗi xác thực.
- Không ghi token hoặc mật khẩu vào log.
- Có dữ liệu khởi tạo tài khoản quản trị an toàn cho môi trường local; không dùng mật khẩu mặc định ngoài production.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 5: xác thực và phân quyền bằng Spring Security, theo docs/REQUIREMENTS.md và docs/API.md.

Hãy:
1. Đề xuất cơ chế xác thực phù hợp và giải thích các rủi ro; hỏi tôi nếu cần chốt lựa chọn.
2. Tạo API đăng nhập, đăng xuất (nếu phù hợp với cơ chế) và lấy thông tin tài khoản hiện tại.
3. Băm mật khẩu an toàn; tuyệt đối không lưu mật khẩu thuần.
4. Phân quyền ở Backend theo vai trò đã thống nhất.
5. Xử lý 401, 403 và thông báo lỗi không làm lộ thông tin nhạy cảm.
6. Bảo vệ secret qua biến môi trường.
7. Viết test cho đăng nhập đúng/sai, API cần đăng nhập và API bị cấm theo vai trò.
8. Không tạo tài khoản quản trị với mật khẩu yếu hoặc cố định cho production.
9. Cập nhật docs/API.md và README.md.

Trước khi code, hãy nêu kế hoạch, cách lưu thông tin xác thực ở client và các biện pháp bảo vệ tương ứng. Không tự ý chọn cách lưu token thiếu an toàn.
```

### Tiêu chí nghiệm thu

- [ ] Đăng nhập đúng/sai hoạt động.
- [ ] API riêng tư không truy cập được khi chưa xác thực.
- [ ] Vai trò không được phép nhận 403.
- [ ] Mật khẩu được băm.
- [ ] Không có secret trong mã nguồn.
- [ ] Lưu commit: `feat: implement authentication and authorization`.

---

## Giai đoạn 6 — Khung giao diện và kết nối API

### Mục tiêu

Xây dựng nền tảng UI nhất quán trước khi thêm từng chức năng.

### Việc cần làm

- Thiết kế layout quản trị: sidebar, header, khu vực nội dung.
- Tạo trang đăng nhập và trang tổng quan.
- Thiết lập routing, trang không tìm thấy và trang không có quyền.
- Tạo lớp API client tập trung.
- Xử lý loading, lỗi mạng, hết phiên đăng nhập và thông báo thao tác.
- Thiết kế responsive cho màn hình máy tính bảng và desktop; nếu cần dùng điện thoại tại quán, kiểm tra cả màn hình nhỏ.
- Tạo component dùng chung: nút, input, bảng, modal xác nhận, trạng thái rỗng.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 6: xây dựng khung Frontend React + TypeScript.

1. Tạo layout quản trị gồm sidebar, header và vùng nội dung.
2. Tạo trang đăng nhập, dashboard placeholder, loading, error, empty state và trang 404.
3. Thiết lập routing và route guard phía giao diện; lưu ý route guard không thay thế phân quyền Backend.
4. Tạo API client dùng biến môi trường VITE_API_BASE_URL, xử lý JSON, lỗi HTTP và timeout phù hợp.
5. Tạo type/interface TypeScript cho response chung và lỗi API.
6. Không để dữ liệu giả xuất hiện như dữ liệu thật; nếu dùng mock, phải đánh dấu rõ.
7. Tạo giao diện responsive, dễ dùng trong môi trường quán ăn.
8. Viết test phù hợp và chạy lint/build nếu đã cấu hình.
9. Ghi cách chạy và cấu hình API trong README.md.

Chưa làm các màn hình CRUD nghiệp vụ cho tới khi khung giao diện được nghiệm thu.
```

### Tiêu chí nghiệm thu

- [ ] Điều hướng hoạt động.
- [ ] Layout hiển thị tốt trên kích thước màn hình mục tiêu.
- [ ] Lỗi API được hiển thị dễ hiểu.
- [ ] Không có dữ liệu giả bị nhầm là dữ liệu thật.
- [ ] Lưu commit: `feat: add frontend application shell`.

---

## Giai đoạn 7 — Quản lý danh mục và món ăn

### Mục tiêu

Hoàn thiện chức năng CRUD món ăn và danh mục từ giao diện đến database.

### Phạm vi

- Danh sách món, tìm kiếm, lọc theo danh mục và trạng thái.
- Tạo, xem, sửa món.
- Cập nhật giá, mô tả, hình ảnh (có thể dùng URL ở phiên bản đầu) và trạng thái còn bán/hết món.
- Quản lý danh mục.
- Kiểm tra dữ liệu ở cả Frontend và Backend.
- Không cho xóa danh mục đang được sử dụng nếu chưa có quy tắc xử lý phù hợp.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 7: chức năng quản lý danh mục và món ăn từ đầu đến cuối.

Backend:
- API CRUD theo docs/API.md.
- Validation tên, giá, danh mục và trạng thái.
- Xử lý tài nguyên không tồn tại, dữ liệu trùng và danh mục đang được tham chiếu.
- Phân quyền theo yêu cầu.
- Viết unit/integration test cho các trường hợp thành công và thất bại.

Frontend:
- Trang danh sách món ăn, tìm kiếm/lọc, form tạo/sửa và xác nhận thao tác xóa hoặc ngừng bán.
- Có loading, empty state, lỗi API và thông báo kết quả.
- Dùng TypeScript type rõ ràng, không dùng any tùy tiện.
- Đồng bộ giao diện với API thật, không hardcode dữ liệu để giả lập thành công.

Kiểm tra cả validation Frontend lẫn Backend, nhưng xem Backend là nguồn quyết định cuối cùng. Cập nhật docs/API.md nếu hợp đồng API thay đổi và giải thích trước mọi thay đổi schema.
```

### Tiêu chí nghiệm thu

- [ ] Tạo, xem, sửa và ngừng bán món ăn hoạt động.
- [ ] Tìm kiếm/lọc trả kết quả đúng.
- [ ] Giá âm, dữ liệu sai hoặc thiếu bị từ chối.
- [ ] Quyền truy cập được kiểm tra ở Backend.
- [ ] Lưu commit: `feat: manage menu and categories`.

---

## Giai đoạn 8 — Quản lý bàn và đơn hàng

### Mục tiêu

Hoàn thành quy trình nhân viên chọn bàn, tạo đơn, thêm món và cập nhật đơn.

### Việc cần làm

1. Tạo màn hình sơ đồ bàn với trạng thái rõ ràng.
2. Xem chi tiết bàn và đơn đang mở.
3. Tạo đơn mới, thêm món, cập nhật số lượng, ghi chú.
4. Tính tổng ở Backend; Frontend chỉ hiển thị tổng do API trả về.
5. Ngăn số lượng không hợp lệ và món đã ngừng bán.
6. Xác định quy trình hủy món/đơn và ghi nhận người thực hiện.
7. Xử lý hai nhân viên cập nhật cùng một bàn/đơn.
8. Chỉ cập nhật trạng thái bàn khi phù hợp với trạng thái đơn liên quan.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 8: quản lý bàn ăn và đơn hàng.

Trước khi code, hãy mô tả luồng từ chọn bàn đến tạo đơn, cập nhật món và hoàn tất đơn. Đối chiếu docs/REQUIREMENTS.md, docs/DATABASE.md và docs/API.md.

Backend:
- API xem bàn, tạo đơn, xem đơn, thêm/sửa/xóa dòng món và cập nhật trạng thái.
- Tính toán tiền phía Backend; không tin tổng tiền do Frontend gửi lên.
- Lưu giá món tại thời điểm đặt.
- Dùng transaction và kiểm soát cập nhật đồng thời phù hợp.
- Xử lý món ngừng bán, số lượng không hợp lệ, đơn đã đóng và thao tác không được phép.
- Viết test cho luồng chính và các trường hợp lỗi.

Frontend:
- Sơ đồ bàn và trạng thái.
- Chi tiết bàn/đơn, chọn món, chỉnh số lượng và ghi chú.
- Hiển thị tổng tiền do Backend tính.
- Cảnh báo khi thao tác có thể làm mất dữ liệu; khóa nút khi đang gửi yêu cầu để tránh gửi trùng.

Không làm chức năng thanh toán hoàn chỉnh ở giai đoạn này, nhưng hãy bảo đảm trạng thái đơn có thể chuyển tiếp hợp lệ sang giai đoạn thanh toán.
```

### Tiêu chí nghiệm thu

- [ ] Có thể tạo đơn cho bàn hợp lệ.
- [ ] Thêm/sửa/xóa món theo quy tắc.
- [ ] Tổng tiền được tính ở Backend.
- [ ] Giá lịch sử không thay đổi khi sửa giá menu.
- [ ] Không tạo đơn trùng do nhấn nút nhiều lần ở giao diện.
- [ ] Trạng thái bàn và đơn nhất quán.
- [ ] Lưu commit: `feat: manage tables and orders`.

---

## Giai đoạn 9 — Thanh toán và hóa đơn

### Mục tiêu

Đóng đơn đúng quy tắc, lưu thanh toán và cho phép tra cứu hóa đơn.

### Việc cần làm

- Xem lại đơn và tổng tiền từ Backend.
- Áp dụng giảm giá nếu đã được định nghĩa.
- Chọn phương thức thanh toán được hỗ trợ.
- Lưu trạng thái và thời điểm thanh toán.
- Tránh thanh toán một đơn hai lần do gửi lặp hoặc thao tác đồng thời.
- Lưu lịch sử hóa đơn và người thực hiện.
- Sau khi thanh toán thành công, cập nhật trạng thái đơn/bàn nhất quán trong transaction.
- Nếu tích hợp cổng thanh toán thật, cần xử lý callback/webhook, xác minh chữ ký và chống xử lý lặp; không giả lập giao dịch thật.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 9: thanh toán và hóa đơn.

1. Đối chiếu quy tắc thanh toán trong docs/REQUIREMENTS.md.
2. Tạo API xem trước số tiền phải trả và xác nhận thanh toán.
3. Backend phải tự kiểm tra trạng thái đơn, tính lại số tiền và xác minh quyền.
4. Bảo đảm transaction cập nhật thanh toán, đơn hàng và trạng thái bàn.
5. Ngăn thanh toán lặp; xử lý yêu cầu gửi đồng thời hoặc gửi lại.
6. Lưu lịch sử gồm số tiền, phương thức, thời điểm và người thực hiện theo thiết kế dữ liệu.
7. Xây dựng trang thanh toán, trang hóa đơn và lịch sử tra cứu.
8. Không giả vờ đã nhận tiền từ một cổng thanh toán bên ngoài khi chưa tích hợp thật.
9. Viết test cho thanh toán thành công, đơn đã thanh toán, đơn không tồn tại, sai quyền và lỗi transaction.
10. Cập nhật tài liệu API và hướng dẫn kiểm thử thủ công.
```

### Tiêu chí nghiệm thu

- [ ] Chỉ đơn hợp lệ mới được thanh toán.
- [ ] Không thanh toán trùng.
- [ ] Tổng tiền được xác minh ở Backend.
- [ ] Hóa đơn tra cứu được.
- [ ] Trạng thái bàn được cập nhật đúng.
- [ ] Lưu commit: `feat: implement payment and invoices`.

---

## Giai đoạn 10 — Dashboard và báo cáo

### Mục tiêu

Hiển thị thông tin vận hành có thể đối chiếu với dữ liệu thực.

### Chỉ số gợi ý

- Doanh thu theo ngày hoặc khoảng thời gian.
- Số đơn đã thanh toán.
- Giá trị trung bình mỗi đơn.
- Món bán chạy.
- Tình trạng bàn hiện tại.

### Quy tắc quan trọng

- Chỉ rõ doanh thu tính từ đơn đã thanh toán, và cách xử lý đơn hủy/hoàn tiền.
- Dùng khoảng thời gian có quy tắc rõ ràng và thống nhất múi giờ.
- Không tính doanh thu từ dữ liệu giả hoặc cộng cả đơn chưa thanh toán.
- API báo cáo cần phân quyền và kiểm tra khoảng ngày hợp lệ.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 10: dashboard và báo cáo.

1. Xác nhận định nghĩa từng chỉ số theo docs/REQUIREMENTS.md.
2. Tạo API tổng quan, doanh thu theo ngày/khoảng thời gian, số đơn đã thanh toán và món bán chạy.
3. Tính toán dựa trên dữ liệu thực trong database; tránh truy vấn gây nhân bản tổng tiền do join sai.
4. Xử lý khoảng ngày, múi giờ và đơn hủy/hoàn tiền đúng quy tắc.
5. Bảo vệ API theo vai trò.
6. Xây dựng dashboard có bộ lọc thời gian, loading, lỗi và empty state.
7. Nếu dùng biểu đồ, hiển thị đơn vị, nhãn và dữ liệu có ý nghĩa.
8. Viết test đối chiếu báo cáo với tập dữ liệu mẫu xác định trước.
9. Không hiển thị số liệu minh họa như số liệu thực.
```

### Tiêu chí nghiệm thu

- [ ] Tổng doanh thu khớp các giao dịch hợp lệ.
- [ ] Bộ lọc thời gian hoạt động.
- [ ] Đơn chưa thanh toán không bị tính sai.
- [ ] Món bán chạy được tính đúng.
- [ ] Lưu commit: `feat: add restaurant dashboard and reports`.

---

## Giai đoạn 11 — Kiểm thử, bảo mật và hoàn thiện

### Mục tiêu

Kiểm tra toàn bộ luồng từ giao diện đến database trước khi triển khai.

### Nhóm kiểm thử

- **Unit test:** quy tắc tính tiền, validation và service.
- **Integration test:** API, repository, transaction và database.
- **Frontend test:** form, trạng thái tải, lỗi và luồng người dùng.
- **End-to-end test:** đăng nhập → tạo đơn → thêm món → thanh toán → xem báo cáo.
- **Security check:** quyền truy cập, validation, CORS, secret và log.
- **Regression test:** kiểm tra chức năng cũ sau mỗi thay đổi.

### Checklist bảo mật

- [ ] Không lưu mật khẩu thuần.
- [ ] Backend kiểm tra quyền với mọi thao tác quan trọng.
- [ ] Validation ở server.
- [ ] CORS chỉ cho phép origin cần thiết ở môi trường triển khai.
- [ ] Không commit secret.
- [ ] Không trả stack trace hoặc thông tin nhạy cảm cho người dùng.
- [ ] Không cho phép truy cập dữ liệu của quán/chi nhánh khác nếu sau này có nhiều tenant.
- [ ] Có backup database và quy trình khôi phục thử nghiệm.
- [ ] Có giới hạn phù hợp với các thao tác nhạy cảm.
- [ ] Kiểm tra dependency có lỗ hổng theo công cụ phù hợp.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 11: kiểm thử tổng thể và rà soát bảo mật. Ưu tiên tìm lỗi, chưa thêm tính năng mới.

1. Đọc docs/REQUIREMENTS.md, docs/API.md và docs/TEST_PLAN.md.
2. Lập ma trận yêu cầu → test tương ứng.
3. Chạy test Backend, test Frontend, lint và build hiện có.
4. Kiểm thử luồng end-to-end: đăng nhập, quản lý món, chọn bàn, tạo đơn, thanh toán và xem báo cáo.
5. Rà soát xác thực, phân quyền, validation, CORS, secret, log, lỗi API và các thao tác cập nhật dữ liệu.
6. Kiểm tra lỗi tính tiền, gửi yêu cầu lặp, thao tác đồng thời và trạng thái không hợp lệ.
7. Ghi từng lỗi với mức độ nghiêm trọng, cách tái hiện và phương án sửa.
8. Sửa lỗi theo thứ tự ưu tiên, chạy lại các test bị ảnh hưởng.
9. Không tuyên bố hệ thống an toàn tuyệt đối; nêu rõ phạm vi đã kiểm tra và phần còn thiếu.
10. Tạo/cập nhật docs/TEST_PLAN.md với kết quả thực tế.
```

### Tiêu chí nghiệm thu

- [ ] Test tự động quan trọng chạy thành công.
- [ ] Build Backend và Frontend thành công.
- [ ] Luồng end-to-end quan trọng đã được thử.
- [ ] Lỗi nghiêm trọng đã xử lý hoặc có ghi nhận rõ ràng.
- [ ] Có hướng dẫn chạy test và kết quả kiểm thử.
- [ ] Lưu commit: `test: verify restaurant management workflows`.

---

## Giai đoạn 12 — Đóng gói và triển khai Hosting

### Mục tiêu

Đưa ứng dụng lên môi trường thử nghiệm hoặc production sau khi đã ổn định ở local.

### Chưa cần chọn Hosting ngay

Hãy quyết định sau khi biết rõ:

- Số người dùng đồng thời dự kiến.
- Ứng dụng chỉ dùng nội bộ hay truy cập Internet.
- Ngân sách hàng tháng.
- Nơi đặt dữ liệu và yêu cầu sao lưu.
- Có cần uptime cao, domain riêng, email hoặc tích hợp thanh toán không.
- Khả năng vận hành máy chủ của bạn.

### Các lựa chọn kiến trúc

**A. Frontend và Backend tách riêng**

- Frontend React được build thành static assets và host trên nền tảng phù hợp.
- Backend Spring Boot chạy trên dịch vụ hỗ trợ Java/container.
- MySQL dùng dịch vụ database được quản lý hoặc máy chủ riêng.

Ưu điểm: triển khai độc lập. Cần cấu hình CORS, HTTPS, biến môi trường và mạng kết nối database.

**B. VPS + Docker Compose**

- Đóng gói Backend thành container.
- Phục vụ Frontend qua web server hoặc container riêng.
- MySQL có thể nằm trên máy chủ riêng hoặc dịch vụ database tách biệt.
- Cấu hình reverse proxy, HTTPS, firewall, backup và giám sát.

Ưu điểm: chủ động. Nhược điểm: cần tự quản trị, cập nhật bảo mật, dung lượng và phục hồi.

**C. Nền tảng cloud quản lý nhiều thành phần**

- Dùng dịch vụ host frontend, chạy backend và MySQL managed.
- Giảm công việc quản trị một phần, nhưng chi phí và giới hạn tùy nhà cung cấp.

### Nguyên tắc triển khai

- Tạo cấu hình riêng cho local, staging và production.
- Dùng HTTPS.
- Không mở cổng MySQL công khai nếu không cần; chỉ cho phép Backend truy cập.
- Không dùng tài khoản database quyền quản trị toàn hệ thống cho ứng dụng.
- Dùng secret manager hoặc biến môi trường an toàn.
- Thiết lập migration có kiểm soát và backup trước khi thay đổi schema.
- Thử khôi phục backup, không chỉ kiểm tra rằng file backup tồn tại.
- Kiểm tra log, health check và cách quay lui bản triển khai.
- Không đưa file `.env` thật vào image hoặc Git.

### Prompt cho Antigravity

```text
Thực hiện giai đoạn 12: chuẩn bị triển khai, chưa tự tạo tài khoản hoặc phát sinh dịch vụ trả phí.

1. Kiểm tra README, cấu hình, build và test trước khi đóng gói.
2. Đề xuất ít nhất hai phương án Hosting phù hợp cho dự án và so sánh chi phí vận hành, độ khó, bảo mật, backup và khả năng mở rộng.
3. Hỏi tôi về ngân sách và nhu cầu vận hành trước khi chốt nhà cung cấp.
4. Nếu được duyệt, chuẩn bị Dockerfile/Compose hoặc cấu hình triển khai phù hợp; không nhúng secret.
5. Tách cấu hình local/staging/production.
6. Xác định cách cấu hình HTTPS, CORS, database network, migration, backup, health check, log và rollback.
7. Viết hướng dẫn triển khai trong docs/DEPLOYMENT.md.
8. Không chạy lệnh xóa dữ liệu, không mở dịch vụ công khai và không thực hiện hành động trả phí nếu chưa có sự đồng ý rõ ràng.
9. Liệt kê các bước phải làm thủ công trên nền tảng Hosting.
```

### Tiêu chí nghiệm thu

- [ ] Build release thành công.
- [ ] Cấu hình production không chứa secret trong Git.
- [ ] Có hướng dẫn triển khai và cấu hình biến môi trường.
- [ ] HTTPS, firewall và quyền database được xem xét.
- [ ] Có backup và kế hoạch khôi phục.
- [ ] Đã kiểm tra smoke test trên môi trường triển khai.
- [ ] Lưu commit: `chore: prepare deployment`.

---

## Giai đoạn 13 — Bảo trì và mở rộng

Chỉ thực hiện sau khi MVP chạy ổn định.

Các tính năng có thể cân nhắc:

- Quản lý nguyên liệu, định lượng món, nhập/xuất và cảnh báo tồn kho.
- Quản lý nhà cung cấp.
- Quản lý khách hàng và chương trình thành viên.
- In hóa đơn và phiếu bếp.
- Cập nhật trạng thái món theo thời gian thực.
- Quản lý nhiều chi nhánh.
- Phân tích doanh thu chuyên sâu.
- Sao lưu tự động, giám sát và cảnh báo lỗi.

Trước mỗi tính năng, lặp lại quy trình: yêu cầu → thiết kế → duyệt → triển khai → kiểm thử → nghiệm thu → commit.

---

# 6. Quy trình làm việc hằng ngày

Với mỗi nhiệm vụ, thực hiện theo chu trình:

1. **Đọc trạng thái hiện tại:** yêu cầu Antigravity đọc `docs/PROJECT_STATUS.md`, tài liệu liên quan và `git status`.
2. **Nêu mục tiêu nhỏ:** ví dụ “thêm API lấy danh sách món có phân trang”, không phải “hoàn thiện toàn bộ backend”.
3. **Lập kế hoạch:** yêu cầu danh sách file cần sửa và test cần bổ sung.
4. **Thực hiện:** cho AI làm phần đã duyệt.
5. **Kiểm tra diff:** xem các thay đổi, chú ý file cấu hình, dependency và migration.
6. **Chạy test:** build, unit/integration test và kiểm thử thủ công phù hợp.
7. **Sửa lỗi:** cung cấp lỗi thực tế cho Antigravity; không yêu cầu nó đoán kết quả.
8. **Nghiệm thu:** so sánh với tiêu chí giai đoạn.
9. **Cập nhật tài liệu:** ghi việc hoàn thành, lệnh đã chạy, lỗi còn lại và bước tiếp theo.
10. **Commit Git:** chỉ commit sau khi đã xem thay đổi và xác nhận phù hợp.

### Prompt nghiệm thu sau mỗi giai đoạn

```text
Hãy nghiệm thu giai đoạn vừa thực hiện.

1. Đối chiếu từng tiêu chí nghiệm thu với kết quả thực tế.
2. Chạy các test/build phù hợp và ghi nguyên văn lệnh đã chạy.
3. Phân loại từng tiêu chí: PASS, FAIL hoặc NOT TESTED.
4. Nêu lỗi còn lại, mức độ ảnh hưởng và cách tái hiện.
5. Kiểm tra git diff để phát hiện thay đổi ngoài phạm vi, secret hoặc file không cần thiết.
6. Cập nhật docs/PROJECT_STATUS.md với:
   - Giai đoạn hiện tại
   - Việc đã hoàn thành
   - Test đã chạy và kết quả
   - Lỗi/việc còn lại
   - Quyết định đang chờ tôi
   - Bước tiếp theo đề xuất

Không chuyển sang giai đoạn kế tiếp nếu còn lỗi nghiêm trọng hoặc tiêu chí bắt buộc chưa đạt. Không tuyên bố PASS nếu chưa có bằng chứng.
```

### Prompt khi Antigravity gặp lỗi

```text
Hãy xử lý lỗi dựa trên bằng chứng, không sửa mò.

Thông tin lỗi:
- Lệnh đã chạy:
- Thông báo lỗi đầy đủ:
- Các bước tái hiện:
- Kết quả mong đợi:
- Kết quả thực tế:

Trước tiên hãy giải thích nguyên nhân có khả năng nhất và đề xuất cách kiểm tra. Sau đó chỉ sửa phần cần thiết, chạy lại test liên quan và báo cáo file đã thay đổi. Không tắt test, không bỏ validation và không che lỗi chỉ để lệnh chạy thành công.
```

---

# 7. Tài liệu dự án nên duy trì

| File | Nội dung |
|---|---|
| `README.md` | Giới thiệu và cách chạy dự án |
| `docs/REQUIREMENTS.md` | Use case, phạm vi, quy tắc nghiệp vụ |
| `docs/DATABASE.md` | ERD, bảng và quan hệ |
| `docs/API.md` | Hợp đồng REST API |
| `docs/TEST_PLAN.md` | Kịch bản và kết quả kiểm thử |
| `docs/PROJECT_STATUS.md` | Tiến độ, quyết định, việc còn lại |
| `docs/DEPLOYMENT.md` | Cấu hình và hướng dẫn triển khai |

### Mẫu `docs/PROJECT_STATUS.md`

```markdown
# Project Status

## Current phase
Giai đoạn 0 — Chuẩn bị môi trường

## Completed
- [ ] Chưa có

## Tests and commands
- Chưa chạy

## Known issues
- Chưa ghi nhận

## Decisions awaiting approval
- Hosting
- Các quy tắc nghiệp vụ chưa được chốt

## Next step
Hoàn thành chuẩn bị môi trường và bắt đầu phân tích yêu cầu.
```

---

# 8. Những lỗi thường gặp khi dùng AI để phát triển dự án

1. **Sinh quá nhiều mã cùng lúc:** khó tìm lỗi và khó hiểu kiến trúc. Chia nhỏ theo chức năng dọc từ database đến giao diện.
2. **AI tự đổi schema:** yêu cầu cập nhật migration và tài liệu đồng bộ; không sửa database production tùy tiện.
3. **Chỉ kiểm tra giao diện:** API vẫn có thể thiếu validation hoặc phân quyền. Kiểm thử cả Backend.
4. **Tin số tiền từ Frontend:** mọi phép tính và xác minh thanh toán phải được thực hiện ở Backend.
5. **Chỉ ẩn nút để phân quyền:** người dùng vẫn có thể gọi API trực tiếp. Backend phải kiểm tra quyền.
6. **Dùng dữ liệu giả quá lâu:** đánh dấu mock rõ ràng và có kế hoạch thay bằng API thật.
7. **Để AI tự cài thư viện không cần thiết:** yêu cầu giải thích lợi ích, rủi ro và lựa chọn thay thế.
8. **Không commit thường xuyên:** có thể mất điểm khôi phục khi AI sửa sai.
9. **Đưa secret vào prompt hoặc repository:** dùng placeholder và cấu hình local an toàn.
10. **Triển khai quá sớm:** trước khi có kiểm thử, backup và cấu hình bảo mật, chỉ nên chạy local hoặc môi trường thử nghiệm.

---

# 9. Checklist trước khi bắt đầu

- [ ] Đã cài Antigravity, JDK, Node.js, npm, Git và MySQL.
- [ ] Đã tạo thư mục repository và mở đúng thư mục trong Antigravity.
- [ ] Đã kiểm tra các phiên bản công cụ.
- [ ] Đã thống nhất phạm vi MVP.
- [ ] Đã duyệt tài liệu yêu cầu trước khi thiết kế database.
- [ ] Đã có ERD và hợp đồng API trước khi xây dựng nhiều chức năng.
- [ ] Mỗi giai đoạn có tiêu chí nghiệm thu.
- [ ] Đã hiểu cách xem diff, chạy test và tạo commit.
- [ ] Chưa cần quyết định Hosting cho tới khi biết rõ nhu cầu và mức độ sẵn sàng triển khai.

**Khuyến nghị cuối:** Hãy bắt đầu từ Giai đoạn 0, sau đó chạy prompt Giai đoạn 1 để Antigravity tạo tài liệu yêu cầu. Đừng yêu cầu nó xây dựng toàn bộ website trong một lần. Hoàn thành và nghiệm thu từng giai đoạn sẽ giúp dự án dễ kiểm soát, dễ sửa lỗi và ít phát sinh thay đổi kiến trúc về sau.
