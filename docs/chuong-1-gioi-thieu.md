# TRANG BÌA (THEO MẪU STU)

TRƯỜNG ĐẠI HỌC CÔNG NGHỆ SÀI GÒN  
KHOA CÔNG NGHỆ THÔNG TIN  
---oOo---

**LUẬN VĂN TỐT NGHIỆP**

<u>*Tên đề tài:*</u>  
**XÂY DỰNG HỆ THỐNG WEBSITE QUẢN LÝ PHÒNG GYM TÍCH HỢP ĐẶT LỊCH PT, THANH TOÁN TRỰC TUYẾN VÀ CỔNG KHÁCH HÀNG**

Người hướng dẫn: **ThS. Bùi Nhật Bằng**  
Sinh viên thực hiện: **Võ Duy Phúc**

TP. HỒ CHÍ MINH – NĂM 2026

---

# Chương 1. GIỚI THIỆU

## 1.1 ĐẶT VẤN ĐỀ, MỤC TIÊU LUẬN VĂN

Cùng với sự phát triển của kinh tế và mức sống ngày càng nâng cao, nhu cầu chăm sóc sức khỏe, cải thiện vóc dáng và rèn luyện thể chất tại các phòng tập thể hình (Gym, Fitness) đang gia tăng mạnh mẽ, đặc biệt tại các đô thị lớn. *[Bổ sung số liệu thống kê về tốc độ tăng trưởng ngành Fitness hoặc tỷ lệ người dân tập luyện thể thao tại Việt Nam, kèm nguồn trích dẫn uy tín.]*

Tuy nhiên, quá trình vận hành tại nhiều phòng tập gym quy mô vừa và nhỏ hiện nay vẫn còn phụ thuộc nhiều vào sổ sách thủ công, bảng tính Excel rời rạc hoặc các phần mềm quản lý truyền thống thiếu tính kết nối. Điều này dẫn đến hàng loạt khó khăn trong thực tế:

- **Quản lý hợp đồng và gói tập phức tạp dễ sai sót:** Các nghiệp vụ đặc thù như gia hạn gói, bảo lưu (tạm ngưng) gói tập, chuyển nhượng gói hoặc theo dõi công nợ nhiều đợt dễ bị nhầm lẫn, gây thất thoát doanh thu và ảnh hưởng đến trải nghiệm hội viên.
- **Kiểm soát ra vào (Check-in) thiếu chặt chẽ:** Việc sử dụng thẻ cứng hoặc đọc tên/số điện thoại thủ công tại quầy lễ tân dễ dẫn đến tình trạng dùng chung thẻ, không kiểm tra kịp thời trạng thái hết hạn hoặc đang bảo lưu của gói tập.
- **Khó khăn trong sắp xếp lịch tập với Huấn luyện viên cá nhân (PT) và lớp nhóm:** Việc đặt lịch qua tin nhắn cá nhân dễ xảy ra trùng lịch, khó thống kê chính xác số buổi tập còn lại của học viên cũng như khó minh bạch trong việc tính hoa hồng cho PT cuối tháng.
- **Thiếu kênh tiếp cận và chuyển đổi khách vãng lai trực tuyến:** Nhiều hệ thống quản lý phòng gym chỉ phục vụ nội bộ, không có trang thông tin công khai (Landing Page) để khách vãng lai tìm hiểu bảng giá, tính toán chỉ số cơ thể, đặt lịch tập thử hoặc đăng ký mua gói trực tuyến, làm giảm tỷ lệ chuyển đổi khách hàng tiềm năng (Lead).

Bên cạnh đó, các giải pháp phần mềm quản lý gym chuyên nghiệp trên thị trường thường có chi phí bản quyền cao theo tháng, giao diện phức tạp hoặc chưa tích hợp đồng bộ giữa cổng thông tin khách hàng bên ngoài và hệ thống vận hành bên trong.

Xuất phát từ thực tế đó, luận văn chọn thực hiện đề tài **“Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, thanh toán trực tuyến và cổng khách hàng”** nhằm xây dựng một giải pháp web toàn diện trên nền tảng **Node.js, React và MySQL**. Hệ thống không chỉ số hóa toàn bộ quy trình vận hành nội bộ (quản lý hội viên, gói tập, check-in QR, đặt lịch PT, tính hoa hồng, báo cáo thống kê) mà còn cung cấp cổng Landing Page hiện đại giúp thu hút và chuyển đổi khách vãng lai thành hội viên chính thức.

---

## 1.2 NHỮNG THÁCH THỨC CẦN GIẢI QUYẾT

### 1.2.1 Thách thức về nghiệp vụ

