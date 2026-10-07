Đề Kiểm Tra Giữa Kì

Môn: Điện toán đám mây

Bài toán thực tế:

Công ty của bạn đang cần đưa một ứng dụng Web (Quản lý Sách) lên môi trường Internet.

Bạn hãy thiết kế hạ tầng đám mây cho ứng dụng này đáp ứng 3 tiêu chí: Bảo mật phân

quyền, Khả năng chịu tải phân tán (Stateless) và Quy trình DevOps chuẩn.

Yêu cầu kỹ thuật:

1\. Kiến trúc Bảo mật Cơ sở dữ liệu Cloud (2.5 điểm)

-Thiết lập một cơ sở dữ liệu trên MongoDB Atlas mang tên: DB\_[MSSV\_Của\_Bạn]

-Áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege): Tạo ra 02 tài khoản người

dùng độc lập gắn liền với MSSV. Một tài khoản chỉ có quyền Đọc (phục vụ tính

năng xem danh sách) và một tài khoản chỉ có quyền Ghi (phục vụ tính năng thêm

mới).

2\. Logic Backend &amp; Kiến trúc Stateless (4.5 điểm)

-Đa luồng kết nối: Viết code Node.js/Express kết nối đồng thời cả 2 tài khoản trên.

Hệ thống phải tự động điều hướng luồng truy vấn (Read/Write) vào đúng tài khoản

có thẩm quyền.

-Stateless Session: Để hệ thống có thể co giãn (Auto-scaling) trên Cloud mà không

bị mất phiên làm việc, tuyệt đối không lưu Session/Cookie trong RAM máy chủ.

Hãy cấu hình để lưu trữ tập trung Session trực tiếp xuống Cloud MongoDB Atlas.

-Thuật toán cá nhân hóa:

\-

Cài đặt bộ lọc dữ liệu: Mã sản phẩm bắt buộc phải có tiền tố là 3 số cuối

MSSV của bạn, nếu sai hệ thống phải từ chối xử lý.

\-

Thuế suất được tính động theo công thức: VAT = (Chữ số cuối MSSV + 5)%.

Hệ thống phải tự động tính giá sau thuế trước khi lưu xuống đám mây và

render dữ liệu ra màn hình Handlebars (Footer bắt buộc hiện Họ tên, MSSV

và mức VAT áp dụng).

3\. Quản lý mã nguồn &amp; Kiểm soát DevOps (1.5 điểm)-

Khởi tạo Git, cấu hình bảo mật không được để lộ thông tin nhạy cảm (file .env, thư

mục rác) khi đẩy lên mạng.

\-

Quy trình code phải được bóc tách trên 02 nhánh tính năng riêng biệt (Nhánh làm

Database và Nhánh làm Session), sau đó thực hiện gộp nhánh về main sao cho lưu

lại đầy đủ lịch sử các nút gộp (Merge Node) trên sơ đồ cây.

4\. Triển khai Hệ thống thực tế (1.5 điểm)

\-

Đẩy mã nguồn lên GitHub ở chế độ Private (Riêng tư) và cấp quyền cho Giảng viên

chấm bài.

\-

Triển khai ứng dụng chạy trực tuyến 24/7 trên một nền tảng đám mây PaaS (như

Render). Toàn bộ chuỗi kết nối Database mật mã phải được cấu hình qua giao diện

quản trị biến môi trường của Cloud, không được viết trực tiếp vào code.  
  
Đề Kiểm Tra Giữa Kì

Môn: Điện toán đám mây

Bài toán thực tế:

Công ty của bạn đang cần đưa một ứng dụng Web (Quản lý Sách) lên môi trường Internet.

Bạn hãy thiết kế hạ tầng đám mây cho ứng dụng này đáp ứng 3 tiêu chí: Bảo mật phân

quyền, Khả năng chịu tải phân tán (Stateless) và Quy trình DevOps chuẩn.

Yêu cầu kỹ thuật:

1\. Kiến trúc Bảo mật Cơ sở dữ liệu Cloud (2.5 điểm)

-Thiết lập một cơ sở dữ liệu trên MongoDB Atlas mang tên: DB\_[MSSV\_Của\_Bạn]

-Áp dụng nguyên tắc đặc quyền tối thiểu (Least Privilege): Tạo ra 02 tài khoản người

dùng độc lập gắn liền với MSSV. Một tài khoản chỉ có quyền Đọc (phục vụ tính

năng xem danh sách) và một tài khoản chỉ có quyền Ghi (phục vụ tính năng thêm

mới).

2\. Logic Backend &amp; Kiến trúc Stateless (4.5 điểm)

-Đa luồng kết nối: Viết code Node.js/Express kết nối đồng thời cả 2 tài khoản trên.

Hệ thống phải tự động điều hướng luồng truy vấn (Read/Write) vào đúng tài khoản

có thẩm quyền.

-Stateless Session: Để hệ thống có thể co giãn (Auto-scaling) trên Cloud mà không

bị mất phiên làm việc, tuyệt đối không lưu Session/Cookie trong RAM máy chủ.

Hãy cấu hình để lưu trữ tập trung Session trực tiếp xuống Cloud MongoDB Atlas.

-Thuật toán cá nhân hóa:

\-

Cài đặt bộ lọc dữ liệu: Mã sản phẩm bắt buộc phải có tiền tố là 3 số cuối

MSSV của bạn, nếu sai hệ thống phải từ chối xử lý.

\-

Thuế suất được tính động theo công thức: VAT = (Chữ số cuối MSSV + 5)%.

Hệ thống phải tự động tính giá sau thuế trước khi lưu xuống đám mây và

render dữ liệu ra màn hình Handlebars (Footer bắt buộc hiện Họ tên, MSSV

và mức VAT áp dụng).

3\. Quản lý mã nguồn &amp; Kiểm soát DevOps (1.5 điểm)-

Khởi tạo Git, cấu hình bảo mật không được để lộ thông tin nhạy cảm (file .env, thư

mục rác) khi đẩy lên mạng.

\-

Quy trình code phải được bóc tách trên 02 nhánh tính năng riêng biệt (Nhánh làm

Database và Nhánh làm Session), sau đó thực hiện gộp nhánh về main sao cho lưu

lại đầy đủ lịch sử các nút gộp (Merge Node) trên sơ đồ cây.

4\. Triển khai Hệ thống thực tế (1.5 điểm)

\-

Đẩy mã nguồn lên GitHub ở chế độ Private (Riêng tư) và cấp quyền cho Giảng viên

chấm bài.

\-

Triển khai ứng dụng chạy trực tuyến 24/7 trên một nền tảng đám mây PaaS (như

Render). Toàn bộ chuỗi kết nối Database mật mã phải được cấu hình qua giao diện

quản trị biến môi trường của Cloud, không được viết trực tiếp vào code.
