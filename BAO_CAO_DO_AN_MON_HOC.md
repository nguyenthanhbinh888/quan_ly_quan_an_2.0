# BÁO CÁO ĐỒ ÁN MÔN HỌC

---

<div align="center">

### BỘ GIÁO DỤC VÀ ĐÀO TẠO
### TRƯỜNG ĐẠI HỌC ...
### KHOA CÔNG NGHỆ THÔNG TIN

---

\
\
\
\

## BÁO CÁO ĐỒ ÁN MÔN HỌC
### CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN / KỸ THUẬT PHẦN MỀM

\

# ĐỀ TÀI:
# XÂY DỰNG WEBSITE KINH DOANH ĐIỆN THOẠI THÔNG MINH TRỰC TUYẾN (PHONESTORE)

\
\
\
\

**Giảng viên hướng dẫn:** ..................................................... \
**Sinh viên thực hiện:** ..................................................... \
**Mã số sinh viên:** ..................................................... \
**Lớp / Khóa:** ..................................................... \

\
\
\
\

### NĂM HỌC: 2025 - 2026

</div>

\newpage

---

# LỜI CẢM ƠN

Trong suốt quá trình học tập, nghiên cứu và hoàn thành đồ án môn học với đề tài **"Xây dựng Website kinh doanh điện thoại thông minh trực tuyến (PhoneStore)"**, em đã nhận được sự quan tâm, chỉ dẫn tận tình và giúp đỡ quý báu từ nhiều thầy cô, gia đình và bạn bè.

Lời đầu tiên, em xin gửi lời cảm ơn sâu sắc và lòng biết ơn chân thành nhất đến quý Thầy/Cô trong Khoa Công nghệ Thông tin đã truyền đạt cho em những nền tảng kiến thức chuyên môn vững chắc, tư duy phân tích hệ thống và kỹ năng thực hành quý báu trong suốt các học kỳ vừa qua.

Đặc biệt, em xin bày tỏ lòng biết ơn chân thành nhất đến **Giảng viên hướng dẫn**, người đã trực tiếp tận tình chỉ dẫn, định hướng đề tài, giải đáp các vướng mắc kỹ thuật và đóng góp những ý kiến sâu sắc để em có thể từng bước hoàn thiện các chức năng và bài báo cáo đồ án này một cách chỉn chu và đúng chuẩn mực nhất.

Mặc dù em đã nỗ lực hết mình để tìm hiểu công nghệ, thiết kế kiến trúc và kiểm thử chương trình, song do kinh nghiệm thực tế và kiến thức của bản thân vẫn còn những giới hạn nhất định, đồ án chắc chắn khó tránh khỏi những thiếu sót. Em rất mong nhận được những ý kiến đóng góp, nhận xét và phê bình quý báu từ quý Thầy/Cô trong hội đồng chấm đồ án để sản phẩm của em ngày càng hoàn thiện hơn và có thể ứng dụng thực tiễn trong tương lai.

Em xin kính chúc quý Thầy/Cô luôn dồi dào sức khỏe, hạnh phúc và gặt hái được nhiều thành công hơn nữa trong sự nghiệp trồng người cao quý!

*Hà Nội, ngày ... tháng ... năm 2026* \
**Sinh viên thực hiện** \
*(Ký và ghi rõ họ tên)*

\newpage

---

# MỤC LỤC

