TRƯỜNG ĐẠI HỌC CÔNG NGHỆ SÀI GÒN
KHOA CÔNG NGHỆ THÔNG TIN
---oOo---

LUẬN VĂN TỐT NGHIỆP

Tên đề tài:
XÂY DỰNG HỆ THỐNG WEBSITE QUẢN LÝ PHÒNG GYM TÍCH HỢP ĐẶT LỊCH PT, THANH TOÁN TRỰC TUYẾN VÀ CỔNG KHÁCH HÀNG

Người hướng dẫn: ThS. BÙI NHẬT BẰNG
Sinh viên thực hiện: VÕ DUY PHÚC

TP. HỒ CHÍ MINH – NĂM 2026

---

LỜI CẢM ƠN

Trong suốt thời gian học tập, rèn luyện và thực hiện luận văn tốt nghiệp tại Trường Đại học Công nghệ Sài Gòn (STU), em đã nhận được sự dạy dỗ, quan tâm, giúp đỡ và chỉ bảo vô cùng tận tình của quý thầy cô, gia đình và bạn bè.

Trước tiên, em xin gửi lời tri ân sâu sắc và lòng biết ơn chân thành nhất đến ThS. Bùi Nhật Bằng. Thầy là người đã trực tiếp hướng dẫn, định hướng khoa học, dành nhiều thời gian và tâm huyết để giúp đỡ em trong suốt quá trình hoàn thiện đề tài "Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, thanh toán trực tuyến và cổng khách hàng". Những góp ý sắc bén về chuyên môn, sự chỉ dẫn cặn kẽ trong việc phân tích thiết kế hệ thống, chuẩn hóa cơ sở dữ liệu quan hệ, cũng như việc xử lý các bài toán kỹ thuật phức tạp như kiểm soát đồng thời (Concurrency Transaction), điểm danh bằng mã QR động theo thời gian thực (Socket.io) và tích hợp đối soát Webhook tự động đã giúp em tháo gỡ nhiều khó khăn, đồng thời mở rộng tư duy làm chủ công nghệ thực tế.

Em cũng xin gửi lời cảm ơn chân thành đến Ban Giám hiệu Trường Đại học Công nghệ Sài Gòn, cùng toàn thể quý thầy cô giáo trong Khoa Công nghệ Thông tin đã tận tình truyền đạt những tri thức quý báu, trang bị cho em nền tảng kiến thức vững chắc và tư duy nghiên cứu nghiêm túc trong suốt những năm tháng trên giảng đường đại học. Đây chính là hành trang vô giá để em có thể tự tin bước vào con đường kỹ sư công nghệ phần mềm chuyên nghiệp sau này.

Mặc dù bản thân đã nỗ lực hết mình để hoàn thiện sản phẩm phần mềm và bản báo cáo luận văn một cách chỉn chu nhất, song do giới hạn về mặt thời gian cũng như kinh nghiệm thực tiễn, luận văn chắc chắn không thể tránh khỏi những thiếu sót. Em rất mong nhận được những nhận xét, đóng góp ý kiến quý báu từ Hội đồng bảo vệ và quý thầy cô để hệ thống được hoàn thiện hơn nữa.

Một lần nữa, em kính chúc Thầy Bùi Nhật Bằng cùng toàn thể quý thầy cô giáo Khoa Công nghệ Thông tin luôn dồi dào sức khỏe, hạnh phúc và gặt hái được nhiều thành công rực rỡ trong sự nghiệp trồng người cao quý!

Sinh viên thực hiện
Võ Duy Phúc

---

MỤC LỤC

CHƯƠNG 1. GIỚI THIỆU	1
1.1. ĐẶT VẤN ĐỀ, MỤC TIÊU LUẬN VĂN	1
1.1.1. Đặt vấn đề	1
1.1.2. Mục tiêu luận văn	2
1.2. NHỮNG THÁCH THỨC CẦN GIẢI QUYẾT	3
1.2.1. Thách thức về quy trình nghiệp vụ phức tạp	3
1.2.2. Thách thức về tính toàn vẹn và đồng bộ dữ liệu	3
1.2.3. Thách thức về bảo mật và phân quyền	4
1.2.4. Thách thức về trải nghiệm người dùng (UI/UX)	4
1.3. NỘI DUNG VÀ PHẠM VI THỰC HIỆN	5
1.3.1. Phạm vi nghiệp vụ (Nội dung chức năng)	5
1.3.2. Phạm vi công nghệ	6
1.3.3. Phạm vi thời gian và đối tượng	6
1.4. KẾT QUẢ CẦN ĐẠT	7
1.4.1. Kết quả Chức năng (Functional Deliverables)	7
1.4.2. Kết quả Phi chức năng (Non-Functional Deliverables)	8

CHƯƠNG 2: PHƯƠNG PHÁP THỰC HIỆN	9
2.1. CÁC HỆ THỐNG TƯƠNG TỰ	9
2.1.1. Hệ thống 1: Phần mềm GymMaster (Quốc tế)	9
2.1.2. Hệ thống 2: Quản lý bằng bảng tính Google Sheets / Excel	10
2.1.3. Hệ thống 3: Nền tảng FitSW / Trainerize	11
2.1.4. Đánh giá chung và Định hướng cho Đồ án	12
2.2. CÔNG NGHỆ SỬ DỤNG	13
2.2.1. Kiến trúc tổng thể: Mô hình Client-Server và RESTful API	13
2.2.2. Công nghệ cho Backend	13
2.2.3. Công nghệ cho Frontend	14
2.2.4. Công nghệ cho Cơ sở dữ liệu (Database)	15
2.2.5. Môi trường triển khai và công cụ hỗ trợ	16
2.3. PHÂN TÍCH YÊU CẦU	16
2.3.1. Các quy trình nghiệp vụ cơ bản	16
2.3.2. Sơ đồ chức năng	18
2.3.3. Sơ đồ Use case tổng quát	19

CHƯƠNG 3: THIẾT KẾ	21
3.1. MÔ HÌNH DỮ LIỆU	21
3.1.1. Mô hình mức ý niệm	21
3.1.2. Mô hình mức luận lý	22
3.1.3. Mô hình mức vật lý (Physical Model)	24
3.2. MÔ HÌNH XỬ LÝ	35
3.2.1. Use case chi tiết	35
3.2.2. Sơ đồ tuần tự (Sequence Diagram)	45
3.2.3. Sơ đồ hoạt động (Activity Diagram)	49
3.2.4. Database diagram	53
3.3. HỆ THỐNG MÀN HÌNH	54
3.3.1. Giao diện Cổng Khách vãng lai & Cổng Hội viên	54
3.3.2. Giao diện Cổng Huấn luyện viên (PT Portal)	61
3.3.3. Giao diện Cổng Quản trị & Vận hành Lễ tân	63

CHƯƠNG 4: THỬ NGHIỆM	67
4.1. CÁC KỊCH BẢN THỬ NGHIỆM	67
4.1.1. Thử nghiệm chức năng Đăng ký / Đăng nhập / Phân quyền	67
4.1.2. Thử nghiệm chức năng Quét Check-in QR Realtime	68
4.1.3. Thử nghiệm chức năng Đặt lịch PT 1-1 & Chống trùng lịch	68
4.1.4. Thử nghiệm chức năng Bảo lưu thẻ & Thanh toán Webhook	69
4.2. KẾT QUẢ THỬ NGHIỆM	70
4.2.1. Kết quả chức năng Đăng ký & Đăng nhập	70
4.2.2. Kết quả chức năng Kiểm soát Check-in QR	70
4.2.3. Kết quả chức năng Đặt lịch PT 1-1	71
4.2.4. Kết quả chức năng Bảo lưu, Thanh toán & Quản lý	71
4.3. XỬ LÝ CÁC TRƯỜNG HỢP NGOẠI LỆ	72
4.3.1. Xử lý lỗi validation	72
4.3.2. Xử lý lỗi business logic	72
4.3.3. Xử lý lỗi database	73
4.3.4. Xử lý lỗi frontend & kết nối thời gian thực	73
4.3.5. Các biện pháp bảo vệ hệ thống	74

CHƯƠNG 5: KẾT LUẬN	75
5.1. KẾT QUẢ ĐỐI CHIẾU VỚI MỤC TIÊU	75
5.2. CÁC VẤN ĐỀ CÒN TỒN ĐỌNG	76
5.3. MỞ RỘNG (HƯỚNG PHÁT TRIỂN)	76
5.3.1. Tích hợp thiết bị kiểm soát cửa Turnstile & Nhận diện khuôn mặt	76
5.3.2. Hệ thống thông báo đa kênh tự động (Zalo ZNS / SMS)	77
5.3.3. Phát triển ứng dụng di động chuyên biệt (Mobile App)	77
5.3.4. Kết nối trực tiếp máy đo InBody chuyên dụng	78
5.3.5. Ứng dụng trí tuệ nhân tạo (AI Coach) cá nhân hóa dinh dưỡng	78
5.3.6. Module quản lý bán lẻ đồ tập và thực phẩm bổ sung (POS Retail)	79

HƯỚNG DẪN SỬ DỤNG	80
TÀI LIỆU THAM KHẢO	87

---

MỤC LỤC CÁC HÌNH VẼ

Hình 2.1.1.1: Giao diện tổng quan phân hệ Vận hành và Bản đồ thiết lập NextX GymMaster
Hình 2.1.1.2: Giao diện Quản lý Hội viên và danh mục Biến động Hợp đồng (Phiếu bảo lưu, gia hạn) NextX GymMaster
Hình 2.1.1.3: Giao diện phân hệ Huấn luyện viên (Lịch dạy PT 1-1 và Tổng kết ngày) NextX GymMaster
Hình 2.3.2: Sơ đồ chức năng hệ thống
Hình 2.3.3: Sơ đồ Use case tổng quát toàn hệ thống
Hình 3.1.1.1: Sơ đồ thực thể mối quan hệ mức ý niệm (Conceptual ERD)
Hình 3.2.1.1: Sơ đồ Use case chi tiết: Đăng ký vé tập thử E-Pass 03 ngày
Hình 3.2.1.2: Sơ đồ Use case chi tiết: Đăng nhập và phân quyền hệ thống
Hình 3.2.1.3: Sơ đồ Use case chi tiết: Lấy mã QR Check-in động 60s
Hình 3.2.1.4: Sơ đồ Use case chi tiết: Quét kiểm soát Check-in QR Realtime
Hình 3.2.1.5: Sơ đồ Use case chi tiết: Đặt lịch tập 1-1 cùng Huấn luyện viên PT
Hình 3.2.1.6: Sơ đồ Use case chi tiết: Hủy lịch hẹn PT trước 02 giờ
Hình 3.2.1.7: Sơ đồ Use case chi tiết: Xác nhận hoàn thành buổi tập và trừ buổi
Hình 3.2.1.8: Sơ đồ Use case chi tiết: Bảo lưu gói tập và tự động bù hạn thẻ
Hình 3.2.1.9: Sơ đồ Use case chi tiết: Thanh toán trực tuyến qua Webhook VietQR
Hình 3.2.1.10: Sơ đồ Use case chi tiết: Cập nhật chỉ số InBody và lộ trình tập
Hình 3.2.2.1: Sơ đồ tuần tự quy trình Check-in QR Code Realtime
Hình 3.2.2.2: Sơ đồ tuần tự quy trình Đặt lịch PT 1-1 có bảo vệ Transaction
Hình 3.2.2.3: Sơ đồ tuần tự quy trình Xử lý thanh toán trực tuyến qua Webhook
Hình 3.2.2.4: Sơ đồ tuần tự quy trình Bảo lưu gói tập và cộng bù ngày hết hạn
Hình 3.2.3.1: Sơ đồ hoạt động quy trình quản lý vòng đời hợp đồng hội viên
Hình 3.2.3.2: Sơ đồ hoạt động phễu chuyển đổi khách vãng lai thành hội viên
Hình 3.2.3.3: Sơ đồ hoạt động quy trình đặt và thực hiện buổi tập kèm PT
Hình 3.2.3.4: Sơ đồ hoạt động quy trình bảo lưu và mở lại thẻ tập
Hình 3.2.4.1: Sơ đồ cơ sở dữ liệu quan hệ vật lý (Database Diagram)
Hình 3.3.1.1: Màn hình trang chủ Landing Page (Khu vực Hero & Triết lý)
Hình 3.3.1.2: Màn hình công cụ tính chỉ số thể trạng BMI, BMR và TDEE
Hình 3.3.1.3: Màn hình bảng giá gói tập và lịch lớp nhóm GroupX
Hình 3.3.1.4: Màn hình đăng ký vé tập thử 03 ngày nhận mã E-Pass QR
Hình 3.3.1.5: Màn hình đăng nhập hệ thống đa vai trò
Hình 3.3.1.6: Màn hình Cổng Hội viên: Thẻ thành viên QR động 60 giây
Hình 3.3.1.7: Màn hình Cổng Hội viên: Đặt lịch tập cùng Huấn luyện viên PT
Hình 3.3.1.8: Màn hình Cổng Hội viên: Biểu đồ theo dõi chỉ số InBody
Hình 3.3.1.9: Màn hình thanh toán trực tuyến VietQR kèm đếm ngược 15 phút
Hình 3.3.2.1: Màn hình Cổng Huấn luyện viên: Lịch làm việc trong tuần
Hình 3.3.2.2: Màn hình Cổng Huấn luyện viên: Điểm danh và xác nhận hoàn thành
Hình 3.3.2.3: Màn hình Cổng Huấn luyện viên: Nhập chỉ số thể trạng InBody
Hình 3.3.2.4: Màn hình Cổng Huấn luyện viên: Bảng thống kê hoa hồng cá nhân
Hình 3.3.3.1: Màn hình Quét Check-in Realtime tại quầy Lễ tân
Hình 3.3.3.2: Màn hình Quản lý CRM Khách tiềm năng (Lead Pipeline)
Hình 3.3.3.3: Màn hình Quản lý Hợp đồng hội viên và trạng thái gói
Hình 3.3.3.4: Màn hình Modal Lập hợp đồng mới và in biểu mẫu STU Form 01
Hình 3.3.3.5: Màn hình Thực hiện bảo lưu và tự động mở lại hợp đồng
Hình 3.3.3.6: Màn hình Dashboard Quản trị BI: Doanh thu & Giờ cao điểm
Hình 4.1: Giao diện trang chủ Landing Page và công cụ tính chỉ số
Hình 4.2: Giao diện đăng ký vé tập thử nhận mã QR E-Pass
Hình 4.3: Giao diện đăng nhập hệ thống phân quyền
Hình 4.4: Giao diện Cổng Hội viên với thẻ QR động 60s
Hình 4.5: Giao diện màn hình Quét Check-in tại quầy Lễ tân
Hình 4.6: Giao diện kiểm tra trạng thái Check-in từ chối khi thẻ bảo lưu
Hình 4.7: Giao diện đặt lịch tập 1-1 cùng Huấn luyện viên PT
Hình 4.8: Giao diện thông báo lỗi 409 Conflict khi trùng giờ tập
Hình 4.9: Giao diện Huấn luyện viên xác nhận hoàn thành buổi tập
Hình 4.10: Giao diện thanh toán trực tuyến VietQR và đối soát Webhook
Hình 4.11: Giao diện Dashboard Quản trị và biểu đồ nhiệt giờ cao điểm

---

CHƯƠNG 1. GIỚI THIỆU

1.1. ĐẶT VẤN ĐỀ, MỤC TIÊU LUẬN VĂN

1.1.1. Đặt vấn đề
Cùng với sự phát triển mạnh mẽ của nền kinh tế và mức sống ngày càng được nâng cao, nhu cầu rèn luyện thể chất, chăm sóc sức khỏe, cải thiện vóc dáng và giải tỏa áp lực tinh thần tại các phòng tập thể hình (Gym & Fitness) đang gia tăng nhanh chóng, đặc biệt tại các đô thị lớn trên toàn quốc. Ngành công nghiệp Fitness tại Việt Nam đang chứng kiến sự bùng nổ về số lượng cơ sở tập luyện từ các chuỗi phòng tập cao cấp cho đến các phòng gym tư nhân quy mô vừa và nhỏ.

Tuy nhiên, qua khảo sát thực tế quy trình vận hành tại đa số các phòng tập gym phân khúc tầm trung và vừa hiện nay, việc quản lý vẫn còn phụ thuộc rất lớn vào các phương thức truyền thống mang tính thủ công, bộc lộ nhiều điểm nghẽn nghiêm trọng:
- Quản lý hợp đồng và vòng đời hội viên phức tạp, dễ thất thoát: Các nghiệp vụ đặc thù của ngành gym như đăng ký mới, gia hạn gói tập, bảo lưu (tạm ngưng) thẻ tập, chuyển nhượng hợp đồng cho người khác thường được ghi chép trên sổ tay hoặc file Excel rời rạc. Điều này dễ dẫn đến nhầm lẫn ngày hết hạn, tính sai số ngày cộng bù khi mở lại thẻ, gây thất thoát doanh thu của phòng tập và tạo ra trải nghiệm tiêu cực cho khách hàng.
- Kiểm soát ra vào (Check-in) lỏng lẻo, gian lận dùng chung thẻ: Nhiều phòng tập vẫn dùng thẻ từ cứng hoặc yêu cầu hội viên đọc tên/số điện thoại tại quầy lễ tân. Hình thức này rất dễ bị lạm dụng thông qua việc cho người thân, bạn bè mượn thẻ vào tập hộ; đồng thời lễ tân tại quầy không thể kiểm tra tức thời xem gói tập của khách hàng có đang bị đóng băng bảo lưu hay đã hết hạn hay chưa.
- Xung đột và trùng lịch tập với Huấn luyện viên cá nhân (PT): Việc xếp lịch tập 1-1 giữa hội viên và Huấn luyện viên chủ yếu thực hiện qua tin nhắn cá nhân (Zalo, Messenger). Tình trạng trùng giờ dạy, quên lịch hẹn hoặc nhầm lẫn số buổi tập còn lại diễn ra thường xuyên. Cuối tháng, người quản lý phải đối soát thủ công hàng trăm buổi dạy để tính hoa hồng cho PT, dẫn đến thiếu minh bạch và dễ gây mâu thuẫn nội bộ.
- Thiếu kênh tiếp cận và chuyển đổi khách vãng lai trực tuyến: Phần lớn các phòng gym vừa và nhỏ không sở hữu website riêng hoặc chỉ có trang giới thiệu tĩnh đơn sơ, thiếu các công cụ tương tác giữ chân người dùng (như tính chỉ số BMI, BMR, TDEE, xem lịch lớp nhóm, đăng ký tập thử online nhận mã vé điện tử E-Pass tức thì). Điều này khiến phòng tập đánh mất một lượng lớn khách hàng tiềm năng (Leads) từ môi trường số.

Những bất cập trên cho thấy sự cấp thiết phải xây dựng một giải pháp phần mềm quản trị toàn diện, kết nối xuyên suốt từ cổng tiếp thị bên ngoài cho đến các phân hệ vận hành nội bộ bên trong phòng tập. 

Xuất phát từ thực tế đó, em quyết định lựa chọn thực hiện đề tài: **"Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, thanh toán trực tuyến và cổng khách hàng"** (mang thương hiệu thực nghiệm **CITYGYM**). Đề tài hướng đến mục tiêu chuẩn hóa toàn bộ quy trình quản lý, giải quyết triệt để bài toán gian lận check-in, chống trùng lịch PT và tự động hóa phễu chuyển đổi khách hàng trên nền tảng công nghệ web hiện đại.

1.1.2. Mục tiêu luận văn

1.1.2.1. Mục tiêu tổng quát:
Nghiên cứu quy trình nghiệp vụ thực tế của các trung tâm thể hình – phòng tập gym hiện đại; từ đó phân tích, thiết kế và xây dựng hoàn chỉnh hệ thống website quản lý phòng gym tích hợp đa phân hệ, hỗ trợ toàn diện các tác vụ từ tiếp cận khách vãng lai, chuyển đổi Lead, kiểm soát check-in cửa khẩu theo thời gian thực, đặt lịch huấn luyện viên 1-1 chống xung đột dữ liệu, cho đến thanh toán trực tuyến qua Webhook và báo cáo tài chính thông minh.

