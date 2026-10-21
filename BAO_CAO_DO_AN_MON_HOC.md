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

## BÁO CÁO ĐỒ ÁN MÔN HỌC
### CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN / KỸ THUẬT PHẦN MỀM

\

# ĐỀ TÀI:
# XÂY DỰNG HỆ THỐNG QUẢN LÝ QUÁN ĂN VÀ ĐIỂM BÁN HÀNG TRỰC TIẾP (HƯƠNG VIỆT POS & RESTAURANT OPS)

\
\

**Giảng viên hướng dẫn:** ..................................................... \
**Sinh viên thực hiện:** ..................................................... \
**Mã số sinh viên:** ..................................................... \
**Lớp / Khóa:** ..................................................... 

\
\

### HÀ NỘI, NĂM HỌC 2025 - 2026

</div>

\newpage

---

# LỜI CẢM ƠN

Trong suốt quá trình học tập, nghiên cứu và hoàn thành đồ án môn học với đề tài **"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)"**, em đã nhận được sự quan tâm, chỉ dẫn tận tình và giúp đỡ quý báu từ nhiều thầy cô, gia đình và bạn bè.

Lời đầu tiên, em xin gửi lời cảm ơn sâu sắc và lòng biết ơn chân thành nhất đến quý Thầy/Cô trong Khoa Công nghệ Thông tin đã truyền đạt cho em những nền tảng kiến thức chuyên môn vững chắc, tư duy phân tích hệ thống và kỹ năng thực hành quý báu trong suốt các học kỳ vừa qua.