- **Quản lý vòng đời hợp đồng và gói tập linh hoạt:** Phòng gym có nhiều loại gói tập khác nhau (gói theo thời hạn, gói theo số buổi PT 1-1, gói lớp nhóm). Hệ thống phải xử lý chính xác các nghiệp vụ phát sinh như bảo lưu gói tập (tính số ngày bảo lưu hợp lệ và tự động cộng bù vào ngày hết hạn khi kích hoạt lại), nâng cấp hoặc chuyển nhượng gói mà vẫn đảm bảo lịch sử giao dịch minh bạch.
- **Quản lý đặt lịch PT 1-1 và lớp nhóm không xung đột:** Khi hội viên đặt lịch với PT hoặc đăng ký lớp nhóm (GroupX), hệ thống phải kiểm tra đồng thời lịch rảnh của PT, lịch cá nhân của hội viên và sĩ số tối đa của lớp. Đồng thời, cần có cơ chế trừ buổi tập tự động khi hoàn thành buổi hoặc xử lý hủy lịch trễ theo quy định, làm cơ sở tính hoa hồng cho PT.
- **Kiểm soát check-in theo thời gian thực:** Cần xác thực chính xác quyền vào phòng tập của hội viên (gói còn hiệu lực, không ở trạng thái bảo lưu) và hạn chế gian lận chia sẻ tài khoản cho người khác sử dụng.
- **Kết nối phễu khách hàng từ Landing Page vào CRM:** Khách vãng lai đăng ký tư vấn hoặc đặt lịch tập thử trên Landing Page cần được tự động ghi nhận vào hệ thống quản lý khách hàng tiềm năng (Lead) để lễ tân/nhân viên kinh doanh theo dõi trạng thái chuyển đổi từ lúc tập thử đến khi ký hợp đồng chính thức.

### 1.2.2 Thách thức về kỹ thuật

- **Xử lý đồng thời (Concurrency / Race Condition):** Trong các tình huống nhiều hội viên cùng lúc đặt một khung giờ trống cuối cùng của PT hoặc đăng ký suất cuối cùng của một lớp nhóm, hệ thống có nguy cơ bị đặt trùng dữ liệu. *Hướng xử lý:* Sử dụng **MySQL Transaction** kết hợp khóa dữ liệu ở mức dòng thông qua **Prisma ORM** để đảm bảo tính toàn vẹn dữ liệu tuyệt đối.
- **Mã QR động và cập nhật Check-in tức thì (Realtime):** Nếu dùng mã QR tĩnh, hội viên có thể chụp ảnh gửi cho người khác quét hộ. *Hướng xử lý:* Sinh mã QR chứa token có thời hạn ngắn (ví dụ 60 giây, tự động làm mới) và sử dụng **Socket.io** để đẩy thông tin check-in (ảnh, trạng thái gói, cảnh báo) lên màn hình lễ tân theo thời gian thực.
- **Tích hợp cổng thanh toán trực tuyến và Webhook:** Giao dịch thanh toán qua VietQR/PayOS hoặc VNPay Sandbox diễn ra bất đồng bộ. *Hướng xử lý:* Xây dựng API nhận Webhook có kiểm tra chữ ký bảo mật và đảm bảo tính lũy đẳng (idempotency) để không kích hoạt gói tập trùng lặp khi Webhook gửi lại.
- **Tự động hóa các tác vụ nền (Cron Jobs):** Cần tự động cập nhật trạng thái gói tập hết hạn, tự động mở lại các gói hết thời gian bảo lưu và gửi thông báo nhắc lịch tập. *Hướng xử lý:* Sử dụng `node-cron` trên máy chủ Node.js chạy định kỳ mỗi ngày.
- **Bảo mật và phân quyền đa vai trò (RBAC):** Hệ thống phục vụ nhiều nhóm người dùng (`Khách vãng lai`, `Hội viên`, `PT`, `Lễ tân`, `Quản trị viên`). *Hướng xử lý:* Băm mật khẩu bằng `bcrypt`, xác thực bằng `JWT` (Access/Refresh Token), kiểm tra quyền chặt chẽ ở tầng Middleware trên Backend và truyền tải dữ liệu qua HTTPS.

### 1.2.3 Thách thức về thời gian thực hiện

Luận văn do một sinh viên thực hiện trong khoảng 3 đến 4 tháng với phạm vi bao gồm cả Landing Page công khai và hệ thống quản trị nội bộ. Do đó, cần lập kế hoạch phân chia giai đoạn hợp lý: ưu tiên hoàn thiện thiết kế CSDL MySQL và các luồng nghiệp vụ lõi (Hội viên, Gói tập, Check-in QR, Đặt lịch PT, Thanh toán) trước, sau đó hoàn thiện Landing Page và các biểu đồ báo cáo, đồng thời đưa các tính năng phần cứng chuyên sâu vào phần hướng phát triển.