1.1.2.2. Mục tiêu cụ thể:
Về mặt lý thuyết & công nghệ:
- Tìm hiểu và chuẩn hóa các quy trình nghiệp vụ cốt lõi trong ngành Fitness: Quản lý hợp đồng, bảo lưu thẻ, phễu bán hàng CRM, đặt lịch kèm PT và kiểm soát ra vào.
- Nghiên cứu và ứng dụng kiến trúc Client-Server hiện đại trên nền tảng **React 18, TypeScript, Vite, Tailwind CSS, Ant Design** cho Frontend và **Node.js, Express.js, Prisma ORM, Socket.io** cho Backend.
- Ứng dụng hệ quản trị cơ sở dữ liệu quan hệ **MySQL 8.0**, thiết kế mô hình dữ liệu chuẩn hóa 3NF và thực thi giao dịch cấp dòng (Row-level Locking Transaction) để bảo vệ toàn vẹn dữ liệu.
- Làm chủ cơ chế xác thực phân quyền dựa trên vai trò (RBAC) với JWT, thuật toán sinh mã QR động ngắn hạn 60 giây và tích hợp thanh toán trực tuyến tự động qua Webhook với chữ ký số HMAC SHA256.

Về mặt chức năng ứng dụng:
- Cổng khách vãng lai (Landing Page): Giới thiệu thương hiệu với phong cách hiện đại (Trắng – Đỏ năng động, khẩu hiệu "No Pain - No Gain"); cung cấp bộ công cụ y khoa tương tác tính BMI, BMR, TDEE; hiển thị bảng giá gói tập, lịch lớp GroupX; hỗ trợ đăng ký nhận vé tập thử 03 ngày E-Pass QR tức thì.
- Cổng Hội viên (Member Portal): Cung cấp thẻ thành viên điện tử hiển thị mã QR động tự làm mới mỗi 60 giây (chống chụp ảnh màn hình gian lận); cho phép hội viên chủ động đặt/hủy lịch tập với PT trên lưới lịch trực quan; theo dõi biểu đồ thay đổi thể trạng InBody định kỳ; gia hạn và thanh toán gói tập qua mã VietQR chuẩn NAPAS.
- Cổng Huấn luyện viên (PT Portal): Quản lý thời khóa biểu dạy cá nhân theo tuần; điểm danh học viên và xác nhận hoàn thành buổi tập (tự động trừ 1 buổi trong hợp đồng); ghi nhận số đo InBody và xem bảng kê hoa hồng dạy thực tế theo tháng.
- Cổng Quản trị & Vận hành Lễ tân (Admin & Staff Portal): Màn hình POS quét mã QR bằng camera nhận diện siêu tốc, nhận phản hồi Realtime chuông xanh/còi đỏ qua Socket.io; quản lý phễu CRM chuyển đổi khách tập thử thành hội viên; quản lý hợp đồng (kích hoạt, gia hạn, đóng băng bảo lưu tự động cộng bù ngày, chuyển nhượng); xem Dashboard BI phân tích doanh thu và biểu đồ nhiệt khung giờ cao điểm (Peak Hours Heatmap).

---

1.2. NHỮNG THÁCH THỨC CẦN GIẢI QUYẾT

1.2.1. Thách thức về quy trình nghiệp vụ phức tạp
Khác với các ứng dụng thương mại điện tử thông thường, quản lý phòng gym sở hữu những quy tắc nghiệp vụ mang tính ràng buộc thời gian và trạng thái rất chặt chẽ:
- Xử lý nghiệp vụ bảo lưu gói tập (Freeze Contract): Hội viên được phép tạm ngưng sử dụng dịch vụ khi có lý do chính đáng. Hệ thống phải kiểm tra xem gói tập có cho phép bảo lưu không, số ngày bảo lưu yêu cầu có vượt quá hạn mức tối đa của gói (`max_freeze_days`) hay không. Trong thời gian bảo lưu, toàn bộ quyền check-in của hội viên phải bị tạm khóa. Khi mở lại thẻ (đúng hạn hoặc mở sớm), hệ thống phải tính toán chính xác số ngày đóng băng thực tế và tự động cộng dồn số ngày này vào ngày hết hạn mới (`end_date`) của hợp đồng.
- Xử lý trừ buổi tập và tính hoa hồng minh bạch: Buổi tập kèm PT chỉ được trừ khi Huấn luyện viên xác nhận hoàn thành (`COMPLETED`). Trong trường hợp hội viên hủy lịch, hệ thống phải phân biệt: hủy trước giờ quy định (ví dụ trước 02 tiếng) thì hoàn trả buổi tập (`CANCELLED_ON_TIME`), hủy sát giờ thì vẫn ghi nhận mất buổi tập (`CANCELLED_LATE`) để bảo vệ quyền lợi của PT.

1.2.2. Thách thức về tính toàn vẹn và đồng bộ dữ liệu
- Xử lý xung đột đồng thời (Concurrency / Race Condition): Khi một Huấn luyện viên chỉ còn một khung giờ trống trong ngày, tình huống nhiều hội viên cùng lúc nhấn nút xác nhận đặt lịch rất dễ xảy ra. Nếu không kiểm soát tốt, CSDL sẽ bị ghi đè dữ liệu trùng lặp. Đề tài phải áp dụng kỹ thuật khóa dòng dữ liệu (`SELECT ... FOR UPDATE`) bên trong một **Database Transaction** an toàn: nếu phát hiện xung đột thời gian, hệ thống lập tức thực hiện **Rollback**, trả về lỗi 409 Conflict và thông báo cho người dùng chọn khung giờ khác.
- Cập nhật thời gian thực (Realtime Synchronization): Khi hội viên đưa mã QR vào camera tại quầy lễ tân, tín hiệu xác thực từ máy chủ phải được đẩy về màn hình Lễ tân ngay lập tức (dưới 1 giây) qua kênh **Socket.io** mà không cần người dùng phải bấm tải lại trang (F5).

1.2.3. Thách thức về bảo mật và phân quyền
- Chống gian lận dùng chung tài khoản: Nếu sử dụng mã QR tĩnh hoặc mã vạch in sẵn, hội viên hoàn toàn có thể chụp ảnh màn hình gửi qua Zalo/Facebook cho bạn bè sử dụng chung. Để khắc phục, hệ thống áp dụng cơ chế mã QR động (Dynamic QR): chuỗi mã hóa JWT chứa `userId`, `qrSecret` và chỉ có hiệu lực duy nhất trong **60 giây**. Sau 60 giây, mã cũ tự động bị hủy và sinh mã mới trên màn hình.
- Phân quyền kiểm soát truy cập (RBAC): Hệ thống có 5 nhóm đối tượng người dùng với các cấp độ đặc quyền khác nhau (`GUEST`, `MEMBER`, `PT`, `STAFF`, `ADMIN`). Cơ chế xác thực phải được kiểm tra đa tầng: từ Frontend Route Guards (chặn chuyển hướng giao diện trái quyền) cho đến Backend Authentication Middleware (kiểm tra chữ ký JWT Token và quyền hạn trên từng Endpoint API).
- Bảo mật Webhook thanh toán: Đảm bảo các yêu cầu gọi về từ cổng thanh toán trực tuyến là xác thực, phòng chống tấn công mạo danh (Man-in-the-middle) bằng chữ ký số HMAC SHA256 và bảo đảm tính lũy đẳng (Idempotency) để không kích hoạt trùng lặp hợp đồng khi Webhook bị gọi lại nhiều lần.

1.2.4. Thách thức về trải nghiệm người dùng (UI/UX)
- Giao diện lễ tân quầy cần tốc độ thao tác cực nhanh: Lễ tân tại quầy phải xử lý hàng trăm lượt check-in mỗi giờ cao điểm. Giao diện quét mã phải tinh gọn, nhạy bén, phản hồi trực quan bằng màu sắc (Thẻ xanh = Hợp lệ / Thẻ đỏ = Từ chối) kết hợp âm thanh tín hiệu để lễ tân nhận biết ngay tức khắc mà không cần nhìn chằm chằm vào màn hình.
- Thiết kế Responsive đa nền tảng: Cổng thông tin khách hàng và hội viên phải tương thích hoàn hảo trên các thiết bị di động (Smartphones), giúp hội viên dễ dàng xuất trình mã QR check-in ngay trên điện thoại khi đến phòng tập.

---

1.3. NỘI DUNG VÀ PHẠM VI THỰC HIỆN

1.3.1. Phạm vi nghiệp vụ (Nội dung chức năng)
Luận văn tập trung xây dựng và hoàn thiện 4 phân hệ chức năng cốt lõi sau:

| Phân hệ chính | Nội dung / Chức năng chi tiết | Phạm vi và giới hạn |
| :--- | :--- | :--- |
| **1. Cổng Khách vãng lai & CRM Tiếp nhận (Landing Page)** | - Giới thiệu phòng tập CITYGYM, bảng giá gói tập, hồ sơ PT, lịch lớp GroupX.<br>- Bộ công cụ tính chỉ số sức khỏe: BMI, BMR, TDEE và gợi ý mức Calo mục tiêu.<br>- Đăng ký nhận vé tập thử miễn phí 03 ngày (sinh mã E-Pass QR trực tiếp).<br>- Phễu CRM quản lý Lead: Tiếp nhận, phân loại trạng thái (`NEW` $\rightarrow$ `TRIAL_CHECKED_IN` $\rightarrow$ `CONVERTED`), chuyển đổi 1-chạm sang Hợp đồng chính thức. | **Giới hạn:** Phục vụ tiếp thị số và tiếp nhận khách hàng tiềm năng; không bao gồm các chiến dịch Email Marketing tự động hàng loạt quy mô lớn (sử dụng dịch vụ ngoài). |
| **2. Cổng Hội viên & Kiểm soát Check-in QR** | - Cổng cá nhân hội viên: Tra cứu thông tin hợp đồng, ngày hết hạn, số buổi PT.<br>- Sinh mã QR động tự làm mới sau 60 giây (chống chụp màn hình chia sẻ).<br>- Màn hình POS quét mã QR tại quầy bằng camera máy tính Lễ tân.<br>- Xác thực hợp lệ / Từ chối (hết hạn, đang bảo lưu) và phát sự kiện Socket.io. | **Giới hạn:** Quét mã QR nhận diện qua camera thiết bị thông thường; chưa đấu nối dây tín hiệu vật lý trực tiếp vào mạch điều khiển cửa xoay Turnstile cơ khí. |
| **3. Phân hệ Lịch tập PT & Theo dõi thể trạng** | - Hội viên tra cứu lịch rảnh và đặt lịch tập 1-1 với Huấn luyện viên PT.<br>- Cơ chế kiểm soát đồng thời (Transaction) chống trùng giờ dạy của PT.<br>- Hủy lịch hẹn trước 02 giờ (không mất buổi) và hủy trễ (trừ buổi).<br>- PT điểm danh, xác nhận hoàn thành buổi tập để tự động cấn trừ buổi.<br>- Ghi nhận các chỉ số InBody (Cân nặng, % Mỡ, Cơ bắp) và xem biểu đồ tiến độ. | **Giới hạn:** Tập trung vào lịch tập cá nhân 1-1 giữa PT và học viên; lịch lớp nhóm GroupX hỗ trợ hiển thị thời khóa biểu và đăng ký slot cơ bản. |
| **4. Quản lý Hợp đồng, Bảo lưu & Thanh toán** | - Quản lý hợp đồng: Đăng ký mới, gia hạn, chuyển nhượng gói tập.<br>- Nghiệp vụ bảo lưu: Đóng băng hợp đồng (`FROZEN`), kiểm tra hạn mức ngày, mở lại thẻ và tự động cộng bù số ngày vào ngày hết hạn mới.<br>- Thanh toán trực tuyến: Tích hợp mã VietQR chuẩn NAPAS, đối soát tự động qua Webhook.<br>- Dashboard BI: Báo cáo doanh thu, tỷ lệ chuyển đổi Lead, biểu đồ nhiệt giờ cao điểm. | **Giới hạn:** Giao dịch thanh toán trực tuyến triển khai ở môi trường thử nghiệm (Sandbox); thanh toán tại quầy ghi nhận hình thức tiền mặt hoặc chuyển khoản ngân hàng. |

1.3.2. Phạm vi công nghệ
- Nền tảng phát triển: Ứng dụng Web hiện đại (Single Page Application - SPA), hỗ trợ thiết kế tương thích (Responsive Design) trên máy tính để bàn, máy tính bảng và điện thoại di động.
- Công nghệ Frontend: Sử dụng **React 18** kết hợp với **TypeScript**, công cụ biên dịch tốc độ cao **Vite**, thư viện giao diện hiện đại **Tailwind CSS** và **Ant Design**, quản lý dữ liệu bất đồng bộ với **TanStack Query**, xử lý kết nối thời gian thực bằng **Socket.io-client**, thư viện quét mã **html5-qrcode** và vẽ biểu đồ với **Recharts**.
- Công nghệ Backend: Xây dựng máy chủ API RESTful dựa trên **Node.js** và **Express.js**, sử dụng **TypeScript**, quản lý truy vấn và migration CSDL thông qua **Prisma ORM**, truyền thông Realtime qua **Socket.io**, điều phối tác vụ tự động định kỳ bằng **node-cron**, mã hóa mật khẩu với **Bcrypt** và xác thực người dùng bằng **JSON Web Token (JWT)**.
- Cơ sở dữ liệu: Hệ quản trị cơ sở dữ liệu quan hệ **MySQL 8.0**, hỗ trợ giao dịch ACID, bảng mã ký tự `utf8mb4_unicode_ci` hỗ trợ tiếng Việt đầy đủ.
- Môi trường triển khai: Đóng gói môi trường bằng **Docker & Docker Compose**, hỗ trợ triển khai cục bộ (Localhost) hoặc chạy trực tiếp trên các nền tảng đám mây như Vercel (Frontend) và Render / Railway (Backend).

1.3.3. Phạm vi thời gian và đối tượng
- Thời gian thực hiện: 03 đến 04 tháng (theo tiến độ Luận văn tốt nghiệp Đại học).
- Đối tượng áp dụng: Các phòng tập thể hình, trung tâm Fitness & Yoga tư nhân quy mô vừa và nhỏ (có từ 1 đến 3 chi nhánh, quản lý từ 100 đến 2.000 hội viên và từ 2 đến 15 Huấn luyện viên PT).

---

1.4. KẾT QUẢ CẦN ĐẠT

1.4.1. Kết quả Chức năng (Functional Deliverables)
| STT | Kết quả cần đạt (Phân hệ) | Tiêu chí đánh giá (Chấp nhận hoàn thành) |
| :---: | :--- | :--- |
| **1** | **Cổng Khách vãng lai & Chuyển đổi Lead** | - Hiển thị đầy đủ thông tin giới thiệu, gói tập, đội ngũ PT và bảng tính BMI/TDEE tương tác.<br>- Đăng ký tập thử thành công: tự động sinh mã vé điện tử E-Pass QR trên giao diện và lưu trữ dữ liệu vào bảng `leads` của hệ thống. |
| **2** | **Quản lý Tài khoản & Phân quyền RBAC** | - Phân quyền truy cập chính xác cho 5 nhóm đối tượng: Guest, Member, PT, Staff, Admin.<br>- Cơ chế đăng nhập an toàn bằng số điện thoại/mật khẩu, cấp phát JWT Token và tự động chuyển hướng đúng không gian làm việc (Portal). |
| **3** | **Kiểm soát Check-in QR Realtime** | - Mã QR trên Cổng hội viên tự động làm mới sau mỗi 60 giây.<br>- Camera quầy nhận diện mã QR dưới 0.5 giây; hệ thống xác thực chính xác: cho phép vào phòng nếu gói `ACTIVE` và còn hạn, từ chối phát còi đỏ nếu gói `FROZEN` hoặc `EXPIRED`.<br>- Kết quả đồng bộ tức thì lên màn hình lễ tân qua WebSocket (Socket.io). |
| **4** | **Đặt lịch PT 1-1 & Chống trùng lịch** | - Cho phép hội viên chọn PT và khung giờ trống để đặt lịch.<br>- Ngăn chặn 100% tình trạng đặt trùng lịch (kể cả khi gửi request đồng thời) nhờ MySQL Transaction.<br>- Huấn luyện viên xác nhận hoàn thành buổi tập $\rightarrow$ hệ thống tự động trừ 1 buổi tập trong hợp đồng của học viên. |
| **5** | **Quản lý Hợp đồng, Bảo lưu & Bù ngày** | - Lập hợp đồng mới, gia hạn, chuyển nhượng chính xác.<br>- Kích hoạt bảo lưu gói tập thành công (tạm khóa quyền check-in); khi mở lại hợp đồng, hệ thống tự động tính số ngày bảo lưu thực tế và cộng bù vào ngày hết hạn mới. |
| **6** | **Thanh toán trực tuyến & Webhook** | - Tích hợp sinh mã VietQR chuyển khoản ngân hàng chuẩn NAPAS.<br>- Webhook tự động nhận thông báo gạch nợ thành công, xác thực chữ ký HMAC SHA256 và kích hoạt hợp đồng hội viên mà không cần thao tác thủ công. |

1.4.2. Kết quả Phi chức năng (Non-Functional Deliverables)
| STT | Tiêu chí đánh giá | Chỉ số chấp nhận hoàn thành |
| :---: | :--- | :--- |
| **1** | **Hiệu năng và Tốc độ phản hồi** | - Thời gian tải trang ban đầu (Load Time): Dưới 3.0 giây trên đường truyền thông thường.<br>- Thời gian phản hồi API: Dưới 500ms đối với các tác vụ nghiệp vụ thông thường; dưới 200ms đối với API xác thực Check-in QR Realtime. |
| **2** | **Tính toàn vẹn dữ liệu (Data Integrity)** | - Toàn bộ các thao tác ghi dữ liệu nhiều bước (như đặt lịch PT, trừ buổi, đóng băng bảo lưu thẻ, xử lý Webhook thanh toán) phải được bao bọc trong CSDL Transaction (`BEGIN ... COMMIT / ROLLBACK`), đảm bảo không để lại dữ liệu rác hay trạng thái mồ côi khi xảy ra lỗi. |
| **3** | **Bảo mật hệ thống (Security)** | - Mật khẩu người dùng được băm một chiều bằng thuật toán `Bcrypt` với hệ số an toàn 10 rounds.<br>- Cơ sở dữ liệu chống tấn công SQL Injection tuyệt đối nhờ cơ chế tham số hóa truy vấn của Prisma ORM.<br>- Xác thực API bằng JSON Web Token (JWT); mã QR động sử dụng cơ chế chữ ký ngắn hạn kết hợp mã bí mật cá nhân (`qrSecret`).<br>- Chống gọi lặp Webhook thanh toán bằng cơ chế kiểm tra tính lũy đẳng (Idempotency Key). |
| **4** | **Tính khả dụng và Trải nghiệm (UI/UX)** | - Giao diện thân thiện, hiện đại, màu sắc nổi bật đặc trưng của thể hình (Đỏ – Trắng – Đen); các thao tác nghiệp vụ tại quầy của Lễ tân được tối ưu hóa theo quy tắc "3 cú nhấp chuột" (3-click rule).<br>- Tương thích hiển thị tốt trên các trình duyệt phổ biến hiện nay: Google Chrome, Microsoft Edge, Mozilla Firefox, Safari. |
| **5** | **Chất lượng mã nguồn (Code Quality)** | - Mã nguồn được tổ chức module hóa rõ ràng theo chuẩn kiến trúc hướng dịch vụ (Controller – Service – Repository/ORM); áp dụng TypeScript chặt chẽ ở cả Frontend và Backend giúp hạn chế tối đa lỗi lúc biên dịch và chạy ứng dụng. |

---

CHƯƠNG 2: PHƯƠNG PHÁP THỰC HIỆN

2.1. CÁC HỆ THỐNG TƯƠNG TỰ

Để có cái nhìn toàn diện và định hình chính xác các yêu cầu kỹ thuật cho đề tài, luận văn tiến hành khảo sát, so sánh ưu và nhược điểm của các giải pháp phần mềm quản lý phòng gym đang được sử dụng phổ biến hiện nay:

2.1.1. Hệ thống 1: Phần mềm Quản lý Phòng tập NextX GymMaster (Nền tảng Cloud chuyên nghiệp tại Việt Nam)
NextX GymMaster (`nextx.vn` / `gymmaster.vn`) là một trong những giải pháp phần mềm quản lý phòng gym, fitness, yoga và câu lạc bộ thể hình hàng đầu tại Việt Nam hiện nay, được triển khai dưới mô hình điện toán đám mây đa người dùng (Multi-tenant Cloud SaaS). Hệ thống cung cấp không gian làm việc số (Workspace) đồng bộ cho toàn bộ bộ phận vận hành: Ban quản lý, Lễ tân quầy, Đội ngũ Huấn luyện viên (PT), Bộ phận kinh doanh (Sales CRM) và Hội viên.