Đặc biệt, em xin bày tỏ lòng biết ơn chân thành nhất đến **Giảng viên hướng dẫn**, người đã trực tiếp tận tình chỉ dẫn, định hướng đề tài, giải đáp các vướng mắc kỹ thuật về kiến trúc Client-Server, cơ sở dữ liệu quan hệ, cơ chế xác thực JWT và đóng góp những ý kiến sâu sắc để em có thể từng bước hoàn thiện các chức năng và bài báo cáo đồ án này một cách chỉn chu và đúng chuẩn mực nhất.

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
  - [1.1. Tổng quan về bài toán quản lý quán ăn và mô hình bán lẻ F&B](#11-tổng-quan-về-bài-toán-quản-lý-quán-ăn-và-mô-hình-bán-lẻ-fb)
  - [1.2. Công nghệ nền tảng phía Backend](#12-công-nghệ-nền-tảng-phía-backend)
    - [1.2.1. Ngôn ngữ Java 21 LTS](#121-ngôn-ngữ-java-21-lts)
    - [1.2.2. Khung ứng dụng Spring Boot 3.3.4](#122-khung-ứng-dụng-spring-boot-334)
    - [1.2.3. Cơ chế xác thực Spring Security & JWT](#123-cơ-chế-xác-thực-spring-security--jwt)
  - [1.3. Công nghệ nền tảng phía Frontend](#13-công-nghệ-nền-tảng-phía-frontend)
    - [1.3.1. Thư viện React 18 và ngôn ngữ TypeScript](#131-thư-viện-react-18-và-ngôn-ngữ-typescript)
    - [1.3.2. Công cụ đóng gói hiện đại Vite 5](#132-công-cụ-đóng-gói-hiện-đại-vite-5)
    - [1.3.3. Phong cách thiết kế giao diện Glassmorphism và tối ưu UX POS](#133-phong-cách-thiết-kế-giao-diện-glassmorphism-và-tối-ưu-ux-pos)
  - [1.4. Hệ quản trị cơ sở dữ liệu MySQL 8.0 & Quản lý Migration Flyway](#14-hệ-quản-trị-cơ-sở-dữ-liệu-mysql-80--quản-lý-migration-flyway)
  - [1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR](#15-cổng-thanh-toán-mã-quét-chuẩn-quốc-gia-vietqr)
- [CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG](#chương-2-phân-tích-và-thiết-kế-hệ-thống)
  - [2.1. Mô tả bài toán quán ăn](#21-mô-tả-bài-toán-quán-ăn)
  - [2.2. Yêu cầu bài toán](#22-yêu-cầu-bài-toán)
    - [2.2.1. Yêu cầu chức năng](#221-yêu-cầu-chức-năng)
    - [2.2.2. Yêu cầu phi chức năng](#222-yêu-cầu-phi-chức-năng)
  - [2.3. Kiến trúc tổng thể hệ thống](#23-kiến-trúc-tổng-thể-hệ-thống)
  - [2.4. Biểu đồ Use Case](#24-biểu-đồ-use-case)
    - [2.4.1. Biểu đồ Use Case tổng quát](#241-biểu-đồ-use-case-tổng-quát)
    - [2.4.2. Biểu đồ Use Case phân hệ Quản trị viên (Admin)](#242-biểu-đồ-use-case-phân-hệ-quản-trị-viên-admin)
    - [2.4.3. Biểu đồ Use Case phân hệ Nhân viên (Staff / Thu ngân / Phục vụ)](#243-biểu-đồ-use-case-phân-hệ-nhân-viên-staff--thu-ngân--phục-vụ)
  - [2.5. Mô tả chi tiết các Use Case chính](#25-mô-tả-chi-tiết-các-use-case-chính)
  - [2.6. Thiết kế Backend hệ thống](#26-thiết-kế-backend-hệ-thống)
    - [2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)](#261-thiết-kế-biểu-đồ-trình-tự-sequence-diagrams)
    - [2.6.2. Thiết kế biểu đồ lớp phân tích (VOPC Diagrams)](#262-thiết-kế-biểu-đồ-lớp-phân-tích-vopc-diagrams)
    - [2.6.3. Thiết kế cơ sở dữ liệu](#263-thiết-kế-cơ-sở-dữ-liệu)
- [CHƯƠNG 3: CÀI ĐẶT VÀ THỬ NGHIỆM HỆ THỐNG](#chương-3-cài-đặt-và-thử-nghiệm-hệ-thống)
  - [3.1. Môi trường triển khai và vận hành hệ thống](#31-môi-trường-triển-khai-và-vận-hành-hệ-thống)
  - [3.2. Giao diện các chức năng chính của hệ thống](#32-giao-diện-các-chức-năng-chính-của-hệ-thống)
  - [3.3. Kịch bản kiểm thử hệ thống (Test Cases)](#33-kịch-bản-kiểm-thử-hệ-thống-test-cases)
- [KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN](#kết-luận-và-hướng-phát-triển)
  - [1. Đánh giá kết quả đạt được](#1-đánh-giá-kết-quả-đạt-được)
  - [2. Hạn chế của hệ thống](#2-hạn-chế-của-hệ-thống)
  - [3. Hướng phát triển trong tương lai](#3-hướng-phát-triển-trong-tương-lai)
- [TÀI LIỆU THAM KHẢO](#tài-liệu-tham-khảo)

\newpage

---

# DANH MỤC CÁC CHỮ VIẾT TẮT

<div align="center">

*Bảng 0.1.* Danh mục các thuật ngữ và chữ viết tắt

</div>

| Từ viết tắt | Tên tiếng Anh đầy đủ | Ý nghĩa chuyên môn trong đồ án |
| :---: | :--- | :--- |
| **API** | Application Programming Interface | Giao diện lập trình ứng dụng kết nối Frontend và Backend |
| **CORS** | Cross-Origin Resource Sharing | Cơ chế chia sẻ tài nguyên giữa các nguồn gốc khác nhau |
| **CSS** | Cascading Style Sheets | Ngôn ngữ định dạng và bố cục giao diện trang web |
| **DTO** | Data Transfer Object | Đối tượng truyền dữ liệu giữa tầng Controller và Service |
| **ERD** | Entity Relationship Diagram | Sơ đồ quan hệ thực thể mô tả cấu trúc cơ sở dữ liệu |
| **F&B** | Food and Beverage | Ngành kinh doanh dịch vụ ẩm thực và đồ uống |
| **JWT** | JSON Web Token | Chuẩn mã hóa thông tin xác thực phiên làm việc phi trạng thái |
| **ORM** | Object-Relational Mapping | Kỹ thuật ánh xạ giữa đối tượng mã nguồn và bảng cơ sở dữ liệu |
| **POS** | Point of Sale | Hệ thống điểm bán hàng phục vụ trực tiếp tại quầy hoặc bàn |
| **RBAC** | Role-Based Access Control | Mô hình kiểm soát truy cập dựa trên phân quyền vai trò người dùng |
| **REST** | Representational State Transfer | Kiến trúc thiết kế dịch vụ web dựa trên giao thức HTTP chuẩn |
| **SQL** | Structured Query Language | Ngôn ngữ truy vấn cơ sở dữ liệu có cấu trúc quan hệ |
| **UI/UX** | User Interface / User Experience | Giao diện người dùng và Trải nghiệm người dùng phần mềm |
| **VOPC** | View of Participating Classes | Biểu đồ các lớp tham gia thực thi ca sử dụng (UML) |

\newpage

---

# DANH MỤC CÁC BẢNG

- **Bảng 0.1:** Danh mục các thuật ngữ và chữ viết tắt
- **Bảng 2.1:** Mô tả chi tiết ca sử dụng UC_01 Đăng nhập hệ thống (UC_DANGNHAP)
- **Bảng 2.2:** Mô tả chi tiết ca sử dụng UC_06 Quản lý sơ đồ bàn (UC_QUANLY_BAN)
- **Bảng 2.3:** Mô tả chi tiết ca sử dụng UC_05 Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN)
- **Bảng 2.4:** Mô tả chi tiết ca sử dụng UC_08 Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS)
- **Bảng 2.5:** Mô tả chi tiết ca sử dụng UC_10 Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER)
- **Bảng 2.6:** Mô tả chi tiết ca sử dụng UC_15 Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON)
- **Bảng 2.7:** Mô tả chi tiết ca sử dụng UC_18 Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU)
- **Bảng 2.8:** Cấu trúc dữ liệu bảng users (Tài khoản người dùng và phân quyền)
- **Bảng 2.9:** Cấu trúc dữ liệu bảng categories (Danh mục món ăn)
- **Bảng 2.10:** Cấu trúc dữ liệu bảng menu_items (Món ăn / Đồ uống trong thực đơn)
- **Bảng 2.11:** Cấu trúc dữ liệu bảng dining_tables (Sơ đồ bàn ăn và trạng thái phục vụ)
- **Bảng 2.12:** Cấu trúc dữ liệu bảng orders (Đơn gọi món tại bàn)
- **Bảng 2.13:** Cấu trúc dữ liệu bảng order_items (Chi tiết từng món ăn trong đơn)
- **Bảng 2.14:** Cấu trúc dữ liệu bảng payments (Lịch sử thanh toán và hóa đơn)
- **Bảng 3.1:** Kịch bản kiểm thử phân hệ Xác thực và Đăng nhập hệ thống
- **Bảng 3.2:** Kịch bản kiểm thử phân hệ Quản lý bàn và Tạo đơn gọi món POS
- **Bảng 3.3:** Kịch bản kiểm thử phân hệ Thanh toán và Cập nhật trạng thái bàn
- **Bảng 3.4:** Kịch bản kiểm thử phân hệ Quản lý thực đơn và Xóa mềm (Soft Delete)

---

# DANH MỤC CÁC HÌNH

- **Hình 2.1:** Sơ đồ kiến trúc 3 lớp Client - Server tổng thể của hệ thống Quản lý Quán ăn
- **Hình 2.2:** Sơ đồ Use Case tổng quát hệ thống Quản lý Quán ăn Hương Việt
- **Hình 2.3:** Sơ đồ Use Case phân hệ Quản trị viên (Admin)
- **Hình 2.4:** Sơ đồ Use Case phân hệ Nhân viên phục vụ và Thu ngân (Staff)
- **Hình 2.5:** Sơ đồ Use Case phân rã chức năng Đăng nhập hệ thống
- **Hình 2.6:** Sơ đồ Use Case phân rã chức năng Quản lý sơ đồ bàn
- **Hình 2.7:** Sơ đồ Use Case phân rã chức năng Quản lý món ăn và danh mục
- **Hình 2.8:** Sơ đồ Use Case phân rã chức năng Mở bàn và Tạo đơn gọi món
- **Hình 2.9:** Sơ đồ Use Case phân rã chức năng Thanh toán và In hóa đơn
- **Hình 2.10:** Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Đăng nhập & Cấp phát JWT
- **Hình 2.11:** Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Tạo đơn gọi món & Chuyển trạng thái bàn sang OCCUPIED
- **Hình 2.12:** Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Thanh toán hóa đơn & Trả bàn về EMPTY
- **Hình 2.13:** Biểu đồ lớp phân tích (VOPC) phân hệ Gọi món và Quản lý bàn
- **Hình 2.14:** Biểu đồ lớp phân tích (VOPC) phân hệ Thanh toán và Quản lý thực đơn
- **Hình 2.15:** Sơ đồ quan hệ thực thể ERD cơ sở dữ liệu restaurant_management
- **Hình 3.1:** Giao diện Sơ đồ bàn ăn và POS trực quan
- **Hình 3.2:** Giao diện Gọi món và Giỏ hàng theo bàn ăn thực tế
- **Hình 3.3:** Giao diện Quản lý Thực đơn và Danh mục món ăn
- **Hình 3.4:** Cửa sổ Modal Thêm/Sửa món ăn kèm chọn ảnh trực tiếp từ máy tính
- **Hình 3.5:** Cửa sổ Xác nhận thanh toán (Tiền mặt và Mã QR ngân hàng VietQR)
- **Hình 3.6:** Mẫu phiếu In hóa đơn thanh toán cho khách hàng
- **Hình 3.7:** Giao diện Quản lý Đơn hàng và Lịch sử hóa đơn
- **Hình 3.8:** Bảng điều khiển Quản trị Dashboard và thống kê doanh thu
- **Hình 3.9:** Biểu đồ thống kê top món ăn bán chạy nhất
- **Hình 3.10:** Màn hình Đăng nhập phân quyền hệ thống Admin / Staff
- **Hình 3.11:** Tính năng Xóa mềm (Soft Delete) món ăn và danh mục bảo toàn dữ liệu

\newpage

---

# MỞ ĐẦU

## 1. Lý do chọn đề tài

Trong xu thế chuyển đổi số mạnh mẽ của nền kinh tế hiện nay, ngành dịch vụ ẩm thực (Food and Beverage - F&B) tại Việt Nam đang có những bước chuyển mình vượt bậc. Từ các nhà hàng quy mô lớn cho đến các quán ăn gia đình, quán cà phê và quán ăn vừa và nhỏ, nhu cầu ứng dụng công nghệ thông tin vào công tác vận hành bán lẻ đang trở nên cấp thiết hơn bao giờ hết.

Theo khảo sát thực tế tại các quán ăn truyền thống, phương thức quản lý thủ công bằng giấy ghi món (order giấy), nhẩm tính tiền và ghi sổ tay doanh thu hàng ngày đang bộc lộ rất nhiều nhược điểm nghiêm trọng:
- **Sai sót trong quy trình gọi món:** Tình trạng ghi sai món, sót món của khách, nhầm lẫn giữa các bàn trong khung giờ cao điểm (buổi trưa và buổi tối) diễn ra thường xuyên do nhân viên phục vụ phải chạy qua lại giữa khu vực bàn ăn và nhà bếp.
- **Thất thoát và sai lệch doanh thu:** Việc tính nhẩm tiền trên hóa đơn viết tay rất dễ gây nhầm lẫn về đơn giá, số lượng hoặc sai sót khi áp dụng giảm giá, gây thiệt hại tài chính cho quán hoặc mất lòng tin từ khách hàng.
- **Khó khăn trong kiểm soát sơ đồ bàn:** Nhân viên phục vụ khó kiểm soát bàn nào đang có khách, bàn nào đã đặt trước, bàn nào đang chờ thanh toán, dẫn đến việc sắp xếp chỗ ngồi lộn xộn và giảm hiệu suất quay vòng bàn.
- **Thiếu công cụ báo cáo phân tích kinh doanh:** Chủ quán không thể nắm bắt tức thời doanh thu trong ngày, món nào bán chạy (Best Seller) để nhập nguyên liệu kịp thời, gây lãng phí tồn kho hoặc thiếu hụt nguyên liệu phục vụ.

Xuất phát từ những bất cập thực tiễn nêu trên, đề tài **"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)"** được lựa chọn nghiên cứu và triển khai nhằm cung cấp một giải pháp phần mềm toàn diện, hiện đại, dễ thao tác trên màn hình cảm ứng, giúp tự động hóa quy trình phục vụ từ khâu mở bàn, gọi món, in hóa đơn đến thanh toán chuyển khoản mã QR và báo cáo doanh thu theo thời gian thực.

## 2. Mục tiêu nghiên cứu của đồ án

Đồ án hướng tới các mục tiêu nghiên cứu và phát triển cụ thể sau đây:
- **Nghiên cứu nghiệp vụ F&B:** Khảo sát và chuẩn hóa quy trình nghiệp vụ phục vụ ăn uống tại chỗ (Dine-in) và bán mang về của mô hình quán ăn hiện đại.
- **Làm chủ công nghệ phát triển:** Áp dụng kiến trúc Client-Server RESTful API hiện đại, phân tách độc lập giữa phần mềm giao diện người dùng (Frontend) và hệ thống xử lý logic nghiệp vụ lưu trữ dữ liệu (Backend).
- **Xây dựng hoàn thiện các phân hệ cốt lõi:** Bao gồm sơ đồ bàn trực quan theo thời gian thực, bảng gọi món POS chia theo từng nhóm danh mục, giỏ hàng linh hoạt, hỗ trợ ghi chú từng món (ví dụ: không cay, ít đá), in hóa đơn chuyên nghiệp và tích hợp mã QR thanh toán động VietQR.
- **Đảm bảo tính tin cậy và toàn vẹn dữ liệu:** Bảo đảm hệ thống vận hành an toàn với cơ chế xác thực JWT, mã hóa mật khẩu một chiều BCrypt, cơ chế xóa mềm (Soft Delete) giúp bảo toàn dữ liệu lịch sử đơn hàng ngay cả khi xóa món hoặc xóa danh mục.
- **Thử nghiệm và đánh giá:** Triển khai thử nghiệm thực tế trên môi trường cục bộ và đánh giá khả năng phản hồi dưới tải thao tác liên tục của thu ngân và nhân viên phục vụ.

## 3. Đối tượng và phạm vi nghiên cứu

- **Đối tượng nghiên cứu:** Quy trình vận hành, quản lý sơ đồ bàn ăn, quy trình gọi món (POS), quy trình thanh toán hóa đơn, in phiếu tạm tính và quản trị báo cáo doanh số trong mô hình kinh doanh ẩm thực.
- **Phạm vi ứng dụng:** Tập trung vào phân khúc quán ăn vừa và nhỏ, nhà hàng phục vụ tại chỗ kết hợp thanh toán tại quầy thu ngân. Hệ thống hỗ trợ 02 nhóm người dùng chính là Quản trị viên (Chủ quán/Admin) và Nhân viên phục vụ/Thu ngân (Staff). Không đi sâu vào phân hệ giao hàng trực tuyến (Delivery) qua bên thứ ba.

## 4. Phương pháp nghiên cứu và công cụ sử dụng

- **Mô hình quy trình:** Áp dụng mô hình phát triển phần mềm linh hoạt Agile/Scrum, phân chia tiến độ thành các giai đoạn (sprint) từ thiết kế cơ sở dữ liệu, xây dựng REST API, hoàn thiện giao diện đến kiểm thử và tái cấu trúc.
- **Công nghệ Backend:** Java 21 LTS, Spring Boot 3.3.4 (Spring Data JPA, Spring Security, JWT, Flyway Migration).
- **Công nghệ Frontend:** React 18, TypeScript, Vite 5, phong cách giao diện hiện đại Glassmorphism, tối ưu giao diện chạm POS.
- **Hệ quản trị cơ sở dữ liệu:** MySQL 8.0 Community Edition, chỉ mục Indexing và quan hệ khóa ngoại bảo đảm chuẩn ACID.
- **Công cụ hỗ trợ:** Antigravity IDE, Visual Studio Code, Postman, Git, GitHub.

## 5. Bố cục của báo cáo đồ án

- **Chương 1 - Tổng quan về công nghệ và công cụ phát triển:** Trình bày cơ sở lý thuyết về mô hình F&B, kiến trúc ứng dụng web hiện đại và các công nghệ cốt lõi được sử dụng trong dự án.
- **Chương 2 - Phân tích và thiết kế hệ thống:** Phân tích yêu cầu chức năng, phi chức năng, xây dựng các biểu đồ Use Case, mô tả chi tiết ca sử dụng, thiết kế biểu đồ tuần tự Sequence, biểu đồ lớp VOPC và thiết kế cơ sở dữ liệu 7 bảng hoàn chỉnh.
- **Chương 3 - Cài đặt và thử nghiệm hệ thống:** Mô tả môi trường triển khai thực tế, giới thiệu 11 màn hình chức năng hoạt động của hệ thống kèm khung chụp ảnh minh họa và xây dựng các bảng kịch bản kiểm thử (Test Cases) chi tiết.
- **Kết luận và hướng phát triển:** Tổng kết những kết quả đã đạt được, thẳng thắn nhìn nhận những hạn chế còn tồn đọng và đề xuất các định hướng nâng cấp mở rộng trong tương lai.

\newpage

---

# CHƯƠNG 1: TỔNG QUAN VỀ CÔNG NGHỆ VÀ CÔNG CỤ PHÁT TRIỂN

## 1.1. Tổng quan về bài toán quản lý quán ăn và mô hình bán lẻ F&B

Ngành kinh doanh dịch vụ ẩm thực (F&B) có những đặc thù vận hành rất riêng biệt so với các ngành thương mại điện tử thuần túy. Điểm mấu chốt nằm ở tính thời gian thực (Real-time), cường độ phục vụ tăng đột biến vào khung giờ cao điểm và sự luân chuyển trạng thái liên tục của bàn ăn. Một quy trình phục vụ quán ăn tiêu chuẩn bao gồm các bước chặt chẽ:
1. **Tiếp nhận và mở bàn:** Nhân viên tiếp đón khách, quan sát sơ đồ bàn để chọn bàn trống phù hợp với số lượng khách (bàn đơn, bàn 4 người hoặc phòng tiệc). Bàn được đánh dấu chuyển từ trạng thái Trống (EMPTY) sang Đang phục vụ (OCCUPIED).
2. **Gọi món (Order món):** Nhân viên sử dụng màn hình POS chọn các món ăn khách yêu cầu, nhập ghi chú khẩu vị cho từng món. Đơn hàng được lưu vào hệ thống và in phiếu thông báo cho khu vực bếp/pha chế chuẩn bị món ăn.
3. **Phục vụ và cập nhật đơn:** Khách hàng có thể gọi thêm món mới, hủy món chưa chế biến hoặc yêu cầu tạm tính. Hệ thống tự động tính lũy tiến tổng tiền món ăn.
4. **Thanh toán và trả bàn:** Thu ngân thực hiện in hóa đơn tạm tính cho khách kiểm tra. Sau đó, khách lựa chọn thanh toán bằng Tiền mặt hoặc Quét mã QR ngân hàng. Ngay khi giao dịch hoàn tất, hệ thống tự động ghi nhận thanh toán, giải phóng bàn ăn về trạng thái Trống (EMPTY) và cộng doanh thu vào báo cáo ngày.

Hệ thống Hương Việt POS & Restaurant Ops được thiết kế nhằm số hóa trọn vẹn toàn bộ chu trình 4 bước trên, loại bỏ hoàn toàn việc ghi chép thủ công dễ thất thoát và nhầm lẫn.

## 1.2. Công nghệ nền tảng phía Backend

### 1.2.1. Ngôn ngữ Java 21 LTS
Java 21 là phiên bản hỗ trợ dài hạn (Long-Term Support - LTS) mới nhất của ngôn ngữ lập trình Java. Phiên bản này mang lại nhiều cải tiến đột phá:
- **Virtual Threads (Project Loom):** Cho phép hệ điều hành và máy ảo JVM xử lý đồng thời hàng chục nghìn kết nối mạng với chi phí tài nguyên bộ nhớ cực thấp, phù hợp với hệ thống điểm bán hàng có nhiều thiết bị máy tính bảng của nhân viên cùng gửi yêu cầu gọi món.
- **Record Classes & Pattern Matching:** Đơn giản hóa việc khai báo các lớp đối tượng truyền nhận dữ liệu (DTO) bất biến, loại bỏ mã thừa Boilerplate code mà vẫn giữ tính toàn vẹn dữ liệu.
- **Cơ chế quản lý bộ nhớ tiên tiến:** Bộ thu gom rác thế hệ mới (ZGC) tối ưu hóa thời gian dừng xử lý (pause time) dưới 1 mili-giây, giúp API phản hồi tức thì mà không gặp hiện tượng giật lag.

### 1.2.2. Khung ứng dụng Spring Boot 3.3.4
Spring Boot là nền tảng tiêu chuẩn doanh nghiệp hàng đầu để xây dựng các dịch vụ RESTful API bảo mật và có khả năng mở rộng cao:
- **Spring Boot Starter Web:** Định nghĩa các REST Controller tiếp nhận các phương thức HTTP (GET, POST, PUT, DELETE) với định dạng dữ liệu JSON chuẩn mực.
- **Spring Data JPA:** Sử dụng Hibernate ORM để ánh xạ các bảng quan hệ trong MySQL thành các thực thể Java (Entity). Cung cấp cơ chế phân trang, lọc và các hàm truy vấn tiện lợi mà không cần viết câu lệnh SQL phức tạp.
- **Spring Validation:** Sử dụng các chú thích (annotations) như `@NotBlank`, `@Min`, `@NotNull` để kiểm soát chặt chẽ tính hợp lệ của dữ liệu đầu vào ngay tại tầng biên Controller, ngăn ngừa lỗi dữ liệu rác.
- **Flyway Migration:** Tự động quản lý lịch sử tiến hóa cơ sở dữ liệu qua các tệp migration dạng script SQL (từ `V1__init_schema` đến `V5__add_is_deleted_to_categories`), đảm bảo tính đồng nhất cấu trúc dữ liệu trên mọi môi trường thử nghiệm.

### 1.2.3. Cơ chế xác thực Spring Security & JWT
Hệ thống áp dụng mô hình bảo mật phi trạng thái (Stateless Authentication) dựa trên JSON Web Token (JWT) kết hợp thuật toán ký số an toàn HMAC-SHA256:
- **Mã hóa mật khẩu BCrypt:** Mật khẩu của người dùng được băm một chiều an toàn bằng thuật toán BCrypt kèm muối ngẫu nhiên (salt) trước khi lưu vào cơ sở dữ liệu.
- **Cơ chế cấp phát Token:** Khi người dùng đăng nhập thành công, máy chủ tạo một chuỗi JWT Token có chứa thông tin định danh và vai trò (Role), có thời hạn sử dụng 24 giờ. Máy chủ không cần duy trì session trong bộ nhớ RAM, giúp hệ thống hoạt động nhẹ nhàng và dễ mở rộng.
- **Kiểm soát truy cập theo vai trò (RBAC):** Một bộ lọc bảo mật `JwtAuthenticationFilter` chặn mọi yêu cầu gửi đến, giải mã token từ Header Authorization, kiểm tra tính hợp lệ và thiết lập ngữ cảnh bảo mật cho người dùng. Phân quyền chặt chẽ giữa 2 vai trò: ADMIN (toàn quyền) và STAFF (chỉ xem bàn, gọi món và thanh toán).

## 1.3. Công nghệ nền tảng phía Frontend

### 1.3.1. Thư viện React 18 và ngôn ngữ TypeScript
Giao diện người dùng được xây dựng dựa trên React 18 kết hợp với ngôn ngữ TypeScript:
- **Kiến trúc hướng thành phần (Component-Based):** Giao diện được module hóa thành các thành phần tái sử dụng cao như MenuCard, TableCard, CartDrawer, PaymentModal, RevenueChart.
- **Cơ chế Virtual DOM:** React duy trì cây DOM ảo trong bộ nhớ, tính toán sự khác biệt tối thiểu khi trạng thái bàn ăn hoặc giỏ hàng thay đổi để cập nhật lên màn hình với tốc độ cực nhanh mà không cần tải lại toàn bộ trang web.
- **Ngôn ngữ TypeScript:** Đảm bảo kiểu dữ liệu tĩnh nghiêm ngặt cho toàn bộ các đối tượng dữ liệu, phát hiện lỗi lập trình ngay trong quá trình biên dịch (Compile-time).

### 1.3.2. Công cụ đóng gói hiện đại Vite 5
Thay vì sử dụng Webpack truyền thống với thời gian khởi động chậm, dự án lựa chọn Vite 5 làm công cụ đóng gói và máy chủ phát triển cục bộ:
- **Khởi động cực nhanh:** Vite tận dụng chuẩn Native ES Modules của trình duyệt hiện đại, giúp máy chủ phát triển khởi động gần như ngay lập tức (< 300ms).
- **Hot Module Replacement (HMR):** Khi lập trình viên chỉnh sửa giao diện CSS hoặc component React, Vite chỉ cập nhật đúng module bị thay đổi mà không cần tải lại trang hay làm mất trạng thái dữ liệu giỏ hàng hiện tại.
- **Đóng gói sản phẩm tối ưu:** Sử dụng Rollup để tối ưu hóa, nén mã nguồn JavaScript/CSS và chia nhỏ gói mã (Code Splitting).

### 1.3.3. Phong cách thiết kế giao diện Glassmorphism và tối ưu UX POS
- **Thẩm mỹ cao cấp:** Áp dụng phong cách thiết kế kính mờ hiện đại kết hợp bảng màu ẩm thực ấm áp (đỏ gạch `#C0392B`, cam san hô, xanh lá cây báo trạng thái bàn trống).
- **Bố cục công thái học:** Bàn ăn hiển thị trực quan theo dạng thẻ lưới (Grid) với mã bàn, số chỗ ngồi và màu sắc trạng thái rõ ràng. Giỏ hàng dạng trượt bên phải hiển thị rõ danh sách món, số lượng, nút tăng/giảm và ô ghi chú khẩu vị.
- **Tối ưu hóa thao tác:** Hiệu ứng phản hồi xúc giác nhẹ nhàng khi nhấn chọn món ăn, thanh tìm kiếm tức thì theo tên món và bộ lọc phân loại danh mục nhanh giúp nhân viên hoàn tất một lượt gọi món chỉ trong vòng chưa đầy 15 giây.

## 1.4. Hệ quản trị cơ sở dữ liệu MySQL 8.0 & Quản lý Migration Flyway
MySQL 8.0 là hệ quản trị cơ sở dữ liệu quan hệ mã nguồn mở mạnh mẽ, đáp ứng hoàn hảo các yêu cầu khắt khe:
- **Tuân thủ chuẩn ACID:** Đảm bảo mọi giao dịch thanh toán hoặc trừ tồn món ăn đều tuân thủ 4 thuộc tính Atomicity, Consistency, Isolation và Durability.
- **Chỉ mục hiệu quả:** Các trường dữ liệu thường xuyên tra cứu như `category_id`, `table_id`, `order_code`, `status` đều được đánh chỉ mục tối ưu, cho phép thực hiện các truy vấn thống kê báo cáo doanh thu hàng tháng chỉ trong vài mili-giây.
- **Kiểm soát phiên bản dữ liệu:** Toàn bộ cấu trúc bảng và dữ liệu mẫu ban đầu được quản lý tuần tự qua Flyway Migration, loại bỏ rủi ro sai lệch cấu trúc bảng giữa các môi trường.

## 1.5. Cổng thanh toán mã quét chuẩn quốc gia VietQR
Để bắt kịp xu hướng thanh toán không dùng tiền mặt, hệ thống tích hợp giải pháp thanh toán mã QR chuẩn quốc gia VietQR:
- **Cơ chế sinh mã động:** Khi khách yêu cầu thanh toán chuyển khoản, hệ thống tự động sinh một mã QR động chứa đầy đủ thông tin: Mã ngân hàng thụ hưởng, Số tài khoản của quán ăn, Số tiền chính xác cần thanh toán và Nội dung chuyển khoản gắn liền với Mã hóa đơn (Invoice Code).
- **Thuận tiện và chính xác tuyệt đối:** Khách hàng chỉ cần mở bất kỳ ứng dụng ngân hàng số (Mobile Banking) nào, quét mã QR hiển thị trên màn hình POS hoặc trên hóa đơn in ra. Mọi thông tin về số tài khoản, số tiền và nội dung đều được điền tự động 100%.

\newpage

---

# CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG

## 2.1. Mô tả bài toán quán ăn

Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops) được xây dựng để phục vụ toàn diện hoạt động vận hành thường nhật của một quán ăn với các phân vùng chức năng sau:
- **Khu vực Sơ đồ bàn:** Hiển thị danh sách tất cả các bàn ăn trong quán kèm trạng thái thực tế: Trống (EMPTY) hoặc Đang có khách (OCCUPIED). Cho phép nhân viên bấm vào bàn trống để mở bàn và tạo đơn mới, hoặc bấm vào bàn đang có khách để xem giỏ hàng hiện tại.
- **Khu vực Bán hàng POS:** Hiển thị danh sách thực đơn chia theo từng danh mục (Món Khai Vị, Món Chính, Đồ Uống, Tráng Miệng). Nhân viên có thể tìm kiếm món, chọn hình ảnh món ăn, thêm món vào đơn, tăng giảm số lượng và ghi chú yêu cầu riêng của khách.
- **Khu vực Thu ngân & Thanh toán:** Hỗ trợ 2 phương thức thanh toán là Tiền mặt (có tính tiền thừa trả khách) và Chuyển khoản VietQR. Sau khi thanh toán thành công, hệ thống in hóa đơn chi tiết và giải phóng bàn ăn về trạng thái Trống.
- **Khu vực Quản lý thực đơn:** Cho phép thêm, sửa thông tin món ăn, tải ảnh trực tiếp từ máy tính lên máy chủ, thiết lập trạng thái phục vụ hoặc tạm ngưng bán. Đặc biệt, hỗ trợ tính năng Xóa mềm (Soft Delete) giúp ẩn món ăn hoặc danh mục không còn kinh doanh mà không làm hỏng dữ liệu lịch sử hóa đơn.
- **Khu vực Báo cáo Dashboard:** Dành riêng cho Quản trị viên theo dõi tổng doanh thu trong ngày, tổng số đơn đã hoàn thành, tổng số món ăn đang kinh doanh và biểu đồ trực quan thống kê top các món ăn bán chạy nhất.

## 2.2. Yêu cầu bài toán

### 2.2.1. Yêu cầu chức năng
- **F1 - Quản lý xác thực:** Đăng nhập phân quyền dựa trên tài khoản và mật khẩu, cấp phát mã phiên làm việc JWT.
- **F2 - Quản lý sơ đồ bàn:** Hiển thị danh sách bàn, trạng thái phục vụ theo thời gian thực, mở bàn ăn mới, đổi trạng thái bàn sau thanh toán.
- **F3 - Nghiệp vụ gọi món POS:** Hiển thị danh mục, tìm kiếm món ăn, chọn món vào giỏ hàng, cập nhật số lượng, thêm ghi chú khẩu vị cho từng món.
- **F4 - Quản lý đơn hàng:** Tạo đơn hàng liên kết với mã bàn, lưu thông tin người tạo đơn, cập nhật trạng thái đơn (PENDING, PAID, CANCELLED).
- **F5 - Thanh toán & In hóa đơn:** Xác nhận số tiền, thanh toán bằng Tiền mặt hoặc VietQR, xuất phiếu hóa đơn có mã hóa đơn duy nhất.
- **F6 - Quản lý thực đơn:** Thêm mới món ăn, chỉnh sửa đơn giá/mô tả, chọn tệp ảnh tải lên từ máy tính cục bộ, dừng bán, xóa mềm món và danh mục.
- **F7 - Báo cáo thống kê:** Thống kê tổng doanh thu thực thu, số đơn đã hoàn tất, tỷ lệ bàn có khách, vẽ biểu đồ top món bán chạy.

### 2.2.2. Yêu cầu phi chức năng
- **Hiệu năng xử lý:** Thời gian phản hồi các yêu cầu gọi món và tra cứu dữ liệu không vượt quá 200ms trên mạng nội bộ LAN.
- **Tính bảo mật:** Mật khẩu người dùng được băm mã hóa một chiều BCrypt; các endpoint quan trọng đều yêu cầu xác thực JWT qua HTTP Authorization Header.
- **Độ tin cậy và toàn vẹn dữ liệu:** Đảm bảo tính sẵn sàng cao, cơ chế phòng ngừa lỗi xung đột khóa ngoại khi xóa món ăn nhờ tính năng Soft Delete.
- **Tính tiện dụng (Usability):** Giao diện hiện đại, nút bấm rõ ràng, bố cục trực quan thân thiện với người dùng không rành công nghệ, màu sắc tương phản cao.

## 2.3. Kiến trúc tổng thể hệ thống

Hệ thống được tổ chức theo kiến trúc Client-Server phân tầng chuẩn công nghiệp, bảo đảm tính độc lập cao giữa giao diện và logic xử lý dữ liệu:
- **Tầng Client (Frontend):** Ứng dụng Single Page Application (SPA) viết bằng React 18 & TypeScript, giao tiếp với máy chủ thông qua giao thức HTTP/HTTPS với định dạng dữ liệu chuẩn JSON.
- **Tầng Server (Backend):** Bao gồm tầng Controller tiếp nhận yêu cầu, tầng Service xử lý nghiệp vụ, tầng Repository giao tiếp cơ sở dữ liệu và Spring Security bảo vệ quyền truy cập.
- **Tầng Dữ liệu (Database):** Cơ sở dữ liệu quan hệ MySQL 8.0 lưu trữ bền vững các bảng dữ liệu nghiệp vụ.

```
+-----------------------------------------------------------------------------------+
|                        TẦNG TRÌNH DIỄN (FRONTEND - REACT 18 / VITE)               |
|   +-------------------+   +--------------------+   +--------------------------+   |
|   | Sơ đồ bàn ăn POS  |   | Giỏ hàng gọi món   |   | Quản lý thực đơn & Món   |   |
|   +-------------------+   +--------------------+   +--------------------------+   |
+------------------------------------------+----------------------------------------+
                                           | HTTP REST / JSON API (JWT Token)
+------------------------------------------v----------------------------------------+
|                        TẦNG ỨNG DỤNG (BACKEND - SPRING BOOT 3.3.4)                |
|   +---------------------------------------------------------------------------+   |
|   | Controller Layer (AuthController, TableController, OrderController, ...)  |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |
|   +-------------------------------------v-------------------------------------+   |
|   | Service Layer (OrderService, TableService, MenuItemService, ...)          |   |
|   +-------------------------------------+-------------------------------------+   |
|                                         |
|   +-------------------------------------v-------------------------------------+   |
|   | Repository Layer (Spring Data JPA / Hibernate)                            |   |
|   +---------------------------------------------------------------------------+   |
+------------------------------------------+----------------------------------------+
                                           | JDBC Connection Pool (HikariCP)
+------------------------------------------v----------------------------------------+
|                   TẦNG DỮ LIỆU BỀN VỮNG (DATABASE - MYSQL 8.0)                    |
|       [users]  [dining_tables]  [categories]  [menu_items]  [orders]  [payments]  |
+-----------------------------------------------------------------------------------+
```

<div align="center">

*Hình 2.1.* Sơ đồ kiến trúc 3 lớp Client - Server tổng thể của hệ thống Quản lý Quán ăn

</div>

## 2.4. Biểu đồ Use Case

### 2.4.1. Biểu đồ Use Case tổng quát
Hệ thống xác định 02 tác nhân chính tham gia tương tác: Quản trị viên (Admin - Chủ quán) và Nhân viên (Staff - Phục vụ/Thu ngân). Dưới đây là biểu đồ Use Case tổng quát mô tả sự phân chia quyền hạn giữa các tác nhân:

```
          +---------------+
          |   NHÂN VIÊN   |
          |    (Staff)    |
          +-------+-------+
                  |
     +------------+------------+---------------+---------------+
     |            |            |               |               |
     v            v            v               v               v
(UC_01: Đăng nhập) (UC_06: Xem bàn) (UC_08: Gọi món) (UC_10: Đổi món) (UC_15: Thanh toán)
     ^            ^            ^               ^               ^
     |            |            |               |               |
     +------------+------------+---------------+---------------+
                  |
                  |     +----------------------+  +---------------------+
                  +---->| UC_05: Quản lý món ăn|  | UC_18: Báo cáo D-Thu|
                  |     +----------------------+  +---------------------+
                  |                ^                         ^
          +-------+-------+        |                         |
          | QUẢN TRỊ VIÊN |--------+-------------------------+
          |    (Admin)    |
          +---------------+
```

<div align="center">

*Hình 2.2.* Sơ đồ Use Case tổng quát hệ thống Quản lý Quán ăn Hương Việt

</div>

### 2.4.2. Biểu đồ Use Case phân hệ Quản trị viên (Admin)
Tác nhân Quản trị viên (Admin) kế thừa toàn bộ quyền của Nhân viên, đồng thời nắm giữ các quyền hạn tối cao về quản trị dữ liệu:
- **Quản lý Báo cáo Dashboard:** Xem tổng quan doanh thu trong ngày, biểu đồ xu hướng doanh số và danh sách top món ăn bán chạy.
- **Quản trị Danh mục:** Thêm mới danh mục món ăn, sửa tên danh mục, xóa mềm danh mục không còn phục vụ.
- **Quản trị Món ăn:** Thêm món ăn mới, chỉnh sửa đơn giá, thay đổi hình ảnh đại diện món ăn từ máy tính, tạm dừng bán hoặc xóa mềm món ăn.
- **Quản trị Bàn & Đơn hàng:** Thêm bàn mới, chỉnh sửa sức chứa của từng bàn ăn, xem lịch sử tất cả các hóa đơn của quán.

<div align="center">

*Hình 2.3.* Sơ đồ Use Case phân hệ Quản trị viên (Admin)

</div>

### 2.4.3. Biểu đồ Use Case phân hệ Nhân viên (Staff / Thu ngân / Phục vụ)
Tác nhân Nhân viên tập trung vào các thao tác bán hàng và phục vụ khách trực tiếp:
- **Xem sơ đồ bàn:** Quan sát danh sách bàn và màu sắc trạng thái (Xanh: Trống, Đỏ cam: Đang phục vụ).
- **Gọi món (POS):** Mở bàn ăn, thêm các món ăn vào giỏ hàng, tăng giảm số lượng, nhập ghi chú khẩu vị cho đầu bếp.
- **Thanh toán & Trả bàn:** Chọn phương thức tiền mặt hoặc quét mã QR VietQR, xác nhận thanh toán, xuất phiếu in hóa đơn cho khách.

<div align="center">

*Hình 2.4.* Sơ đồ Use Case phân hệ Nhân viên phục vụ và Thu ngân (Staff)

</div>

## 2.5. Mô tả chi tiết các Use Case chính

### Ca sử dụng UC_01: Đăng nhập hệ thống (UC_DANGNHAP)

<div align="center">

*Bảng 2.1.* Mô tả chi tiết ca sử dụng UC_01 Đăng nhập hệ thống (UC_DANGNHAP)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_01 |
| **Tên Use case** | Đăng nhập hệ thống (UC_DANGNHAP) |
| **Tác nhân** | Quản trị viên (Admin), Nhân viên (Staff) |
| **Mô tả** | Cho phép người dùng xác thực danh tính bằng tên đăng nhập và mật khẩu để truy cập vào hệ thống |
| **Sự kiện kích hoạt** | Người dùng truy cập vào địa chỉ hệ thống và bấm nút Đăng nhập |
| **Tiền điều kiện** | Người dùng đã được cấp tài khoản hợp lệ trong cơ sở dữ liệu và đang ở trạng thái ACTIVE |
| **Luồng sự kiện chính** | **Bước 1 [Người dùng]:** Nhập tên đăng nhập (username) và mật khẩu (password) vào form đăng nhập.<br>**Bước 2 [Người dùng]:** Bấm nút "Đăng nhập".<br>**Bước 3 [Hệ thống]:** Kiểm tra tính hợp lệ của dữ liệu đầu vào (không được để trống).<br>**Bước 4 [Hệ thống]:** Mã hóa mật khẩu và so khớp với chuỗi băm BCrypt trong bảng `users`.<br>**Bước 5 [Hệ thống]:** Khởi tạo chuỗi JWT Token có chứa thông tin user và vai trò (Role), trả về cho Frontend.<br>**Bước 6 [Hệ thống]:** Lưu token vào LocalStorage và chuyển hướng người dùng đến giao diện tương ứng với quyền hạn. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Hệ thống]:** Nếu tên đăng nhập không tồn tại hoặc mật khẩu không chính xác, hệ thống hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không đúng" và yêu cầu nhập lại.<br>**Trường hợp 1b [Hệ thống]:** Nếu tài khoản đang ở trạng thái INACTIVE hoặc LOCKED, hiển thị thông báo "Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên". |
| **Hậu điều kiện** | Người dùng đăng nhập thành công, phiên làm việc được lưu trữ và có quyền truy cập vào các chức năng theo vai trò. |

<div align="center">

*Hình 2.5.* Sơ đồ Use Case phân rã chức năng Đăng nhập hệ thống

</div>

### Ca sử dụng UC_06: Quản lý sơ đồ bàn (UC_QUANLY_BAN)

<div align="center">

*Bảng 2.2.* Mô tả chi tiết ca sử dụng UC_06 Quản lý sơ đồ bàn (UC_QUANLY_BAN)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_06 |
| **Tên Use case** | Quản lý sơ đồ bàn (UC_QUANLY_BAN) |
| **Tác nhân** | Quản trị viên, Nhân viên phục vụ |
| **Mô tả** | Hiển thị danh sách bàn ăn, trạng thái sử dụng thực tế và hỗ trợ thao tác chuyển đổi trạng thái bàn |
| **Sự kiện kích hoạt** | Người dùng chọn menu "Sơ đồ bàn" trên thanh điều hướng |
| **Tiền điều kiện** | Người dùng đã đăng nhập thành công vào hệ thống |
| **Luồng sự kiện chính** | **Bước 1 [Người dùng]:** Truy cập màn hình Sơ đồ bàn ăn.<br>**Bước 2 [Hệ thống]:** Gửi yêu cầu `GET /api/tables` đến Backend để lấy danh sách bàn.<br>**Bước 3 [Hệ thống]:** Hiển thị danh sách các thẻ bàn với màu sắc trực quan (Xanh: Trống, Đỏ cam: Đang phục vụ).<br>**Bước 4 [Người dùng]:** Bấm vào một bàn ăn cụ thể để thực hiện mở bàn mới hoặc xem đơn hàng hiện tại. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Hệ thống]:** Nếu kết nối mạng gặp sự cố, hiển thị thông báo lỗi "Không thể tải danh sách bàn, vui lòng thử lại". |
| **Hậu điều kiện** | Sơ đồ bàn được cập nhật chính xác theo dữ liệu mới nhất trên máy chủ. |

<div align="center">

*Hình 2.6.* Sơ đồ Use Case phân rã chức năng Quản lý sơ đồ bàn

</div>

### Ca sử dụng UC_05: Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN)

<div align="center">

*Bảng 2.3.* Mô tả chi tiết ca sử dụng UC_05 Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_05 |
| **Tên Use case** | Quản lý thực đơn & Món ăn (UC_QUANLY_MONAN) |
| **Tác nhân** | Quản trị viên (Admin) |
| **Mô tả** | Cho phép Admin thêm món mới, cập nhật giá tiền, chọn ảnh từ máy tính, tạm dừng bán hoặc xóa mềm món ăn |
| **Sự kiện kích hoạt** | Admin chọn chức năng "Quản lý thực đơn" trên menu |
| **Tiền điều kiện** | Người dùng đăng nhập với quyền Quản trị viên (ADMIN) |
| **Luồng sự kiện chính** | **Bước 1 [Admin]:** Mở giao diện Quản lý Thực đơn và bấm nút "Thêm món mới".<br>**Bước 2 [Hệ thống]:** Hiển thị cửa sổ Modal nhập thông tin món: Tên món, Danh mục, Đơn giá, Mô tả và Khung tải ảnh.<br>**Bước 3 [Admin]:** Nhập thông tin, bấm nút "Chọn tệp ảnh từ máy" để tải ảnh đại diện món ăn lên.<br>**Bước 4 [Hệ thống]:** Tải ảnh lên thư mục lưu trữ `/uploads/` của Backend và trả về đường dẫn ảnh.<br>**Bước 5 [Admin]:** Bấm nút "Lưu món ăn".<br>**Bước 6 [Hệ thống]:** Lưu thông tin món vào bảng `menu_items` và cập nhật danh sách hiển thị ngay lập tức. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Admin]:** Nếu Admin bấm nút "Xóa món", hệ thống kiểm tra: Món ăn được đánh dấu `is_deleted = TRUE` (Xóa mềm), ẩn khỏi thực đơn bán hàng nhưng bảo toàn lịch sử hóa đơn cũ. |
| **Hậu điều kiện** | Thực đơn quán ăn được cập nhật thành công mà không gây ảnh hưởng đến tính toàn vẹn dữ liệu. |

<div align="center">

*Hình 2.7.* Sơ đồ Use Case phân rã chức năng Quản lý món ăn và danh mục

</div>

### Ca sử dụng UC_08: Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS)

<div align="center">

*Bảng 2.4.* Mô tả chi tiết ca sử dụng UC_08 Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_08 |
| **Tên Use case** | Mở bàn và Tạo đơn gọi món (UC_GOIMON_POS) |
| **Tác nhân** | Nhân viên phục vụ (Staff) |
| **Mô tả** | Tạo đơn hàng mới gắn liền với bàn ăn và lưu danh sách món khách chọn |
| **Sự kiện kích hoạt** | Nhân viên bấm vào một bàn ăn đang ở trạng thái Trống |
| **Tiền điều kiện** | Bàn ăn được chọn đang ở trạng thái EMPTY |
| **Luồng sự kiện chính** | **Bước 1 [Nhân viên]:** Chọn bàn trống trên sơ đồ bàn ăn.<br>**Bước 2 [Hệ thống]:** Mở giao diện gọi món POS và giỏ hàng tương ứng với bàn ăn đã chọn.<br>**Bước 3 [Nhân viên]:** Bấm chọn các món ăn từ danh mục để thêm vào giỏ hàng.<br>**Bước 4 [Nhân viên]:** Điều chỉnh số lượng từng món, thêm ghi chú riêng nếu khách yêu cầu.<br>**Bước 5 [Nhân viên]:** Bấm nút "Xác nhận gọi món".<br>**Bước 6 [Hệ thống]:** Tạo một bản ghi đơn hàng mới trong bảng `orders`, lưu các dòng món vào bảng `order_items`.<br>**Bước 7 [Hệ thống]:** Cập nhật trạng thái của bàn ăn từ `EMPTY` sang `OCCUPIED`. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Hệ thống]:** Nếu giỏ hàng đang trống, hiển thị cảnh báo "Vui lòng chọn ít nhất một món ăn trước khi xác nhận đơn". |
| **Hậu điều kiện** | Đơn hàng được lưu thành công, bàn ăn chuyển sang trạng thái đang có khách phục vụ. |

<div align="center">

*Hình 2.8.* Sơ đồ Use Case phân rã chức năng Mở bàn và Tạo đơn gọi món

</div>

### Ca sử dụng UC_10: Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER)

<div align="center">

*Bảng 2.5.* Mô tả chi tiết ca sử dụng UC_10 Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_10 |
| **Tên Use case** | Thêm món, ghi chú và cập nhật đơn hàng (UC_CAPNHAT_ORDER) |
| **Tác nhân** | Nhân viên phục vụ, Thu ngân |
| **Mô tả** | Cho phép bổ sung món ăn mới hoặc chỉnh sửa ghi chú của đơn hàng đang phục vụ |
| **Sự kiện kích hoạt** | Khách hàng gọi thêm món hoặc yêu cầu đổi món |
| **Tiền điều kiện** | Bàn ăn đang ở trạng thái OCCUPIED và đơn hàng đang ở trạng thái PENDING |
| **Luồng sự kiện chính** | **Bước 1 [Nhân viên]:** Chọn bàn ăn đang có khách trên sơ đồ bàn.<br>**Bước 2 [Hệ thống]:** Tải đơn hàng hiện tại của bàn và hiển thị danh sách các món đã gọi.<br>**Bước 3 [Nhân viên]:** Chọn thêm các món ăn mới vào giỏ hàng hoặc cập nhật số lượng.<br>**Bước 4 [Nhân viên]:** Bấm "Cập nhật đơn hàng".<br>**Bước 5 [Hệ thống]:** Tính toán lại tổng tiền tạm tính và cập nhật các dòng món trong `order_items`. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Nhân viên]:** Nếu khách yêu cầu hủy món chưa phục vụ, nhân viên giảm số lượng món về 0 để xóa dòng món đó. |
| **Hậu điều kiện** | Đơn hàng được cập nhật mới nhất, tổng tiền được tính toán lại chính xác. |

### Ca sử dụng UC_15: Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON)

<div align="center">

*Bảng 2.6.* Mô tả chi tiết ca sử dụng UC_15 Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_15 |
| **Tên Use case** | Thanh toán và In hóa đơn (UC_THANHTOAN_HOADON) |
| **Tác nhân** | Thu ngân, Nhân viên phục vụ |
| **Mô tả** | Thực hiện thu tiền của khách bằng Tiền mặt hoặc VietQR, in hóa đơn và giải phóng bàn ăn |
| **Sự kiện kích hoạt** | Khách hàng yêu cầu thanh toán hóa đơn của bàn |
| **Tiền điều kiện** | Đơn hàng của bàn đang ở trạng thái PENDING và có tổng tiền hợp lệ |
| **Luồng sự kiện chính** | **Bước 1 [Thu ngân]:** Mở đơn hàng của bàn và bấm nút "Thanh toán".<br>**Bước 2 [Hệ thống]:** Hiển thị cửa sổ thanh toán với tổng số tiền cần thu.<br>**Bước 3 [Thu ngân]:** Chọn phương thức thanh toán: "Tiền mặt" (nhập số tiền khách đưa để xem tiền thừa) hoặc "Chuyển khoản VietQR".<br>**Bước 4 [Hệ thống]:** Nếu chọn VietQR, tự động tạo mã QR động ngân hàng chứa số tiền và mã hóa đơn.<br>**Bước 5 [Thu ngân]:** Xác nhận đã nhận đủ tiền và bấm nút "Hoàn tất thanh toán".<br>**Bước 6 [Hệ thống]:** Cập nhật trạng thái đơn hàng sang `PAID`, tạo bản ghi trong bảng `payments`.<br>**Bước 7 [Hệ thống]:** Tự động chuyển trạng thái bàn ăn từ `OCCUPIED` về lại `EMPTY` (Trống).<br>**Bước 8 [Hệ thống]:** Hiển thị bản xem trước hóa đơn và kích hoạt hộp thoại in phiếu thanh toán. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Thu ngân]:** Nếu số tiền mặt khách đưa nhỏ hơn tổng tiền hóa đơn, hệ thống báo lỗi "Số tiền khách đưa chưa đủ" và không cho hoàn tất. |
| **Hậu điều kiện** | Hóa đơn được thanh toán trọn vẹn, doanh thu được ghi nhận, bàn ăn trở về trạng thái trống sẵn sàng đón lượt khách tiếp theo. |

<div align="center">

*Hình 2.9.* Sơ đồ Use Case phân rã chức năng Thanh toán và In hóa đơn

</div>

### Ca sử dụng UC_18: Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU)

<div align="center">

*Bảng 2.7.* Mô tả chi tiết ca sử dụng UC_18 Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU)

</div>

| Mục | Nội dung đặc tả |
| :--- | :--- |
| **Mã Use case** | UC_18 |
| **Tên Use case** | Thống kê doanh thu Dashboard (UC_THONGKE_DOANHTHU) |
| **Tác nhân** | Quản trị viên (Admin) |
| **Mô tả** | Tổng hợp các chỉ số kinh doanh: Doanh thu thực thu, số đơn hoàn thành, tỷ lệ lấp đầy bàn và top món bán chạy |
| **Sự kiện kích hoạt** | Admin truy cập trang Bảng điều khiển (Dashboard) |
| **Tiền điều kiện** | Người dùng đăng nhập với quyền ADMIN |
| **Luồng sự kiện chính** | **Bước 1 [Admin]:** Chọn menu "Dashboard / Báo cáo".<br>**Bước 2 [Hệ thống]:** Gửi yêu cầu tổng hợp dữ liệu thống kê từ Backend.<br>**Bước 3 [Hệ thống]:** Truy vấn các đơn hàng có trạng thái `PAID` trong ngày và tính tổng doanh thu.<br>**Bước 4 [Hệ thống]:** Thống kê số lượng từng món ăn đã bán và sắp xếp giảm dần.<br>**Bước 5 [Hệ thống]:** Hiển thị các thẻ chỉ số KPI và biểu đồ trực quan hóa dữ liệu trên giao diện. |
| **Luồng sự kiện thay thế** | **Trường hợp 1a [Hệ thống]:** Nếu chưa có đơn hàng nào được thanh toán trong ngày, hiển thị doanh thu bằng 0 kèm thông điệp thân thiện. |
| **Hậu điều kiện** | Admin nắm bắt chính xác tình hình kinh doanh của quán theo thời gian thực. |

## 2.6. Thiết kế Backend hệ thống

### 2.6.1. Thiết kế biểu đồ trình tự (Sequence Diagrams)

#### 2.6.1.1. Đăng nhập & Cấp phát JWT Token
```
User/Client                AuthController          AuthService          UserRepository        Database
    |                            |                      |                      |                 |
    |-- 1. POST /api/auth/login->|                      |                      |                 |
    |   {username, password}     |                      |                      |                 |
    |                            |-- 2. authenticate()->|                      |                 |
    |                            |                      |-- 3. findByUsername->|                 |
    |                            |                      |                      |-- 4. SELECT --->|
    |                            |                      |                      |<- 5. User Data -|
    |                            |                      |<- 6. User Entity ----|                 |
    |                            |                      |-- 7. checkPassword() |                 |
    |                            |                      |-- 8. generateJWT()   |                 |
    |                            |<- 9. AuthResponse ---|                      |                 |
    |<- 10. 200 OK (Token, Role)-|
```

<div align="center">

*Hình 2.10.* Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Đăng nhập & Cấp phát JWT

</div>

#### 2.6.1.2. Tạo đơn gọi món & Chuyển trạng thái bàn sang OCCUPIED
```
Staff/POS                 OrderController         OrderService         TableRepo     OrderRepo    Database
    |                            |                      |                  |             |           |
    |-- 1. POST /api/orders ---->|                      |                  |             |           |
    |   {tableId, items: [...]}  |-- 2. createOrder() ->|                  |             |           |
    |                            |                      |-- 3. findTable()->|             |           |
    |                            |                      |                  |-- SELECT -->|           |
    |                            |                      |<- 4. Table(EMPTY)|             |           |
    |                            |                      |-- 5. saveOrder() ------------->|           |
    |                            |                      |                                |-- INSERT->|
    |                            |                      |-- 6. updateStatus(OCCUPIED) -->|           |
    |                            |                      |                                |-- UPDATE->|
    |                            |<- 7. OrderResponse --|                  |             |           |
    |<- 8. 201 Created (Order)---|
```

<div align="center">

*Hình 2.11.* Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Tạo đơn gọi món & Chuyển trạng thái bàn sang OCCUPIED

</div>

#### 2.6.1.3. Thanh toán hóa đơn & Trả bàn về trạng thái EMPTY
```
Cashier/POS              PaymentController       PaymentService       OrderRepo     TableRepo     Database
    |                            |                      |                 |             |            |
    |-- 1. POST /api/payments -->|                      |                 |             |            |
    |   {orderId, method: CASH}  |-- 2. processPay() -->|                 |             |            |
    |                            |                      |-- 3. getOrder()->|             |            |
    |                            |                      |<- 4. Order -----|             |            |
    |                            |                      |-- 5. updateStatus(PAID) ----->|            |
    |                            |                      |-- 6. createPaymentRecord() ----------------> INSERT
    |                            |                      |-- 7. updateTable(EMPTY) ----->|            |
    |                            |                      |                               |-- UPDATE ->|
    |                            |<- 8. InvoiceDTO -----|                 |             |            |
    |<- 9. 200 OK (Invoice) -----|
```

<div align="center">

*Hình 2.12.* Biểu đồ tuần tự (Sequence Diagram) ca sử dụng Thanh toán hóa đơn & Trả bàn về EMPTY

</div>

### 2.6.2. Thiết kế biểu đồ lớp phân tích (VOPC Diagrams)

```
+-----------------------+         +--------------------------+         +------------------------+
|   <<Boundary>>        |         |       <<Control>>        |         |       <<Entity>>       |
|    PosOrderView       |-------->|       OrderService       |-------->|      OrderEntity       |
| (Màn hình gọi món POS)|         | (Xử lý nghiệp vụ đơn)    |         | (Bảng orders)          |
+-----------------------+         +--------------------------+         +------------------------+
                                                |                                   |
                                                |                      +------------v-----------+
                                                |                      |     OrderItemEntity    |
                                                v                      | (Bảng order_items)     |
                                  +--------------------------+         +------------------------+
                                  |       TableService       |                      |
                                  | (Quản lý trạng thái bàn) |-------->+------------v-----------+
                                  +--------------------------+         |   DiningTableEntity    |
                                                                       | (Bảng dining_tables)   |
                                                                       +------------------------+
```

<div align="center">

*Hình 2.13.* Biểu đồ lớp phân tích (VOPC) phân hệ Gọi món và Quản lý bàn

</div>

```
+-----------------------+         +--------------------------+         +------------------------+
|     <<Boundary>>      |         |       <<Control>>        |         |       <<Entity>>       |
|    PaymentModal       |-------->|      PaymentService      |-------->|     PaymentEntity      |
| (Cửa sổ thanh toán)   |         | (Xử lý thanh toán & QR)  |         | (Bảng payments)        |
+-----------------------+         +--------------------------+         +------------------------+
                                                |
                                                v
+-----------------------+         +--------------------------+         +------------------------+
|     <<Boundary>>      |         |       <<Control>>        |         |       <<Entity>>       |
|      MenuView         |-------->|     MenuItemService      |-------->|     MenuItemEntity     |
| (Quản lý thực đơn)    |         | (Xử lý món ăn & upload)  |         | (Bảng menu_items)      |
+-----------------------+         +--------------------------+         +------------------------+
```

<div align="center">

*Hình 2.14.* Biểu đồ lớp phân tích (VOPC) phân hệ Thanh toán và Quản lý thực đơn

</div>

### 2.6.3. Thiết kế cơ sở dữ liệu

```
+------------------+         +---------------------+         +---------------------+
|      users       |         |     categories      |         |    dining_tables    |
+------------------+         +---------------------+         +---------------------+
| id (PK)          |         | id (PK)             |         | id (PK)             |
| username (UQ)    |         | name (UQ)           |         | code (UQ)           |
| password_hash    |         | description         |         | name                |
| full_name        |         | display_order       |         | capacity            |
| role (ADMIN/STAFF|         | is_deleted (BOOLEAN)|         | status (EMPTY/OCC.) |
+--------+---------+         +----------+----------+         +----------+----------+
         |                              |                               |
         | 1                            | 1                             | 1
         |                              |                               |
         | N                            | N                             | N
+--------v---------+         +----------v----------+         +----------v----------+
|      orders      |         |     menu_items      |         |       orders        |
+------------------+         +---------------------+         +---------------------+
| id (PK)          |         | id (PK)             |         | id (PK)             |
| order_code (UQ)  |         | category_id (FK)    |         | table_id (FK)       |
| table_id (FK)    |         | name                |         | final_amount        |
| created_by (FK)  |         | price               |         | status (PENDING/PAID|
| status           |         | image_url           |         +----------+----------+
+--------+---------+         | is_deleted (BOOLEAN)|                    |
         |                   +----------+----------+                    | 1
         |                              |                               |
         | 1                            | 1                             |
         |                              |                               |
         | N                            | N                             | 1
+--------v------------------------------v----------+         +----------v----------+
|                   order_items                    |         |      payments       |
+--------------------------------------------------+         +---------------------+
| id (PK)                                          |         | id (PK)             |
| order_id (FK)                                    |         | order_id (FK, UQ)   |
| menu_item_id (FK)                                |         | invoice_code (UQ)   |
| item_name, price_at_order, quantity, subtotal    |         | amount, method      |
+--------------------------------------------------+         +---------------------+
```

<div align="center">

*Hình 2.15.* Sơ đồ quan hệ thực thể ERD cơ sở dữ liệu restaurant_management

</div>

#### Bảng 2.8: Cấu trúc bảng `users` (Tài khoản người dùng)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính định danh tài khoản |
| `username` | VARCHAR(50) | Not Null, Unique | Tên đăng nhập hệ thống |
| `password_hash` | VARCHAR(255) | Not Null | Chuỗi băm mật khẩu bảo mật BCrypt |
| `full_name` | VARCHAR(100) | Not Null | Họ và tên người dùng |
| `phone` | VARCHAR(20) | Null | Số điện thoại liên lạc |
| `role` | VARCHAR(20) | Not Null, Default 'STAFF' | Vai trò: ADMIN hoặc STAFF |
| `status` | VARCHAR(20) | Not Null, Default 'ACTIVE' | Trạng thái tài khoản (ACTIVE/INACTIVE) |
| `created_at` | TIMESTAMP | Not Null, Current Time | Thời gian khởi tạo tài khoản |
| `updated_at` | TIMESTAMP | Not Null, Auto Update | Thời gian cập nhật gần nhất |

#### Bảng 2.9: Cấu trúc bảng `categories` (Danh mục món ăn)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính danh mục |
| `name` | VARCHAR(100) | Not Null, Unique | Tên danh mục món ăn |
| `description` | VARCHAR(255) | Null | Mô tả ngắn gọn danh mục |
| `display_order` | INT | Not Null, Default 0 | Thứ tự sắp xếp hiển thị |
| `active` | BOOLEAN | Not Null, Default TRUE | Trạng thái kích hoạt hiển thị |
| `is_deleted` | BOOLEAN | Not Null, Default FALSE | Cờ xóa mềm (Soft Delete) bảo vệ dữ liệu |
| `created_at` | TIMESTAMP | Not Null, Current Time | Thời điểm tạo danh mục |

#### Bảng 2.10: Cấu trúc bảng `menu_items` (Món ăn / Đồ uống)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính món ăn |
| `category_id` | BIGINT | FK -> categories(id) | Khóa ngoại thuộc danh mục |
| `name` | VARCHAR(150) | Not Null | Tên món ăn hoặc thức uống |
| `description` | TEXT | Null | Mô tả chi tiết nguyên liệu |
| `price` | DECIMAL(12, 2) | Not Null | Đơn giá niêm yết (VNĐ) |
| `image_url` | VARCHAR(500) | Null | Đường dẫn ảnh (Web link hoặc file tải lên) |
| `status` | VARCHAR(20) | Default 'AVAILABLE' | Trạng thái phục vụ (AVAILABLE / OUT_OF_STOCK) |
| `is_deleted` | BOOLEAN | Default FALSE | Cờ xóa mềm (Soft Delete) khi dừng kinh doanh |

#### Bảng 2.11: Cấu trúc bảng `dining_tables` (Sơ đồ bàn ăn)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính bàn ăn |
| `code` | VARCHAR(30) | Not Null, Unique | Mã hiệu bàn ăn (B01, VIP01) |
| `name` | VARCHAR(100) | Not Null | Tên hiển thị của bàn |
| `capacity` | INT | Default 4 | Số ghế / Sức chứa tối đa |
| `status` | VARCHAR(20) | Default 'EMPTY' | Trạng thái: EMPTY (Trống) hoặc OCCUPIED |

#### Bảng 2.12: Cấu trúc bảng `orders` (Đơn gọi món tại bàn)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính đơn hàng |
| `order_code` | VARCHAR(30) | Not Null, Unique | Mã đơn hàng duy nhất |
| `table_id` | BIGINT | FK -> dining_tables(id) | Bàn ăn phục vụ đơn |
| `created_by_user_id` | BIGINT | FK -> users(id) | Nhân viên mở đơn |
| `subtotal_amount` | DECIMAL(12, 2) | Default 0.00 | Tổng tiền món ăn trước chiết khấu |
| `discount_amount` | DECIMAL(12, 2) | Default 0.00 | Số tiền giảm giá khuyến mãi |
| `final_amount` | DECIMAL(12, 2) | Default 0.00 | Số tiền thực phải thanh toán |
| `status` | VARCHAR(20) | Default 'PENDING' | Trạng thái đơn (PENDING, PAID, CANCELLED) |

#### Bảng 2.13: Cấu trúc bảng `order_items` (Chi tiết dòng món)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính dòng món |
| `order_id` | BIGINT | FK -> orders(id) | Khóa ngoại thuộc đơn hàng |
| `menu_item_id` | BIGINT | FK -> menu_items(id) | Khóa ngoại món ăn |
| `item_name` | VARCHAR(150) | Not Null | Tên món ăn tại thời điểm gọi |
| `price_at_order` | DECIMAL(12, 2) | Not Null | Đơn giá tại thời điểm gọi |
| `quantity` | INT | Not Null, Default 1 | Số lượng phần ăn |
| `subtotal` | DECIMAL(12, 2) | Not Null | Thành tiền dòng món |
| `note` | VARCHAR(255) | Null | Ghi chú khẩu vị của khách |

#### Bảng 2.14: Cấu trúc bảng `payments` (Lịch sử thanh toán & Hóa đơn)
| Tên trường | Kiểu dữ liệu | Ràng buộc | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT | PK, Auto Increment | Khóa chính giao dịch |
| `order_id` | BIGINT | FK -> orders(id), Unique | Khóa ngoại đơn hàng đã trả |
| `invoice_code` | VARCHAR(30) | Not Null, Unique | Mã hóa đơn in cho khách |
| `amount_paid` | DECIMAL(12, 2) | Not Null | Tổng tiền thực thu |
| `payment_method` | VARCHAR(20) | Not Null | Phương thức (CASH hoặc VIETQR) |
| `created_at` | TIMESTAMP | Current Time | Thời điểm xuất hóa đơn |

\newpage

---

# CHƯƠNG 3: CÀI ĐẶT VÀ THỬ NGHIỆM HỆ THỐNG

## 3.1. Môi trường triển khai và vận hành hệ thống

Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops) đã được đóng gói, cấu hình đồng bộ và đang vận hành ổn định trên môi trường thử nghiệm thực tế với các tham số chuẩn xác sau:

- **Máy chủ Backend:**
  - Phiên bản khung ứng dụng: Spring Boot 3.3.4
  - Môi trường thực thi máy ảo: JDK 21 LTS
  - Máy chủ nội bộ nhúng Tomcat chạy trên cổng: `http://localhost:8080` (Context API: `/api/`)
  - Cung cấp toàn bộ các REST API phục vụ gọi món, quản lý bàn, cập nhật thực đơn và thanh toán.
- **Máy chủ Frontend:**
  - Thư viện giao diện: React 18, TypeScript
  - Công cụ đóng gói & phát triển: Vite 5
  - Máy chủ phát triển chạy trên cổng: `http://localhost:3000`
  - Thiết kế giao diện hiện đại Glassmorphism, tối ưu hóa thao tác chạm cảm ứng cho nhân viên phục vụ tại bàn và thu ngân.
- **Cơ sở dữ liệu:**
  - Hệ quản trị cơ sở dữ liệu: MySQL 8.0 Community Edition
  - Database name: `restaurant_management`
  - Cổng kết nối mặc định: `3306`
  - Quản lý phiên bản bảng và dữ liệu mẫu tự động qua: Flyway Migration (V1 -> V5).
- **Tài khoản kiểm thử tích hợp:**
  - **Quản trị viên (Admin):**
    - Tên đăng nhập: `admin`
    - Mật khẩu: `Admin123@`
    - Quyền hạn: Toàn quyền quản trị Dashboard doanh thu, quản lý danh mục, quản lý món ăn, tải ảnh từ máy tính, quản lý sơ đồ bàn và xem lịch sử hóa đơn.
  - **Nhân viên phục vụ / Thu ngân (Staff):**
    - Tên đăng nhập: `staff01`
    - Mật khẩu: `Admin123@`
    - Quyền hạn: Xem sơ đồ bàn ăn trực quan, mở bàn, gọi món POS tại chỗ, thêm ghi chú khẩu vị, in hóa đơn tạm tính và thực hiện thanh toán thu tiền (Tiền mặt / VietQR).

## 3.2. Giao diện các chức năng chính của hệ thống

> [!NOTE]
> Sinh viên chụp ảnh màn hình giao diện thực tế đang chạy tại máy tính cá nhân (`http://localhost:3000/`) theo 11 khung hướng dẫn bên dưới để đưa vào bài báo cáo.

---

### Hình 3.1: Giao diện Sơ đồ bàn ăn và POS trực quan
- **Địa chỉ giao diện:** `http://localhost:3000/#/tables`
- **Hướng dẫn thao tác chụp:** Đăng nhập tài khoản `staff01`, mở menu 'Sơ đồ bàn'. Chụp toàn bộ giao diện lưới các bàn ăn hiển thị màu xanh lá (Bàn trống) và màu đỏ cam (Bàn có khách).

<div align="center">

*Hình 3.1.* Giao diện Sơ đồ bàn ăn và POS trực quan

</div>

---

### Hình 3.2: Giao diện Gọi món và Giỏ hàng theo bàn ăn thực tế
- **Địa chỉ giao diện:** `http://localhost:3000/#/pos`
- **Hướng dẫn thao tác chụp:** Bấm vào một bàn ăn để vào màn hình POS. Chụp giao diện chia đôi: bên trái là danh mục món ăn (Khai vị, Món chính, Đồ uống), bên phải là Giỏ hàng món ăn kèm số lượng và ô nhập ghi chú khẩu vị.

<div align="center">

*Hình 3.2.* Giao diện Gọi món và Giỏ hàng theo bàn ăn thực tế

</div>

---

### Hình 3.3: Giao diện Quản lý Thực đơn và Danh mục món ăn
- **Địa chỉ giao diện:** `http://localhost:3000/#/menu`
- **Hướng dẫn thao tác chụp:** Đăng nhập tài khoản `admin`, truy cập menu 'Quản lý thực đơn'. Chụp danh sách các món ăn hiển thị ảnh, tên món, danh mục, đơn giá và các nút Sửa, Xóa món.

<div align="center">

*Hình 3.3.* Giao diện Quản lý Thực đơn và Danh mục món ăn

</div>

---

### Hình 3.4: Cửa sổ Modal Thêm/Sửa món ăn kèm chọn ảnh trực tiếp từ máy tính
- **Địa chỉ giao diện:** `http://localhost:3000/#/menu`
- **Hướng dẫn thao tác chụp:** Trên trang Thực đơn, bấm nút 'Thêm món mới'. Chụp cửa sổ pop-up hiển thị các ô nhập Tên món, Đơn giá, Danh mục và nút bấm 'Chọn tệp ảnh từ máy' (Upload Local File).

<div align="center">

*Hình 3.4.* Cửa sổ Modal Thêm/Sửa món ăn kèm chọn ảnh trực tiếp từ máy tính

</div>

---

### Hình 3.5: Cửa sổ Xác nhận thanh toán (Tiền mặt và Mã QR ngân hàng VietQR)
- **Địa chỉ giao diện:** `http://localhost:3000/#/pos`
- **Hướng dẫn thao tác chụp:** Tại màn hình giỏ hàng của một bàn ăn có món, bấm nút 'Thanh toán'. Chụp cửa sổ thanh toán hiển thị số tiền, tùy chọn Tiền mặt (tính tiền thừa) và mã VietQR sinh động.

<div align="center">

*Hình 3.5.* Cửa sổ Xác nhận thanh toán (Tiền mặt và Mã QR ngân hàng VietQR)

</div>

---

### Hình 3.6: Mẫu phiếu In hóa đơn thanh toán cho khách hàng
- **Địa chỉ giao diện:** `http://localhost:3000/#/orders`
- **Hướng dẫn thao tác chụp:** Sau khi bấm hoàn tất thanh toán hoặc in tạm tính, chụp bản xem trước phiếu in hóa đơn hiển thị đầy đủ: Tên quán Hương Việt, Mã hóa đơn INV, tên bàn, danh sách món, tổng tiền và lời cảm ơn.

<div align="center">

*Hình 3.6.* Mẫu phiếu In hóa đơn thanh toán cho khách hàng

</div>

---

### Hình 3.7: Giao diện Quản lý Đơn hàng và Lịch sử hóa đơn
- **Địa chỉ giao diện:** `http://localhost:3000/#/orders`
- **Hướng dẫn thao tác chụp:** Truy cập menu 'Đơn hàng / Hóa đơn'. Chụp bảng danh sách các đơn hàng đã thanh toán (PAID) và đang phục vụ (PENDING) kèm thời gian và tổng tiền.

<div align="center">

*Hình 3.7.* Giao diện Quản lý Đơn hàng và Lịch sử hóa đơn

</div>

---

### Hình 3.8: Bảng điều khiển Quản trị Dashboard và thống kê doanh thu
- **Địa chỉ giao diện:** `http://localhost:3000/#/dashboard`
- **Hướng dẫn thao tác chụp:** Đăng nhập `admin`, chọn 'Dashboard'. Chụp các thẻ số liệu KPI tổng quan: Doanh thu hôm nay, Số đơn hoàn thành, Tỷ lệ bàn đang phục vụ.

<div align="center">

*Hình 3.8.* Bảng điều khiển Quản trị Dashboard và thống kê doanh thu

</div>

---

### Hình 3.9: Biểu đồ thống kê top món ăn bán chạy nhất
- **Địa chỉ giao diện:** `http://localhost:3000/#/dashboard`
- **Hướng dẫn thao tác chụp:** Kéo xuống phần biểu đồ trên trang Dashboard. Chụp đồ thị cột/thanh thống kê danh sách các món ăn bán chạy nhất quán.

<div align="center">

*Hình 3.9.* Biểu đồ thống kê top món ăn bán chạy nhất

</div>

---

### Hình 3.10: Màn hình Đăng nhập phân quyền hệ thống Admin / Staff
- **Địa chỉ giao diện:** `http://localhost:3000/#/login`
- **Hướng dẫn thao tác chụp:** Đăng xuất khỏi hệ thống. Chụp màn hình đăng nhập với giao diện kính mờ Glassmorphism, 2 ô nhập tài khoản, mật khẩu và nút Đăng nhập.

<div align="center">

*Hình 3.10.* Màn hình Đăng nhập phân quyền hệ thống Admin / Staff

</div>

---

### Hình 3.11: Tính năng Xóa mềm (Soft Delete) món ăn và danh mục bảo toàn dữ liệu
- **Địa chỉ giao diện:** `http://localhost:3000/#/menu`
- **Hướng dẫn thao tác chụp:** Thực hiện thao tác bấm nút xóa một món ăn hoặc danh mục trên trang Quản lý thực đơn. Chụp thông báo xác nhận xóa mềm an toàn thành công mà không gây lỗi khóa ngoại.

<div align="center">

*Hình 3.11.* Tính năng Xóa mềm (Soft Delete) món ăn và danh mục bảo toàn dữ liệu

</div>

## 3.3. Kịch bản kiểm thử hệ thống (Test Cases)

Quá trình kiểm thử được tiến hành nghiêm ngặt qua 4 bảng kịch bản chính nhằm kiểm chứng tính đúng đắn và độ bền của toàn bộ hệ thống:

### Bảng 3.1: Kịch bản kiểm thử phân hệ Xác thực và Đăng nhập hệ thống

<div align="center">

*Bảng 3.1.* Kịch bản kiểm thử phân hệ Xác thực và Đăng nhập hệ thống

</div>

| Mã kiểm thử | Mục tiêu kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC_AUTH_01** | Đăng nhập thành công với tài khoản Quản trị viên | Nhập `admin` / `Admin123@` | Đăng nhập thành công, chuyển hướng đến Dashboard, hiển thị đầy đủ menu Admin | **Đạt** |
| **TC_AUTH_02** | Đăng nhập thành công với tài khoản Nhân viên | Nhập `staff01` / `Admin123@` | Đăng nhập thành công, chuyển hướng đến Sơ đồ bàn, ẩn menu Dashboard | **Đạt** |
| **TC_AUTH_03** | Đăng nhập với mật khẩu sai | Nhập `admin` / `sai_mat_khau` | Hiển thị thông báo lỗi 'Tên đăng nhập hoặc mật khẩu không chính xác', không cấp token | **Đạt** |
| **TC_AUTH_04** | Đăng nhập bỏ trống trường dữ liệu | Để trống mật khẩu và bấm Đăng nhập | Hiển thị cảnh báo màu đỏ yêu cầu nhập đầy đủ thông tin | **Đạt** |

### Bảng 3.2: Kịch bản kiểm thử phân hệ Quản lý bàn và Tạo đơn gọi món POS

<div align="center">

*Bảng 3.2.* Kịch bản kiểm thử phân hệ Quản lý bàn và Tạo đơn gọi món POS

</div>

| Mã kiểm thử | Mục tiêu kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC_POS_01** | Xem sơ đồ bàn trực quan | Truy cập `/tables` | Tải danh sách 10 bàn ăn kèm trạng thái màu sắc chính xác từ cơ sở dữ liệu | **Đạt** |
| **TC_POS_02** | Mở bàn trống và chọn món ăn | Bấm Bàn 01 (EMPTY), chọn 2 Phở bò, 1 Trà đá | Món hiển thị đúng trong giỏ hàng, tổng tiền tính đúng (2*55k + 10k = 120k) | **Đạt** |
| **TC_POS_03** | Thêm ghi chú khẩu vị cho món | Nhập 'Không cho hành tây' vào dòng món Phở bò | Ghi chú được lưu vào chi tiết dòng món trong giỏ hàng | **Đạt** |
| **TC_POS_04** | Xác nhận tạo đơn gọi món | Bấm nút 'Xác nhận gọi món' | Tạo bản ghi orders, bàn B01 tự động chuyển sang màu đỏ cam (OCCUPIED) | **Đạt** |

### Bảng 3.3: Kịch bản kiểm thử phân hệ Thanh toán và Cập nhật trạng thái bàn

<div align="center">

*Bảng 3.3.* Kịch bản kiểm thử phân hệ Thanh toán và Cập nhật trạng thái bàn

</div>

| Mã kiểm thử | Mục tiêu kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC_PAY_01** | Thanh toán bằng Tiền mặt và tính tiền thừa | Đơn 120k, nhập khách đưa 200.000đ | Hệ thống hiển thị tiền thừa thối lại: 80.000đ, cho phép bấm Hoàn tất | **Đạt** |
| **TC_PAY_02** | Thanh toán bằng mã quét VietQR | Chọn phương thức VietQR | Mã QR động được sinh ra chứa đúng số tiền 120.000đ và mã đơn hàng | **Đạt** |
| **TC_PAY_03** | Giải phóng bàn ăn sau thanh toán | Bấm 'Hoàn tất thanh toán' | Đơn chuyển PAID, bàn B01 lập tức chuyển về màu xanh (EMPTY - Trống) | **Đạt** |
| **TC_PAY_04** | In phiếu hóa đơn thanh toán | Bấm nút 'In hóa đơn' | Mở hộp thoại in chuẩn trình duyệt, bố cục hóa đơn rõ ràng, chuyên nghiệp | **Đạt** |

### Bảng 3.4: Kịch bản kiểm thử phân hệ Quản lý thực đơn và Xóa mềm (Soft Delete)

<div align="center">

*Bảng 3.4.* Kịch bản kiểm thử phân hệ Quản lý thực đơn và Xóa mềm (Soft Delete)

</div>

| Mã kiểm thử | Mục tiêu kiểm thử | Dữ liệu đầu vào | Kết quả mong đợi | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC_MENU_01** | Thêm món ăn mới kèm ảnh tải từ máy | Tên: 'Gà Hấp Lá Chanh', Giá: 150k, Chọn ảnh file ga.jpg | Ảnh tải lên `/uploads/`, món mới xuất hiện ngay trong danh mục Món chính | **Đạt** |
| **TC_MENU_02** | Tạm dừng bán món ăn | Chuyển trạng thái món sang OUT_OF_STOCK | Món hiển thị chữ 'Hết hàng' trên giao diện POS và nhân viên không bấm chọn được | **Đạt** |
| **TC_MENU_03** | Xóa mềm (Soft Delete) món ăn đã từng bán | Bấm nút 'Xóa món' đối với món đã có trong đơn hàng cũ | Món được đánh dấu is_deleted = TRUE, ẩn khỏi thực đơn bán nhưng đơn cũ vẫn nguyên vẹn | **Đạt** |
| **TC_MENU_04** | Xóa mềm danh mục món ăn | Bấm nút 'Xóa danh mục' trống | Danh mục ẩn thành công, không phát sinh lỗi ràng buộc 500 Foreign Key | **Đạt** |

\newpage

---

# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN

## 1. Đánh giá kết quả đạt được

Sau thời gian tập trung nghiên cứu, thiết kế và triển khai thực nghiệm, đồ án môn học với đề tài **"Xây dựng Hệ thống Quản lý Quán ăn và Điểm bán hàng trực tiếp (Hương Việt POS & Restaurant Ops)"** đã hoàn thành trọn vẹn mọi mục tiêu đã đề ra ban đầu:
- **Hoàn thiện kiến trúc phần mềm:** Xây dựng thành công ứng dụng web hiện đại, tách biệt hoàn toàn giữa Frontend (React 18, TypeScript, Vite 5) và Backend (Spring Boot 3.3.4, Java 21, MySQL 8.0).
- **Giải quyết triệt để nghiệp vụ F&B:** Số hóa toàn diện 100% các công đoạn phục vụ ẩm thực tại quán bao gồm: Xem sơ đồ bàn ăn trực quan, mở bàn, gọi món POS tại chỗ, ghi chú khẩu vị, cập nhật đơn hàng, thanh toán tiền mặt có tính tiền thừa, sinh mã VietQR động và in phiếu hóa đơn chuyên nghiệp.
- **Nâng cao độ tin cậy và tiện ích:** Cơ chế bảo mật JWT kết hợp mã hóa BCrypt bảo vệ an toàn tài khoản; cơ chế Xóa mềm (Soft Delete) bảo vệ toàn vẹn dữ liệu kế toán lịch sử khi xóa món hoặc danh mục; tính năng chọn tệp ảnh trực tiếp từ máy tính giúp người dùng dễ dàng cập nhật thực đơn phong phú.
- **Kiểm thử thực nghiệm:** Toàn bộ 16 kịch bản kiểm thử trọng yếu đều đạt kết quả xuất sắc, hệ thống hoạt động ổn định và phản hồi mượt mà dưới thao tác liên tục.

## 2. Hạn chế của hệ thống

Bên cạnh những thành tựu nổi bật, đồ án vẫn còn một số điểm hạn chế do giới hạn về mặt thời gian và nguồn lực nghiên cứu:
- **Chưa áp dụng WebSocket thời gian thực:** Sự thay đổi trạng thái bàn ăn (từ Trống sang Có khách) giữa nhiều thiết bị hiện tại vẫn phụ thuộc vào việc làm mới dữ liệu qua HTTP Polling thay vì sử dụng công nghệ kết nối hai chiều WebSocket (STOMP).
- **Chưa kết nối trực tiếp máy in nhiệt ESC/POS:** Hệ thống hiện tại in hóa đơn thông qua lệnh in tiêu chuẩn của trình duyệt web (`window.print`), chưa tích hợp giao tiếp trực tiếp qua cổng mạng LAN/Bluetooth với các dòng máy in nhiệt chuyên dụng (máy in Bill K80 dùng tập lệnh ESC/POS).
- **Chưa quản lý định lượng kho nguyên liệu:** Chưa xây dựng phân hệ quản lý kho nguyên vật liệu đầu vào (định lượng món ăn để tự động trừ kho khi bán đĩa thức ăn).

## 3. Hướng phát triển trong tương lai

Nhằm phát triển sản phẩm trở thành một giải pháp phần mềm quản lý nhà hàng F&B thương mại hóa chuyên nghiệp, hệ thống sẽ tiếp tục được nâng cấp với các định hướng trọng tâm sau:
- **Tích hợp WebSocket & Màn hình Bếp (KDS):** Tích hợp Spring WebSocket và SockJS để đồng bộ tức thời trạng thái bàn ăn và các món vừa gọi sang màn hình hiển thị nhà bếp (Kitchen Display System - KDS) ngay khi nhân viên bấm gửi món.
- **Tính năng Đặt bàn và Tự gọi món tại bàn qua Mobile:** Cung cấp mã QR cố định in trên từng bàn ăn để khách hàng có thể dùng điện thoại cá nhân tự quét mã, xem thực đơn số và tự gọi món mà không cần đợi nhân viên phục vụ.
- **Tích hợp Driver máy in hóa đơn nhiệt ESC/POS:** Kết nối trực tiếp máy in nhiệt hóa đơn (ESC/POS) để in bill tự động ngay tại quầy thu ngân và tại quầy bếp khi có đơn mới.
- **Quản lý xuất nhập tồn nguyên liệu và giá vốn:** Phát triển phân hệ quản lý kho nguyên vật liệu, định lượng từng gram thịt, rau, gia vị cho mỗi suất ăn để cảnh báo khi kho sắp hết hàng.

\newpage

---

# TÀI LIỆU THAM KHẢO

[1] Craig Walls (2022), *Spring in Action*, Sixth Edition, Manning Publications.

[2] Christian Bauer, Gavin King, Gary Gregory (2015), *Java Persistence with Hibernate*, Second Edition, Manning Publications.

[3] Alex Banks, Eve Porcello (2020), *Learning React: Modern Patterns for Developing React Apps*, 2nd Edition, O'Reilly Media.

[4] Joshua Bloch (2018), *Effective Java*, 3rd Edition, Addison-Wesley Professional.

[5] Martin Fowler (2002), *Patterns of Enterprise Application Architecture*, Addison-Wesley Professional.

[6] Robert C. Martin (2008), *Clean Code: A Handbook of Agile Software Craftsmanship*, Prentice Hall.

[7] Oracle Corporation (2024), *Java Platform, Standard Edition Documentation*, Version 21 LTS, truy cập tại: https://docs.oracle.com/en/java/javase/21/

[8] Spring Framework Documentation (2024), *Spring Boot Reference Guide 3.3*, truy cập tại: https://spring.io/projects/spring-boot

[9] React Documentation (2024), *React 18 Official Reference*, truy cập tại: https://react.dev/

[10] NAPAS & Công ty Cổ phần Thanh toán Quốc gia Việt Nam (2023), *Tiêu chuẩn kỹ thuật mã phản hồi nhanh VietQR*, truy cập tại: https://vietqr.net/