---

## 1.3 NỘI DUNG, PHẠM VI THỰC HIỆN

### 1.3.1 Nội dung thực hiện

Luận văn tập trung nghiên cứu và xây dựng hệ thống gồm các phân hệ chính sau:

1. **Landing Page cho khách vãng lai (Public Portal):** Giới thiệu phòng tập, hiển thị bảng giá gói tập và lịch lớp nhóm động từ CSDL, hồ sơ đội ngũ PT, công cụ tính chỉ số sức khỏe (**BMI, BMR, TDEE**) miễn phí, form đăng ký tư vấn / đặt lịch tập thử nhận mã QR và hỗ trợ đăng ký mua gói trực tuyến.
2. **Quản lý tài khoản và phân quyền (RBAC):** Đăng ký, đăng nhập, quản lý hồ sơ cá nhân cho 4 vai trò nội bộ (`Hội viên`, `PT`, `Lễ tân/Nhân viên`, `Quản trị viên`).
3. **Quản lý Khách hàng tiềm năng (CRM Lead) & Hợp đồng gói tập:** Tiếp nhận và theo dõi trạng thái khách tập thử từ Landing Page; quản lý gói tập, đăng ký mới, gia hạn, bảo lưu (freeze), chuyển nhượng và lịch sử thanh toán.
4. **Kiểm soát ra vào (Check-in QR Realtime):** Hội viên sử dụng mã QR động trên cổng cá nhân (hoặc khách tập thử dùng QR vé tập thử); lễ tân quét mã qua camera trình duyệt và nhận kết quả tức thì qua Socket.io.
5. **Quản lý đặt lịch PT 1-1 & Lớp tập nhóm:** Hội viên đặt/hủy lịch với PT hoặc đăng ký lớp nhóm; hệ thống kiểm tra trùng lịch, tự động trừ buổi khi hoàn thành và tính hoa hồng cho PT.
6. **Theo dõi chỉ số cơ thể & Gợi ý lộ trình cơ bản:** Lưu lịch sử cân nặng, chiều cao, tỷ lệ mỡ, BMI/BMR/TDEE theo thời gian; gợi ý mức calo mục tiêu và lộ trình tập luyện phù hợp theo thể trạng.
7. **Thanh toán trực tuyến (Sandbox) & Báo cáo thống kê (BI Dashboard):** Tích hợp thanh toán QR/VNPay môi trường thử nghiệm; thống kê doanh thu, tỷ lệ chuyển đổi Lead, khung giờ cao điểm và hiệu suất PT.

### 1.3.2 Đối tượng sử dụng

| Đối tượng | Mô tả |
| :--- | :--- |
| **Khách vãng lai (Guest)** | Người chưa đăng nhập; xem thông tin phòng tập, bảng giá, đội ngũ PT, tính BMI/TDEE, đặt lịch tập thử hoặc đăng ký mua gói. |
| **Hội viên (Member)** | Sử dụng cổng cá nhân để lấy mã QR check-in, xem hạn gói tập, đặt lịch tập với PT/lớp nhóm, theo dõi chỉ số cơ thể và lộ trình tập. |
| **Huấn luyện viên (PT)** | Quản lý lịch rảnh và lịch dạy 1-1, xác nhận hoàn thành buổi tập, cập nhật chỉ số InBody cho học viên và theo dõi bảng hoa hồng. |
| **Lễ tân / Nhân viên (Staff)** | Quản lý danh sách Lead từ Landing Page, hỗ trợ đăng ký/gia hạn/bảo lưu gói tập tại quầy, vận hành màn hình check-in QR. |
| **Quản trị viên (Admin)** | Quản lý toàn bộ hệ thống: nhân sự, gói tập, khuyến mãi, cấu hình quy định, xem báo cáo doanh thu và phân tích vận hành. |

### 1.3.3 Phân chia chức năng theo vai trò