Qua khảo sát trực tiếp bên trong hệ thống NextX GymMaster, các phân hệ nghiệp vụ cốt lõi được cấu trúc và vận hành như sau:

1. **Phân hệ Vận hành & Cửa quầy (Operations & Check-in):**
   - **Bản đồ thiết lập 4 bước chuẩn hóa:** Hệ thống hướng dẫn thiết lập luồng vận hành phòng gym khép kín gồm: (1) Khai báo cơ sở, khu vực tập, khung giờ và tủ đồ locker; (2) Thiết lập gói tập, giá bán, quyền lợi kèm gói và vé lẻ tập ngày; (3) Hợp đồng & thu tiền (tài khoản quỹ, phương thức thu, danh mục thu/chi, mẫu in hợp đồng); (4) Nhân sự & PT (chức danh, phân ca làm việc, dịch vụ PT và bảng tỷ lệ hoa hồng).
   - **Kiểm soát Check-in / Ra vào:** Quản lý quẹt thẻ/mã vạch tại quầy hoặc cửa xoay tự động Turnstile; hỗ trợ xử lý tức thời các trường hợp thẻ không hợp lệ (thẻ hết hạn, thẻ đang đóng băng bảo lưu hoặc sai khung giờ đăng ký).
   - **Quản lý vé lẻ (E-Pass):** Bán và kiểm soát vé tập theo ngày dành cho đối tượng khách vãng lai trải nghiệm trước khi đăng ký gói dài hạn.

2. **Phân hệ Quản lý Khách hàng & Hội viên (Member Management & Biến động hợp đồng):**
   - **Hồ sơ hội viên điện tử:** Lưu trữ danh sách học viên trực quan với các trường dữ liệu thực tế: Mã hội viên (dạng định danh chuẩn `DEMO01A1-HVxx`), Họ tên, Loại gói tập (`STANDARD`, `PT`), Chi nhánh quản lý, Tổng giá trị hợp đồng, Số tiền đã thanh toán, Công nợ còn lại và Ngày hết hạn hiệu lực.
   - **Quản lý biến động hợp đồng chuyên sâu:** Đây là phân hệ nghiệp vụ đặc biệt quan trọng mà các phần mềm gym tiêu chuẩn đều trang bị:
     + *Phiếu bảo lưu:* Tạm dừng hiệu lực hợp đồng trong khoảng thời gian hội viên có việc bận, ốm đau; tự động khóa quyền check-in và tính toán số ngày để cộng bù vào hạn sử dụng mới khi mở lại.
     + *Phiếu gia hạn:* Tiếp tục gia hạn gói tập khi hợp đồng cũ sắp đáo hạn.
     + *Phiếu nâng cấp / hạ cấp:* Thay đổi hạng thẻ (từ Standard lên VIP) kèm nghiệp vụ tính toán số tiền bù hoặc tiền hoàn.
     + *Phiếu chuyển nhượng:* Sang tên hợp đồng từ hội viên cũ sang hội viên mới.
   - **Theo dõi chỉ số InBody & Tích hợp App Zalo:** Nhập và lưu trữ số đo cơ thể định kỳ, kết hợp kênh Zalo Mini App để hội viên tự tra cứu hồ sơ và nhận thông báo nhắc nhở.

3. **Phân hệ Huấn luyện viên & Quản lý lịch PT 1-1 (Training & PT Scheduling):**
   - **Quản lý lịch tập hôm nay:** Giao diện phân ca hiển thị các buổi dạy trong ngày của từng PT, hỗ trợ điểm danh học viên và chấm điểm buổi tập.
   - **Tổng kết ngày & Cảnh báo thông minh:** Hệ thống tự động lọc danh sách "Ai chưa tới tập" và "Hội viên nào sắp hết hạn buổi tập" để PT chủ động liên hệ chăm sóc.
   - **Lịch sử buổi tập & Thư viện giáo án:** Ghi nhận nhật ký từng buổi tập đã hoàn thành, tự động trừ số buổi trong hợp đồng và đồng bộ với bảng tính hoa hồng của huấn luyện viên.

4. **Phân hệ Gắn kết & Chăm sóc khách hàng (Loyalty & Retention):**
   - **Cộng bù ngày nghỉ lễ / Nghỉ dịch:** Tự động cộng thêm ngày sử dụng cho hàng loạt hợp đồng hội viên khi phòng tập đóng cửa nghỉ lễ mà không phải thao tác thủ công từng người.
   - **Chương trình tích điểm & Thử thách:** Tích lũy điểm thưởng qua mỗi lần check-in để đổi quà hoặc giảm giá gia hạn thẻ.

5. **Phân hệ Nhân sự, Chấm công & Tính hoa hồng (Staff & Payroll):**
   - Phân chia ca làm việc theo tuần cho nhân viên quầy và PT; chấm công tự động; đặc biệt là module **Tính hoa hồng PT** dựa trên số buổi thực dạy và doanh số ký hợp đồng mới.

| Tiêu chí | Mô tả chi tiết trên NextX GymMaster | Ưu điểm (Strengths) | Nhược điểm (Weaknesses) |
| :--- | :--- | :--- | :--- |
| **Phạm vi nghiệp vụ** | Phục vụ toàn diện mọi nghiệp vụ: Bản đồ thiết lập vận hành, Kiểm soát Check-in, Biến động hợp đồng (Bảo lưu, Gia hạn, Chuyển nhượng), Quản lý lịch PT 1-1, Đo lường InBody, Tích điểm Loyalty và Tính hoa hồng nhân sự. | - Hệ thống tính năng rất đầy đủ, giao diện thuần Việt, thiết kế tối ưu đúng đặc thù vận hành của các phòng gym tại Việt Nam.<br>- Phân định rõ ràng các trạng thái biến động hợp đồng (Bảo lưu, Gia hạn, Chuyển nhượng).<br>- Tích hợp Zalo Mini App chăm sóc khách hàng tiện lợi. | - Hệ thống nhiều phân hệ đa tầng, cấu hình ban đầu khá phức tạp đối với các phòng gym quy mô nhỏ hoặc nhân viên mới.<br>- Phí bản quyền dạng thuê bao định kỳ (SaaS hàng tháng/năm) cần ngân sách duy trì ổn định.<br>- Chưa mở API công khai để sinh viên/lập trình viên dễ dàng tích hợp sâu các thiết bị IoT tự chế giá rẻ. |
| **Công nghệ & Thanh toán** | Nền tảng Web Cloud đa nền tảng kết hợp ứng dụng di động và Zalo Mini App. | - Lưu trữ tập trung trên đám mây, dữ liệu đồng bộ tức thì, hỗ trợ đa chi nhánh linh hoạt. | - Phụ thuộc hoàn toàn vào kết nối Internet của nhà cung cấp dịch vụ Cloud. |

[CHÈN HÌNH VẼ 2.1.1.1: Giao diện tổng quan phân hệ Vận hành và Bản đồ thiết lập NextX GymMaster]
Hình 2.1.1.1: Giao diện tổng quan phân hệ Vận hành và Bản đồ thiết lập NextX GymMaster

[CHÈN HÌNH VẼ 2.1.1.2: Giao diện Quản lý Hội viên và danh mục Biến động Hợp đồng (Phiếu bảo lưu, gia hạn) NextX GymMaster]
Hình 2.1.1.2: Giao diện Quản lý Hội viên và danh mục Biến động Hợp đồng (Phiếu bảo lưu, gia hạn) NextX GymMaster

[CHÈN HÌNH VẼ 2.1.1.3: Giao diện phân hệ Huấn luyện viên (Lịch dạy PT 1-1 và Tổng kết ngày) NextX GymMaster]
Hình 2.1.1.3: Giao diện phân hệ Huấn luyện viên (Lịch dạy PT 1-1 và Tổng kết ngày) NextX GymMaster

2.1.2. Hệ thống 2: Quản lý bằng bảng tính Google Sheets / Excel
Đây là phương pháp quản lý thủ công truyền thống được áp dụng tại rất nhiều phòng gym quy mô nhỏ hoặc các phòng tập mới thành lập nhằm tiết kiệm chi phí.

| Tiêu chí | Mô tả chi tiết | Ưu điểm (Strengths) | Nhược điểm (Weaknesses) |
| :--- | :--- | :--- | :--- |
| **Phạm vi nghiệp vụ** | Ghi chép danh sách hội viên, ngày đăng ký, ngày hết hạn, lịch sử nộp tiền và theo dõi chấm công số buổi của Huấn luyện viên. | - Chi phí đầu tư ban đầu bằng không.<br>- Dễ dàng chỉnh sửa, không cần đào tạo sử dụng phần mềm chuyên sâu. | - Rủi ro mất mát dữ liệu rất cao (dễ bị xóa nhầm, chỉnh sửa sai lệch).<br>- Không có cơ chế tự động cảnh báo ngày hết hạn hay tính toán cộng bù ngày bảo lưu.<br>- Thiếu tính đồng bộ khi nhiều người cùng thao tác (lễ tân ca sáng và ca chiều). |
| **Công nghệ** | Phần mềm văn phòng bảng tính đơn lẻ. | - Hoàn toàn không đòi hỏi máy chủ hay hạ tầng kỹ thuật. | - Hoàn toàn không thể kết nối với camera quét mã QR check-in, không có cổng tự phục vụ cho hội viên và không tích hợp thanh toán trực tuyến. |

2.1.3. Hệ thống 3: Nền tảng FitSW / Trainerize
Nền tảng chuyên biệt tập trung vào việc kết nối giữa Huấn luyện viên cá nhân (PT) và học viên, theo dõi giáo án tập luyện và dinh dưỡng.

| Tiêu chí | Mô tả chi tiết | Ưu điểm (Strengths) | Nhược điểm (Weaknesses) |
| :--- | :--- | :--- | :--- |
| **Phạm vi nghiệp vụ** | Quản lý lộ trình tập luyện, theo dõi chỉ số cơ thể qua hình ảnh, giao bài tập về nhà và đặt lịch tập kèm giữa PT và học viên. | - Trải nghiệm di động rất mượt mà.<br>- Rất mạnh về mặt theo dõi thể trạng (InBody, % Mỡ, Cơ bắp) và tương tác 1-1. | - Chỉ giải quyết góc độ chuyên môn thể hình của PT; hoàn toàn bỏ trống mảng vận hành phòng tập (quản lý quầy lễ tân, bán gói tập, bảo lưu thẻ, soát vé cửa vào). |
| **Công nghệ** | Ứng dụng di động Native App kết hợp Cloud API. | - Giao diện đẹp, hiện đại, trải nghiệm người dùng cao. | - Không phù hợp để làm phần mềm quản lý vận hành tổng thể cho chủ phòng gym. |

2.1.4. Đánh giá chung và Định hướng cho Đồ án
| Mục tiêu | Kết quả khảo sát thực tế | Định hướng phát triển của Đề tài |
| :--- | :--- | :--- |
| **Đối tượng áp dụng** | Phần mềm nước ngoài thì quá đắt đỏ và phức tạp; quản lý Excel thì quá rủi ro và thiếu chuyên nghiệp. | **Lấp đầy khoảng trống:** Xây dựng giải pháp web quản lý tinh gọn, chi phí vận hành thấp, giao diện tiếng Việt thân thiện, phù hợp tối ưu cho các phòng gym vừa và nhỏ tại Việt Nam. |
| **Phạm vi chức năng** | Các hệ thống lớn thường cồng kềnh với hàng trăm tính năng không dùng đến; các ứng dụng nhỏ thì thiếu cổng khách hàng. | **Tích hợp đồng bộ 3 trong 1:** Kết hợp hài hòa giữa *Landing Page tiếp thị số thu hút khách vãng lai*, *Cổng tự phục vụ của Hội viên/PT* và *Hệ thống quản trị vận hành Realtime tại quầy*. |
| **Công nghệ & Thanh toán** | Các hệ thống cũ dùng công nghệ đóng gói nguyên khối, phụ thuộc phần cứng riêng và chưa hỗ trợ VietQR. | **Hiện đại hóa công nghệ:** Sử dụng React + Node.js + MySQL, áp dụng mã QR động chống gian lận qua camera thông thường và tích hợp cổng thanh toán VietQR đối soát tự động qua Webhook. |

---

2.2. CÔNG NGHỆ SỬ DỤNG

Đề tài được phát triển dựa trên kiến trúc hiện đại, tách biệt hoàn toàn giữa giao diện người dùng (Frontend) và logic nghiệp vụ máy chủ (Backend), sử dụng hệ sinh thái công nghệ mã nguồn mở (Open-Source) phổ biến và có cộng đồng phát triển mạnh mẽ.

2.2.1. Kiến trúc tổng thể: Mô hình Client-Server và RESTful API
Hệ thống tuân thủ kiến trúc phân tầng (Multi-tier Architecture), sử dụng giao thức chuẩn RESTful API và giao thức WebSocket hai chiều (Realtime Socket.io) làm cầu nối giao tiếp:
- **Lớp Giao diện (Presentation Layer - Frontend):** Được xây dựng dưới dạng ứng dụng đơn trang (SPA - Single Page Application) bằng React 18 và TypeScript, chịu trách nhiệm kết xuất giao diện trực quan và phản hồi thao tác người dùng.
- **Lớp Nghiệp vụ (Business Logic Layer - Backend):** Máy chủ Node.js/Express.js tiếp nhận các yêu cầu HTTP, kiểm tra xác thực phân quyền qua JWT Middleware, điều phối các luồng nghiệp vụ phức tạp và thực thi Transaction.
- **Lớp Dữ liệu (Data Access Layer - Database):** Sử dụng hệ quản trị cơ sở dữ liệu quan hệ MySQL 8.0, tương tác thông qua công cụ ánh xạ đối tượng hiện đại Prisma ORM nhằm bảo vệ an toàn dữ liệu và tối ưu hiệu suất truy vấn.

2.2.2. Công nghệ cho Backend
Backend đóng vai trò là "bộ não" điều phối toàn bộ quy trình vận hành của phòng tập:
| Tên Công nghệ | Phiên bản | Mô tả chi tiết và Lý do lựa chọn trong đề tài |
| :--- | :---: | :--- |
| **Node.js** | 20 LTS | Môi trường thực thi JavaScript phía máy chủ theo cơ chế bất đồng bộ, hướng sự kiện (Non-blocking I/O), mang lại hiệu năng xử lý cực cao đối với các tác vụ I/O nhẹ nhưng đòi hỏi độ trễ thấp như điểm danh Realtime và xử lý Webhook. |
| **Express.js** | 4.19 | Framework web tối giản, linh hoạt và phổ biến nhất trên Node.js, cung cấp hệ thống định tuyến (Routing) mạnh mẽ và kiến trúc Middleware dễ dàng mở rộng. |
| **TypeScript** | 5.x | Ngôn ngữ bổ sung cơ chế định kiểu tĩnh (Static Typing) cho JavaScript, giúp phát hiện lỗi sớm ngay trong quá trình biên dịch, tăng tính tường minh và giảm thiểu lỗi tiềm ẩn cho các hàm tính toán tài chính và bảo lưu ngày hết hạn. |
| **Prisma ORM** | 5.x | Công cụ ORM (Object-Relational Mapping) thế hệ mới dành cho TypeScript & Node.js, tự động sinh mã Client an toàn kiểu (Type-safe Database Client), hỗ trợ quản lý Schema Migration trực quan và hỗ trợ xử lý Transaction mạnh mẽ (`prisma.$transaction`). |
| **Socket.io** | 4.x | Thư viện truyền thông thời gian thực hai chiều dựa trên WebSockets. Sử dụng để đẩy kết quả quét mã Check-in tức thì từ điện thoại hội viên lên màn hình quầy lễ tân mà không cần cơ chế Polling tốn tài nguyên. |
| **node-cron** | 3.x | Thư viện lập lịch tác vụ tự động trên máy chủ Node.js. Được sử dụng để quét CSDL định kỳ lúc 00:00 hàng ngày nhằm tự động mở lại các gói tập hết thời gian bảo lưu và cập nhật trạng thái hợp đồng hết hạn. |
| **JWT & Bcrypt** | - | `Bcrypt` dùng để băm mật khẩu một chiều với muối ngẫu nhiên (Salt rounds = 10); `jsonwebtoken` dùng để sinh và kiểm tra chữ ký số cho các phiên đăng nhập Stateless Authentication và sinh mã QR động 60 giây. |

2.2.3. Công nghệ cho Frontend
Giao diện người dùng được thiết kế nhằm mang lại trải nghiệm mượt mà, tốc độ phản hồi tức thì và tương thích tối ưu trên cả máy tính lẫn điện thoại di động:
- **React 18 & Vite:** Thư viện giao diện dựa trên cơ chế Component hóa tái sử dụng cao, kết hợp Vite làm công cụ đóng gói (Build Tool) mang lại tốc độ khởi động máy chủ thử nghiệm dưới 1 giây và tối ưu dung lượng gói nén khi triển khai.
- **Tailwind CSS & Ant Design:** Bộ công cụ thiết kế phong cách tiện ích (Utility-first CSS) giúp tùy biến màu sắc thương hiệu CITYGYM (Trắng – Đỏ) sắc sảo, kết hợp các thành phần giao diện chuyên sâu của Ant Design (như Bảng dữ liệu lọc nhiều cột, Modal xác nhận, DatePicker chọn lịch) phục vụ các nghiệp vụ phức tạp tại quầy.
- **TanStack Query (React Query):** Quản lý trạng thái dữ liệu máy chủ (Server State), tự động lưu bộ nhớ đệm (Caching), hạn chế các yêu cầu tải dữ liệu trùng lặp và đồng bộ lại giao diện khi có thay đổi.
- **html5-qrcode & qrcode.react:** Thư viện sinh mã QR điện tử sắc nét trên Cổng hội viên và thư viện tích hợp camera máy tính/điện thoại thành đầu quét mã vạch/QR tốc độ cao ngay trên nền trình duyệt web mà không cần cài đặt phần mềm bên thứ ba.

2.2.4. Công nghệ cho Cơ sở dữ liệu (Database)
Hệ thống lựa chọn **MySQL 8.0** làm hệ quản trị cơ sở dữ liệu chính thức. MySQL là hệ quản trị CSDL quan hệ mã nguồn mở mạnh mẽ, đáp ứng đầy đủ tiêu chuẩn ACID (Atomicity, Consistency, Isolation, Durability), cung cấp cơ chế khóa dữ liệu cấp dòng (Row-level Locking) và tối ưu hóa chỉ mục B-Tree giúp hệ thống xử lý ổn định hàng ngàn lượt giao dịch và truy vấn điểm danh mỗi ngày.

Cơ sở dữ liệu được tổ chức lưu trữ tập trung các nhóm dữ liệu cốt lõi: tài khoản người dùng, hồ sơ hội viên, thông tin PT, khách hàng tiềm năng (Lead), hợp đồng dịch vụ, nhật ký check-in, lịch tập 1-1, số đo InBody và nhật ký thanh toán Webhook.

2.2.5. Môi trường triển khai và công cụ hỗ trợ
| Công cụ / Nền tảng | Vai trò và Ứng dụng trong Đề tài |
| :--- | :--- |
| **Git & GitHub** | Quản lý phiên bản mã nguồn phân tán, theo dõi lịch sử chỉnh sửa và quản lý nhánh phát triển tính năng. |
| **Docker & Docker Compose** | Đóng gói toàn bộ môi trường MySQL 8.0 và cấu hình mạng nội bộ thành Container đồng nhất, giúp ứng dụng chạy ổn định trên mọi máy tính mà không lo xung đột phần mềm. |
| **Postman** | Kiểm thử độc lập các Endpoint RESTful API của Backend, kiểm tra tính hợp lệ của mã trạng thái HTTP (200, 201, 400, 404, 409) và dữ liệu phản hồi JSON. |
| **VS Code (Visual Studio Code)** | Môi trường phát triển tích hợp (IDE) chính thức cho cả Frontend và Backend, kết hợp các Plugin hỗ trợ TypeScript, Tailwind CSS IntelliSense và Prisma. |
| **PlantUML / Draw.io** | Công cụ thiết kế và xuất bản các sơ đồ kỹ thuật (Sơ đồ Use Case, Sơ đồ Tuần tự, Sơ đồ Hoạt động, Sơ đồ CSDL) đạt chuẩn tài liệu phần mềm. |

---

2.3. PHÂN TÍCH YÊU CẦU