- [LỜI CẢM ƠN](#lời-cảm-ơn)
- [MỤC LỤC](#mục-lục)
- [DANH MỤC CÁC CHỮ VIẾT TẮT](#danh-mục-các-chữ-viết-tắt)
- [DANH MỤC CÁC BẢNG](#danh-mục-các-bảng)
- [DANH MỤC CÁC HÌNH](#danh-mục-các-hình)
- [MỞ ĐẦU](#mở-đầu)
  - [1. Lý do chọn đề tài](#1-lý-do-chọn-đề-tài)
  - [2. Mục tiêu nghiên cứu của đồ án](#2-mục-tiêu-nghiên-cứu-của-đồ-án)
  - [3. Đối tượng và phạm vi nghiên cứu](#3-đối-tượng-và-phạm-vi-nghiên-cứu)
  - [4. Phương pháp nghiên cứu và công cụ sử dụng](#4-phương-pháp-nghiên-cứu-và-công-cụ-sử-dụng)
  - [5. Bố cục của báo cáo đồ án](#5-bố-cục-của-báo-cáo-đồ-án)
- [CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ CÔNG CỤ PHÁT TRIỂN](#chương-1-tổng-quan-về-công-nghệ-và-công-cụ-phát-triển)
  - [1.1. Tổng quan về bài toán thương mại điện tử ngành hàng điện thoại](#11-tổng-quan-về-bài-toán-thương-mại-điện-tử-ngành-hàng-điện-thoại)
  - [1.2. Công nghệ nền tảng phía Backend](#12-công-nghệ-nền-tảng-phía-backend)
    - [1.2.1. Ngôn ngữ Java 21](#121-ngôn-ngữ-java-21)
    - [1.2.2. Khung ứng dụng Spring Boot 3.4](#122-khung-ứng-dụng-spring-boot-34)
    - [1.2.3. Cơ chế xác thực Spring Security & JWT](#123-cơ-chế-xác-thực-spring-security--jwt)
  - [1.3. Công nghệ nền tảng phía Frontend](#13-công-nghệ-nền-tảng-phía-frontend)
    - [1.3.1. Thư viện React 19 và TypeScript](#131-thư-viện-react-19-và-typescript)
    - [1.3.2. Công cụ đóng gói Vite](#132-công-cụ-đóng-gói-vite)
    - [1.3.3. Thiết kế giao diện hiện đại Glassmorphism](#133-thiết-kế-giao-diện-hiện-đại-glassmorphism)
  - [1.4. Hệ quản trị cơ sở dữ liệu MySQL](#14-hệ-quản-trị-cơ-sở-dữ-liệu-mysql)
  - [1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR](#15-cổng-thanh-toán-mã-quét-chuẩn-quốc-gia-vietqr)
- [CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG](#chương-2-phân-tích-và-thiết-kế-hệ-thống)
  - [2.1. Mô tả bài toán](#21-mô-tả-bài-toán)
  - [2.2. Yêu cầu bài toán](#22-yêu-cầu-bài-toán)
    - [2.2.1. Yêu cầu chức năng](#221-yêu-cầu-chức-năng)
    - [2.2.2. Yêu cầu phi chức năng](#222-yêu-cầu-phi-chức-năng)
  - [2.3. Kiến trúc tổng thể hệ thống](#23-kiến-trúc-tổng-thể-hệ-thống)
  - [2.4. Biểu đồ Use Case](#24-biểu-đồ-use-case)
    - [2.4.1. Biểu đồ Use Case tổng quát](#241-biểu-đồ-use-case-tổng-quát)
    - [2.4.2. Biểu đồ Use Case phía Quản trị viên (Admin)](#242-biểu-đồ-use-case-phía-quản-trị-viên-admin)
    - [2.4.3. Biểu đồ Use Case phía Người dùng](#243-biểu-đồ-use-case-phía-người-dùng)
  - [2.5. Mô tả chi tiết các Use Case](#25-mô-tả-chi-tiết-các-use-case)
    - [2.5.1. Mô tả chi tiết Use Case Đăng ký tài khoản](#251-mô-tả-chi-tiết-use-case-đăng-ký-tài-khoản)
    - [2.5.2. Mô tả chi tiết Use Case Đăng nhập hệ thống](#252-mô-tả-chi-tiết-use-case-đăng-nhập-hệ-thống)
    - [2.5.3. Mô tả chi tiết Use Case Tìm kiếm và Lọc sản phẩm](#253-mô-tả-chi-tiết-use-case-tìm-kiếm-và-lọc-sản-phẩm)
    - [2.5.4. Mô tả chi tiết Use Case Đặt hàng và Thanh toán](#254-mô-tả-chi-tiết-use-case-đặt-hàng-và-thanh-toán)
    - [2.5.5. Mô tả chi tiết Use Case Đánh giá sản phẩm](#255-mô-tả-chi-tiết-use-case-đánh-giá-sản-phẩm)
    - [2.5.6. Mô tả chi tiết Use Case Quản lý sản phẩm và Kho hàng](#256-mô-tả-chi-tiết-use-case-quản-lý-sản-phẩm-và-kho-hàng)
    - [2.5.7. Mô tả chi tiết Use Case Quản lý đơn hàng](#257-mô-tả-chi-tiết-use-case-quản-lý-đơn-hàng)
  - [2.6. Thiết kế Backend](#26-thiết-kế-backend)
    - [2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)](#261-thiết-kế-biểu-đồ-trình-tự-sequence-diagrams)
      - [2.6.1.1. Biểu đồ trình tự chức năng Đăng nhập](#2611-biểu-đồ-trình-tự-chức-năng-đăng-nhập)
      - [2.6.1.2. Biểu đồ trình tự chức năng Đặt hàng và Trừ tồn kho](#2612-biểu-đồ-trình-tự-chức-năng-đặt-hàng-và-trừ-tồn-kho)
      - [2.6.1.3. Biểu đồ trình tự chức năng Cập nhật kho nhanh](#2613-biểu-đồ-trình-tự-chức-năng-cập-nhật-kho-nhanh)
    - [2.6.2. Biểu đồ lớp phân tích (VOPC - View of Participating Classes)](#262-biểu-đồ-lớp-phân-tích-vopc---view-of-participating-classes)
    - [2.6.3. Thiết kế cơ sở dữ liệu](#263-thiết-kế-cơ-sở-dữ-liệu)
      - [2.6.3.1. Sơ đồ quan hệ thực thể (ERD)](#2631-sơ-đồ-quan-hệ-thực-thể-erd)
      - [2.6.3.2. Cấu trúc chi tiết các bảng dữ liệu](#2632-cấu-trúc-chi-tiết-các-bảng-dữ-liệu)
- [CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ](#chương-3-chương-trình-thử-nghiệm-và-kết-quả)
  - [3.1. Môi trường triển khai và vận hành hệ thống](#31-môi-trường-triển-khai-và-vận-hành-hệ-thống)
  - [3.2. Giao diện chương trình hoàn thiện](#32-giao-diện-chương-trình-hoàn-thiện)
  - [3.3. Kịch bản kiểm thử chương trình (Test Cases)](#33-kịch-bản-kiểm-thử-chương-trình-test-cases)
  - [3.4. Đánh giá kết quả đạt được](#34-đánh-giá-kết-quả-đạt-được)
- [KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN](#kết-luận-và-hướng-phát-triển)
  - [1. Kết quả đạt được](#1-kết-quả-đạt-được)
  - [2. Những hạn chế còn tồn tại](#2-những-hạn-chế-còn-tồn-tại)
  - [3. Hướng phát triển trong tương lai](#3-hướng-phát-triển-trong-tương-lai)
- [TÀI LIỆU THAM KHẢO](#tài-liệu-tham-khảo)

\newpage

---

# DANH MỤC CÁC CHỮ VIẾT TẮT

\

| Ký hiệu viết tắt | Cụm từ đầy đủ (Tiếng Anh / Tiếng Việt) | Giải thích ý nghĩa |
| :---: | :--- | :--- |
| **API** | Application Programming Interface | Giao diện lập trình ứng dụng |
| **REST** | Representational State Transfer | Chuẩn kiến trúc thiết kế dịch vụ Web |
| **JWT** | JSON Web Token | Tiêu chuẩn mã hóa chuỗi ký tự xác thực an toàn |
| **SPA** | Single Page Application | Ứng dụng web trang đơn |
| **ORM** | Object Relational Mapping | Ánh xạ đối tượng trong code sang quan hệ CSDL |
| **JPA** | Java Persistence API | Chuẩn đặc tả quản lý dữ liệu đối tượng trong Java |
| **RDBMS** | Relational Database Management System | Hệ thống quản trị cơ sở dữ liệu quan hệ |
| **COD** | Cash On Delivery | Hình thức thanh toán bằng tiền mặt khi nhận hàng |
| **VietQR** | Vietnam Quick Response Code | Chuẩn nhận diện thanh toán mã QR của Ngân hàng Nhà nước |
| **UI / UX** | User Interface / User Experience | Giao diện người dùng / Trải nghiệm người dùng |
| **ERD** | Entity Relationship Diagram | Sơ đồ quan hệ thực thể cơ sở dữ liệu |
| **VOPC** | View of Participating Classes | Biểu đồ lớp phân tích thiết kế hướng đối tượng |

\newpage

---

# DANH MỤC CÁC BẢNG

\

- *Bảng 2.1.* Mô tả chi tiết Use Case Đăng ký tài khoản (UC_DANGKY)
- *Bảng 2.2.* Mô tả chi tiết Use Case Đăng nhập hệ thống (UC_DANGNHAP)
- *Bảng 2.3.* Mô tả chi tiết Use Case Tìm kiếm và Lọc sản phẩm (UC_TIMKIEM_LOC)
- *Bảng 2.4.* Mô tả chi tiết Use Case Đặt hàng và Thanh toán (UC_DATHANG_THANHTOAN)
- *Bảng 2.5.* Mô tả chi tiết Use Case Đánh giá sản phẩm (UC_DANHGIA)
- *Bảng 2.6.* Mô tả chi tiết Use Case Quản lý sản phẩm và Kho hàng (UC_QUANLY_KHO)
- *Bảng 2.7.* Mô tả chi tiết Use Case Quản lý đơn hàng (UC_QUANLY_DONHANG)
- *Bảng 2.8.* Cấu trúc bảng `users` (Quản lý tài khoản người dùng)
- *Bảng 2.9.* Cấu trúc bảng `brands` (Quản lý thương hiệu)
- *Bảng 2.10.* Cấu trúc bảng `categories` (Quản lý phân loại danh mục)
- *Bảng 2.11.* Cấu trúc bảng `products` (Quản lý thông tin điện thoại)
- *Bảng 2.12.* Cấu trúc bảng `product_variants` (Quản lý phiên bản, màu sắc, dung lượng và kho)
- *Bảng 2.13.* Cấu trúc bảng `orders` (Quản lý đơn đặt hàng)
- *Bảng 2.14.* Cấu trúc bảng `order_items` (Chi tiết mặt hàng trong đơn)
- *Bảng 2.15.* Cấu trúc bảng `reviews` (Đánh giá nhận xét sản phẩm)
- *Bảng 3.1.* Kịch bản kiểm thử chức năng Đăng ký và Đăng nhập
- *Bảng 3.2.* Kịch bản kiểm thử luồng Đặt hàng và Thanh toán tự động
- *Bảng 3.3.* Kịch bản kiểm thử cơ chế Quản trị kho và Bảo toàn tồn kho

\newpage

---

# DANH MỤC CÁC HÌNH

\

- *Hình 2.1.* Sơ đồ kiến trúc phân tầng hệ thống PhoneStore (Client - Server Architecture)
- *Hình 2.2.* Biểu đồ Use Case tổng quát của hệ thống
- *Hình 2.3.* Biểu đồ Use Case phân hệ Quản trị viên (Admin)
- *Hình 2.4.* Biểu đồ Use Case phân hệ Người dùng (Khách hàng)
- *Hình 2.5.* Biểu đồ mô hình hóa Use Case Đăng ký tài khoản
- *Hình 2.6.* Biểu đồ mô hình hóa Use Case Đăng nhập hệ thống
- *Hình 2.7.* Biểu đồ mô hình hóa Use Case Đặt hàng và Thanh toán
- *Hình 2.8.* Biểu đồ mô hình hóa Use Case Quản lý sản phẩm và Kho
- *Hình 2.9.* Biểu đồ mô hình hóa Use Case Quản lý đơn hàng
- *Hình 2.10.* Biểu đồ trình tự chức năng Đăng nhập & Cấp phát JWT
- *Hình 2.11.* Biểu đồ trình tự chức năng Đặt hàng & Trừ tồn kho tự động
- *Hình 2.12.* Biểu đồ trình tự chức năng Cập nhật kho nhanh (Quick Restock)
- *Hình 2.13.* Biểu đồ lớp phân tích (VOPC) chức năng Đặt hàng
- *Hình 2.14.* Biểu đồ lớp phân tích (VOPC) chức năng Quản lý sản phẩm & Kho
- *Hình 2.15.* Sơ đồ quan hệ thực thể (ERD) cơ sở dữ liệu PhoneStore
- *Hình 3.1.* Giao diện Trang chủ và Khối điện thoại Hot Trending
- *Hình 3.2.* Giao diện Danh mục sản phẩm cùng Bộ lọc đa tiêu chí
- *Hình 3.3.* Giao diện Trang chi tiết điện thoại, chọn màu sắc & dung lượng bộ nhớ
- *Hình 3.4.* Giao diện Giỏ hàng thông minh và áp dụng mã voucher
- *Hình 3.5.* Giao diện Đặt hàng & Cổng thanh toán quét mã VietQR tự động
- *Hình 3.6.* Giao diện Lịch sử đơn hàng cá nhân của khách hàng
- *Hình 3.7.* Cửa sổ Đăng nhập và Đăng ký tài khoản bảo mật
- *Hình 3.8.* Bảng điều khiển Quản trị Dashboard và thống kê doanh thu
- *Hình 3.9.* Giao diện Quản lý danh sách đơn hàng và chuyển trạng thái giao vận
- *Hình 3.10.* Giao diện Quản lý điện thoại, chỉnh sửa thông tin và nhập kho
- *Hình 3.11.* Cửa sổ Tải ảnh trực tiếp từ máy tính lưu lên máy chủ dữ liệu

\newpage

---

# MỞ ĐẦU

### 1. Lý do chọn đề tài
Trong kỷ nguyên chuyển đổi số và bùng nổ của thương mại điện tử hiện nay, điện thoại thông minh (Smartphone) không chỉ là một thiết bị liên lạc thông thường mà đã trở thành công cụ làm việc, giải trí và trung tâm kết nối không thể thiếu của mỗi cá nhân. Nhu cầu mua sắm điện thoại thông qua các nền tảng trực tuyến ngày càng tăng trưởng vượt bậc nhờ tính tiện lợi, khả năng so sánh cấu hình nhanh chóng và chính sách giao hàng tận nơi.

Tuy nhiên, đặc thù của mặt hàng điện thoại thông minh là sản phẩm có giá trị cao, đa dạng về phân loại (cùng một dòng máy có nhiều màu sắc, nhiều tùy chọn dung lượng RAM/ROM và mức giá khác nhau). Các hệ sinh thái bán hàng truyền thống thường gặp khó khăn trong việc đồng bộ số lượng tồn kho theo từng phiên bản, dẫn đến tình trạng khách đặt mua nhưng thực tế đã hết hàng, hoặc quy trình xác nhận thanh toán chuyển khoản thủ công tốn nhiều nhân lực.

Xuất phát từ thực tiễn trên, em đã quyết định lựa chọn đề tài **"Xây dựng Website kinh doanh điện thoại thông minh trực tuyến (PhoneStore)"** làm đồ án môn học. Đề tài hướng tới việc nghiên cứu, vận dụng các công nghệ hiện đại hàng đầu hiện nay như **Spring Boot 3, Java 21, React 19, TypeScript và MySQL** nhằm xây dựng một hệ thống bán hàng hoàn chỉnh, giải quyết bài toán quản lý kho đa biến thể, tích hợp cổng quét mã QR thanh toán tức thì và cung cấp trải nghiệm mua sắm chuẩn công nghệ cao cho người dùng.

### 2. Mục tiêu nghiên cứu của đồ án
- **Về mặt kiến thức:** Nắm vững phương pháp phân tích và thiết kế hệ thống thông tin theo mô hình hướng đối tượng (OOAD), kiến trúc phân tầng Micro-services/RESTful API, cơ chế bảo mật JWT trong Spring Security và mô hình trạng thái ứng dụng Single Page Application (SPA).
- **Về mặt sản phẩm:** Xây dựng thành công hệ thống website bán lẻ điện thoại với đầy đủ hai phân hệ:
  1. *Phân hệ Khách hàng (Client Portal):* Duyệt xem điện thoại, bộ lọc thông minh (thương hiệu, khoảng giá, RAM, bộ nhớ), xem chi tiết thông số kỹ thuật, chọn màu sắc & dung lượng, giỏ hàng, đặt hàng thanh toán COD hoặc quét mã VietQR tự động, theo dõi tiến độ đơn hàng và đánh giá sản phẩm.
  2. *Phân hệ Quản trị viên (Admin Dashboard):* Thống kê trực quan doanh thu & cảnh báo tồn kho, quản lý danh mục và thương hiệu, quản lý danh sách đơn hàng và xử lý luồng trạng thái giao vận, đăng mới điện thoại kèm chức năng tải ảnh từ máy tính lưu trực tiếp lên hệ thống dữ liệu, sửa thông tin sản phẩm và cập nhật nhanh tồn kho (Quick Restock).

### 3. Đối tượng và phạm vi nghiên cứu
- **Đối tượng nghiên cứu:** Quy trình nghiệp vụ bán lẻ thiết bị di động, cơ chế bảo toàn dữ liệu tồn kho trong giao dịch thương mại điện tử, chuẩn kiến trúc REST API và giao thức tích hợp thanh toán VietQR.
- **Phạm vi nghiên cứu:** Hệ thống phần mềm web được xây dựng và triển khai thử nghiệm trên môi trường cục bộ (Localhost), mô phỏng đầy đủ chu trình mua bán từ lúc khách chọn điện thoại đến khi đơn hàng hoàn tất.

### 4. Phương pháp nghiên cứu và công cụ sử dụng
- **Phương pháp nghiên cứu:** Phương pháp phân tích nghiệp vụ thực tế từ các chuỗi bán lẻ công nghệ hàng đầu (như Thế Giới Di Động, FPT Shop, Apple Store); áp dụng quy trình phát triển phần mềm lặp (Iterative Software Development).
- **Công cụ và ngôn ngữ:** Java 21, Spring Boot 3.4, React 19, TypeScript, Vite, MySQL 8.0, Maven, Postman, Antigravity IDE / IntelliJ IDEA.

### 5. Bố cục của báo cáo đồ án
Ngoài phần Mở đầu, Kết luận và Tài liệu tham khảo, nội dung báo cáo đồ án được cấu trúc thành 3 chương chính:
- **Chương 1: Tổng quan về công nghệ và công cụ phát triển:** Giới thiệu chi tiết về bài toán kinh doanh và các nền tảng công nghệ, ngôn ngữ, thư viện được lựa chọn sử dụng trong đồ án.
- **Chương 2: Phân tích và thiết kế hệ thống:** Trình bày chi tiết mô tả bài toán, các yêu cầu chức năng và phi chức năng, biểu đồ Use Case, bảng đặc tả chi tiết Use Case, biểu đồ tuần tự (Sequence Diagram), biểu đồ lớp phân tích (VOPC) và thiết kế cơ sở dữ liệu quan hệ.
- **Chương 3: Chương trình thử nghiệm và kết quả:** Trình bày các giao diện màn hình chính của ứng dụng hoàn thiện, kịch bản kiểm thử (Test Cases) và đánh giá các kết quả đạt được.

\newpage

---

# CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ CÔNG CỤ PHÁT TRIỂN

### 1.1. Tổng quan về bài toán thương mại điện tử ngành hàng điện thoại
Kinh doanh điện thoại di động trực tuyến có những đặc thù nghiệp vụ phức tạp hơn so với các mặt hàng thông thường:
- **Tính đa biến thể (Multi-variants):** Một dòng máy (ví dụ: *iPhone 16 Pro Max*) được phát hành với nhiều màu sắc (*Titan Sa Mạc, Titan Đen, Titan Trắng*) và nhiều dung lượng bộ nhớ (*256GB, 512GB, 1TB*). Mỗi biến thể có mức giá bán, giá niêm yết và số lượng hàng trong kho hoàn toàn riêng biệt.
- **Tính chính xác về tồn kho:** Việc đồng bộ tồn kho mang tính sống còn. Khi một khách hàng bấm đặt mua chiếc máy cuối cùng, hệ thống phải ngay lập tức khóa tồn kho để tránh việc bán vượt số lượng thực tế (Over-selling). Khi đơn hàng bị hủy, số lượng này phải tự động hoàn trả về kho.
- **Nhu cầu tra cứu thông số kỹ thuật chi tiết:** Người tiêu dùng công nghệ luôn có xu hướng so sánh chip vi xử lý, thời lượng pin, độ phân giải camera, kích thước và tần số quét màn hình trước khi ra quyết định đặt mua.

### 1.2. Công nghệ nền tảng phía Backend

#### 1.2.1. Ngôn ngữ Java 21
Đồ án sử dụng phiên bản **Java 21 LTS (Long-Term Support)** mới nhất. Java 21 mang lại hiệu năng xử lý đa luồng vượt trội, khả năng quản lý bộ nhớ tối ưu, cơ chế Pattern Matching hiện đại và tính bảo mật cao, đảm bảo hệ thống vận hành bền bỉ và ổn định.

#### 1.2.2. Khung ứng dụng Spring Boot 3.4
Spring Boot 3.4 là nền tảng máy chủ doanh nghiệp phổ biến nhất thế giới hiện nay dành cho Java:
- **Kiến trúc Spring MVC & REST Controller:** Cung cấp cơ chế định tuyến linh hoạt, tách biệt rành mạch giữa các tầng Controller (tiếp nhận HTTP Request), Service (xử lý logic nghiệp vụ) và Repository (truy xuất dữ liệu).
- **Spring Data JPA / Hibernate:** Quản lý cơ sở dữ liệu quan hệ theo mô hình ORM, loại bỏ các câu lệnh SQL viết tay phức tạp, tự động quản lý kết nối và Transaction an toàn với `@Transactional`.
- **Validation Framework:** Sử dụng Jakarta Validation (`@Valid`, `@NotBlank`, `@Min`) để kiểm tra tính hợp lệ của dữ liệu đầu vào ngay tại tầng biên Controller.

#### 1.2.3. Cơ chế xác thực Spring Security & JWT
Hệ thống áp dụng cơ chế xác thực không lưu trạng thái (Stateless Authentication) dựa trên **JSON Web Token (JWT)**:
- Người dùng đăng nhập thành công với tài khoản và mật khẩu được mã hóa bằng thuật toán `BCryptPasswordEncoder`.
- Máy chủ phát hành một chuỗi JWT Token có chứa định danh người dùng và quyền hạn (`ROLE_USER` hoặc `ROLE_ADMIN`).
- Mọi yêu cầu gọi API nhạy cảm tiếp theo đều được bộ lọc `JwtAuthenticationFilter` giải mã và kiểm tra tính hợp lệ trước khi cho phép thực thi, đảm bảo phân quyền nghiêm ngặt giữa khách hàng và quản trị viên.

### 1.3. Công nghệ nền tảng phía Frontend

#### 1.3.1. Thư viện React 19 và TypeScript
- **React 19:** Thư viện giao diện người dùng hàng đầu thế giới với kiến trúc Component hóa, cho phép tái sử dụng tối đa mã nguồn (Navbar, Footer, ProductCard, Modals) và Virtual DOM giúp cập nhật giao diện mượt mà không cần tải lại toàn bộ trang web.
- **TypeScript:** Ngôn ngữ lập trình bổ sung kiểu tĩnh (Static Typing) cho JavaScript, giúp loại bỏ hầu hết các lỗi tiềm ẩn trong thời gian biên dịch (Runtime errors), quản lý chặt chẽ cấu trúc dữ liệu (`ProductDetail`, `ProductVariant`, `OrderDto`) tương thích 100% với Backend DTO.

#### 1.3.2. Công cụ đóng gói Vite
Vite là công cụ phát triển hiện đại thế hệ mới, thay thế Webpack truyền thống:
- Khởi động môi trường phát triển chỉ trong vài trăm mili-giây.
- Cơ chế **Hot Module Replacement (HMR)** cập nhật ngay lập tức các thay đổi giao diện lên trình duyệt mà không làm mất đi trạng thái hiện tại của ứng dụng.
- Tối ưu hóa đóng gói thành các tệp tĩnh nén (Gzip) với kích thước nhỏ và tốc độ tải trang cực nhanh.

#### 1.3.3. Thiết kế giao diện hiện đại Glassmorphism
Frontend được thiết kế theo trường phái hiện đại **Dark Mode & Glassmorphism** (kính mờ sang trọng):
- Tông màu đen tuyền huyền bí kết hợp ánh sáng Neon xanh Cyan (`#06b6d4`) và tím Indigo (`#4f46e5`).
- Sử dụng hiệu ứng `backdrop-filter: blur()`, đổ bóng phát sáng tinh tế, phù hợp với phong cách công nghệ cao của thế hệ trẻ Gen-Z.
- Sử dụng bộ icon vector chất lượng cao từ thư viện `lucide-react`.

### 1.4. Hệ quản trị cơ sở dữ liệu MySQL
Hệ thống sử dụng **MySQL 8.0** kết hợp với bộ điều khiển `mysql-connector-j` và hồ bơi kết nối hiệu năng cao **HikariCP**:
- Quản lý ràng buộc toàn vẹn khóa chính (Primary Key), khóa ngoại (Foreign Key) và quy tắc `ON DELETE CASCADE`.
- Đảm bảo tính toán toàn vẹn dữ liệu giao dịch (ACID) khi đồng thời có nhiều người mua hàng và trừ tồn kho.

### 1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR
Hệ thống tích hợp chuẩn thanh toán **VietQR** được Ngân hàng Nhà nước Việt Nam chuẩn hóa:
- Tự động tạo mã QR động chứa đầy đủ thông tin: Mã ngân hàng (ví dụ: `MBBank - 970422`), Số tài khoản thụ hưởng, Tên chủ sở hữu tài khoản, Số tiền thanh toán chính xác theo đơn hàng và Mã nội dung chuyển khoản duy nhất (`ORD-20261019-XXXXX`).
- Khách hàng chỉ cần mở bất kỳ ứng dụng Mobile Banking nào (hoặc ví điện tử MoMo, Viettel Money, ZaloPay) để quét mã và thanh toán trong 3 giây.
- Hệ thống hỗ trợ nút "Mô phỏng quét mã thành công" để kiểm thử tức thì luồng gạch nợ và đổi trạng thái thanh toán sang `PAID`.

\newpage

---

# CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

### 2.1. Mô tả bài toán
Cửa hàng điện thoại thông minh trực tuyến **PhoneStore** hoạt động như một kênh bán lẻ đa phương thức kết nối giữa khách hàng và doanh nghiệp. Hệ thống cần phục vụ 2 nhóm đối tượng tác nhân:
1. **Khách hàng (User):** Là người tiêu dùng có nhu cầu tìm hiểu, so sánh cấu hình và đặt mua điện thoại trực tuyến. Khách hàng có thể là khách vãng lai (xem sản phẩm, tìm kiếm) hoặc khách hàng đã đăng ký tài khoản (quản lý giỏ hàng, đặt hàng giao tận nơi, quét mã thanh toán, theo dõi tiến độ đơn hàng và gửi đánh giá sản phẩm).
2. **Quản trị viên (Admin):** Là nhân viên hoặc chủ cửa hàng, chịu trách nhiệm quản lý toàn bộ hệ sinh thái sản phẩm, nhập kho, duyệt đơn hàng và theo dõi chỉ số doanh thu kinh doanh.

### 2.2. Yêu cầu bài toán

#### 2.2.1. Yêu cầu chức năng
Hệ thống được chia thành 4 phân hệ chức năng chính:
1. **Phân hệ Quản lý Tài khoản & Phân quyền:**
   - Đăng ký tài khoản người dùng mới (kiểm tra trùng username, trùng email).
   - Đăng nhập hệ thống cấp phát chuỗi JWT Token; phân quyền chính xác giữa `ROLE_USER` và `ROLE_ADMIN`.
   - Lấy thông tin tài khoản hiện tại, ghi nhớ đăng nhập, hỗ trợ quy trình quên mật khẩu.
2. **Phân hệ Sản phẩm & Tra cứu danh mục:**
   - Xem danh sách sản phẩm trang chủ, hiển thị khối Hot Trending nổi bật có hiệu ứng tương tác trực quan.
   - Tìm kiếm điện thoại theo từ khóa tên hoặc mô tả.
   - Lọc đa tiêu chí: theo Hãng (Apple, Samsung, Xiaomi, OPPO), theo Phân khúc (Flagship, Tầm trung, Phổ thông), theo Mức giá (Dưới 10tr, 10-20tr, 20-30tr, Trên 30tr), theo Dung lượng RAM và Dung lượng bộ nhớ trong.
   - Xem chi tiết điện thoại: ảnh đại diện, danh sách phiên bản màu sắc, giá bán, giá niêm yết, tình trạng tồn kho, thông số kỹ thuật (chip, pin, camera, màn hình, OS) và danh sách đánh giá từ người mua trước.
3. **Phân hệ Giỏ hàng & Đặt hàng - Thanh toán:**
   - Thêm sản phẩm vào giỏ hàng với phiên bản màu và dung lượng cụ thể.
   - Cập nhật số lượng, xóa mặt hàng, tính toán tự động tổng tiền và tiền giảm giá khuyến mãi.
   - Điền thông tin giao hàng (họ tên, số điện thoại, địa chỉ nhận hàng, ghi chú).
   - Lựa chọn phương thức thanh toán: Thanh toán khi nhận hàng (COD) hoặc Chuyển khoản quét mã VietQR tự động.
   - Tự động trừ kho của phiên bản tương ứng ngay khi đơn được tạo.
   - Xem lịch sử các đơn hàng đã đặt và theo dõi tiến độ giao hàng theo thời gian thực.
4. **Phân hệ Quản trị cửa hàng (Dành riêng cho Admin):**
   - Bảng điều khiển (Dashboard) thống kê trực quan: Doanh thu thực tế, Tổng đơn hàng, Số máy đã bán và Danh sách cảnh báo các phiên bản sắp hết hàng trong kho.
   - Quản lý đơn hàng: Xem danh sách, lọc theo trạng thái (`PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED`), chuyển trạng thái đơn hàng và cập nhật tình trạng thanh toán (`PAID`). Nếu đơn bị hủy, tự động hoàn trả số lượng máy về kho.
   - Quản lý điện thoại: Danh sách toàn bộ sản phẩm, thêm mới sản phẩm kèm theo tính năng tải ảnh từ máy tính lưu trực tiếp lên máy chủ, chỉnh sửa thông tin sản phẩm đã có và ẩn sản phẩm khỏi gian hàng (Soft Delete).
   - Nhập kho nhanh (Quick Restock): Cập nhật số lượng tồn kho của từng phiên bản máy mà không làm gián đoạn hệ thống.

#### 2.2.2. Yêu cầu phi chức năng
- **Tính bảo mật:** Mật khẩu người dùng được băm mã hóa một chiều an toàn bằng BCrypt; API nhạy cảm được bảo vệ bởi bộ lọc JWT Filter.
- **Tính toàn vẹn dữ liệu:** Toàn bộ thao tác thanh toán, tạo đơn hàng và trừ kho phải tuân thủ chuẩn Transaction (ACID). Nếu một khâu gặp sự cố, hệ thống tự động Rollback để đảm bảo số liệu kho không bị sai lệch.
- **Hiệu năng & Tốc độ đáp ứng:** Tốc độ phản hồi của các API tra cứu sản phẩm dưới 200ms; giao diện trang đơn (SPA) phản hồi tức thì với người dùng.
- **Tính tương thích:** Giao diện Responsive hoạt động chuẩn xác trên các kích thước màn hình máy tính (Desktop/Laptop) và điện thoại di động (Mobile).

### 2.3. Kiến trúc tổng thể hệ thống
Hệ thống PhoneStore được thiết kế theo mô hình kiến trúc phân tầng Client - Server (Kiến trúc 3 lớp):

*(Vị trí chèn Hình 2.1: Sơ đồ kiến trúc phân tầng hệ thống PhoneStore)*

```
[ Trình duyệt Web Người dùng & Admin ] (React 19 + TypeScript + Vite)
                      │
                      │  RESTful API (JSON) qua giao thức HTTP/HTTPS
                      ▼
[ Tầng API Gateway / Controller ] (Spring MVC + Spring Security + JWT Filter)
                      │
                      ▼
[ Tầng Nghiệp vụ - Service Layer ] (ProductService, OrderService, AuthService,...)
                      │
                      ▼
[ Tầng Truy xuất Dữ liệu - Repository ] (Spring Data JPA + Hibernate ORM)
                      │
                      ▼
[ Cơ sở dữ liệu quan hệ MySQL 8.0 ]
```

<div align="center">
*Hình 2.1. Sơ đồ kiến trúc phân tầng hệ thống PhoneStore*
</div>

\newpage

---

### 2.4. Biểu đồ Use Case

#### 2.4.1. Biểu đồ Use Case tổng quát
Biểu đồ Use Case tổng quát mô tả toàn bộ mối quan hệ giữa hai tác nhân chính (Khách hàng và Quản trị viên) với hệ thống PhoneStore:

*(Vị trí chèn Hình 2.2: Biểu đồ Use Case tổng quát của hệ thống - Sinh viên vẽ hoặc xuất ảnh từ mô hình)*

```
                 HỆ THỐNG PHONESTORE
       ┌──────────────────────────────────────┐
       │ (Đăng ký tài khoản)                  │
       │ (Đăng nhập / Đăng xuất)              │
       │ (Duyệt & Tìm kiếm điện thoại)        │
       │ (Xem chi tiết thông số kỹ thuật)     │
[Khách hàng]──┼─(Quản lý giỏ hàng)                    │
       │ (Đặt hàng & Thanh toán VietQR / COD) │
       │ (Theo dõi trạng thái đơn hàng)       │
       │ (Gửi đánh giá & bình luận sản phẩm)  │
       │                                      │
       │ (Xem thống kê doanh thu Dashboard)   │
       │ (Quản lý trạng thái đơn hàng)        │
[Admin]┼─(Cập nhật thanh toán đơn hàng)       │───[Hệ thống VietQR]
       │ (Đăng mới & Tải ảnh điện thoại)      │
       │ (Chỉnh sửa thông tin sản phẩm)       │
       │ (Quản lý & Nhập tồn kho nhanh)       │
       │ (Ẩn sản phẩm / Xóa đánh giá spam)    │
       └──────────────────────────────────────┘
```

<div align="center">
*Hình 2.2. Biểu đồ Use Case tổng quát của hệ thống*
</div>

\

#### 2.4.2. Biểu đồ Use Case phía Quản trị viên (Admin)

*(Vị trí chèn Hình 2.3: Biểu đồ Use Case phân hệ Quản trị viên)*

<div align="center">
*Hình 2.3. Biểu đồ Use Case phân hệ Quản trị viên (Admin)*
</div>

Các chức năng chính của Quản trị viên (Admin):
- Đăng nhập tài khoản quản trị (Role: `ROLE_ADMIN`).
- Xem Bảng điều khiển Dashboard (Thống kê doanh thu, tổng số đơn hàng, số máy bán ra và cảnh báo tồn kho thấp).
- Quản lý đơn hàng: Lọc đơn theo trạng thái, chuyển trạng thái giao vận (`CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED`), xác nhận thanh toán chuyển khoản.
- Quản lý điện thoại: Thêm mới điện thoại (chọn và tải ảnh trực tiếp từ máy tính lưu lên máy chủ), sửa thông tin điện thoại, ẩn/xóa sản phẩm.
- Nhập kho nhanh (Quick Restock): Cập nhật nhanh số lượng tồn kho theo từng phiên bản màu sắc và bộ nhớ.
- Kiểm duyệt đánh giá: Xóa các đánh giá không hợp lệ hoặc spam.

\

#### 2.4.3. Biểu đồ Use Case phía Người dùng (Khách hàng)

*(Vị trí chèn Hình 2.4: Biểu đồ Use Case phân hệ Người dùng)*

<div align="center">
*Hình 2.4. Biểu đồ Use Case phân hệ Người dùng (Khách hàng)*
</div>

Các chức năng chính của Người dùng (Khách hàng):
- Đăng ký tài khoản thành viên mới.
- Đăng nhập hệ thống / Quên mật khẩu.
- Tra cứu danh mục và lọc điện thoại theo thương hiệu, mức giá, RAM, bộ nhớ.
- Xem chi tiết máy, chọn màu sắc và phiên bản cấu hình.
- Thêm vào giỏ hàng và cập nhật số lượng mặt hàng.
- Tiến hành Đặt hàng, chọn hình thức thanh toán COD hoặc Chuyển khoản VietQR.
- Tra cứu lịch sử đơn hàng cá nhân và trạng thái giao hàng.
- Viết đánh giá chất lượng (1-5 sao) và gửi nhận xét.

\newpage

---

### 2.5. Mô tả chi tiết các Use Case

#### 2.5.1. Mô tả chi tiết Use Case Đăng ký tài khoản

<div align="center">

*Bảng 2.1. Mô tả chi tiết use case Đăng ký tài khoản*

| Mã Use case | UC_DANGKY | Tên Use case | Đăng ký tài khoản |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Khách hàng vãng lai (Chưa có tài khoản) | | |
| **Mô tả** | Cho phép khách hàng tạo mới một tài khoản thành viên trong hệ thống để quản lý đơn hàng và tích lũy ưu đãi | | |
| **Sự kiện kích hoạt** | Người dùng bấm nút "Đăng ký" trên thanh điều hướng hoặc trong modal xác thực | | |
| **Tiền điều kiện** | Người dùng đang ở trạng thái chưa đăng nhập | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Khách hàng | Chọn tab "Tạo tài khoản mới" trên cửa sổ xác thực |
| | 2 | Khách hàng | Điền đầy đủ thông tin: Tên đăng nhập, Email, Mật khẩu, Xác nhận mật khẩu, Họ và tên, Số điện thoại và Địa chỉ |
| | 3 | Khách hàng | Tích chọn đồng ý Điều khoản dịch vụ và bấm "Hoàn Tất Đăng Ký Tài Khoản" |
| | 4 | Hệ thống | Kiểm tra tính hợp lệ dữ liệu (Mật khẩu tối thiểu 6 ký tự, 2 mật khẩu phải khớp nhau, định dạng email chuẩn) |
| | 5 | Hệ thống | Kiểm tra trong CSDL xem tên đăng nhập hoặc email đã tồn tại chưa |
| | 6 | Hệ thống | Mã hóa mật khẩu bằng BCrypt, tạo bản ghi `users` mới với quyền `ROLE_USER` và lưu vào MySQL |
| | 7 | Hệ thống | Tự động tạo chuỗi JWT Token và đăng nhập thành công cho người dùng, đóng cửa sổ và hiển thị thông báo chào mừng |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 4a | Hệ thống | Nếu mật khẩu xác nhận không khớp, hệ thống thông báo lỗi và yêu cầu nhập lại |
| | 5a | Hệ thống | Nếu Tên đăng nhập hoặc Email đã có người sử dụng, hệ thống hiển thị thông báo lỗi màu đỏ |
| **Hậu điều kiện** | Tài khoản mới được ghi nhận an toàn trong CSDL; người dùng chuyển sang trạng thái đã đăng nhập | | |

</div>

\

*(Vị trí chèn Hình 2.5: Biểu đồ mô hình hóa use case Đăng ký tài khoản)*

<div align="center">
*Hình 2.5. Biểu đồ mô hình hóa use case Đăng ký tài khoản*
</div>

\newpage

#### 2.5.2. Mô tả chi tiết Use Case Đăng nhập hệ thống

<div align="center">

*Bảng 2.2. Mô tả chi tiết use case Đăng nhập hệ thống*

| Mã Use case | UC_DANGNHAP | Tên Use case | Đăng nhập hệ thống |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Khách hàng, Quản trị viên (Admin) | | |
| **Mô tả** | Xác thực danh tính người dùng và cấp phát JWT Token truy cập hệ thống | | |
| **Sự kiện kích hoạt** | Người dùng bấm nút "Đăng nhập" trên thanh điều hướng | | |
| **Tiền điều kiện** | Người dùng đã có tài khoản hợp lệ trong hệ thống | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Người dùng | Nhập Tên đăng nhập (hoặc Email) và Mật khẩu |
| | 2 | Người dùng | Bấm nút "Đăng Nhập" |
| | 3 | Hệ thống | Gửi yêu cầu đăng nhập lên API Backend `/api/auth/login` |
| | 4 | Hệ thống | So khớp mật khẩu với bản ghi trong MySQL bằng `BCryptPasswordEncoder` |
| | 5 | Hệ thống | Sinh chuỗi JWT Token chứa ID và quyền hạn, trả về Frontend lưu vào `localStorage` |
| | 6 | Hệ thống | Tải thông tin tài khoản, cập nhật trạng thái hiển thị trên thanh điều hướng (kèm nút "Quản trị" nếu là Admin) |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 4a | Hệ thống | Nếu tài khoản hoặc mật khẩu không chính xác, hệ thống thông báo lỗi: "Tài khoản hoặc mật khẩu không chính xác" |
| **Hậu điều kiện** | Phiên đăng nhập được thiết lập; quyền hạn được kích hoạt tương ứng | | |

</div>

\

*(Vị trí chèn Hình 2.6: Biểu đồ mô hình hóa use case Đăng nhập hệ thống)*

<div align="center">
*Hình 2.6. Biểu đồ mô hình hóa use case Đăng nhập hệ thống*
</div>

\newpage

#### 2.5.3. Mô tả chi tiết Use Case Tìm kiếm và Lọc sản phẩm

<div align="center">

*Bảng 2.3. Mô tả chi tiết use case Tìm kiếm và Lọc sản phẩm*

| Mã Use case | UC_TIMKIEM_LOC | Tên Use case | Tìm kiếm và Lọc sản phẩm |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Khách hàng (Vãng lai hoặc Đã đăng nhập) | | |
| **Mô tả** | Hỗ trợ người dùng tra cứu, tìm kiếm và lọc danh sách điện thoại theo nhiều tiêu chí kết hợp | | |
| **Sự kiện kích hoạt** | Người dùng gõ từ khóa vào thanh tìm kiếm hoặc nhấp chọn các bộ lọc tại trang danh mục | | |
| **Tiền điều kiện** | Cơ sở dữ liệu có các sản phẩm đang hoạt động (`is_active = true`) | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Khách hàng | Nhập từ khóa trên Header hoặc chọn tiêu chí lọc: Thương hiệu (Apple, Samsung...), Khoảng giá, RAM, Dung lượng |
| | 2 | Hệ thống | Bắt sự kiện thay đổi và gửi HTTP GET request kèm tham số tới API `/api/products` |
| | 3 | Hệ thống | Backend thực thi câu truy vấn kết hợp các điều kiện lọc trong CSDL |
| | 4 | Hệ thống | Trả về danh sách kết quả kèm thông tin phân trang (Page, TotalElements) |
| | 5 | Hệ thống | Giao diện tự động render các thẻ sản phẩm `ProductCard` kèm mức giá thấp nhất, ảnh đại diện và tùy chọn màu |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 4a | Hệ thống | Nếu không tìm thấy kết quả phù hợp, hệ thống hiển thị thông báo: "Không tìm thấy điện thoại nào phù hợp với bộ lọc" |
| **Hậu điều kiện** | Danh sách sản phẩm được hiển thị trực quan, đúng tiêu chuẩn tìm kiếm | | |

</div>

\newpage

#### 2.5.4. Mô tả chi tiết Use Case Đặt hàng và Thanh toán

<div align="center">

*Bảng 2.4. Mô tả chi tiết use case Đặt hàng và Thanh toán*

| Mã Use case | UC_DATHANG_THANHTOAN | Tên Use case | Đặt hàng và Thanh toán |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Khách hàng đã đăng nhập | | |
| **Mô tả** | Quy trình tạo đơn mua điện thoại, trừ tồn kho tức thì và thanh toán qua VietQR hoặc COD | | |
| **Sự kiện kích hoạt** | Người dùng bấm nút "Tiến hành thanh toán" từ trang Giỏ hàng | | |
| **Tiền điều kiện** | Giỏ hàng có ít nhất một sản phẩm và người dùng đã đăng nhập tài khoản | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Khách hàng | Nhập thông tin người nhận: Họ tên, Số điện thoại, Địa chỉ giao hàng, Ghi chú đơn |
| | 2 | Khách hàng | Chọn phương thức thanh toán: COD (Thanh toán khi nhận) hoặc VietQR (Chuyển khoản ngân hàng) |
| | 3 | Khách hàng | Bấm nút "Xác Nhận Đặt Hàng" |
| | 4 | Hệ thống | Kiểm tra tồn kho của từng phiên bản máy trong đơn hàng |
| | 5 | Hệ thống | Tạo bản ghi `orders` mới với mã đơn duy nhất (ví dụ: `ORD-20261019-XXXXX`), lưu các `order_items` tương ứng |
| | 6 | Hệ thống | **Trừ ngay số lượng tồn kho** tương ứng trong bảng `product_variants` |
| | 7 | Hệ thống | Xóa sạch giỏ hàng hiện tại của khách hàng |
| | 8 | Hệ thống | Nếu chọn VietQR: Hiển thị giao diện quét mã QR động chứa số tài khoản, số tiền và nội dung chuyển khoản |
| | 9 | Hệ thống | Chuyển hướng người dùng sang trang tra cứu đơn hàng hoặc thông báo đặt hàng thành công |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 4a | Hệ thống | Nếu một phiên bản vừa hết hàng (`stockQuantity < số lượng mua`), hệ thống dừng giao dịch và thông báo: "Sản phẩm đã hết hàng trong kho" |
| **Hậu điều kiện** | Đơn hàng được lưu vào CSDL; tồn kho được cập nhật trừ đi; mã QR hiển thị sẵn sàng cho khách chuyển khoản | | |

</div>

\

*(Vị trí chèn Hình 2.7: Biểu đồ mô hình hóa use case Đặt hàng và Thanh toán)*

<div align="center">
*Hình 2.7. Biểu đồ mô hình hóa use case Đặt hàng và Thanh toán*
</div>

\newpage

#### 2.5.5. Mô tả chi tiết Use Case Đánh giá sản phẩm

<div align="center">

*Bảng 2.5. Mô tả chi tiết use case Đánh giá sản phẩm*

| Mã Use case | UC_DANHGIA | Tên Use case | Đánh giá sản phẩm |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Khách hàng đã đăng nhập | | |
| **Mô tả** | Cho phép người dùng chấm điểm số sao (1-5 ⭐) và viết bình luận nhận xét về chất lượng máy | | |
| **Sự kiện kích hoạt** | Người dùng gửi biểu mẫu đánh giá tại trang chi tiết sản phẩm | | |
| **Tiền điều kiện** | Người dùng đã đăng nhập tài khoản | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Khách hàng | Chọn số sao đánh giá (1 đến 5 sao) |
| | 2 | Khách hàng | Nhập nội dung bình luận cảm nhận về sản phẩm |
| | 3 | Khách hàng | Bấm nút "Gửi Đánh Giá" |
| | 4 | Hệ thống | Gọi API `POST /api/products/{id}/reviews` kèm theo JWT Token |
| | 5 | Hệ thống | Kiểm tra tính hợp lệ và lưu bản ghi vào bảng `reviews` |
| | 6 | Hệ thống | Tính toán lại điểm số sao trung bình của sản phẩm và hiển thị đánh giá mới ngay tức thì |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 4a | Hệ thống | Nếu chưa đăng nhập, hệ thống hiển thị thông báo và mở modal yêu cầu đăng nhập trước khi gửi nhận xét |
| **Hậu điều kiện** | Đánh giá được lưu trữ; điểm đánh giá trung bình của sản phẩm được cập nhật | | |

</div>

\newpage

#### 2.5.6. Mô tả chi tiết Use Case Quản lý sản phẩm và Kho hàng

<div align="center">

*Bảng 2.6. Mô tả chi tiết use case Quản lý sản phẩm và Kho hàng*

| Mã Use case | UC_QUANLY_KHO | Tên Use case | Quản lý sản phẩm và Kho hàng |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Quản trị viên (Admin) | | |
| **Mô tả** | Đăng mới điện thoại (chọn ảnh từ máy tính), sửa thông tin điện thoại, cập nhật tồn kho nhanh và ẩn sản phẩm | | |
| **Sự kiện kích hoạt** | Admin thao tác trên tab "Quản lý Điện thoại & Kho" | | |
| **Tiền điều kiện** | Đã đăng nhập bằng tài khoản Quản trị viên (`ROLE_ADMIN`) | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Admin | Nhấp "Thêm Mới Điện Thoại" hoặc bấm nút "Sửa" tại dòng sản phẩm |
| | 2 | Admin | Điền/Chỉnh sửa thông tin: Tên điện thoại, Thương hiệu, Danh mục, Thông số kỹ thuật (chip, pin, camera, màn hình, OS) |
| | 3 | Admin | Bấm chọn tệp ảnh từ máy tính; Hệ thống tự động upload lên `/api/upload` và lưu vào thư mục máy chủ, cập nhật ảnh đại diện |
| | 4 | Admin | Bấm "Lưu" hoặc "Cập Nhật Thông Tin"; Hệ thống gọi API `POST /api/admin/products` hoặc `PUT /api/admin/products/{id}` |
| | 5 | Admin | Nếu muốn cập nhật nhanh số lượng hàng: Bấm nút "Kho" tại dòng máy, nhập số tồn kho mới và bấm "Lưu Thay Đổi" |
| | 6 | Hệ thống | Cập nhật bản ghi trong CSDL và làm mới bảng dữ liệu tức thì |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 3a | Hệ thống | Nếu tệp tải lên không phải định dạng hình ảnh hợp lệ, hệ thống báo lỗi từ chối |
| | 5a | Admin | Nếu bấm nút "Thùng rác", hệ thống hỏi xác nhận và thực hiện Soft Delete (`is_active = false`), ẩn máy khỏi gian hàng |
| **Hậu điều kiện** | Dữ liệu sản phẩm và số lượng tồn kho được cập nhật chính xác trên toàn hệ thống | | |

</div>

\

*(Vị trí chèn Hình 2.8: Biểu đồ mô hình hóa use case Quản lý sản phẩm và Kho)*

<div align="center">
*Hình 2.8. Biểu đồ mô hình hóa use case Quản lý sản phẩm và Kho*
</div>

\newpage

#### 2.5.7. Mô tả chi tiết Use Case Quản lý đơn hàng

<div align="center">

*Bảng 2.7. Mô tả chi tiết use case Quản lý đơn hàng*

| Mã Use case | UC_QUANLY_DONHANG | Tên Use case | Quản lý đơn hàng |
| :--- | :--- | :--- | :--- |
| **Tác nhân** | Quản trị viên (Admin) | | |
| **Mô tả** | Theo dõi toàn bộ danh sách đơn đặt hàng, chuyển trạng thái giao vận và xử lý hoàn kho khi hủy đơn | | |
| **Sự kiện kích hoạt** | Admin truy cập tab "Quản lý Đơn hàng" trên Dashboard | | |
| **Tiền điều kiện** | Đã đăng nhập bằng tài khoản Quản trị viên (`ROLE_ADMIN`) | | |
| **Luồng sự kiện chính** | **#** | **Thực hiện bởi** | **Hành động** |
| | 1 | Admin | Lọc đơn hàng theo trạng thái: Chờ duyệt, Đã xác nhận, Đang giao, Hoàn thành, Đã hủy |
| | 2 | Admin | Xem chi tiết: Mã đơn, Khách hàng, Số điện thoại, Địa chỉ, Danh sách điện thoại đặt mua và Tổng tiền |
| | 3 | Admin | Tại ô Trạng thái, chọn giá trị mới (`CONFIRMED` $\rightarrow$ `SHIPPING` $\rightarrow$ `COMPLETED`) |
| | 4 | Hệ thống | Gửi yêu cầu `PUT /api/admin/orders/{id}/status` và cập nhật CSDL |
| | 5 | Admin | Kiểm tra tài khoản ngân hàng và bấm "Xác nhận đã thanh toán" để chuyển trạng thái sang `PAID` |
| **Luồng sự kiện thay thế** | **STT** | **Thực hiện bởi** | **Hành động** |
| | 3a | Admin | Nếu chọn trạng thái `CANCELLED` (Hủy đơn do đơn ảo hoặc khách đổi ý): Hệ thống tự động **hoàn trả lại đúng số lượng máy của đơn hàng về kho** |
| **Hậu điều kiện** | Trạng thái đơn được cập nhật; khách hàng theo dõi được tiến trình đơn ngay trên tài khoản của mình | | |

</div>

\

*(Vị trí chèn Hình 2.9: Biểu đồ mô hình hóa use case Quản lý đơn hàng)*

<div align="center">
*Hình 2.9. Biểu đồ mô hình hóa use case Quản lý đơn hàng*
</div>

\newpage

---

### 2.6. Thiết kế Backend

#### 2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)

##### 2.6.1.1. Biểu đồ trình tự chức năng Đăng nhập

*(Vị trí chèn Hình 2.10: Biểu đồ trình tự chức năng Đăng nhập & Cấp phát JWT)*

```
[Khách hàng]      [AuthModalUI]       [AuthController]      [AuthService]       [UserRepository]    [JWT Provider]
     │                 │                     │                    │                    │                 │
     │──1. Nhập login─>│                     │                    │                    │                 │
     │   và password   │──2. POST /login────>│                    │                    │                 │
     │                 │                     │──3. login()───────>│                    │                 │
     │                 │                     │                    │──4. findByUsername>│                 │
     │                 │                     │                    │<─5. Trả về User────│                 │
     │                 │                     │                    │──6. Check BCrypt───│                 │
     │                 │                     │                    │──7. generateToken()─────────────────>│
     │                 │                     │                    │<─8. Trả về Token─────────────────────│
     │                 │                     │<─9. AuthResponse───│                    │                 │
     │                 │<─10. JWT Token & User                     │                    │                 │
     │<─11. Đăng nhập──│                                          │                    │                 │
     │   thành công!   │                                          │                    │                 │
```

<div align="center">
*Hình 2.10. Biểu đồ trình tự chức năng Đăng nhập & Cấp phát JWT*
</div>

\

##### 2.6.1.2. Biểu đồ trình tự chức năng Đặt hàng và Trừ tồn kho tự động

*(Vị trí chèn Hình 2.11: Biểu đồ trình tự chức năng Đặt hàng & Trừ tồn kho tự động)*

```
[Khách hàng]      [CheckoutUI]        [OrderController]     [OrderService]     [VariantRepository]  [OrderRepository]
     │                 │                     │                    │                    │                 │
     │──1. Xác nhận───>│                     │                    │                    │                 │
     │   đặt hàng      │──2. POST /orders───>│                    │                    │                 │
     │                 │                     │──3. createOrder()─>│                    │                 │
     │                 │                     │                    │──4. Check stock───>│                 │
     │                 │                     │                    │<─5. Tồn kho hợp lệ─│                 │
     │                 │                     │                    │──6. Trừ tồn kho───>│                 │
     │                 │                     │                    │──7. Lưu Order & Items───────────────>│
     │                 │                     │                    │<─8. Order Saved──────────────────────│
     │                 │<─9. OrderDto & VietQR────────────────────│                    │                 │
     │<─10. Hiển thị───│                                          │                    │                 │
     │   mã QR / COD   │                                          │                    │                 │
```

<div align="center">
*Hình 2.11. Biểu đồ trình tự chức năng Đặt hàng & Trừ tồn kho tự động*
</div>

\

##### 2.6.1.3. Biểu đồ trình tự chức năng Cập nhật kho nhanh

*(Vị trí chèn Hình 2.12: Biểu đồ trình tự chức năng Cập nhật kho nhanh)*

```
[Quản trị viên]    [AdminStockUI]   [AdminProductController]  [AdminProductService]  [VariantRepository]
      │                  │                     │                       │                      │
      │──1. Nhập số kho─>│                     │                       │                      │
      │   mới            │──2. PUT /stock─────>│                       │                      │
      │                  │                     │──3. updateVariant()──>│                      │
      │                  │                     │                       │──4. findById()──────>│
      │                  │                     │                       │<─5. Variant Entity───│
      │                  │                     │                       │──6. setStock & save─>│
      │                  │                     │<─7. ProductVariantDto─│                      │
      │<─8. Báo thành────│                                             │                      │
      │   công & refresh │                                             │                      │
```

<div align="center">
*Hình 2.12. Biểu đồ trình tự chức năng Cập nhật kho nhanh (Quick Restock)*
</div>

\newpage

---

#### 2.6.2. Biểu đồ lớp phân tích (VOPC - View of Participating Classes)

Mô hình phân tích theo chuẩn ba thành phần:
- `<<boundary>>`: Lớp giao diện tiếp nhận tương tác từ người dùng và gửi nhận HTTP Request.
- `<<control>>`: Lớp điều khiển chứa Controller và Service xử lý logic nghiệp vụ và ràng buộc hệ thống.
- `<<entity>>`: Lớp thực thể ánh xạ dữ liệu xuống bảng cơ sở dữ liệu.

*(Vị trí chèn Hình 2.13: Biểu đồ lớp phân tích VOPC chức năng Đặt hàng)*

```
  <<boundary>>                    <<control>>                     <<entity>>
 ┌──────────────┐              ┌───────────────┐              ┌────────────────┐
 │  CheckoutUI  │              │ OrderService  │              │     Order      │
 ├──────────────┤ 1          1 ├───────────────┤ 1          * ├────────────────┤
 │submitOrder() │─────────────>│createOrder()  │─────────────>│-id: Long       │
 │showVietQR()  │              │cancelOrder()  │              │-orderCode: Str │
 └──────────────┘              │updateStatus() │              │-totalAmount    │
                               └───────────────┘              │-status: Status │
                                       │ 1                    └────────────────┘
                                       │                              │ 1
                                       │                              │ *
                                       ▼ *                            ▼
                               ┌───────────────┐              ┌────────────────┐
                               │ProductVariant │              │   OrderItem    │
                               ├───────────────┤              ├────────────────┤
                               │-stockQuantity │              │-quantity: int  │
                               │-price: BigDec │              │-unitPrice: Dec │
                               └───────────────┘              └────────────────┘
```

<div align="center">
*Hình 2.13. Biểu đồ lớp phân tích (VOPC) chức năng Đặt hàng*
</div>

\

*(Vị trí chèn Hình 2.14: Biểu đồ lớp phân tích VOPC chức năng Quản lý sản phẩm & Kho)*

```
  <<boundary>>                    <<control>>                     <<entity>>
 ┌──────────────┐              ┌──────────────────┐           ┌────────────────┐
 │AdminProductUI│              │AdminProductServ. │           │    Product     │
 ├──────────────┤ 1          1 ├──────────────────┤ 1       * ├────────────────┤
 │openCreate()  │─────────────>│createProduct()   │──────────>│-id: Long       │
 │openEdit()    │              │updateProduct()   │           │-name: String   │
 │updateStock() │              │updateVariantStk()│           │-thumbnailUrl   │
 └──────────────┘              │deleteProduct()   │           │-isFeatured     │
                               └──────────────────┘           └────────────────┘
                                       │ 1                            │ 1
                                       │                              │ *
                                       ▼ *                            ▼
                               ┌──────────────────┐           ┌────────────────┐
                               │  ProductVariant  │           │     Brand      │
                               ├──────────────────┤           ├────────────────┤
                               │-stockQuantity    │           │-name: String   │
                               │-price / original │           │-slug: String   │
                               └──────────────────┘           └────────────────┘
```

<div align="center">
*Hình 2.14. Biểu đồ lớp phân tích (VOPC) chức năng Quản lý sản phẩm & Kho*
</div>

\newpage

---

#### 2.6.3. Thiết kế cơ sở dữ liệu

##### 2.6.3.1. Sơ đồ quan hệ thực thể (ERD)

*(Vị trí chèn Hình 2.15: Sơ đồ quan hệ thực thể ERD cơ sở dữ liệu PhoneStore)*

```
 [BRANDS] 1 ───────── * [PRODUCTS] 1 ───────── * [PRODUCT_VARIANTS]
                           │ 1                         │ 1
                           │                           │
                           │ *                         │ *
 [CATEGORIES] 1 ───────────┘                     [ORDER_ITEMS]
                                                       │ *
                                                       │
  [USERS] 1 ───────────── * [ORDERS] 1 ────────────────┘
     │ 1
     │
     │ *
  [REVIEWS] * ─────────── 1 [PRODUCTS]
```

<div align="center">
*Hình 2.15. Sơ đồ quan hệ thực thể (ERD) cơ sở dữ liệu PhoneStore*
</div>

\

##### 2.6.3.2. Cấu trúc chi tiết các bảng dữ liệu

<div align="center">

*Bảng 2.8. Cấu trúc bảng users (Quản lý tài khoản người dùng)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh người dùng duy nhất |
| **username** | VARCHAR(50) | UK | NO | Tên đăng nhập tài khoản |
| **password** | VARCHAR(255) | | NO | Mật khẩu đã được mã hóa BCrypt |
| **email** | VARCHAR(100) | UK | NO | Địa chỉ email người dùng |
| **full_name** | VARCHAR(100) | | NO | Họ và tên khách hàng |
| **phone_number** | VARCHAR(20) | | YES | Số điện thoại liên hệ |
| **address** | VARCHAR(255) | | YES | Địa chỉ giao hàng mặc định |
| **role** | VARCHAR(20) | | NO | Quyền hạn (`ROLE_USER`, `ROLE_ADMIN`) |
| **is_active** | BOOLEAN | | NO | Trạng thái kích hoạt tài khoản |
| **created_at** | DATETIME | | NO | Thời điểm tạo tài khoản |

</div>

\

<div align="center">

*Bảng 2.9. Cấu trúc bảng brands (Quản lý thương hiệu)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh thương hiệu |
| **name** | VARCHAR(100) | | NO | Tên thương hiệu (Apple, Samsung...) |
| **slug** | VARCHAR(100) | UK | NO | Chuỗi định danh SEO |
| **logo_url** | VARCHAR(255) | | YES | Đường dẫn logo thương hiệu |
| **description** | TEXT | | YES | Mô tả tổng quan về thương hiệu |

</div>

\

<div align="center">

*Bảng 2.10. Cấu trúc bảng categories (Quản lý danh mục phân loại)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh danh mục |
| **name** | VARCHAR(100) | | NO | Tên danh mục (Flagship, Tầm trung...) |
| **slug** | VARCHAR(100) | UK | NO | Chuỗi định danh URL |
| **description** | TEXT | | YES | Mô tả đặc điểm phân khúc |

</div>

\

<div align="center">

*Bảng 2.11. Cấu trúc bảng products (Quản lý thông tin điện thoại)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh điện thoại |
| **name** | VARCHAR(255) | | NO | Tên thương mại sản phẩm |
| **slug** | VARCHAR(255) | UK | NO | Đường dẫn thân thiện SEO |
| **brand_id** | BIGINT | FK | NO | Khóa ngoại liên kết bảng `brands` |
| **category_id** | BIGINT | FK | NO | Khóa ngoại liên kết bảng `categories` |
| **thumbnail_url**| VARCHAR(500) | | NO | Ảnh đại diện chính của điện thoại |
| **screen** | VARCHAR(100) | | YES | Thông số màn hình |
| **chipset** | VARCHAR(100) | | YES | Tên vi xử lý |
| **battery** | VARCHAR(100) | | YES | Dung lượng pin và công nghệ sạc |
| **camera** | VARCHAR(100) | | YES | Thông số camera |
| **os** | VARCHAR(50) | | YES | Hệ điều hành xuất xưởng |
| **is_featured** | BOOLEAN | | NO | Đánh dấu hiển thị nổi bật ở trang chủ |
| **is_active** | BOOLEAN | | NO | Trạng thái hiển thị (Soft Delete) |

</div>

\

<div align="center">

*Bảng 2.12. Cấu trúc bảng product_variants (Quản lý phiên bản, màu sắc và kho)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh phiên bản |
| **product_id** | BIGINT | FK | NO | Khóa ngoại trỏ về `products` |
| **color** | VARCHAR(50) | | NO | Tên màu sắc (Titan Sa Mạc, Đen...) |
| **color_code** | VARCHAR(20) | | YES | Mã màu HEX để hiển thị |
| **ram** | VARCHAR(20) | | YES | Dung lượng RAM (8GB, 12GB...) |
| **storage** | VARCHAR(20) | | NO | Bộ nhớ trong (256GB, 512GB...) |
| **price** | DECIMAL(15,2) | | NO | Giá bán thực tế hiện tại |
| **original_price**| DECIMAL(15,2) | | YES | Giá niêm yết ban đầu |
| **stock_quantity**| INT | | NO | Số lượng máy sẵn có trong kho |
| **sku** | VARCHAR(100) | UK | YES | Mã quản lý kho quốc tế |
| **image_url** | VARCHAR(500) | | YES | Hình ảnh riêng của màu sắc này |

</div>

\

<div align="center">

*Bảng 2.13. Cấu trúc bảng orders (Quản lý đơn đặt hàng)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh đơn hàng |
| **order_code** | VARCHAR(50) | UK | NO | Mã đơn hàng duy nhất (`ORD-...`) |
| **user_id** | BIGINT | FK | YES | Người đặt (cho phép null nếu khách vãng lai) |
| **customer_name**| VARCHAR(100) | | NO | Họ tên người nhận hàng |
| **customer_phone**| VARCHAR(20) | | NO | Số điện thoại nhận hàng |
| **customer_email**| VARCHAR(100) | | YES | Email nhận thông báo hóa đơn |
| **shipping_address**| VARCHAR(255) | | NO | Địa chỉ chi tiết nhận hàng |
| **total_amount** | DECIMAL(15,2) | | NO | Tổng tiền hàng chưa trừ khuyến mãi |
| **final_amount** | DECIMAL(15,2) | | NO | Tổng tiền khách thực tế phải trả |
| **payment_method**| VARCHAR(20) | | NO | Phương thức thanh toán (`COD`, `VIETQR`) |
| **payment_status**| VARCHAR(20) | | NO | Tình trạng thanh toán (`UNPAID`, `PAID`) |
| **status** | VARCHAR(20) | | NO | Trạng thái đơn (`PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`, `CANCELLED`) |
| **created_at** | DATETIME | | NO | Ngày giờ khởi tạo đơn hàng |

</div>

\

<div align="center">

*Bảng 2.14. Cấu trúc bảng order_items (Chi tiết mặt hàng trong đơn)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Khóa chính mặt hàng |
| **order_id** | BIGINT | FK | NO | Khóa ngoại liên kết bảng `orders` |
| **product_id** | BIGINT | FK | YES | Khóa ngoại trỏ về `products` |
| **variant_id** | BIGINT | FK | YES | Khóa ngoại trỏ về `product_variants` |
| **product_name** | VARCHAR(255) | | NO | Tên sản phẩm lưu tại thời điểm mua |
| **variant_details**| VARCHAR(100) | | NO | Chi tiết màu và dung lượng |
| **unit_price** | DECIMAL(15,2) | | NO | Đơn giá tại thời điểm mua |
| **quantity** | INT | | NO | Số lượng máy mua |
| **subtotal** | DECIMAL(15,2) | | NO | Thành tiền của dòng hàng này |

</div>

\

<div align="center">

*Bảng 2.15. Cấu trúc bảng reviews (Đánh giá nhận xét sản phẩm)*

| Tên trường | Kiểu dữ liệu | Khóa | Cho phép Null | Ý nghĩa mô tả |
| :--- | :--- | :---: | :---: | :--- |
| **id** | BIGINT AUTO_INCREMENT | PK | NO | Mã định danh đánh giá |
| **product_id** | BIGINT | FK | NO | Sản phẩm được đánh giá |
| **user_id** | BIGINT | FK | NO | Khách hàng viết đánh giá |
| **rating** | INT | | NO | Điểm số đánh giá từ 1 đến 5 sao |
| **comment** | TEXT | | YES | Nội dung nhận xét chi tiết |
| **created_at** | DATETIME | | NO | Thời điểm gửi đánh giá |

</div>

\newpage

---

# CHƯƠNG 3: CHƯƠNG TRÌNH THỬ NGHIỆM VÀ KẾT QUẢ

### 3.1. Môi trường triển khai và vận hành hệ thống
Hệ thống PhoneStore đã được xây dựng hoàn thiện và đang vận hành thực tế tại môi trường thử nghiệm:
- **Máy chủ Backend:** Spring Boot 3.4.3, JDK 21.0.12, chạy trên cổng `http://localhost:8080`.
- **Máy chủ Frontend:** Vite 8.3, React 19.2, TypeScript, chạy trên cổng `http://localhost:5173`.
- **Cơ sở dữ liệu:** MySQL 8.0, Database: `phone_store_db`, cổng `3306`.
- **Tài khoản kiểm thử tích hợp:**
  - *Quản trị viên (Admin):* `admin` / mật khẩu: `admin123` (Toàn quyền quản trị Dashboard, sửa máy, duyệt đơn).
  - *Khách hàng (User):* `user` / mật khẩu: `user123`.

---

### 3.2. Giao diện chương trình hoàn thiện

> **HƯỚNG DẪN DÀNH CHO SINH VIÊN:** \
> Để bài báo cáo đạt điểm tối đa và tính trung thực cao nhất, **các hình ảnh dưới đây cần được chụp trực tiếp từ sản phẩm đang chạy trên trình duyệt của bạn tại địa chỉ `http://localhost:5173/`**. Sinh viên hãy mở website, thực hiện từng thao tác và sử dụng phím `Windows + Shift + S` để chụp ảnh màn hình, sau đó dán vào đúng vị trí tương ứng trong Word.

\

#### 1. Giao diện Trang chủ (Home Page)
- **Mô tả:** Hiển thị thanh Banner quảng bá siêu phẩm mùa thu, khối sản phẩm **HOT TRENDING** (mẫu iPhone 16 Pro Max 256GB) có hiệu ứng di chuột nổi bật và nút bấm tương tác xem chi tiết máy; thanh chọn nhanh thương hiệu; danh sách sản phẩm nổi bật và cam kết chất lượng.
- **Vị trí chụp:** Truy cập `http://localhost:5173/` và chụp trọn vẹn phần Banner đầu trang và khối Hot Trending.

*(Vị trí chèn ảnh chụp từ website: Hình 3.1. Giao diện Trang chủ và Khối điện thoại Hot Trending)*

<div align="center">
*Hình 3.1. Giao diện Trang chủ và Khối điện thoại Hot Trending*
</div>

\

#### 2. Giao diện Danh mục và Bộ lọc đa tiêu chí (Products Catalog & Filters)
- **Mô tả:** Cung cấp bộ lọc toàn diện bên cột trái (Hãng Apple, Samsung, Xiaomi, OPPO; Phân khúc Flagship, Tầm trung; Mức giá; RAM và Bộ nhớ trong). Danh sách điện thoại hiển thị dạng thẻ card sắc nét kèm giá bán và các tùy chọn màu sắc.
- **Vị trí chụp:** Truy cập `http://localhost:5173/products` và chụp màn hình bộ lọc cùng lưới sản phẩm.

*(Vị trí chèn ảnh chụp từ website: Hình 3.2. Giao diện Danh mục sản phẩm cùng Bộ lọc đa tiêu chí)*

<div align="center">
*Hình 3.2. Giao diện Danh mục sản phẩm cùng Bộ lọc đa tiêu chí*
</div>

\

#### 3. Giao diện Chi tiết điện thoại (Product Detail Page)
- **Mô tả:** Hiển thị chi tiết mẫu máy (ví dụ: iPhone 16 Pro Max), bộ chọn màu sắc (Titan Sa Mạc, Titan Tự Nhiên...), bộ chọn dung lượng (256GB, 512GB), bảng thông số kỹ thuật (chip Apple A18 Pro, màn hình 6.9 inch, pin, camera), nút "Thêm vào giỏ" / "Mua ngay" và khu vực đánh giá nhận xét từ khách hàng.
- **Vị trí chụp:** Bấm vào một sản phẩm bất kỳ hoặc truy cập `http://localhost:5173/products/iphone-16-pro-max` để chụp.

*(Vị trí chèn ảnh chụp từ website: Hình 3.3. Giao diện Trang chi tiết điện thoại, chọn màu sắc & dung lượng)*

<div align="center">
*Hình 3.3. Giao diện Trang chi tiết điện thoại, chọn màu sắc & dung lượng bộ nhớ*
</div>

\

#### 4. Giao diện Giỏ hàng (Cart Page)
- **Mô tả:** Liệt kê các sản phẩm đã chọn, thông tin màu sắc và dung lượng, đơn giá, nút tăng giảm số lượng (+/-), nút xóa mặt hàng, tính toán tổng tiền tạm tính và ô nhập mã giảm giá khuyến mãi.
- **Vị trí chụp:** Thêm sản phẩm vào giỏ và nhấp biểu tượng giỏ hàng tại `http://localhost:5173/cart`.

*(Vị trí chèn ảnh chụp từ website: Hình 3.4. Giao diện Giỏ hàng thông minh và tính toán khuyến mãi)*

<div align="center">
*Hình 3.4. Giao diện Giỏ hàng thông minh và áp dụng mã voucher*
</div>

\

#### 5. Giao diện Đặt hàng & Cổng thanh toán quét mã VietQR tự động
- **Mô tả:** Biểu mẫu điền địa chỉ giao hàng và màn hình thanh toán hiển thị mã QR động chuẩn VietQR chứa số tài khoản MBBank, số tiền chính xác và mã đơn hàng duy nhất, kèm nút kiểm thử mô phỏng thanh toán.
- **Vị trí chụp:** Từ giỏ hàng bấm "Tiến hành thanh toán" tại `http://localhost:5173/checkout`, chọn phương thức VietQR và chụp giao diện hiển thị mã QR.

*(Vị trí chèn ảnh chụp từ website: Hình 3.5. Giao diện Đặt hàng & Cổng thanh toán quét mã VietQR tự động)*

<div align="center">
*Hình 3.5. Giao diện Đặt hàng & Cổng thanh toán quét mã VietQR tự động*
</div>

\

#### 6. Giao diện Lịch sử đơn hàng của khách hàng (My Orders Page)
- **Mô tả:** Giúp khách hàng theo dõi tất cả các đơn hàng đã mua, ngày giờ đặt, trạng thái giao vận (`PENDING`, `CONFIRMED`, `SHIPPING`, `COMPLETED`), trạng thái thanh toán và danh sách chi tiết các máy trong đơn.
- **Vị trí chụp:** Bấm vào tên tài khoản trên thanh điều hướng $\rightarrow$ Chọn "Đơn hàng của tôi" (`http://localhost:5173/orders/my-orders`).

*(Vị trí chèn ảnh chụp từ website: Hình 3.6. Giao diện Lịch sử đơn hàng cá nhân của khách hàng)*

<div align="center">
*Hình 3.6. Giao diện Lịch sử đơn hàng cá nhân của khách hàng*
</div>

\

#### 7. Cửa sổ Đăng nhập và Đăng ký tài khoản (Auth Modal)
- **Mô tả:** Cửa sổ Modal thiết kế chuẩn mực thương mại điện tử thực tế, không có nhãn test/demo giả lập. Tích hợp icon nhận diện trường nhập, nút Ẩn/Hiện mật khẩu, checkbox "Ghi nhớ đăng nhập", liên kết "Quên mật khẩu?" và footer bảo mật SSL 256-bit.
- **Vị trí chụp:** Bấm nút "Đăng nhập" trên thanh điều hướng để mở popup và chụp ảnh.

*(Vị trí chèn ảnh chụp từ website: Hình 3.7. Cửa sổ Đăng nhập và Đăng ký tài khoản bảo mật)*

<div align="center">
*Hình 3.7. Cửa sổ Đăng nhập và Đăng ký tài khoản bảo mật*
</div>

\

#### 8. Bảng điều khiển Quản trị Dashboard (Admin Overview)
- **Mô tả:** Dành cho tài khoản Admin, hiển thị 4 thẻ KPI thống kê (Tổng doanh thu thực tế, Tổng đơn hàng, Số máy đã bán ra, Cảnh báo kho hàng tồn thấp) và bảng danh sách các phiên bản điện thoại sắp hết hàng để nhập kho kịp thời.
- **Vị trí chụp:** Đăng nhập tài khoản `admin` $\rightarrow$ bấm nút "Quản trị" trên Header (`http://localhost:5173/admin`).

*(Vị trí chèn ảnh chụp từ website: Hình 3.8. Bảng điều khiển Quản trị Dashboard và thống kê doanh thu)*

<div align="center">
*Hình 3.8. Bảng điều khiển Quản trị Dashboard và thống kê doanh thu*
</div>

\

#### 9. Giao diện Quản lý Đơn hàng của Admin (Orders Management)
- **Mô tả:** Bảng quản trị danh sách đơn hàng toàn hệ thống, các nút lọc trạng thái, hộp chọn chuyển đổi trạng thái giao vận tức thì và nút xác nhận tiền về đối với các đơn chuyển khoản.
- **Vị trí chụp:** Tại trang Admin, chọn tab "📦 Quản lý Đơn hàng".

*(Vị trí chèn ảnh chụp từ website: Hình 3.9. Giao diện Quản lý danh sách đơn hàng và chuyển trạng thái giao vận)*

<div align="center">
*Hình 3.9. Giao diện Quản lý danh sách đơn hàng và chuyển trạng thái giao vận*
</div>

\

#### 10. Giao diện Quản lý Điện thoại & Nhập kho (Products & Inventory)
- **Mô tả:** Danh sách các mẫu điện thoại đang kinh doanh, phân loại hãng, khoảng giá và các nút hành động: **[✏️ Sửa]** (sửa thông tin máy), **[Kho]** (nhập kho nhanh) và **[🗑️ Xóa]** (ẩn sản phẩm khỏi gian hàng).
- **Vị trí chụp:** Tại trang Admin, chọn tab "📱 Quản lý Điện thoại & Kho".

*(Vị trí chèn ảnh chụp từ website: Hình 3.10. Giao diện Quản lý điện thoại, chỉnh sửa thông tin và nhập kho)*

<div align="center">
*Hình 3.10. Giao diện Quản lý điện thoại, chỉnh sửa thông tin và nhập kho*
</div>

\

#### 11. Cửa sổ Tải ảnh trực tiếp từ máy tính (Local Image Upload Modal)
- **Mô tả:** Cửa sổ thêm mới/sửa thông tin điện thoại, cho phép bấm vào khung tải ảnh để chọn trực tiếp tệp ảnh PNG/JPG từ máy tính của quản trị viên; hệ thống tải lên lưu vào server và hiển thị ảnh xem trước xem ngay tức thì.
- **Vị trí chụp:** Bấm nút "+ Thêm Điện Thoại Mới" hoặc nút "Sửa" tại một dòng máy để mở form và chụp khung tải ảnh.

*(Vị trí chèn ảnh chụp từ website: Hình 3.11. Cửa sổ Tải ảnh trực tiếp từ máy tính lưu lên máy chủ dữ liệu)*

<div align="center">
*Hình 3.11. Cửa sổ Tải ảnh trực tiếp từ máy tính lưu lên máy chủ dữ liệu*
</div>

\newpage

---

### 3.3. Kịch bản kiểm thử chương trình (Test Cases)

Hệ thống đã trải qua quá trình kiểm thử tự động toàn diện phía Backend (30/30 Unit & Integration Tests đạt 100% Pass) và kiểm thử thủ công chức năng phía Frontend:

<div align="center">

*Bảng 3.1. Kịch bản kiểm thử chức năng Đăng ký và Đăng nhập*

| STT | Tên ca kiểm thử | Các bước thực hiện | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Đăng ký tài khoản hợp lệ | Điền đầy đủ thông tin vào Form đăng ký | `username: testuser1`<br>`email: test1@gmail.com`<br>`pass: 123456` | Đăng ký thành công, tự động đăng nhập và lưu vào MySQL | Đăng ký thành công, xuất hiện thông báo chào mừng | **ĐẠT (PASS)** |
| **TC02** | Đăng ký trùng tên đăng nhập | Nhập username đã tồn tại trong CSDL | `username: admin` | Báo lỗi: Tên đăng nhập đã tồn tại | Hệ thống báo lỗi màu đỏ chính xác | **ĐẠT (PASS)** |
| **TC03** | Đăng nhập đúng tài khoản Admin | Nhập thông tin quản trị viên | `user: admin`<br>`pass: admin123` | Đăng nhập thành công, xuất hiện nút "Quản trị" trên Header | Đăng nhập thành công, mở toàn quyền truy cập `/admin` | **ĐẠT (PASS)** |
| **TC04** | Đăng nhập sai mật khẩu | Nhập mật khẩu không đúng | `user: admin`<br>`pass: saimatkhau` | Từ chối truy cập, thông báo tài khoản hoặc mật khẩu không đúng | Báo lỗi chính xác, không cấp JWT Token | **ĐẠT (PASS)** |

</div>

\

<div align="center">

*Bảng 3.2. Kịch bản kiểm thử luồng Đặt hàng và Thanh toán tự động*

| STT | Tên ca kiểm thử | Các bước thực hiện | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC05** | Thêm điện thoại vào giỏ hàng | Chọn màu sắc, dung lượng và bấm "Thêm vào giỏ" | iPhone 16 Pro Max 256GB - Titan Sa Mạc | Giỏ hàng tăng số lượng, lưu trữ bền vững qua context | Hiển thị chính xác sản phẩm trong giỏ hàng | **ĐẠT (PASS)** |
| **TC06** | Đặt hàng phương thức VietQR | Điền địa chỉ nhận hàng, chọn phương thức VietQR và bấm "Xác nhận đặt hàng" | Người nhận: Nguyễn Văn A<br>SĐT: 0912345678<br>Địa chỉ: Hà Nội | Tạo đơn thành công, trừ tồn kho máy và hiển thị mã QR động chuẩn MBBank | Đơn hàng được tạo với mã `ORD-...`, mã QR hiển thị đầy đủ thông tin | **ĐẠT (PASS)** |
| **TC07** | Mô phỏng thanh toán VietQR | Tại modal VietQR, bấm nút "Mô phỏng quét mã thành công" | Mã đơn hàng vừa tạo | Trạng thái thanh toán của đơn chuyển sang `PAID` | Hệ thống cập nhật `PAID`, gạch nợ thành công | **ĐẠT (PASS)** |

</div>

\

<div align="center">

*Bảng 3.3. Kịch bản kiểm thử cơ chế Quản trị kho và Bảo toàn tồn kho*

| STT | Tên ca kiểm thử | Các bước thực hiện | Dữ liệu đầu vào | Kết quả mong đợi | Kết quả thực tế | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :--- | :---: |
| **TC08** | Trừ tồn kho tự động khi đặt mua | Kiểm tra số lượng máy trước và sau khi đặt hàng 2 máy | Tồn kho ban đầu: 50 máy<br>Khách đặt mua: 2 máy | Tồn kho phiên bản đó giảm xuống chính xác còn 48 máy | Tồn kho trong bảng `product_variants` giảm còn 48 | **ĐẠT (PASS)** |
| **TC09** | Hoàn kho tự động khi Admin hủy đơn | Admin chọn trạng thái đơn hàng sang `CANCELLED` | Đơn hàng gồm 2 máy ở TC08 | Hệ thống tự động cộng hoàn lại 2 máy về kho (từ 48 $\rightarrow$ 50) | Tồn kho tự động hồi phục về 50 máy | **ĐẠT (PASS)** |
| **TC10** | Nhập kho nhanh (Quick Restock) | Bấm nút "Kho" tại bảng Admin, điền số lượng mới | Số tồn kho mới: 60 | Cập nhật kho tức thì lên 60 máy | Dữ liệu lưu ngay và cập nhật ra website | **ĐẠT (PASS)** |
| **TC11** | Chỉnh sửa thông tin điện thoại đã có | Bấm nút "Sửa" tại dòng sản phẩm, sửa tên máy, giá và ảnh | Đổi tên máy $\rightarrow$ bấm "Cập Nhật Thông Tin" | Dữ liệu máy được cập nhật mới trên giao diện và CSDL | Toàn bộ thông tin cập nhật thành công | **ĐẠT (PASS)** |

</div>

---

### 3.4. Đánh giá kết quả đạt được
Qua quá trình triển khai và kiểm thử thực tế, đồ án đã hoàn thành xuất sắc các mục tiêu đề ra ban đầu:
1. **Về tính năng:** Đáp ứng đầy đủ 100% các chức năng mua sắm của một website thương mại điện tử hiện đại và hệ thống quản trị chuyên sâu dành cho nhà bán hàng.
2. **Về nghiệp vụ kho & thanh toán:** Cơ chế bảo toàn tồn kho (Trừ kho tức thì - Hoàn kho tự động) vận hành trơn tru; cổng quét mã VietQR mang tính ứng dụng thực tế cao, hiện đại và tiện lợi cho người dùng.
3. **Về kiến trúc & mã nguồn:** Áp dụng chuẩn công nghệ mới nhất (Spring Boot 3, Java 21, React 19, TypeScript), phân tầng rõ ràng, chuẩn RESTful API, dễ bảo trì và mở rộng trong tương lai.

\newpage

---

# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

### 1. Kết quả đạt được
Sau thời gian nghiên cứu nghiêm túc và vận dụng các kiến thức chuyên ngành đã học, em đã hoàn thành đồ án môn học với các kết quả cụ thể:
- Nắm vững quy trình phân tích và thiết kế hệ thống thông tin hướng đối tượng theo chuẩn UML (Use Case, Sequence Diagram, Class Diagram, ERD).
- Xây dựng thành công hệ thống **PhoneStore** hoàn chỉnh với hai phân hệ Khách hàng và Quản trị viên, giao diện Dark Mode Glassmorphism bắt mắt, trải nghiệm người dùng mượt mà.
- Xây dựng hệ thống Backend Spring Boot 3 mạnh mẽ, bảo mật JWT, xử lý logic đa biến thể và cơ chế giao dịch Transaction an toàn.
- Hoàn thiện hệ thống tài liệu hướng dẫn sử dụng chi tiết cho người dùng và quản trị viên, kịch bản kiểm thử toàn diện.

### 2. Những hạn chế còn tồn tại
Mặc dù đã đạt được nhiều kết quả tích cực, hệ thống vẫn còn một số điểm có thể tiếp tục hoàn thiện:
- Cổng thanh toán VietQR hiện tại dựa trên cơ chế sinh mã QR động và mô phỏng gạch nợ (chưa đăng ký webhook tự động lắng nghe biến động số dư thực tế từ ngân hàng thương mại do yêu cầu pháp nhân doanh nghiệp).
- Chưa tích hợp tính năng gửi email tự động (Email Notification) khi khách đặt hàng thành công do cần cấu hình dịch vụ SMTP bên ngoài.
- Hệ thống khuyến mãi mới hỗ trợ giảm giá trực tiếp theo mã voucher, chưa xây dựng cây phân cấp chiết khấu theo hạng thành viên VIP.

### 3. Hướng phát triển trong tương lai
- Tích hợp thêm cổng thanh toán trực tuyến quốc tế và ví điện tử nội địa thông qua VNPay / ZaloPay Payment Gateway.
- Bổ sung tính năng gợi ý sản phẩm thông minh dựa trên trí tuệ nhân tạo (AI Recommendation System) dựa trên lịch sử xem máy của người dùng.
- Xây dựng ứng dụng di động (Mobile App) tương thích trên Android và iOS sử dụng React Native để đồng bộ chung một hệ thống máy chủ Spring Boot hiện có.

\newpage

---

# TÀI LIỆU THAM KHẢO

1. **Craig Walls (2022)**, *Spring in Action, Sixth Edition*, Manning Publications.
2. **Robert C. Martin (2018)**, *Clean Architecture: A Craftsman's Guide to Software Structure and Design*, Prentice Hall.
3. **Cay S. Horstmann (2023)**, *Core Java Volume I – Fundamentals, Twelfth Edition*, Oracle Press.
4. **Alex Banks & Eve Porcello (2020)**, *Learning React: Modern Patterns for Developing React Applications, 2nd Edition*, O'Reilly Media.
5. **Spring Framework Documentation (2024)**, *Spring Boot Reference Documentation (v3.4)*, [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot).
6. **React Official Documentation (2025)**, *React 19 Documentation & Best Practices*, [https://react.dev/](https://react.dev/).
7. **National Payment Corporation of Vietnam (NAPAS)**, *Tiêu chuẩn kỹ thuật chấp nhận thanh toán mã phản hồi nhanh (VietQR)*, Hà Nội.
8. **Oracle Corporation (2024)**, *MySQL 8.0 Reference Manual*, [https://dev.mysql.com/doc/refman/8.0/en/](https://dev.mysql.com/doc/refman/8.0/en/).