| Nhóm chức năng | Khách vãng lai | Hội viên | PT | Lễ tân | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Xem Landing Page, Bảng giá, Lịch lớp, PT | Có | Có | Có | Có | Có |
| Tính BMI/BMR/TDEE & Đặt lịch tập thử | Có | Có | - | - | - |
| Quét QR Check-in (Cổng cá nhân) | Vé tập thử | Có | - | Quét & Duyệt | Xem log |
| Đặt / Hủy lịch tập PT & Lớp nhóm | - | Có | Xác nhận/Dạy | Hỗ trợ | Quản lý |
| Quản lý Lead (Khách tập thử) & Hợp đồng | - | Xem của mình | - | Đầy đủ | Đầy đủ |
| Theo dõi chỉ số cơ thể & Lộ trình tập | - | Xem | Cập nhật | - | Xem |
| Thanh toán trực tuyến / Ghi nhận thu tiền | Mua gói mới | Gia hạn/Mua | - | Thu tại quầy | Đầy đủ |
| Cấu hình gói tập, Nhân sự, Báo cáo BI | - | - | Xem hoa hồng | Cơ bản | Đầy đủ |

### 1.3.4 Phạm vi và giới hạn

- Hệ thống được xây dựng dưới dạng **ứng dụng Web (Responsive)**, hoạt động tốt trên trình duyệt máy tính và điện thoại di động; không xây dựng ứng dụng di động riêng (Native App).
- Việc check-in được thực hiện bằng **mã QR qua camera trình duyệt** tại quầy lễ tân, chưa tích hợp trực tiếp với thiết bị phần cứng cửa từ (Turnstile) hoặc máy nhận diện khuôn mặt vật lý.
- Chức năng thanh toán trực tuyến triển khai ở **môi trường thử nghiệm (Sandbox)**, chưa thực hiện giao dịch tiền thật.
- Phần gợi ý lộ trình tập luyện dựa trên công thức khoa học (Mifflin-St Jeor, TDEE) và bộ quy tắc theo mục tiêu thể trạng, không thay thế tư vấn y khoa chuyên sâu.

---

## 1.4 KẾT QUẢ CẦN ĐẠT

| STT | Kết quả cần đạt | Loại | Tiêu chí đánh giá |
| :---: | :--- | :---: | :--- |
| 1 | Landing Page & Phễu chuyển đổi khách vãng lai | Chức năng | Hiển thị đúng gói tập, PT, lịch lớp từ MySQL; tính đúng BMI/BMR/TDEE; đặt lịch tập thử sinh được QR và ghi nhận vào bảng Lead của Lễ tân. |
| 2 | Quản lý tài khoản và phân quyền RBAC | Chức năng | Phân quyền chính xác cho 5 nhóm đối tượng; người dùng không thể truy cập API hoặc giao diện ngoài phạm vi vai trò. |
| 3 | Quản lý Hợp đồng, Bảo lưu & Chuyển nhượng | Chức năng | Tạo, gia hạn, bảo lưu (cộng bù đúng số ngày) và chuyển nhượng gói tập chính xác; dữ liệu giao dịch nhất quán trong MySQL. |
| 4 | Kiểm soát Check-in bằng QR động Realtime | Chức năng | Mã QR tự làm mới; quét hợp lệ khi gói còn hạn, từ chối đúng lý do khi hết hạn/đang bảo lưu; màn hình Lễ tân cập nhật dưới 1 giây qua Socket.io. |
| 5 | Đặt lịch PT 1-1 & Lớp nhóm không trùng lịch | Chức năng | Chặn được 100% trường hợp đặt trùng giờ PT hoặc vượt sĩ số lớp (kể cả khi gửi request đồng thời); trừ đúng số buổi khi hoàn thành. |
| 6 | Thanh toán trực tuyến (Sandbox) & Webhook | Chức năng | Thanh toán thành công trên môi trường thử nghiệm tự động cập nhật trạng thái hóa đơn và kích hoạt gói tập cho hội viên. |
| 7 | Theo dõi chỉ số cơ thể & Báo cáo thống kê | Chức năng | Biểu đồ cân nặng/BMI và báo cáo doanh thu, tỷ lệ chuyển đổi Lead, hoa hồng PT hiển thị khớp với dữ liệu thực tế trong CSDL. |
| 8 | Hiệu năng & Độ ổn định | Phi chức năng | Thời gian phản hồi các API thông thường dưới 500ms; tải trang dưới 3 giây; các thao tác ghi dữ liệu quan trọng bọc trong Transaction. |
| 9 | Bảo mật hệ thống | Phi chức năng | Mật khẩu được băm (bcrypt); chống SQL Injection (qua Prisma ORM) và truy cập trái phép API; xác thực JWT hợp lệ. |
| 10 | Tính khả dụng & Giao diện | Phi chức năng | Giao diện nhất quán, tương thích tốt trên màn hình máy tính và điện thoại; quy trình check-in hoặc đặt lịch hoàn thành trong ≤ 3 bước chính. |