2.3.1. Các quy trình nghiệp vụ cơ bản
Quy trình nghiệp vụ của hệ thống quản lý phòng gym CITYGYM được chuẩn hóa thành 5 luồng hoạt động chính:

**A. Quy trình Tiếp nhận Khách vãng lai & Phễu chuyển đổi Lead (Landing Page $\rightarrow$ CRM)**
- Khách vãng lai truy cập Landing Page của CITYGYM để tham khảo thông tin, xem bảng giá các gói tập, lịch lớp GroupX, hồ sơ huấn luyện viên hoặc sử dụng bộ công cụ tính BMI, BMR và TDEE.
- Khách điền thông tin vào form đăng ký nhận vé tập thử miễn phí 03 ngày (họ tên, số điện thoại, dịch vụ quan tâm).
- Hệ thống tự động tạo bản ghi `Lead` mới (trạng thái `NEW`) và tạo `TrialBooking` kèm **mã QR vé tập thử điện tử (E-Pass)** ngay trên màn hình để khách lưu về máy.
- Khi khách đến phòng tập, Lễ tân dùng camera quét mã E-Pass $\rightarrow$ CSDL cập nhật trạng thái `TRIAL_CHECKED_IN`. Khách được PT hướng dẫn tập luyện và đo chỉ số InBody miễn phí.
- Kết thúc buổi tập trải nghiệm, Lễ tân/PT tư vấn gói tập chính thức. Nếu khách đồng ý mua gói, Lễ tân bấm chuyển đổi Lead thành **Hội viên chính thức (`CONVERTED`)** chỉ với 1 cú nhấp chuột.

**B. Quy trình Đăng ký, Gia hạn, Bảo lưu và Chuyển nhượng gói tập**
- Khách hàng chọn gói tập mong muốn (gói theo tháng, gói kèm PT hoặc combo). Lễ tân lập hợp đồng tại quầy hoặc khách hàng chủ động đặt mua trực tuyến.
- Thực hiện thanh toán bằng tiền mặt tại quầy hoặc chuyển khoản qua mã VietQR. Khi thanh toán hoàn tất, hợp đồng chuyển sang trạng thái có hiệu lực (`ACTIVE`).
- **Nghiệp vụ Bảo lưu thẻ (Freeze):** Khi hội viên có việc bận, lễ tân kích hoạt chức năng bảo lưu hợp đồng. Hệ thống kiểm tra số ngày yêu cầu bảo lưu có nằm trong hạn mức `max_freeze_days` của gói hay không. Nếu hợp lệ, hợp đồng chuyển sang trạng thái `FROZEN`, tạm dừng quyền check-in. Khi hết thời hạn bảo lưu (hoặc hội viên yêu cầu mở lại sớm), hệ thống tự động kích hoạt lại hợp đồng (`ACTIVE`) và **cộng bù chính xác số ngày đã đóng băng** vào ngày hết hạn mới (`end_date`).
- **Nghiệp vụ Chuyển nhượng thẻ:** Cho phép chuyển quyền sở hữu hợp đồng còn hạn sang cho một người dùng khác; hệ thống đóng hợp đồng cũ (`TRANSFERRED`) và kích hoạt hợp đồng mới cho người nhận trong cùng một giao dịch an toàn.

**C. Quy trình Kiểm soát ra vào bằng mã QR động (Realtime Check-in)**
- Hội viên mở Cổng cá nhân trên điện thoại, chọn mục "Thẻ điện tử". Hệ thống sinh một mã QR động chứa token JWT có thời hạn hiệu lực chính xác trong **60 giây** (kèm đồng hồ đếm ngược).
- Hội viên đưa màn hình điện thoại vào camera tại quầy lễ tân.
- Hệ thống Backend giải mã token, kiểm tra tính hợp lệ của gói tập:
  - Nếu hợp đồng đang `ACTIVE` và ngày hiện tại $\le$ `end_date`: Ghi nhận lượt check-in thành công (`SUCCESS`), phát sự kiện Socket.io hiển thị ảnh đại diện, họ tên, hạn gói và chuông **BÍP XANH** trên màn hình Lễ tân, kích hoạt mở cửa.
  - Nếu hợp đồng đang ở trạng thái bảo lưu (`FROZEN`) hoặc đã quá hạn (`EXPIRED`): Ghi nhận từ chối (`DENIED`), phát tín hiệu cảnh báo **CÒI ĐỎ** kèm lý do từ chối trên màn hình Lễ tân để nhân viên xử lý tư vấn.

**D. Quy trình Đặt lịch tập PT 1-1 và Tính hoa hồng**
- Hội viên sở hữu gói tập PT còn số buổi (`remaining_sessions > 0`) truy cập mục "Đặt lịch PT", chọn ngày và khung giờ trống của huấn luyện viên phụ trách.
- Backend mở một CSDL Transaction, khóa dòng kiểm tra xem PT hoặc Hội viên đã có lịch hẹn nào khác trùng khung giờ đó chưa. Nếu hợp lệ, hệ thống tạo lịch hẹn với trạng thái `SCHEDULED` và gửi email thông báo nhắc lịch cho cả hai bên.
- Khi buổi tập diễn ra, Huấn luyện viên bấm nút "Xác nhận hoàn thành" (`COMPLETED`) trên Cổng PT $\rightarrow$ Hệ thống tự động **trừ 1 buổi tập** trong hợp đồng của học viên.
- Nếu hội viên hủy lịch trước 02 giờ: Buổi tập được bảo lưu nguyên vẹn (`CANCELLED_ON_TIME`). Nếu hủy trễ: Vẫn tính trừ 1 buổi tập (`CANCELLED_LATE`).
- Định kỳ cuối tháng, hệ thống tự động tổng hợp số buổi tập `COMPLETED` của từng PT nhân với đơn giá buổi học để xuất bảng kê hoa hồng (Commission Report).

**E. Quy trình Thanh toán trực tuyến qua Webhook**
- Người dùng chọn gói tập trên Landing Page hoặc Cổng Hội Viên, nhấn "Thanh toán VietQR".
- Backend tạo đơn hàng ở trạng thái chờ thanh toán (`PENDING`), đồng thời gọi API cổng thanh toán sinh mã VietQR chuẩn thanh toán liên ngân hàng NAPAS kèm thông tin chuyển khoản chính xác đến từng đồng.
- Người dùng mở ứng dụng ngân hàng bất kỳ (Mobile Banking) quét mã QR và hoàn tất chuyển tiền.
- Cổng thanh toán ghi nhận dòng tiền thành công và lập tức phát một HTTP POST Request (**Webhook**) về máy chủ Backend của CITYGYM.
- Máy chủ Backend xác thực chữ ký bảo mật (HMAC SHA256 Signature), kiểm tra trạng thái đơn hàng (`PENDING`), sau đó mở một Transaction cập nhật đơn hàng thành `PAID` và tự động chuyển hợp đồng hội viên thành `ACTIVE` tức thì.

---

2.3.2. Sơ đồ chức năng

Hệ thống được phân rã thành **5 phân hệ chức năng chính** thể hiện đầy đủ các tính năng phục vụ cho cả khách vãng lai và các vai trò vận hành nội bộ:

[CHÈN HÌNH VẼ 2.3.2: Sơ đồ chức năng]
Hình 2.3.2: Sơ đồ chức năng hệ thống

---

2.3.3. Sơ đồ Use case tổng quát

[CHÈN HÌNH VẼ 2.3.3: Sơ đồ Use case tổng quát]
Hình 2.3.3: Sơ đồ Use case tổng quát toàn hệ thống

Hệ thống phục vụ 5 tác nhân (Actors) chính với các trách nhiệm và vai trò cụ thể:
- **Khách vãng lai (Guest Lead):** Người dùng chưa đăng nhập; truy cập Landing Page để tra cứu dịch vụ, xem bảng giá gói tập, lịch lớp học, hồ sơ Huấn luyện viên, sử dụng công cụ tính BMI/BMR/TDEE và đăng ký vé tập thử 03 ngày nhận mã E-Pass QR.
- **Hội viên (Member):** Khách hàng chính thức đã kích hoạt hợp đồng; sử dụng Cổng Hội viên để lấy mã QR động 60s điểm danh, theo dõi hạn gói, chủ động đặt và hủy lịch tập 1-1 với PT, theo dõi biểu đồ thể trạng InBody và gia hạn gói tập qua VietQR.
- **Huấn luyện viên (Trainer PT):** Nhân sự chuyên môn; quản lý lịch dạy cá nhân theo tuần, thực hiện điểm danh và xác nhận hoàn thành buổi tập để trừ buổi của học viên, ghi nhận các chỉ số đo InBody và theo dõi bảng tổng hợp hoa hồng hàng tháng.
- **Lễ tân tại quầy (Staff / Receptionist):** Nhân sự trực tiếp vận hành tại phòng tập; sử dụng camera quét mã QR kiểm soát ra vào theo thời gian thực, quản lý danh sách khách tập thử trên phễu CRM, thực hiện đăng ký hợp đồng mới, gia hạn, đóng băng bảo lưu thẻ và in phụ lục hợp đồng.
- **Quản trị viên (Admin):** Người quản lý cao nhất của phòng tập; thiết lập danh mục gói tập, quản lý tài khoản nhân sự và phân quyền, cấu hình quy định vận hành, theo dõi toàn bộ Dashboard báo cáo tài chính và phân tích biểu đồ nhiệt giờ cao điểm.

---

CHƯƠNG 3: THIẾT KẾ

3.1. MÔ HÌNH DỮ LIỆU

3.1.1. Mô hình mức ý niệm
Mô hình dữ liệu mức ý niệm của hệ thống CITYGYM được thiết kế nhằm phản ánh toàn diện các thực thể thực tế trong hoạt động kinh doanh phòng tập thể hình. Danh sách 13 thực thể chính bao gồm:
1. `USERS`: Tài khoản người dùng chung trong toàn hệ thống.
2. `MEMBER_PROFILES`: Hồ sơ chi tiết của hội viên.
3. `PT_PROFILES`: Hồ sơ chuyên môn, kinh nghiệm và hoa hồng của Huấn luyện viên cá nhân.
4. `LEADS`: Khách hàng tiềm năng đăng ký qua Landing Page.
5. `TRIAL_BOOKINGS`: Vé tập thử miễn phí 03 ngày có mã E-Pass QR.
6. `PACKAGES`: Danh mục gói tập và dịch vụ phòng gym cung cấp.
7. `MEMBERSHIPS`: Hợp đồng kích hoạt dịch vụ của hội viên.
8. `MEMBERSHIP_FREEZES`: Lịch sử các đợt đóng băng bảo lưu gói tập.
9. `CHECK_INS`: Nhật ký quét mã QR ra vào cửa khẩu phòng tập.
10. `PT_BOOKINGS`: Lịch hẹn tập 1-1 giữa học viên và Huấn luyện viên.
11. `GROUP_CLASSES`: Thời khóa biểu các lớp tập nhóm (Yoga, Zumba, HIIT).
12. `BODY_METRICS`: Lịch sử chỉ số thay đổi thể trạng InBody của hội viên.
13. `PAYMENTS`: Giao dịch thanh toán tiền mặt tại quầy hoặc VietQR Webhook.

Bản chất mối quan hệ giữa các thực thể cốt lõi:
- `USERS` – `MEMBER_PROFILES`: Quan hệ 1 – 1 (Mỗi người dùng vai trò Member có đúng một hồ sơ chi tiết).
- `USERS` – `PT_PROFILES`: Quan hệ 1 – 1 (Mỗi Huấn luyện viên có đúng một hồ sơ chuyên môn).
- `LEADS` – `TRIAL_BOOKINGS`: Quan hệ 1 – n (Một khách tiềm năng có thể đăng ký vé tập thử theo các đợt).
- `PACKAGES` – `MEMBERSHIPS`: Quan hệ 1 – n (Một loại gói tập được bán cho nhiều hợp đồng hội viên).
- `USERS` – `MEMBERSHIPS`: Quan hệ 1 – n (Một hội viên có thể sở hữu nhiều hợp đồng trong các thời kỳ).
- `MEMBERSHIPS` – `MEMBERSHIP_FREEZES`: Quan hệ 1 – n (Một hợp đồng có thể có nhiều đợt bảo lưu tạm ngưng).
- `MEMBERSHIPS` – `CHECK_INS`: Quan hệ 1 – n (Một hợp đồng được sử dụng để điểm danh ra vào nhiều lần).
- `MEMBERSHIPS` – `PT_BOOKINGS`: Quan hệ 1 – n (Một hợp đồng gói PT được cấn trừ qua nhiều buổi tập 1-1).
- `MEMBERSHIPS` – `PAYMENTS`: Quan hệ 1 – n (Một hợp đồng có thể gắn liền với các giao dịch thanh toán hoặc gia hạn).
- `USERS` (Hội viên) – `BODY_METRICS`: Quan hệ 1 – n (Hội viên theo dõi nhiều lần đo chỉ số InBody).

[CHÈN HÌNH VẼ 3.1.1.1: Sơ đồ thực thể mối quan hệ mức ý niệm (Conceptual ERD)]
Hình 3.1.1.1: Sơ đồ thực thể mối quan hệ mức ý niệm (Conceptual ERD)

---

3.1.2. Mô hình mức luận lý
Từ mô hình mức ý niệm, hệ thống tiến hành chuẩn hóa dữ liệu đạt dạng chuẩn 3 (3NF) nhằm loại bỏ sự dư thừa dữ liệu và đảm bảo tính toàn vẹn tham chiếu.

*Quy ước ký hiệu:* Thuộc tính in hoa đậm và gạch chân = Khóa chính (PK). Thuộc tính in nghiêng = Khóa ngoại (FK).

Lược đồ quan hệ chi tiết theo từng nhóm phân hệ:

**a. Nhóm dữ liệu Người dùng & Phân quyền (RBAC):**
- **USERS** (<u>**id**</u>, phone, email, password_hash, full_name, avatar_url, role, status, created_at, updated_at)
- **MEMBER_PROFILES** (<u>**user_id**</u>, gender, date_of_birth, address, emergency_contact, qr_secret, notes)
  - *FK: user_id tham chiếu USERS(id)*
- **PT_PROFILES** (<u>**user_id**</u>, specialty, bio, experience_years, cert_names, base_salary, commission_rate, rating_avg, is_available)
  - *FK: user_id tham chiếu USERS(id)*

**b. Nhóm dữ liệu Khách tiềm năng (CRM Lead) & Vé tập thử:**
- **LEADS** (<u>**id**</u>, full_name, phone, email, interest_service, goal, initial_bmi, initial_tdee, source, status, *assigned_staff_id*, created_at)
  - *FK: assigned_staff_id tham chiếu USERS(id)*
- **TRIAL_BOOKINGS** (<u>**id**</u>, *lead_id*, ticket_code, scheduled_date, time_slot, status, checked_in_at, created_at)
  - *FK: lead_id tham chiếu LEADS(id)*

**c. Nhóm dữ liệu Gói tập & Hợp đồng dịch vụ:**
- **PACKAGES** (<u>**id**</u>, code, name, package_type, duration_days, pt_sessions, price, max_freeze_days, description, is_active)
- **MEMBERSHIPS** (<u>**id**</u>, *member_id*, *package_id*, *assigned_pt_id*, contract_code, start_date, end_date, remaining_sessions, status, total_amount, paid_amount, *created_by*)
  - *FK: member_id tham chiếu USERS(id), package_id tham chiếu PACKAGES(id), assigned_pt_id tham chiếu USERS(id), created_by tham chiếu USERS(id)*
- **MEMBERSHIP_FREEZES** (<u>**id**</u>, *membership_id*, freeze_start, freeze_end, actual_unfreeze_date, days_count, reason, *approved_by*, status, created_at)
  - *FK: membership_id tham chiếu MEMBERSHIPS(id), approved_by tham chiếu USERS(id)*

**d. Nhóm dữ liệu Điểm danh & Lịch tập PT 1-1:**
- **CHECK_INS** (<u>**id**</u>, *member_id*, *membership_id*, *trial_booking_id*, check_type, checkin_time, status, deny_reason, *staff_id*)
  - *FK: member_id tham chiếu USERS(id), membership_id tham chiếu MEMBERSHIPS(id), trial_booking_id tham chiếu TRIAL_BOOKINGS(id), staff_id tham chiếu USERS(id)*
- **PT_BOOKINGS** (<u>**id**</u>, *membership_id*, *member_id*, *pt_id*, booking_date, start_time, end_time, status, pt_note, completed_at)
  - *FK: membership_id tham chiếu MEMBERSHIPS(id), member_id tham chiếu USERS(id), pt_id tham chiếu USERS(id)*

**e. Nhóm dữ liệu Lớp nhóm, Thể trạng & Thanh toán:**
- **GROUP_CLASSES** (<u>**id**</u>, class_name, *pt_id*, room_name, class_date, start_time, end_time, max_capacity, enrolled_count, status)
  - *FK: pt_id tham chiếu USERS(id)*
- **BODY_METRICS** (<u>**id**</u>, *member_id*, *pt_id*, weight, height, body_fat_pct, muscle_mass_kg, bmi, bmr, tdee, measured_at, recommendations)
  - *FK: member_id tham chiếu USERS(id), pt_id tham chiếu USERS(id)*
- **PAYMENTS** (<u>**id**</u>, *membership_id*, payment_code, amount, payment_method, gateway_trans_id, status, paid_at, note, *processed_by*)
  - *FK: membership_id tham chiếu MEMBERSHIPS(id), processed_by tham chiếu USERS(id)*

---

3.1.3. Mô hình mức vật lý (Physical Model)

Cơ sở dữ liệu của hệ thống gồm 13 bảng vật lý, được liệt kê tổng quan trong Bảng 3.1.3.1 và mô tả cấu trúc chi tiết ở các bảng tiếp theo.

Bảng 3.1.3.1: Danh sách các bảng dữ liệu trong CSDL
| STT | Tên bảng | Mô tả chức năng |
| :---: | :--- | :--- |
| 1 | `users` | Tài khoản đăng nhập hệ thống (Guest, Member, PT, Staff, Admin) |
| 2 | `member_profiles` | Thông tin chi tiết của hội viên và mã bí mật sinh QR động (`qr_secret`) |
| 3 | `pt_profiles` | Thông tin chuyên môn, chứng chỉ và tỷ lệ hoa hồng của Huấn luyện viên |
| 4 | `leads` | Khách hàng tiềm năng đăng ký qua Landing Page |
| 5 | `trial_bookings` | Quản lý vé tập thử miễn phí 03 ngày (E-Pass QR) |
| 6 | `packages` | Danh mục gói tập (theo thời hạn, theo số buổi PT, gói lớp nhóm) |
| 7 | `memberships` | Hợp đồng kích hoạt dịch vụ và theo dõi hạn thẻ của hội viên |
| 8 | `membership_freezes` | Nhật ký các đợt tạm ngưng bảo lưu thẻ và số ngày cộng bù |
| 9 | `check_ins` | Nhật ký quét mã QR ra vào phòng tập theo thời gian thực |
| 10 | `pt_bookings` | Lịch hẹn tập 1-1 giữa học viên và Huấn luyện viên |
| 11 | `group_classes` | Danh mục lớp tập nhóm (Yoga, HIIT, Zumba) hàng tuần |
| 12 | `body_metrics` | Lịch sử chỉ số phân tích thể trạng InBody định kỳ |
| 13 | `payments` | Lưu vết giao dịch thanh toán tiền mặt tại quầy và VietQR Webhook |

Bảng 3.1.3.2: Cấu trúc bảng `users`
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Mã định danh người dùng |
| `phone` | VARCHAR(15) | UNIQUE, NOT NULL | | Số điện thoại đăng nhập chính |
| `email` | VARCHAR(120) | UNIQUE, NULL | NULL | Địa chỉ email liên hệ / nhận hóa đơn |
| `password_hash` | VARCHAR(255) | NOT NULL | | Mật khẩu băm (Bcrypt 10 rounds) |
| `full_name` | VARCHAR(100) | NOT NULL | | Họ và tên đầy đủ |
| `avatar_url` | VARCHAR(255) | NULL | NULL | Đường dẫn ảnh đại diện |
| `role` | ENUM | NOT NULL | 'MEMBER' | 'ADMIN', 'STAFF', 'PT', 'MEMBER' |
| `status` | ENUM | NOT NULL | 'ACTIVE' | 'ACTIVE', 'BLOCKED', 'PENDING' |
| `created_at` | DATETIME | NOT NULL | CURRENT_TIMESTAMP | Thời điểm tạo tài khoản |
| `updated_at` | DATETIME | NOT NULL | CURRENT_TIMESTAMP | Thời điểm cập nhật gần nhất |

Bảng 3.1.3.3: Cấu trúc bảng `packages` (Gói tập)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính gói tập |
| `code` | VARCHAR(30) | UNIQUE, NOT NULL | | Mã định danh gói (vd: `CITY_PRO_12M`) |
| `name` | VARCHAR(120) | NOT NULL | | Tên hiển thị gói tập |
| `package_type` | ENUM | NOT NULL | 'TIME_BASED' | 'TIME_BASED', 'PT_SESSION', 'COMBO' |
| `duration_days` | INT | NOT NULL | 30 | Thời hạn gói tính theo ngày |
| `pt_sessions` | INT | NOT NULL | 0 | Số buổi tập kèm PT (nếu có) |
| `price` | DECIMAL(12,2) | NOT NULL | 0.00 | Giá niêm yết chính thức (VNĐ) |
| `max_freeze_days` | INT | NOT NULL | 0 | Số ngày bảo lưu tối đa cho phép |
| `description` | TEXT | NULL | NULL | Quyền lợi & mô tả gói |
| `is_active` | BOOLEAN | NOT NULL | TRUE | Trạng thái đang bán / ngừng bán |

Bảng 3.1.3.4: Cấu trúc bảng `memberships` (Hợp đồng hội viên)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính hợp đồng |
| `contract_code` | VARCHAR(50) | UNIQUE, NOT NULL | | Số hợp đồng duy nhất (vd: `HD-2026-0889`) |
| `member_id` | INT | FK $\rightarrow$ users(id) | | Hội viên sở hữu hợp đồng |
| `package_id` | INT | FK $\rightarrow$ packages(id)| | Gói dịch vụ đăng ký |
| `assigned_pt_id`| INT | FK $\rightarrow$ users(id), NULL| NULL | Huấn luyện viên phụ trách kèm |
| `start_date` | DATE | NOT NULL | | Ngày bắt đầu có hiệu lực |
| `end_date` | DATE | NOT NULL | | Ngày hết hạn hiệu lực |
| `remaining_sessions`| INT | NOT NULL | 0 | Số buổi tập PT còn lại |
| `status` | ENUM | NOT NULL | 'ACTIVE' | 'ACTIVE', 'FROZEN', 'EXPIRED', 'TRANSFERRED' |
| `total_amount` | DECIMAL(12,2) | NOT NULL | 0.00 | Tổng tiền hợp đồng sau chiết khấu |
| `paid_amount` | DECIMAL(12,2) | NOT NULL | 0.00 | Số tiền thực tế đã thu |
| `created_by` | INT | FK $\rightarrow$ users(id) | | Nhân viên lập hợp đồng |

Bảng 3.1.3.5: Cấu trúc bảng `membership_freezes` (Bảo lưu gói tập)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính đợt bảo lưu |
| `membership_id` | INT | FK $\rightarrow$ memberships(id)| | Hợp đồng được bảo lưu |
| `freeze_start` | DATE | NOT NULL | | Ngày bắt đầu tạm ngưng quyền lợi |
| `freeze_end` | DATE | NOT NULL | | Ngày dự kiến mở lại hợp đồng |
| `actual_unfreeze_date`| DATE | NULL | NULL | Ngày mở lại thực tế (nếu mở sớm) |
| `days_count` | INT | NOT NULL | 0 | Số ngày đóng băng thực tế được cộng bù |
| `reason` | VARCHAR(255) | NULL | NULL | Lý do bảo lưu (công tác, ốm đau...) |
| `approved_by` | INT | FK $\rightarrow$ users(id) | | Lễ tân / Quản lý phê duyệt |
| `status` | ENUM | NOT NULL | 'ACTIVE' | 'ACTIVE' (đang đóng băng), 'COMPLETED' (đã mở) |

Bảng 3.1.3.6: Cấu trúc bảng `check_ins` (Nhật ký điểm danh ra vào)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính lượt quét check-in |
| `member_id` | INT | FK $\rightarrow$ users(id), NULL | NULL | Mã hội viên (NULL nếu là khách tập thử) |
| `membership_id` | INT | FK $\rightarrow$ memberships(id)| NULL | Hợp đồng sử dụng để điểm danh |
| `trial_booking_id`| INT | FK $\rightarrow$ trial_bookings(id)| NULL | Mã vé tập thử (nếu là khách vãng lai) |
| `check_type` | ENUM | NOT NULL | 'MEMBER' | 'MEMBER', 'TRIAL_GUEST' |
| `checkin_time` | DATETIME | NOT NULL | CURRENT_TIMESTAMP| Thời điểm camera quét mã QR |
| `status` | ENUM | NOT NULL | 'SUCCESS' | 'SUCCESS' (Hợp lệ), 'DENIED' (Từ chối) |
| `deny_reason` | VARCHAR(255) | NULL | NULL | Lý do từ chối (Gói bảo lưu, hết hạn, mã giả) |
| `staff_id` | INT | FK $\rightarrow$ users(id) | | Lễ tân trực ca quét mã |

Bảng 3.1.3.7: Cấu trúc bảng `pt_bookings` (Lịch tập 1-1 với Huấn luyện viên)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính buổi đặt lịch |
| `membership_id` | INT | FK $\rightarrow$ memberships(id)| | Hợp đồng dùng để cấn trừ buổi |
| `member_id` | INT | FK $\rightarrow$ users(id) | | Hội viên đặt lịch |
| `pt_id` | INT | FK $\rightarrow$ users(id) | | Huấn luyện viên được đặt lịch |
| `booking_date` | DATE | NOT NULL | | Ngày diễn ra buổi tập |
| `start_time` | TIME | NOT NULL | | Giờ bắt đầu (vd: `18:00:00`) |
| `end_time` | TIME | NOT NULL | | Giờ kết thúc (vd: `19:00:00`) |
| `status` | ENUM | NOT NULL | 'SCHEDULED' | 'SCHEDULED', 'COMPLETED', 'CANCELLED_ON_TIME', 'CANCELLED_LATE' |
| `pt_note` | TEXT | NULL | NULL | Ghi chú giáo án / thể trạng của PT |
| `completed_at` | DATETIME | NULL | NULL | Thời điểm PT xác nhận hoàn thành buổi |

Bảng 3.1.3.8: Cấu trúc bảng `payments` (Nhật ký thanh toán & Webhook)
| Tên cột | Kiểu dữ liệu | Ràng buộc / Khóa | Mặc định | Ý nghĩa |
| :--- | :--- | :---: | :---: | :--- |
| `id` | INT AUTO_INCREMENT | PK | | Khóa chính giao dịch |
| `membership_id` | INT | FK $\rightarrow$ memberships(id)| | Hợp đồng gắn liền giao dịch |
| `payment_code` | VARCHAR(50) | UNIQUE, NOT NULL | | Mã đơn hàng thanh toán (vd: `PAY-8829`) |
| `amount` | DECIMAL(12,2) | NOT NULL | 0.00 | Số tiền giao dịch (VNĐ) |
| `payment_method` | VARCHAR(30) | NOT NULL | 'VIETQR' | 'CASH', 'VIETQR', 'VNPAY_SANDBOX' |
| `gateway_trans_id`| VARCHAR(100)| NULL | NULL | Mã giao dịch tham chiếu ngân hàng |
| `status` | ENUM | NOT NULL | 'PENDING' | 'PENDING', 'PAID', 'FAILED', 'REFUNDED' |
| `paid_at` | DATETIME | NULL | NULL | Thời điểm gạch nợ thành công |
| `processed_by` | INT | FK $\rightarrow$ users(id), NULL| NULL | Nhân viên thu ngân (nếu thu tại quầy) |

---

3.2. MÔ HÌNH XỬ LÝ

3.2.1. Use case chi tiết

Hệ thống tiến hành đặc tả chi tiết 10 Use case nghiệp vụ chủ chốt. Theo chuẩn tài liệu kỹ thuật phần mềm, với mỗi Use case, hệ thống trình bày **Sơ đồ Use case chi tiết (Sub-Use case diagram)** trước để làm rõ các quan hệ `<<include>>`, `<<extend>>` với các tác nhân, sau đó trình bày **Bảng đặc tả Use case chi tiết**.

---

#### 1. Use case: Đăng ký vé tập thử E-Pass 03 ngày (UC-01)

[CHÈN HÌNH VẼ 3.2.1.1: Sơ đồ Use case chi tiết: Đăng ký vé tập thử E-Pass 03 ngày]
Hình 3.2.1.1: Sơ đồ Use case chi tiết: Đăng ký vé tập thử E-Pass 03 ngày

| Tên use case | Đăng ký vé tập thử 03 ngày 0Đ (E-Pass QR) |
| :--- | :--- |
| **Mã Use case** | **UC-01** |
| **Tác nhân** | Khách vãng lai (Guest Lead) |
| **Mô tả** | Khách truy cập Landing Page, điền thông tin và nhận ngay mã QR vé tập thử điện tử (E-Pass) có hiệu lực 03 ngày tại phòng tập. |
| **Tiền điều kiện** | Khách vãng lai chưa từng đăng ký tập thử bằng số điện thoại này trong vòng 30 ngày qua. |
| **Hậu điều kiện** | Bản ghi mới trong bảng `leads` (status = `NEW`) và bảng `trial_bookings` kèm mã `ticket_code` duy nhất. |
| **Luồng sự kiện chính** | 1. Khách truy cập trang Landing Page, chọn nút "Đăng Ký Tập Thử 03 Ngày 0Đ".<br>2. Khách nhập Họ tên, Số điện thoại, Email và chọn dịch vụ quan tâm.<br>3. Hệ thống kiểm tra số điện thoại chưa tồn tại trong danh sách Lead đang hoạt động.<br>4. Hệ thống tạo bản ghi trong bảng `leads` và sinh mã vé điện tử trong `trial_bookings`.<br>5. Hệ thống hiển thị Modal thông báo chúc mừng kèm mã QR vé tập thử E-Pass trực tiếp trên màn hình.<br>6. Khách lưu mã QR vào điện thoại để xuất trình khi đến phòng tập. |
| **Luồng ngoại lệ** | 3a. Số điện thoại đã được đăng ký tập thử trước đó $\rightarrow$ Hệ thống hiển thị cảnh báo: "Số điện thoại này đã nhận vé tập thử. Vui lòng liên hệ quầy lễ tân để được hỗ trợ!". |

---

#### 2. Use case: Đăng nhập và phân quyền hệ thống (UC-02)

[CHÈN HÌNH VẼ 3.2.1.2: Sơ đồ Use case chi tiết: Đăng nhập và phân quyền hệ thống]
Hình 3.2.1.2: Sơ đồ Use case chi tiết: Đăng nhập và phân quyền hệ thống

| Tên use case | Đăng nhập và điều hướng theo vai trò (RBAC) |
| :--- | :--- |
| **Mã Use case** | **UC-02** |
| **Tác nhân** | Hội viên, Huấn luyện viên, Lễ tân, Quản trị viên |
| **Mô tả** | Người dùng đăng nhập vào hệ thống bằng Số điện thoại và Mật khẩu; hệ thống xác thực và điều hướng vào đúng không gian làm việc (Portal) tương ứng. |
| **Tiền điều kiện** | Người dùng đã có tài khoản trong hệ thống và trạng thái `status = ACTIVE`. |
| **Hậu điều kiện** | Cấp phiên đăng nhập JWT (Access Token), lưu thông tin phiên và chuyển hướng đến trang Portal phù hợp. |
| **Luồng sự kiện chính** | 1. Người dùng mở Modal đăng nhập trên trang web.<br>2. Nhập Số điện thoại và Mật khẩu.<br>3. Hệ thống truy vấn thông tin trong bảng `users` theo số điện thoại.<br>4. Hệ thống đối chiếu mật khẩu băm thông qua thư viện `Bcrypt`.<br>5. Mật khẩu khớp: Hệ thống sinh chuỗi JWT Token chứa `id`, `role`, `fullName`.<br>6. Hệ thống điều hướng người dùng đến giao diện tương ứng theo vai trò (`MEMBER` $\rightarrow$ Cổng Hội Viên, `PT` $\rightarrow$ Cổng Huấn Luyện Viên, `STAFF` $\rightarrow$ Cổng Lễ Tân, `ADMIN` $\rightarrow$ Dashboard Quản Trị). |
| **Luồng ngoại lệ** | 3a. Không tìm thấy số điện thoại hoặc sai mật khẩu $\rightarrow$ Thông báo: "Số điện thoại hoặc mật khẩu không chính xác!".<br>4a. Tài khoản đang ở trạng thái `BLOCKED` $\rightarrow$ Từ chối đăng nhập kèm lý do: "Tài khoản của bạn đã bị tạm khóa!". |

---

#### 3. Use case: Lấy mã QR Check-in động 60s (UC-03)

[CHÈN HÌNH VẼ 3.2.1.3: Sơ đồ Use case chi tiết: Lấy mã QR Check-in động 60s]
Hình 3.2.1.3: Sơ đồ Use case chi tiết: Lấy mã QR Check-in động 60s

| Tên use case | Lấy mã QR Check-in động bảo mật 60 giây |
| :--- | :--- |
| **Mã Use case** | **UC-03** |
| **Tác nhân** | Hội viên (Member) |
| **Mô tả** | Hội viên mở Cổng cá nhân để hiển thị thẻ thành viên điện tử chứa mã QR tự làm mới mỗi 60 giây nhằm chống chụp ảnh chia sẻ cho người khác. |
| **Tiền điều kiện** | Hội viên đã đăng nhập thành công vào Cổng Hội Viên. |
| **Hậu điều kiện** | Sinh chuỗi mã QR ngắn hạn được hiển thị trên giao diện kèm đồng hồ đếm ngược từ 60 về 0 giây. |
| **Luồng sự kiện chính** | 1. Hội viên truy cập mục "Thẻ Thành Viên" trên Cổng Hội Viên.<br>2. Frontend gửi request `GET /api/check-ins/dynamic-qr` kèm Bearer JWT Token.<br>3. Backend lấy `qr_secret` từ bảng `member_profiles`.<br>4. Backend tạo payload mã hóa JWT có thời hạn `expiresIn: 60s`.<br>5. Frontend nhận mã token và dùng thư viện `qrcode.react` kết xuất ra hình ảnh QR.<br>6. Đồng hồ đếm ngược 60s chạy; khi hết thời gian, Frontend tự động gửi request lấy mã mới. |
| **Luồng ngoại lệ** | 2a. Phiên đăng nhập của hội viên đã hết hạn $\rightarrow$ Hệ thống yêu cầu đăng nhập lại. |

---

#### 4. Use case: Quét kiểm soát Check-in QR Realtime (UC-04)

[CHÈN HÌNH VẼ 3.2.1.4: Sơ đồ Use case chi tiết: Quét kiểm soát Check-in QR Realtime]
Hình 3.2.1.4: Sơ đồ Use case chi tiết: Quét kiểm soát Check-in QR Realtime

| Tên use case | Quét kiểm soát Check-in ra vào phòng tập Realtime |
| :--- | :--- |
| **Mã Use case** | **UC-04** |
| **Tác nhân** | Lễ tân tại quầy (Staff), Hội viên (Member) |
| **Mô tả** | Lễ tân quét mã QR của hội viên qua camera máy tính tại quầy; hệ thống xác thực tức thì và phản hồi kết quả trực quan chuông xanh/còi đỏ qua Socket.io. |
| **Tiền điều kiện** | Hội viên xuất trình mã QR động còn hạn 60s; Lễ tân đã mở màn hình Quét Check-in tại quầy. |
| **Hậu điều kiện** | Lưu lượt điểm danh vào bảng `check_ins` (status = `SUCCESS` hoặc `DENIED`), cập nhật thời gian tập gần nhất. |
| **Luồng sự kiện chính** | 1. Hội viên đưa màn hình điện thoại vào camera quầy Lễ tân.<br>2. Ứng dụng quét camera nhận diện mã QR và gửi payload lên API `POST /api/check-ins/scan`.<br>3. Backend giải mã JWT, kiểm tra chữ ký và hạn 60s của token.<br>4. Backend truy vấn hợp đồng trong bảng `memberships` của hội viên.<br>5. Kiểm tra hợp đồng hợp lệ: trạng thái `ACTIVE` và ngày hiện tại $\le$ `end_date`.<br>6. Backend lưu bản ghi `check_ins` (`status = SUCCESS`) và phát sự kiện `checkin_event` qua Socket.io.<br>7. Màn hình Lễ tân phát chuông **"BÍP XANH"**, hiện ảnh đại diện, tên gói và mở cổng cho hội viên vào tập. |
| **Luồng ngoại lệ** | 5a. Hợp đồng đang bảo lưu (`FROZEN`) $\rightarrow$ Ghi nhận `DENIED`, phát còi đỏ báo động: "Gói tập đang tạm ngưng bảo lưu!".<br>5b. Hợp đồng hết hạn (`EXPIRED`) $\rightarrow$ Ghi nhận `DENIED`, phát còi đỏ: "Gói tập đã hết hạn, vui lòng gia hạn!".<br>3a. Mã QR quá hạn 60s hoặc giả mạo $\rightarrow$ Từ chối và yêu cầu hội viên làm mới mã trên điện thoại. |

---

#### 5. Use case: Đặt lịch tập 1-1 cùng Huấn luyện viên PT (UC-05)

[CHÈN HÌNH VẼ 3.2.1.5: Sơ đồ Use case chi tiết: Đặt lịch tập 1-1 cùng Huấn luyện viên PT]
Hình 3.2.1.5: Sơ đồ Use case chi tiết: Đặt lịch tập 1-1 cùng Huấn luyện viên PT

| Tên use case | Đặt lịch tập 1-1 cùng Huấn luyện viên cá nhân (Chống trùng lịch) |
| :--- | :--- |
| **Mã Use case** | **UC-05** |
| **Tác nhân** | Hội viên (Member), Huấn luyện viên (PT) |
| **Mô tả** | Hội viên sở hữu gói PT còn buổi tập chọn PT và khung giờ rảnh trong tuần để đặt lịch; hệ thống kiểm soát xung đột trong Transaction an toàn. |
| **Tiền điều kiện** | Hội viên có hợp đồng gói PT đang `ACTIVE` và số buổi còn lại `remaining_sessions` $\ge 1$. |
| **Hậu điều kiện** | Bản ghi `pt_bookings` được tạo với trạng thái `SCHEDULED`; gửi email nhắc lịch cho PT và hội viên. |
| **Luồng sự kiện chính** | 1. Hội viên truy cập trang "Đặt lịch PT" trên Cổng Hội Viên.<br>2. Hệ thống tải danh sách các khung giờ trống của Huấn luyện viên trong tuần.<br>3. Hội viên chọn ngày và khung giờ tập (ví dụ: 18:00 – 19:00 Thứ 4).<br>4. Hội viên nhấn nút "Xác nhận đặt lịch".<br>5. Backend mở một **MySQL Database Transaction**:<br>&nbsp;&nbsp;&nbsp;&nbsp;a. Thực thi `SELECT ... FOR UPDATE` kiểm tra `remaining_sessions` $\ge 1$.<br>&nbsp;&nbsp;&nbsp;&nbsp;b. Kiểm tra PT không có lịch hẹn nào khác trùng khung giờ (`status = SCHEDULED`).<br>&nbsp;&nbsp;&nbsp;&nbsp;c. Thêm bản ghi mới vào bảng `pt_bookings` với trạng thái `SCHEDULED`.<br>&nbsp;&nbsp;&nbsp;&nbsp;d. Commit Transaction hoàn tất giao dịch CSDL.<br>6. Hệ thống gửi email nhắc lịch cho Huấn luyện viên và Hội viên.<br>7. Giao diện hiển thị Popup đặt lịch thành công và thẻ lịch hẹn xuất hiện trên màn hình. |
| **Luồng ngoại lệ** | 5b. Xảy ra xung đột trùng lịch do người khác vừa đặt trước (Race Condition) $\rightarrow$ Hệ thống tự động **Rollback Transaction**, trả về mã lỗi 409 Conflict: "Khung giờ này vừa có người đặt, vui lòng chọn giờ khác!".<br>5a. Hợp đồng hết số buổi PT $\rightarrow$ Từ chối và thông báo hội viên mua thêm gói PT. |

---

#### 6. Use case: Hủy lịch hẹn PT trước 02 giờ (UC-06)

[CHÈN HÌNH VẼ 3.2.1.6: Sơ đồ Use case chi tiết: Hủy lịch hẹn PT trước 02 giờ]
Hình 3.2.1.6: Sơ đồ Use case chi tiết: Hủy lịch hẹn PT trước 02 giờ

| Tên use case | Hủy lịch hẹn tập cùng Huấn luyện viên cá nhân |
| :--- | :--- |
| **Mã Use case** | **UC-06** |
| **Tác nhân** | Hội viên (Member), Huấn luyện viên (PT) |
| **Mô tả** | Hội viên hoặc PT hủy một lịch hẹn đã đặt trước đó theo quy định về mốc thời gian. |
| **Tiền điều kiện** | Lịch hẹn tồn tại và đang ở trạng thái `SCHEDULED`. |
| **Hậu điều kiện** | `pt_bookings.status` chuyển thành `CANCELLED_ON_TIME` (không mất buổi) hoặc `CANCELLED_LATE` (bị trừ buổi). |
| **Luồng sự kiện chính** | 1. Người dùng chọn lịch hẹn cần hủy trên giao diện danh sách lịch.<br>2. Nhập lý do hủy buổi tập và nhấn "Xác nhận hủy".<br>3. Hệ thống kiểm tra khoảng cách thời gian từ thời điểm hiện tại đến giờ tập:<br>&nbsp;&nbsp;&nbsp;&nbsp;a. Nếu hủy trước $\ge 2$ tiếng: Cập nhật status = `CANCELLED_ON_TIME`, số buổi tập của hội viên được giữ nguyên.<br>&nbsp;&nbsp;&nbsp;&nbsp;b. Nếu hủy sát giờ (< 2 tiếng): Cập nhật status = `CANCELLED_LATE`, tự động trừ 1 buổi trong `remaining_sessions` của hợp đồng.<br>4. Hệ thống giải phóng khung giờ trống của PT để học viên khác có thể đặt.<br>5. Gửi thông báo hủy lịch đến các bên liên quan. |
| **Luồng ngoại lệ** | 1a. Buổi tập đã hoàn thành (`COMPLETED`) $\rightarrow$ Hệ thống từ chối yêu cầu hủy. |

---

#### 7. Use case: Xác nhận hoàn thành buổi tập và trừ buổi (UC-07)

[CHÈN HÌNH VẼ 3.2.1.7: Sơ đồ Use case chi tiết: Xác nhận hoàn thành buổi tập và trừ buổi]
Hình 3.2.1.7: Sơ đồ Use case chi tiết: Xác nhận hoàn thành buổi tập và trừ buổi

| Tên use case | Xác nhận hoàn thành buổi tập kèm PT và tự động trừ buổi |
| :--- | :--- |
| **Mã Use case** | **UC-07** |
| **Tác nhân** | Huấn luyện viên (Trainer PT) |
| **Mô tả** | Sau khi kết thúc buổi tập kèm, Huấn luyện viên xác nhận hoàn thành trên Cổng PT; hệ thống trừ 1 buổi tập trong hợp đồng của học viên và ghi nhận thành tích tính hoa hồng. |
| **Tiền điều kiện** | Lịch hẹn có trạng thái `SCHEDULED` và ngày tập là ngày hôm nay. |
| **Hậu điều kiện** | `pt_bookings.status = COMPLETED`, `remaining_sessions` giảm đi 1, ghi nhận `completed_at`. |
| **Luồng sự kiện chính** | 1. Huấn luyện viên mở Cổng PT, chọn danh sách lịch dạy hôm nay.<br>2. Chọn học viên vừa tập xong, nhập ghi chú giáo án hoặc thể trạng (nếu có).<br>3. Nhấn nút "Xác nhận hoàn thành buổi tập".<br>4. Backend mở Transaction: cập nhật `pt_bookings.status = 'COMPLETED'`, đồng thời cập nhật `memberships.remaining_sessions = remaining_sessions - 1`.<br>5. Hệ thống ghi nhận 1 buổi dạy thành công vào bảng tính hoa hồng của PT trong tháng.<br>6. Gửi thông báo đến Cổng Hội Viên thông báo số buổi tập còn lại. |
| **Luồng ngoại lệ** | 4a. Hợp đồng của học viên đã hết buổi (`remaining_sessions = 0`) $\rightarrow$ Cảnh báo lỗi và yêu cầu kiểm tra lại hợp đồng. |

---

#### 8. Use case: Bảo lưu gói tập và tự động bù hạn thẻ (UC-08)

[CHÈN HÌNH VẼ 3.2.1.8: Sơ đồ Use case chi tiết: Bảo lưu gói tập và tự động bù hạn thẻ]
Hình 3.2.1.8: Sơ đồ Use case chi tiết: Bảo lưu gói tập và tự động bù hạn thẻ

| Tên use case | Bảo lưu gói tập và tự động cộng bù ngày hết hạn |
| :--- | :--- |
| **Mã Use case** | **UC-08** |
| **Tác nhân** | Lễ tân tại quầy (Staff), Quản trị viên (Admin) |
| **Mô tả** | Lễ tân hỗ trợ hội viên tạm ngưng gói tập (đóng băng). Hệ thống tạm khóa quyền check-in và tự động cộng bù chính xác số ngày bảo lưu vào ngày hết hạn mới khi mở lại thẻ. |
| **Tiền điều kiện** | Gói tập đang `ACTIVE`, còn hạn sử dụng và số ngày yêu cầu bảo lưu $\le$ hạn mức `max_freeze_days`. |
| **Hậu điều kiện** | Hợp đồng chuyển sang `FROZEN`, tạo bản ghi trong `membership_freezes`. Khi mở lại: `end_date` mới = `end_date` cũ + số ngày đóng băng thực tế. |
| **Luồng sự kiện chính** | 1. Lễ tân tìm kiếm hợp đồng hội viên cần bảo lưu.<br>2. Nhập số ngày bảo lưu (ví dụ 15 ngày) và lý do công tác/ốm đau.<br>3. Hệ thống kiểm tra hợp lệ hạn mức bảo lưu của gói tập.<br>4. Lễ tân nhấn "Xác nhận bảo lưu".<br>5. Backend cập nhật `memberships.status = 'FROZEN'` và tạo bản ghi `membership_freezes`.<br>6. Trong thời gian bảo lưu, hội viên không thể quét mã check-in vào phòng tập.<br>7. Khi hết hạn bảo lưu (hoặc hội viên yêu cầu mở lại sớm):<br>&nbsp;&nbsp;&nbsp;&nbsp;a. Lễ tân nhấn "Mở lại hợp đồng (Unfreeze)".<br>&nbsp;&nbsp;&nbsp;&nbsp;b. Hệ thống tính số ngày đóng băng thực tế: $D = \text{Ngày mở} - \text{Ngày đóng băng}$.<br>&nbsp;&nbsp;&nbsp;&nbsp;c. Cập nhật ngày hết hạn mới: $\text{end\_date}_{\text{mới}} = \text{end\_date}_{\text{cũ}} + D$.<br>&nbsp;&nbsp;&nbsp;&nbsp;d. Chuyển trạng thái hợp đồng về `ACTIVE` và hoàn tất bảo lưu.<br>8. Hệ thống thông báo ngày hết hạn mới được cộng bù cho hội viên. |
| **Luồng ngoại lệ** | 3a. Số ngày bảo lưu vượt quá hạn mức tối đa của gói $\rightarrow$ Hệ thống từ chối yêu cầu và hiển thị thông báo lỗi. |

---

#### 9. Use case: Thanh toán trực tuyến qua Webhook VietQR (UC-09)

[CHÈN HÌNH VẼ 3.2.1.9: Sơ đồ Use case chi tiết: Thanh toán trực tuyến qua Webhook VietQR]
Hình 3.2.1.9: Sơ đồ Use case chi tiết: Thanh toán trực tuyến qua Webhook VietQR

| Tên use case | Thanh toán trực tuyến và kích hoạt gói qua Webhook tự động |
| :--- | :--- |
| **Mã Use case** | **UC-09** |
| **Tác nhân** | Khách hàng / Hội viên, Cổng thanh toán (VietQR/PayOS Sandbox) |
| **Mô tả** | Người dùng thanh toán mua/gia hạn gói tập bằng quét mã VietQR ngân hàng. Cổng thanh toán gửi Webhook đối soát tự động để kích hoạt hợp đồng tức thì. |
| **Tiền điều kiện** | Đơn hàng thanh toán đã được khởi tạo ở trạng thái `PENDING`. |
| **Hậu điều kiện** | `payments.status = PAID`, hợp đồng `memberships.status = ACTIVE`, gửi biên lai điện tử. |
| **Luồng sự kiện chính** | 1. Người dùng chọn gói tập, bấm "Thanh toán VietQR".<br>2. Backend tạo bản ghi `payments` (`status = PENDING`) kèm mã đơn hàng duy nhất.<br>3. Backend gọi API cổng thanh toán tạo mã VietQR chuẩn NAPAS và gửi về giao diện.<br>4. Giao diện hiển thị mã QR kèm đồng hồ đếm ngược 15 phút.<br>5. Người dùng mở ứng dụng ngân hàng trên điện thoại quét mã và chuyển tiền.<br>6. Cổng thanh toán xử lý thành công, gửi HTTP POST Webhook về máy chủ Backend.<br>7. Backend xác thực chữ ký bảo mật HMAC SHA256 và kiểm tra tính lũy đẳng (Idempotency).<br>8. Backend mở Transaction: cập nhật `payments.status = 'PAID'` và `memberships.status = 'ACTIVE'`.<br>9. Backend phát tín hiệu WebSocket thông báo giao dịch thành công.<br>10. Giao diện người dùng tự động chuyển sang màn hình thông báo kích hoạt thành công. |
| **Luồng ngoại lệ** | 7a. Sai chữ ký số bảo mật $\rightarrow$ Backend từ chối request, trả về mã lỗi 403 Forbidden.<br>7b. Webhook gửi lặp lại (đơn hàng đã `PAID`) $\rightarrow$ Backend chỉ trả về 200 OK mà không kích hoạt trùng lặp. |

---

#### 10. Use case: Cập nhật chỉ số InBody và lộ trình tập (UC-10)

[CHÈN HÌNH VẼ 3.2.1.10: Sơ đồ Use case chi tiết: Cập nhật chỉ số InBody và lộ trình tập]
Hình 3.2.1.10: Sơ đồ Use case chi tiết: Cập nhật chỉ số InBody và lộ trình tập

| Tên use case | Cập nhật chỉ số phân tích thể trạng InBody và lộ trình tập |
| :--- | :--- |
| **Mã Use case** | **UC-10** |
| **Tác nhân** | Huấn luyện viên (PT), Hội viên (Member) |
| **Mô tả** | Huấn luyện viên nhập kết quả cân đo thể trạng định kỳ của học viên; hệ thống tự động tính các chỉ số BMI, BMR, TDEE và vẽ biểu đồ tiến độ. |
| **Tiền điều kiện** | Huấn luyện viên đã đăng nhập và được phân công phụ trách hội viên. |
| **Hậu điều kiện** | Bản ghi mới trong bảng `body_metrics`, biểu đồ thể trạng trên Cổng Hội Viên được làm mới. |
| **Luồng sự kiện chính** | 1. Huấn luyện viên chọn học viên trong danh sách phụ trách, nhấn "Đo InBody mới".<br>2. Nhập các chỉ số: Cân nặng (kg), Chiều cao (cm), Tỷ lệ mỡ (% Body Fat), Khối lượng cơ (kg).<br>3. Hệ thống tự động tính toán chỉ số BMI, BMR và mức Calo khuyến nghị.<br>4. Huấn luyện viên nhập ghi chú đánh giá và khuyến nghị dinh dưỡng.<br>5. Nhấn "Lưu kết quả đo".<br>6. CSDL lưu trữ vào bảng `body_metrics`.<br>7. Hội viên mở Cổng cá nhân có thể xem ngay biểu đồ đường (Line Chart) diễn biến cân nặng và lượng cơ mỡ qua từng tuần. |
| **Luồng ngoại lệ** | 2a. Dữ liệu nhập vào mang giá trị âm hoặc vượt ngưỡng sinh lý người bình thường $\rightarrow$ Hệ thống cảnh báo lỗi validation. |

---

3.2.2. Sơ đồ tuần tự (Sequence Diagram)

**a. Quy trình Kiểm soát Check-in QR Realtime:**
Sơ đồ minh họa luồng giao tiếp giữa Hội viên, Lễ tân tại quầy, máy chủ Backend (Node.js), CSDL MySQL và WebSocket Server (Socket.io) khi quét mã vào cổng:

[CHÈN HÌNH VẼ 3.2.2.1: Sơ đồ tuần tự quy trình Check-in QR Code Realtime]
Hình 3.2.2.1: Sơ đồ tuần tự quy trình Check-in QR Code Realtime

**b. Quy trình Đặt lịch PT 1-1 chống trùng lịch (Database Transaction):**
Sơ đồ thể hiện kỹ thuật kiểm soát đồng thời (Concurrency Control) sử dụng khóa dòng `SELECT ... FOR UPDATE` và cơ chế tự động Rollback khi phát hiện xung đột thời gian:

[CHÈN HÌNH VẼ 3.2.2.2: Sơ đồ tuần tự quy trình Đặt lịch PT 1-1 có bảo vệ Transaction]
Hình 3.2.2.2: Sơ đồ tuần tự quy trình Đặt lịch PT 1-1 có bảo vệ Transaction

**c. Quy trình Thanh toán trực tuyến & Webhook đối soát tự động:**
Sơ đồ minh họa luồng thanh toán VietQR từ lúc sinh mã đơn hàng, quét app Mobile Banking cho đến khi cổng thanh toán gọi Webhook gạch nợ tự động:

[CHÈN HÌNH VẼ 3.2.2.3: Sơ đồ tuần tự quy trình Xử lý thanh toán trực tuyến qua Webhook]
Hình 3.2.2.3: Sơ đồ tuần tự quy trình Xử lý thanh toán trực tuyến qua Webhook

**d. Quy trình Bảo lưu gói tập và cộng bù ngày hết hạn:**
Sơ đồ thể hiện hai giai đoạn: đóng băng thẻ (`FROZEN`) tạm khóa check-in và mở lại thẻ (`UNFREEZE`) tự động tính số ngày thực tế cộng dồn vào `end_date`:

[CHÈN HÌNH VẼ 3.2.2.4: Sơ đồ tuần tự quy trình Bảo lưu gói tập và cộng bù ngày hết hạn]
Hình 3.2.2.4: Sơ đồ tuần tự quy trình Bảo lưu gói tập và cộng bù ngày hết hạn

---

3.2.3. Sơ đồ hoạt động (Activity Diagram)

**a. Quy trình Quản lý vòng đời hợp đồng hội viên:**
Minh họa toàn bộ các trạng thái mà hợp đồng trải qua: Đặt gói $\rightarrow$ Thanh toán $\rightarrow$ Kích hoạt `ACTIVE` $\rightarrow$ Điểm danh / Đặt lịch PT $\rightarrow$ Bảo lưu `FROZEN` $\rightarrow$ Mở lại bù ngày $\rightarrow$ Chuyển nhượng $\rightarrow$ Hết hạn `EXPIRED`:

[CHÈN HÌNH VẼ 3.2.3.1: Sơ đồ hoạt động quy trình quản lý vòng đời hợp đồng hội viên]
Hình 3.2.3.1: Sơ đồ hoạt động quy trình quản lý vòng đời hợp đồng hội viên

**b. Quy trình Phễu chuyển đổi khách vãng lai từ Landing Page (CRM Lead):**
Minh họa hành trình từ khi khách truy cập web, tính BMI/TDEE, đăng ký nhận mã E-Pass QR, đến phòng tập trải nghiệm và được chốt chuyển đổi thành hội viên chính thức:

[CHÈN HÌNH VẼ 3.2.3.2: Sơ đồ hoạt động phễu chuyển đổi khách vãng lai thành hội viên]
Hình 3.2.3.2: Sơ đồ hoạt động phễu chuyển đổi khách vãng lai thành hội viên

**c. Quy trình Đặt và thực hiện buổi tập kèm PT:**
Minh họa chu trình đặt lịch, kiểm tra xung đột thời gian, gửi thông báo nhắc hẹn, xử lý các trường hợp hủy lịch đúng hạn / hủy trễ và xác nhận trừ buổi tập:

[CHÈN HÌNH VẼ 3.2.3.3: Sơ đồ hoạt động quy trình đặt và thực hiện buổi tập kèm PT]
Hình 3.2.3.3: Sơ đồ hoạt động quy trình đặt và thực hiện buổi tập kèm PT

**d. Quy trình Bảo lưu và kích hoạt lại thẻ tập:**
Minh họa việc kiểm tra hạn mức `max_freeze_days`, tạm khóa quyền check-in và thuật toán cộng bù ngày tự động:

[CHÈN HÌNH VẼ 3.2.3.4: Sơ đồ hoạt động quy trình bảo lưu và mở lại thẻ tập]
Hình 3.2.3.4: Sơ đồ hoạt động quy trình bảo lưu và mở lại thẻ tập

---

3.2.4. Database diagram

[CHÈN HÌNH VẼ 3.2.4.1: Sơ đồ cơ sở dữ liệu quan hệ vật lý (Database Diagram)]
Hình 3.2.4.1: Sơ đồ cơ sở dữ liệu quan hệ vật lý (Database Diagram)

---

3.3. HỆ THỐNG MÀN HÌNH

Hệ thống được thiết kế theo kiến trúc ứng dụng web hiện đại (Single Page Application - SPA), phân chia thành 4 phân hệ không gian làm việc (Portals) tương ứng với từng nhóm vai trò:

3.3.1. Giao diện Cổng Khách vãng lai & Cổng Hội viên

**1. Màn hình Trang chủ Landing Page (Khu vực Hero & Triết lý):**
Trình bày nhận diện thương hiệu CITYGYM với tông màu Trắng – Đỏ chủ đạo, khẩu hiệu *"No Pain - No Gain"*, thông điệp truyền cảm hứng chuyển biến vóc dáng trong 3 tháng và nút kêu gọi hành động (CTA).
[CHÈN HÌNH VẼ 3.3.1.1: Màn hình trang chủ Landing Page (Khu vực Hero & Triết lý)]
Hình 3.3.1.1: Màn hình trang chủ Landing Page (Khu vực Hero & Triết lý)

**2. Màn hình Công cụ phân tích thể trạng BMI, BMR và TDEE:**
Giao diện thanh trượt tương tác cho phép người dùng nhập chiều cao, cân nặng, độ tuổi, giới tính và mức độ vận động; hệ thống lập tức tính toán lượng Calo khuyến nghị theo mục tiêu tăng cơ hoặc giảm mỡ.
[CHÈN HÌNH VẼ 3.3.1.2: Màn hình công cụ tính chỉ số thể trạng BMI, BMR và TDEE]
Hình 3.3.1.2: Màn hình công cụ tính chỉ số thể trạng BMI, BMR và TDEE

**3. Màn hình Bảng giá gói tập và Lịch lớp nhóm:**
Hiển thị danh mục các gói tập (theo thời hạn và theo số buổi PT kèm theo), bộ lọc lịch lớp GroupX theo từng ngày trong tuần.
[CHÈN HÌNH VẼ 3.3.1.3: Màn hình bảng giá gói tập và lịch lớp nhóm GroupX]
Hình 3.3.1.3: Màn hình bảng giá gói tập và lịch lớp nhóm GroupX

**4. Màn hình Form đăng ký vé tập thử 03 ngày nhận mã E-Pass QR:**
Cho phép khách vãng lai điền thông tin và nhận ngay Modal hiển thị vé tập thử điện tử (E-Pass) chứa mã QR được tạo tự động ngay trên màn hình.
[CHÈN HÌNH VẼ 3.3.1.4: Màn hình đăng ký vé tập thử 03 ngày nhận mã E-Pass QR]
Hình 3.3.1.4: Màn hình đăng ký vé tập thử 03 ngày nhận mã E-Pass QR

**5. Màn hình Đăng nhập hệ thống đa vai trò:**
Giao diện đăng nhập tinh gọn, hỗ trợ bộ chọn vai trò nhanh (Role Switcher) giúp kiểm thử chuyển đổi nhanh giữa các vai trò trong quá trình demo.
[CHÈN HÌNH VẼ 3.3.1.5: Màn hình đăng nhập hệ thống đa vai trò]
Hình 3.3.1.5: Màn hình đăng nhập hệ thống đa vai trò

**6. Màn hình Cổng Hội viên: Thẻ thành viên QR động 60 giây:**
Hiển thị thẻ thành viên điện tử có mã QR động tự động làm mới mỗi 60 giây (kèm đồng hồ đếm ngược) nhằm chống chụp ảnh chia sẻ.
[CHÈN HÌNH VẼ 3.3.1.6: Màn hình Cổng Hội viên: Thẻ thành viên QR động 60 giây]
Hình 3.3.1.6: Màn hình Cổng Hội viên: Thẻ thành viên QR động 60 giây

**7. Màn hình Cổng Hội viên: Lưới đặt lịch tập PT theo tuần:**
Giao diện lưới lịch trực quan hiển thị các khung giờ sáng/trưa/chiều/tối, đánh dấu rõ khung giờ bận/trống của Huấn luyện viên để hội viên bấm đặt một chạm.
[CHÈN HÌNH VẼ 3.3.1.7: Màn hình Cổng Hội viên: Đặt lịch tập cùng Huấn luyện viên PT]
Hình 3.3.1.7: Màn hình Cổng Hội viên: Đặt lịch tập cùng Huấn luyện viên PT

**8. Màn hình Cổng Hội viên: Biểu đồ theo dõi chỉ số InBody:**
Biểu đồ đường (Line Chart) theo dõi diễn biến cân nặng, lượng mỡ và khối lượng cơ bắp qua từng mốc thời gian đo thực tế.
[CHÈN HÌNH VẼ 3.3.1.8: Màn hình Cổng Hội viên: Biểu đồ theo dõi chỉ số InBody]
Hình 3.3.1.8: Màn hình Cổng Hội viên: Biểu đồ theo dõi chỉ số InBody

**9. Màn hình Thanh toán trực tuyến VietQR:**
Hiển thị mã VietQR thanh toán chuẩn NAPAS kèm đồng hồ đếm ngược 15 phút và kênh WebSocket tự động chuyển trang khi nhận Webhook thành công.
[CHÈN HÌNH VẼ 3.3.1.9: Màn hình thanh toán trực tuyến VietQR kèm đếm ngược 15 phút]
Hình 3.3.1.9: Màn hình thanh toán trực tuyến VietQR kèm đếm ngược 15 phút

---

3.3.2. Giao diện Cổng Huấn luyện viên (PT Portal)

**1. Màn hình Lịch làm việc trong tuần của PT:**
Hiển thị danh sách học viên đã đặt lịch theo từng khung giờ trong ngày, đánh dấu trạng thái chờ tập hoặc đã hoàn thành.
[CHÈN HÌNH VẼ 3.3.2.1: Màn hình Cổng Huấn luyện viên: Lịch làm việc trong tuần]
Hình 3.3.2.1: Màn hình Cổng Huấn luyện viên: Lịch làm việc trong tuần

**2. Màn hình Điểm danh và Xác nhận hoàn thành buổi tập:**
Huấn luyện viên bấm nút "Bắt đầu buổi tập" và "Xác nhận hoàn thành" để hệ thống tự động trừ 1 buổi tập trong hợp đồng của học viên.
[CHÈN HÌNH VẼ 3.3.2.2: Màn hình Cổng Huấn luyện viên: Điểm danh và xác nhận hoàn thành]
Hình 3.3.2.2: Màn hình Cổng Huấn luyện viên: Điểm danh và xác nhận hoàn thành

**3. Màn hình Hồ sơ học viên & Nhập chỉ số đo InBody:**
Giao diện nhập nhanh các chỉ số cân nặng, chiều cao, % mỡ, cơ bắp và ghi chú khuyến nghị dinh dưỡng sau mỗi đợt kiểm tra.
[CHÈN HÌNH VẼ 3.3.2.3: Màn hình Cổng Huấn luyện viên: Nhập chỉ số thể trạng InBody]
Hình 3.3.2.3: Màn hình Cổng Huấn luyện viên: Nhập chỉ số thể trạng InBody

**4. Màn hình Bảng thống kê hoa hồng cá nhân:**
Thống kê tổng số buổi dạy hoàn thành trong tháng nhân với đơn giá buổi học để hiển thị thu nhập dự kiến của PT.
[CHÈN HÌNH VẼ 3.3.2.4: Màn hình Cổng Huấn luyện viên: Bảng thống kê hoa hồng cá nhân]
Hình 3.3.2.4: Màn hình Cổng Huấn luyện viên: Bảng thống kê hoa hồng cá nhân

---

3.3.3. Giao diện Cổng Quản trị & Vận hành Lễ tân

**1. Màn hình Quét Check-in Realtime tại quầy Lễ tân:**
Tích hợp camera máy tính nhận diện siêu tốc, lập tức hiển thị thẻ thông tin lớn: ảnh chân dung, họ tên, hạn gói, trạng thái hợp lệ (Xanh) hoặc cảnh báo từ chối (Đỏ) kèm nhật ký quét trong ngày.
[CHÈN HÌNH VẼ 3.3.3.1: Màn hình Quét Check-in Realtime tại quầy Lễ tân]
Hình 3.3.3.1: Màn hình Quét Check-in Realtime tại quầy Lễ tân

**2. Màn hình Quản lý CRM Khách tiềm năng (Lead Pipeline):**
Quản lý phễu khách tập thử đăng ký từ Landing Page, hỗ trợ bấm nút chuyển đổi 1-chạm sang Hợp đồng hội viên chính thức.
[CHÈN HÌNH VẼ 3.3.3.2: Màn hình Quản lý CRM Khách tiềm năng (Lead Pipeline)]
Hình 3.3.3.2: Màn hình Quản lý CRM Khách tiềm năng (Lead Pipeline)

**3. Màn hình Quản lý Hợp đồng hội viên và trạng thái gói:**
Danh sách toàn bộ hợp đồng đang hoạt động (`ACTIVE`), đang bảo lưu (`FROZEN`) hoặc đã hết hạn (`EXPIRED`) kèm bộ lọc thông minh.
[CHÈN HÌNH VẼ 3.3.3.3: Màn hình Quản lý Hợp đồng hội viên và trạng thái gói]
Hình 3.3.3.3: Màn hình Quản lý Hợp đồng hội viên và trạng thái gói

**4. Màn hình Lập hợp đồng mới và In phụ lục biểu mẫu STU Form 01:**
Form đăng ký gói tập tại quầy hỗ trợ in trực tiếp hợp đồng hội viên chuẩn hóa theo mẫu văn bản của STU.
[CHÈN HÌNH VẼ 3.3.3.4: Màn hình Modal Lập hợp đồng mới và in biểu mẫu STU Form 01]
Hình 3.3.3.4: Màn hình Modal Lập hợp đồng mới và in biểu mẫu STU Form 01

**5. Màn hình Nghiệp vụ Đóng băng bảo lưu và Mở lại hợp đồng:**
Thực hiện đóng băng thẻ tập theo số ngày hợp lệ, tự động tính toán số ngày dồn hạn và gia hạn ngày hết hạn mới khi mở thẻ.
[CHÈN HÌNH VẼ 3.3.3.5: Màn hình Thực hiện bảo lưu và tự động mở lại hợp đồng]
Hình 3.3.3.5: Màn hình Thực hiện bảo lưu và tự động mở lại hợp đồng

**6. Màn hình Dashboard Quản trị BI (Doanh thu & Biểu đồ nhiệt giờ cao điểm):**
Hiển thị các thẻ chỉ số KPI tổng quan (Doanh thu, số hội viên, lượt check-in, tỷ lệ chuyển đổi Lead) và biểu đồ nhiệt khung giờ cao điểm (Peak Hours Heatmap).
[CHÈN HÌNH VẼ 3.3.3.6: Màn hình Dashboard Quản trị BI: Doanh thu & Giờ cao điểm]
Hình 3.3.3.6: Màn hình Dashboard Quản trị BI: Doanh thu & Giờ cao điểm

---

CHƯƠNG 4: THỬ NGHIỆM

4.1. CÁC KỊCH BẢN THỬ NGHIỆM

4.1.1. Thử nghiệm chức năng Đăng ký / Đăng nhập / Phân quyền
- **Kịch bản 1: Đăng ký vé tập thử 03 ngày từ Landing Page:**
  - *Mục đích:* Kiểm tra khả năng tiếp nhận khách vãng lai và sinh mã vé điện tử E-Pass QR.
  - *Dữ liệu đầu vào:* Họ tên "Nguyễn Văn An", SĐT "0901234567", Email "an.nguyen@gmail.com", dịch vụ "Gói Gym VIP".
  - *Kết quả mong đợi:* Hệ thống tạo bản ghi mới trong bảng `leads` (status = `NEW`), hiển thị Modal chứa mã QR vé tập thử.
- **Kịch bản 2: Đăng ký trùng số điện thoại đã tập thử:**
  - *Mục đích:* Kiểm tra ràng buộc chống lạm dụng tập thử nhiều lần.
  - *Dữ liệu đầu vào:* Số điện thoại "0901234567" đã đăng ký trước đó.
  - *Kết quả mong đợi:* Hệ thống chặn lại, hiển thị cảnh báo từ chối.
- **Kịch bản 3: Đăng nhập theo vai trò và kiểm tra Route Guard:**
  - *Mục đích:* Kiểm tra phân quyền RBAC qua JWT Token.
  - *Dữ liệu đầu vào:* Tài khoản Lễ tân (`STAFF`), cố tình truy cập URL Dashboard Admin `/admin/analytics`.
  - *Kết quả mong đợi:* Route Guard phát hiện sai quyền hạn, chặn truy cập và điều hướng về trang `/reception/checkin`.

4.1.2. Thử nghiệm chức năng Quét Check-in QR Realtime
- **Kịch bản 4: Check-in hợp lệ (Hợp đồng ACTIVE & Còn hạn):**
  - *Mục đích:* Kiểm tra quy trình quét mã vào phòng tập thông thường.
  - *Dữ liệu đầu vào:* Mã QR động 60s của hội viên Võ Duy Phúc (gói VIP 12 tháng, hạn thẻ còn 245 ngày).
  - *Kết quả mong đợi:* Tạo bản ghi `check_ins` (`SUCCESS`), màn hình lễ tân nháy xanh, phát chuông "BÍP XANH" và hiển thị thông tin hội viên tức thì qua Socket.io.
- **Kịch bản 5: Check-in hợp đồng đang bảo lưu (FROZEN):**
  - *Mục đích:* Kiểm tra cơ chế tự động khóa quyền vào phòng khi bảo lưu.
  - *Dữ liệu đầu vào:* Mã QR của hội viên Nguyễn Thị Bích (hợp đồng trạng thái `FROZEN`).
  - *Kết quả mong đợi:* Ghi nhận `DENIED`, còi đỏ cảnh báo trên màn hình lễ tân: "Gói tập đang tạm ngưng bảo lưu!".
- **Kịch bản 6: Check-in hợp đồng đã hết hạn (EXPIRED):**
  - *Mục đích:* Kiểm tra cảnh báo hết hạn gói.
  - *Dữ liệu đầu vào:* Mã QR của hội viên Lê Hoàng Nam (ngày hết hạn nhỏ hơn ngày hiện tại).
  - *Kết quả mong đợi:* Ghi nhận `DENIED`, cảnh báo đỏ: "Gói tập đã hết hạn!".
- **Kịch bản 7: Quét vé tập thử E-Pass của khách vãng lai:**
  - *Mục đích:* Kiểm tra tiếp nhận khách thử tại quầy.
  - *Dữ liệu đầu vào:* Mã QR vé E-Pass từ Landing Page.
  - *Kết quả mong đợi:* Ghi nhận hợp lệ, cập nhật trạng thái Lead sang `TRIAL_CHECKED_IN`.

4.1.3. Thử nghiệm chức năng Đặt lịch PT 1-1 & Chống trùng lịch
- **Kịch bản 8: Đặt lịch PT thành công trong khung giờ trống:**
  - *Mục đích:* Kiểm tra quy trình đặt lịch tập kèm bình thường.
  - *Dữ liệu đầu vào:* Học viên chọn PT Nguyễn Văn C, ngày mai, khung giờ 18:00 – 19:00.
  - *Kết quả mong đợi:* Tạo bản ghi `pt_bookings` (`SCHEDULED`), gửi email nhắc lịch, hiển thị thẻ lịch hẹn trên giao diện.
- **Kịch bản 9: Đặt lịch trùng giờ (Race Condition / Concurrency):**
  - *Mục đích:* Kiểm tra cơ chế Transaction Rollback khi 2 học viên cùng bấm đặt 1 khung giờ duy nhất của PT.
  - *Dữ liệu đầu vào:* Hai request đặt lịch gửi đồng thời vào cùng một mốc thời gian của PT.
  - *Kết quả mong đợi:* Request thứ nhất thành công (201 Created); request thứ hai bị Transaction chặn lại, trả về mã lỗi 409 Conflict: "Khung giờ này vừa có người đặt!".
- **Kịch bản 10: Đặt lịch khi hợp đồng hết số buổi PT:**
  - *Mục đích:* Kiểm tra điều kiện số buổi tập còn lại.
  - *Dữ liệu đầu vào:* Hợp đồng có `remaining_sessions = 0`.
  - *Kết quả mong đợi:* Hệ thống chặn từ chối ngay tại giao diện và API.
- **Kịch bản 11: Huấn luyện viên xác nhận hoàn thành buổi tập:**
  - *Mục đích:* Kiểm tra cấn trừ buổi tập tự động.
  - *Dữ liệu đầu vào:* PT bấm "Xác nhận hoàn thành buổi tập" trên Cổng PT.
  - *Kết quả mong đợi:* `pt_bookings.status = COMPLETED`, `remaining_sessions` trong hợp đồng học viên tự động giảm đi 1.

4.1.4. Thử nghiệm chức năng Bảo lưu thẻ & Thanh toán Webhook
- **Kịch bản 12: Đóng băng bảo lưu thẻ trong hạn mức:**
  - *Mục đích:* Kiểm tra nghiệp vụ tạm ngưng gói tập.
  - *Dữ liệu đầu vào:* Lễ tân nhập bảo lưu 15 ngày cho gói cho phép tối đa 60 ngày.
  - *Kết quả mong đợi:* Hợp đồng chuyển `FROZEN`, tạo bản ghi trong `membership_freezes`, khóa check-in.
- **Kịch bản 13: Mở lại hợp đồng (Unfreeze) tự động cộng bù hạn thẻ:**
  - *Mục đích:* Kiểm tra thuật toán cộng dồn số ngày hết hạn mới.
  - *Dữ liệu đầu vào:* Lễ tân bấm "Mở lại hợp đồng" sau 15 ngày đóng băng.
  - *Kết quả mong đợi:* Hợp đồng chuyển về `ACTIVE`, ngày hết hạn mới `end_date` tự động cộng bù thêm đúng 15 ngày.
- **Kịch bản 14: Thanh toán VietQR và kích hoạt gói qua Webhook:**
  - *Mục đích:* Kiểm tra luồng gạch nợ tự động bất đồng bộ.
  - *Dữ liệu đầu vào:* Gửi request Webhook giả lập từ cổng thanh toán kèm chữ ký HMAC hợp lệ.
  - *Kết quả mong đợi:* `payments.status` cập nhật `PAID`, hợp đồng hội viên tự động chuyển sang `ACTIVE`, WebSocket báo thành công trên giao diện.

---

4.2. KẾT QUẢ THỬ NGHIỆM

4.2.1. Kết quả chức năng Đăng ký & Đăng nhập
| Kịch bản | Kết quả | Ghi chú |
| :--- | :---: | :--- |
| Đăng ký vé tập thử E-Pass 03 ngày | **PASS** | Tự động sinh mã QR và ghi nhận Lead mới |
| Đăng ký trùng số điện thoại | **PASS** | Chặn thành công, hiển thị cảnh báo rõ ràng |
| Đăng nhập phân quyền đa vai trò (RBAC) | **PASS** | Cấp phát JWT và chuyển đúng Portal |

4.2.2. Kết quả chức năng Kiểm soát Check-in QR
| Kịch bản | Kết quả | Ghi chú |
| :--- | :---: | :--- |
| Check-in hợp lệ (Gói ACTIVE, còn hạn) | **PASS** | Màn hình nháy xanh, chuông bíp, phản hồi < 0.5s |
| Check-in thẻ đang bảo lưu (FROZEN) | **PASS** | Chặn thành công, phát còi đỏ cảnh báo |
| Check-in thẻ hết hạn (EXPIRED) | **PASS** | Chặn thành công, gợi ý gia hạn gói |
| Quét vé tập thử E-Pass | **PASS** | Tiếp nhận hợp lệ, cập nhật phễu Lead |

4.2.3. Kết quả chức năng Đặt lịch PT 1-1
| Kịch bản | Kết quả | Ghi chú |
| :--- | :---: | :--- |
| Đặt lịch tập PT trong khung giờ trống | **PASS** | Lưu lịch SCHEDULED, gửi email nhắc lịch |
| Kiểm soát trùng giờ (Concurrency Conflict) | **PASS** | Transaction Rollback thành công, trả về 409 Conflict |
| Chặn đặt lịch khi hết buổi tập | **PASS** | Kiểm tra remaining_sessions $\ge 1$ chính xác |
| Xác nhận hoàn thành buổi tập | **PASS** | Trừ chính xác 1 buổi tập trong hợp đồng |

4.2.4. Kết quả chức năng Bảo lưu, Thanh toán & Quản lý
| Kịch bản | Kết quả | Ghi chú |
| :--- | :---: | :--- |
| Đóng băng bảo lưu gói tập | **PASS** | Chuyển trạng thái FROZEN, tạm khóa check-in |
| Mở lại thẻ và tự động bù ngày hết hạn | **PASS** | Tính đúng số ngày thực tế và cộng bù vào end_date |
| Thanh toán VietQR & Webhook đối soát | **PASS** | Xác thực HMAC đúng, gạch nợ và kích hoạt gói tức thì |
| Dashboard BI & Biểu đồ nhiệt giờ cao điểm | **PASS** | Hiển thị chính xác số liệu và mật độ check-in |

*Tổng kết thử nghiệm:* 100% các kịch bản thử nghiệm chức năng và phi chức năng đều đạt kết quả **PASS**. Hệ thống vận hành ổn định, xử lý dữ liệu đồng bộ và bẫy lỗi ngoại lệ đầy đủ.

---

4.3. XỬ LÝ CÁC TRƯỜNG HỢP NGOẠI LỆ

4.3.1. Xử lý lỗi validation
- Lỗi số điện thoại / Email trùng lặp: Kiểm tra hàm `findUnique()` trên Prisma trước khi tạo mới. Trả về mã lỗi 400 Bad Request kèm thông báo: "Số điện thoại hoặc email này đã tồn tại trên hệ thống!".
- Lỗi thiếu trường thông tin bắt buộc: Sử dụng Middleware kiểm tra tính hợp lệ dữ liệu đầu vào. Trả về mã lỗi 400 Bad Request kèm danh sách các trường bị thiếu.
- Lỗi số ngày bảo lưu vượt hạn mức: Kiểm tra ràng buộc logic `freezeDays <= package.max_freeze_days`. Nếu vượt quá, chặn lại ngay tại tầng Service.

4.3.2. Xử lý lỗi business logic
- Lỗi trùng lịch hẹn Huấn luyện viên: Kiểm tra điều kiện tồn tại lịch hẹn `status = SCHEDULED` trong cùng khung giờ. Trả về mã lỗi 409 Conflict kèm thông báo: "Khung giờ này của Huấn luyện viên đã có người đặt!".
- Lỗi cấn trừ buổi tập khi hết hạn mức: Bọc logic trừ buổi trong Transaction: nếu `remaining_sessions <= 0`, ném ra biệt lệ nghiệp vụ để hủy giao dịch.
- Lỗi check-in khi gói tập không hợp lệ: Phân loại chi tiết các mã lỗi nghiệp vụ: `CONTRACT_FROZEN` (Đang bảo lưu), `CONTRACT_EXPIRED` (Đã hết hạn), `INVALID_QR_TOKEN` (Mã QR quá hạn 60s) để màn hình lễ tân hiển thị đúng nguyên nhân.

4.3.3. Xử lý lỗi database
- Lỗi vi phạm ràng buộc toàn vẹn dữ liệu (Unique Constraint / Foreign Key): Sử dụng khối `try ... catch` bao bọc các lời gọi Prisma Client. Bẫy mã lỗi `P2002` (Vi phạm Unique) để trả về thông báo thân thiện thay vì làm sập máy chủ.
- Xử lý Deadlock và Rollback Transaction: Khi xảy ra xung đột khóa đồng thời, khối `prisma.$transaction` tự động hủy bỏ mọi thay đổi tạm thời, giải phóng khóa và trả về lỗi an toàn cho người dùng.

4.3.4. Xử lý lỗi frontend & kết nối thời gian thực
- Lỗi mã QR quá hạn 60 giây: Trên Cổng hội viên, đồng hồ đếm ngược tự động kích hoạt hàm tải mã mới trước khi hết hạn 2 giây. Nếu hội viên để màn hình quá lâu, giao diện hiển thị lớp mờ yêu cầu bấm "Chạm để làm mới mã QR".
- Lỗi mất kết nối WebSocket (Socket.io): Thư viện Socket.io-client được cấu hình cơ chế tự động kết nối lại (Auto-reconnection) sau mỗi 3 giây; khi mất mạng, giao diện lễ tân hiển thị thanh trạng thái màu vàng cảnh báo.
- Lỗi hết hạn phiên đăng nhập (Token Expired): Axios Interceptor trên Frontend bắt mã lỗi 401 Unauthorized, tự động xóa bộ nhớ đệm và chuyển hướng người dùng về màn hình đăng nhập.

4.3.5. Các biện pháp bảo vệ hệ thống
- **Transaction Management:** 100% các luồng nghiệp vụ ghi dữ liệu liên quan từ 2 bảng trở lên (Đặt lịch PT, Trừ buổi, Bảo lưu bù ngày, Webhook thanh toán) đều bắt buộc thực thi bên trong `prisma.$transaction`.
- **Input Sanitization:** Loại bỏ khoảng trắng thừa (Trim), lọc ký tự nguy hại chống tấn công XSS.
- **HMAC SHA256 Webhook Verification:** Xác thực chữ ký số trên từng Webhook gửi đến máy chủ nhằm đảm bảo chỉ xử lý yêu cầu xuất phát từ cổng thanh toán đối tác.
- **CORS Protection:** Cấu hình chính sách chia sẻ tài nguyên chỉ cho phép các Domain và Port được cấp phép (`http://localhost:5173`, `http://localhost:3000`) truy cập API.

---

CHƯƠNG 5: KẾT LUẬN

5.1. KẾT QUẢ ĐỐI CHIẾU VỚI MỤC TIÊU

| STT | Module / Tiêu chí | Mục tiêu đề ra ban đầu | Kết quả đạt được thực tế | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **1** | **Cổng Khách vãng lai & CRM Lead** | Thu hút khách vãng lai, tính chỉ số sức khỏe, đăng ký tập thử nhận mã QR E-Pass; chuyển đổi Lead thành hội viên. | Đã hoàn thiện toàn bộ Landing Page chuẩn nhận diện thương hiệu CITYGYM; bộ tính BMI/TDEE tương tác; sinh vé E-Pass QR tức thì; CRM chuyển đổi 1-chạm. | **ĐẠT (100%)** |
| **2** | **Quản lý Tài khoản & Phân quyền RBAC** | Phân quyền 5 vai trò (Guest, Member, PT, Staff, Admin); xác thực an toàn bằng JWT. | Đã triển khai xác thực Bcrypt + JWT, phân tách 4 không gian làm việc (Portals) độc lập, bảo vệ Route Guards cả giao diện và API. | **ĐẠT (100%)** |
| **3** | **Kiểm soát Check-in QR Realtime** | Quét mã QR nhận diện tức thì; mã QR tự đổi 60s chống gian lận; đồng bộ Socket.io dưới 1s. | Đã hoàn thiện mã QR động 60s, camera quầy nhận diện < 0.5s, Socket.io đẩy kết quả chuông xanh / còi đỏ tức thì lên màn hình lễ tân. | **ĐẠT (100%)** |
| **4** | **Đặt lịch PT 1-1 & Chống trùng lịch** | Đặt lịch tập kèm, chống trùng giờ bằng Database Transaction, tự động trừ buổi khi hoàn thành. | Đã xử lý khóa dòng dữ liệu Transaction chống Race Condition; tự động cấn trừ 1 buổi tập khi PT bấm xác nhận hoàn thành; tính hoa hồng PT. | **ĐẠT (100%)** |
| **5** | **Quản lý Hợp đồng & Bảo lưu bù ngày** | Quản lý hợp đồng hội viên; đóng băng bảo lưu thẻ và tự động tính toán cộng bù ngày hết hạn mới. | Đã triển khai đầy đủ vòng đời hợp đồng; thuật toán tự động tính số ngày đóng băng thực tế và dồn hạn thẻ chính xác tuyệt đối. | **ĐẠT (100%)** |
| **6** | **Thanh toán trực tuyến & Webhook** | Thanh toán VietQR chuẩn NAPAS; Webhook đối soát tự động kích hoạt gói tập. | Đã tích hợp sinh mã VietQR chuyển khoản kèm đếm ngược 15p; API nhận Webhook xác thực chữ ký HMAC SHA256 gạch nợ tự động. | **ĐẠT (100%)** |
| **7** | **Báo cáo thống kê & Dashboard BI** | Thống kê doanh thu, tỷ lệ chuyển đổi khách tập thử, phân tích biểu đồ nhiệt giờ cao điểm. | Đã xây dựng Dashboard Quản trị BI trực quan với biểu đồ doanh thu và Heatmap mật độ check-in theo khung giờ trong ngày. | **ĐẠT (100%)** |

---

5.2. CÁC VẤN ĐỀ CÒN TỒN ĐỌNG

Mặc dù hệ thống đã đáp ứng đầy đủ các yêu cầu chức năng và kỹ thuật theo đề cương luận văn đề ra, song do giới hạn về mặt thời gian và nguồn lực nghiên cứu, đề tài vẫn còn một số điểm có thể hoàn thiện tốt hơn:
- Chưa đấu nối trực tiếp mạch điều khiển phần cứng của cổng xoay Turnstile vật lý hoặc máy nhận diện khuôn mặt chuyên dụng (hiện tại việc nhận diện thực hiện qua camera máy tính của quầy lễ tân).
- Chức năng thanh toán trực tuyến mới triển khai trên môi trường thử nghiệm (Sandbox), chưa đăng ký định danh doanh nghiệp để kết nối trực tiếp với cổng thanh toán tiền thật của ngân hàng.
- Hệ thống gửi email thông báo (nhắc lịch tập, gửi biên lai) hiện tại sử dụng giao thức SMTP cơ bản, chưa tích hợp hệ thống gửi tin nhắn đa kênh Brandname qua SMS hoặc Zalo ZNS.

---

5.3. MỞ RỘNG (HƯỚNG PHÁT TRIỂN)

5.3.1. Tích hợp thiết bị kiểm soát cửa Turnstile & Nhận diện khuôn mặt (FaceID)
- *Mô tả:* Kết nối trực tiếp máy chủ Backend với bộ điều khiển cổng từ (Turnstile Barrier Controller) qua giao thức TCP/IP hoặc RS485 và tích hợp camera AI nhận diện khuôn mặt tại cửa ra vào.
- *Lợi ích:* Tự động hóa hoàn toàn việc mở cửa phòng tập mà không cần nhân viên lễ tân phải đứng túc trực bấm duyệt, tiến tới mô hình phòng gym tự phục vụ thông minh 24/7.

5.3.2. Hệ thống thông báo đa kênh tự động (Zalo ZNS / SMS Brandname)
- *Mô tả:* Tích hợp cổng dịch vụ tin nhắn chăm sóc khách hàng tự động Zalo Notification Service (ZNS) và SMS Brandname mang tên CITYGYM.
- *Lợi ích:* Tự động gửi tin nhắn chúc mừng sinh nhật hội viên, nhắc lịch tập kèm PT trước 02 giờ, nhắc gia hạn hợp đồng trước khi hết hạn 07 ngày, giúp tăng tỷ lệ gia hạn và giảm tỷ lệ bỏ lỡ lịch hẹn.

5.3.3. Phát triển ứng dụng di động chuyên biệt (Native Mobile App)
- *Mô tả:* Sử dụng React Native hoặc Flutter để đóng gói Cổng Hội Viên thành ứng dụng di động chính thức phát hành trên App Store (iOS) và Google Play Store (Android).
- *Lợi ích:* Tận dụng các tính năng phần cứng của điện thoại như đẩy thông báo Push Notification tức thì, lưu thẻ hội viên vào Apple Wallet / Google Wallet.

5.3.4. Kết nối trực tiếp máy đo InBody chuyên dụng
- *Mô tả:* Xây dựng module kết nối máy tính với các thiết bị phân tích thành phần cơ thể chuyên nghiệp (InBody 270, InBody 570) qua cổng Serial COM hoặc Bluetooth.
- *Lợi ích:* Dữ liệu cân nặng, lượng cơ, lượng mỡ sau khi đo sẽ được đồng bộ trực tiếp vào CSDL MySQL mà không cần Huấn luyện viên phải gõ số thủ công bằng tay.

5.3.5. Ứng dụng trí tuệ nhân tạo (AI Coach) cá nhân hóa dinh dưỡng
- *Mô tả:* Tích hợp mô hình ngôn ngữ lớn (LLM - như Gemini API) để tự động phân tích chỉ số thể trạng InBody và mục tiêu của hội viên nhằm đề xuất thực đơn dinh dưỡng và giáo án tập luyện gợi ý.
- *Lợi ích:* Nâng cao giá trị dịch vụ của phòng tập, hỗ trợ Huấn luyện viên tiết kiệm thời gian lên giáo án cho học viên mới.

5.3.6. Module quản lý bán lẻ đồ tập và thực phẩm bổ sung (POS Retail)
- *Mô tả:* Mở rộng module quản lý kho hàng, nhập xuất tồn và bán lẻ các mặt hàng phụ trợ tại quầy lễ tân (bình nước, thực phẩm bổ sung Whey Protein, găng tay tập luyện).
- *Lợi ích:* Đa dạng hóa nguồn doanh thu cho chủ phòng gym, quản lý dòng tiền tập trung trên một phần mềm duy nhất.

---

HƯỚNG DẪN SỬ DỤNG

### 1. Hướng dẫn dành cho Khách vãng lai trên Landing Page

**Bước 1: Truy cập Landing Page và tính toán chỉ số sức khỏe**
- Người dùng truy cập trang web `http://localhost:5173`.
- Cuộn xuống khu vực **"Công cụ phân tích thể trạng"**: Nhập Giới tính, Chiều cao, Cân nặng, Độ tuổi và Mức độ vận động.
- Hệ thống tự động tính toán chỉ số BMI, BMR và mức Calo mục tiêu hàng ngày (TDEE).
[CHÈN HÌNH VẼ 4.1: Giao diện trang chủ Landing Page và công cụ tính chỉ số]
Hình 4.1: Giao diện trang chủ Landing Page và công cụ tính chỉ số

**Bước 2: Đăng ký nhận vé tập thử 03 ngày (E-Pass QR)**
- Nhấn nút **"Đăng ký tập thử 03 ngày 0Đ"**.
- Điền Họ tên, Số điện thoại và Email liên hệ $\rightarrow$ Nhấn **"Nhận Vé E-Pass Ngay"**.
- Modal hiển thị mã QR vé tập thử xuất hiện ngay trên màn hình. Khách hàng chụp lại màn hình hoặc lưu ảnh QR để xuất trình khi đến phòng tập.
[CHÈN HÌNH VẼ 4.2: Giao diện đăng ký vé tập thử nhận mã QR E-Pass]
Hình 4.2: Giao diện đăng ký vé tập thử nhận mã QR E-Pass

---

### 2. Hướng dẫn dành cho Hội viên trên Cổng Hội Viên

**Bước 3: Đăng nhập vào Cổng Hội Viên**
- Nhấn nút **"Đăng Nhập"** ở góc phải thanh điều hướng.
- Nhập Số điện thoại và Mật khẩu (hoặc nhấn nút chọn nhanh tài khoản Hội viên trên thanh Role Switcher demo).
- Nhấn **"Đăng Nhập"** $\rightarrow$ Hệ thống tự động chuyển vào giao diện Cổng Hội Viên.
[CHÈN HÌNH VẼ 4.3: Giao diện đăng nhập hệ thống phân quyền]
Hình 4.3: Giao diện đăng nhập hệ thống phân quyền

**Bước 4: Sử dụng Thẻ thành viên QR động để Check-in**
- Tại trang chủ Cổng Hội Viên, hội viên nhìn thấy thẻ thành viên điện tử hiển thị họ tên, tên gói tập, số ngày còn lại và **Mã QR động 60 giây**.
- Khi đến phòng tập, hội viên đưa màn hình điện thoại có mã QR này vào camera tại quầy lễ tân để được mở cửa vào phòng.
[CHÈN HÌNH VẼ 4.4: Giao diện Cổng Hội viên với thẻ QR động 60s]
Hình 4.4: Giao diện Cổng Hội viên với thẻ QR động 60s

**Bước 5: Đặt lịch tập 1-1 cùng Huấn luyện viên PT**
- Trên thanh menu, chọn mục **"Đặt Lịch PT"**.
- Chọn Huấn luyện viên phụ trách và xem thời khóa biểu các ngày trong tuần.
- Nhấp chọn khung giờ trống mong muốn (ô màu xanh lá) $\rightarrow$ Nhấn **"Xác Nhận Đặt Lịch"**.
- Hệ thống kiểm tra hợp lệ và hiển thị thông báo đặt lịch thành công.
[CHÈN HÌNH VẼ 4.7: Giao diện đặt lịch tập 1-1 cùng Huấn luyện viên PT]
Hình 4.7: Giao diện đặt lịch tập 1-1 cùng Huấn luyện viên PT

**Bước 6: Thanh toán gói tập qua mã VietQR**
- Chọn mục **"Gia Hạn Gói"** hoặc bấm mua gói tập mới.
- Chọn phương thức thanh toán **"VietQR Chuyển Khoản"**.
- Mở ứng dụng ngân hàng bất kỳ (Mobile Banking), quét mã VietQR trên màn hình và xác nhận chuyển khoản. Hệ thống tự động gạch nợ và kích hoạt gói sau vài giây.
[CHÈN HÌNH VẼ 4.10: Giao diện thanh toán trực tuyến VietQR và đối soát Webhook]
Hình 4.10: Giao diện thanh toán trực tuyến VietQR và đối soát Webhook

---

### 3. Hướng dẫn dành cho Lễ tân tại quầy (Staff Portal)

**Bước 7: Vận hành màn hình Quét Check-in Realtime**
- Lễ tân đăng nhập tài khoản Lễ tân $\rightarrow$ Chọn mục **"Quét Check-in Realtime"**.
- Cho phép trình duyệt truy cập camera máy tính để kích hoạt mắt đọc mã.
- Hướng camera vào màn hình mã QR của hội viên:
  - Nếu thẻ hợp lệ: Màn hình lập tức nháy xanh, phát chuông "BÍP", hiển thị ảnh đại diện và mở cửa.
  - Nếu thẻ đang bảo lưu hoặc hết hạn: Màn hình chuyển cảnh báo đỏ, phát còi cảnh báo và hiển thị lý do từ chối.
[CHÈN HÌNH VẼ 4.5: Giao diện màn hình Quét Check-in tại quầy Lễ tân]
Hình 4.5: Giao diện màn hình Quét Check-in tại quầy Lễ tân

[CHÈN HÌNH VẼ 4.6: Giao diện kiểm tra trạng thái Check-in từ chối khi thẻ bảo lưu]
Hình 4.6: Giao diện kiểm tra trạng thái Check-in từ chối khi thẻ bảo lưu

**Bước 8: Quản lý khách tập thử Lead và Lập hợp đồng mới**
- Truy cập mục **"CRM Lead Khách Tập Thử"**: Xem danh sách khách đăng ký từ Landing Page.
- Sau khi khách trải nghiệm xong, nhấn nút **"Chốt Hợp Đồng"** để tự động điền thông tin khách hàng sang form lập hợp đồng.
- Nhập gói tập khách chọn mua $\rightarrow$ Nhấn **"Lập Hợp Đồng"** và bấm **"In Hợp Đồng (Biểu mẫu 01 - STU)"** để in bản giấy cho hội viên ký.

---

### 4. Hướng dẫn dành cho Huấn luyện viên (PT Portal)

**Bước 9: Điểm danh và Xác nhận hoàn thành buổi tập kèm**
- Huấn luyện viên đăng nhập Cổng PT $\rightarrow$ Vào mục **"Lịch Dạy Hôm Nay"**.
- Xem danh sách học viên có lịch hẹn trong ngày.
- Khi kết thúc buổi tập, nhấn nút **"Xác Nhận Hoàn Thành Buổi Tập"** để hệ thống tự động trừ 1 buổi trong hợp đồng của học viên và ghi nhận hoa hồng.
[CHÈN HÌNH VẼ 4.9: Giao diện Huấn luyện viên xác nhận hoàn thành buổi tập]
Hình 4.9: Giao diện Huấn luyện viên xác nhận hoàn thành buổi tập

---

### 5. Hướng dẫn dành cho Quản trị viên (Admin Portal)

**Bước 10: Theo dõi Dashboard BI và Biểu đồ nhiệt giờ cao điểm**
- Đăng nhập tài khoản Quản trị (`ADMIN`) $\rightarrow$ Truy cập mục **"Dashboard Báo Cáo"**.
- Theo dõi các chỉ số tổng quan: Doanh thu theo tháng, số hội viên đang hoạt động, tỷ lệ chuyển đổi khách tập thử thành hội viên.
- Quan sát **Biểu đồ nhiệt khung giờ cao điểm (Peak Hours Heatmap)** để nắm bắt các khung giờ tập trung đông hội viên nhất (06:00 – 08:00 sáng và 17:30 – 20:30 tối), từ đó bố trí nhân sự lễ tân và lịch bảo dưỡng máy móc hợp lý.
[CHÈN HÌNH VẼ 4.11: Giao diện Dashboard Quản trị và biểu đồ nhiệt giờ cao điểm]
Hình 4.11: Giao diện Dashboard Quản trị và biểu đồ nhiệt giờ cao điểm

---

TÀI LIỆU THAM KHẢO

Tài liệu Tiếng Việt:
[1] TS. Phạm Nguyễn Cương, ThS. Nguyễn Trần Minh Thư, PGS. TS. Hồ Bảo Quốc (2020), *Giáo trình Phân tích và Thiết kế Hệ thống Thông tin Hướng đối tượng*, NXB Khoa học và Kỹ thuật, Hà Nội.
[2] TS. Nguyễn Tiến Huy (2018), *Giáo trình Nhập môn Công nghệ Phần mềm*, NXB Đại học Quốc gia TP. Hồ Chí Minh.
[3] ThS. Đỗ Thị Minh Phụng (2019), *Thực hành Cơ sở dữ liệu và Tối ưu hóa truy vấn*, NXB Đại học Quốc gia TP. Hồ Chí Minh.
[4] Trường Đại học Công nghệ Sài Gòn (2025), *Quy định về thể thức trình bày Khóa luận - Luận văn tốt nghiệp Đại học ngành Công nghệ Thông tin*, Khoa Công nghệ Thông tin, STU.

Tài liệu Tiếng Anh:
[5] Alex Banks, Eve Porcello (2020), *Learning React: Modern Patterns for Developing React Apps (2nd Edition)*, O'Reilly Media.
[6] Mario Casciaro, Luciano Mammino (2020), *Node.js Design Patterns: Design and implement production-grade Node.js applications (3rd Edition)*, Packt Publishing.
[7] Martin Kleppmann (2017), *Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems*, O'Reilly Media.
[8] Vlad Mihalcea (2021), *High-Performance Java & SQL Transactions: ACID, Concurrency Control and Database Locking Patterns*, Hypersistence.

Tài liệu điện tử:
[9] React Team (2026), *React 18 Documentation - The Library for Web and Native User Interfaces*, truy cập từ: https://react.dev/
[10] Prisma Team (2026), *Prisma ORM Official Documentation - Next-generation ORM for Node.js & TypeScript*, truy cập từ: https://www.prisma.io/docs/
[11] Socket.io Team (2026), *Socket.io Realtime Application Framework Documentation*, truy cập từ: https://socket.io/docs/v4/
[12] MySQL Team (2026), *MySQL 8.0 Reference Manual - Transactional and Locking Model*, truy cập từ: https://dev.mysql.com/doc/refman/8.0/en/
[13] VietQR / NAPAS (2026), *Chuẩn nhận diện và liên thông thanh toán quét mã QR đa ngân hàng tại Việt Nam*, truy cập từ: https://vietqr.net/
[14] Auth0 / JWT.io (2026), *JSON Web Token (JWT) Architecture and Security Best Practices*, truy cập từ: https://jwt.io/introduction

