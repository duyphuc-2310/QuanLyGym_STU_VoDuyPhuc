# BẢN ĐẶC TẢ NGHIỆP VỤ & KẾ HOẠCH TRIỂN KHAI HỆ THỐNG CITYGYM
## THEO ĐÚNG 100% QUY CHUẨN LUẬN VĂN TỐT NGHIỆP STU 2026

> **Đề tài:** XÂY DỰNG HỆ THỐNG WEBSITE QUẢN LÝ PHÒNG GYM VÀ HỖ TRỢ HỘI VIÊN THEO DÕI DINH DƯỠNG, LUYỆN TẬP THÔNG MINH  
> **Sinh viên thực hiện:** VÕ DUY PHÚC  
> **Người hướng dẫn:** ThS. BÙI NHẬT BẰNG  
> **Trường:** Đại học Công nghệ Sài Gòn (STU) – Khoa Công nghệ Thông tin  

---

## I. NGUYÊN TẮC NGHIỆP VỤ CỐT LÕI (BÁM SÁT 100% FILE LUẬN VĂN)

Dự án tuyệt đối **không đi theo mô hình phần mềm GymMaster hay NextX**, mà tập trung tinh gọn và hoàn thiện chính xác **4 phân hệ nghiệp vụ, 10 Use case và 13 bảng CSDL** đã được bảo vệ trong Đề cương Luận văn:

### 1. Phân hệ 1: Cổng Khách vãng lai & CRM Tiếp nhận (Landing Page)
- **Giao diện thương hiệu:** Phong cách thể thao năng động Trắng – Đỏ, Slogan: *"NO PAIN - NO GAIN"*, thông điệp lộ trình 90 ngày thay đổi vóc dáng.
- **Công cụ đo lường y khoa tương tác:** Tính toán chính xác theo công thức **Mifflin-St Jeor**:
  - Chỉ số $BMI = \frac{W}{H^2}$ (phân loại: Thiếu cân, Chuẩn, Thừa cân).
  - Năng lượng cơ bản $BMR$ (nam: $10W + 6.25H - 5A + 5$, nữ: $10W + 6.25H - 5A - 161$).
  - Tổng năng lượng tiêu hao $TDEE = BMR \times Activity$ và lượng Calo mục tiêu (Thâm hụt -500 kcal giảm mỡ, Thặng dư +400 kcal tăng cơ).
- **Bảng giá gói tập:** CityBasic (650.000đ/tháng), CityPro (3.200.000đ/6 tháng, tặng 5 buổi PT, bảo lưu 30 ngày), CityVIP (5.800.000đ/12 tháng, tặng 20 buổi PT, bảo lưu 60 ngày).
- **Lịch lớp GroupX:** Yoga Vinyasa, HIIT Burn Fat, Zumba Dance, BodyPump, RPM Cycling với bộ lọc theo thứ trong tuần.
- **Đăng ký vé tập thử 03 ngày (E-Pass QR - UC-01):** Khách điền form $\rightarrow$ Hệ thống sinh mã vé điện tử E-Pass hiển thị mã QR trực tiếp trên màn hình và lưu vào phễu CRM (trạng thái `NEW`).
- **Thanh toán VietQR (UC-09):** Khách chọn mua gói $\rightarrow$ Bật Modal mã VietQR Napas247 động, đếm ngược 15:00 và nút đối soát Webhook tự động kích hoạt gói.

---

### 2. Phân hệ 2: Cổng Lễ Tân Quầy & Kiểm Soát Check-in Realtime (Staff Portal)
- **Kiểm soát Check-in QR Realtime (UC-04 & Scenarios 4, 5, 6, 7):**
  - Tích hợp camera và đầu đọc mã QR, phản hồi tức thì dưới 0.5s.
  - Phản hồi trực quan bằng âm thanh Web Audio API và màu sắc:
    1. **HỢP LỆ (Thành công - Chuông BÍP XANH):** Thẻ `ACTIVE` và còn hạn $\rightarrow$ Hiện ảnh đại diện, gói tập, số buổi PT và mở cửa.
    2. **TỪ CHỐI - BẢO LƯU (Cảnh báo - CÒI ĐỎ):** Thẻ đang `FROZEN` $\rightarrow$ Từ chối và báo động: *"Gói tập đang tạm ngưng bảo lưu, không thể check-in!"*.
    3. **TỪ CHỐI - HẾT HẠN (Lỗi - CÒI ĐỎ):** Thẻ `EXPIRED` $\rightarrow$ Từ chối và hướng dẫn gia hạn.
    4. **VÉ TẬP THỬ E-PASS:** Quét vé trải nghiệm $\rightarrow$ Chuyển trạng thái Lead sang `TRIAL_CHECKED_IN`.
- **Quản lý Hợp đồng & Bảo lưu thẻ bù ngày (UC-08 & Scenarios 12, 13):**
  - **Đóng băng bảo lưu:** Kiểm tra hạn mức `max_freeze_days` của gói $\rightarrow$ Chuyển trạng thái thẻ sang `FROZEN` $\rightarrow$ Tạm khóa quyền check-in.
  - **Mở lại thẻ (Unfreeze) tự động bù ngày:** Thuật toán tính số ngày đóng băng thực tế $D$ $\rightarrow$ Tự động cộng dồn vào hạn mới: $end\_date_{mới} = end\_date_{cũ} + D$.
  - In hợp đồng hội viên chuẩn hóa theo **Biểu mẫu STU Form 01**.
- **Phễu CRM Lead:** Tiếp nhận khách tập thử $\rightarrow$ Nút chuyển đổi 1-chạm sang Hợp đồng chính thức (`CONVERTED`).

---

### 3. Phân hệ 3: Cổng Huấn Luyện Viên Cá Nhân (PT Portal)
- **Lịch dạy hôm nay (UC-05):** Hiển thị danh sách các buổi hẹn kèm 1-1, kiểm tra xung đột trùng lịch giờ dạy.
- **Xác nhận hoàn thành & Trừ buổi tập (UC-07 & Scenario 11):**
  - Sau buổi tập, PT bấm nút *"Xác nhận hoàn thành buổi tập"*.
  - Hệ thống tự động chuyển lịch sang `COMPLETED`, đồng thời **tự động trừ 1 buổi tập** trong hợp đồng của học viên (`remainingSessions = remainingSessions - 1`).
- **Thống kê hoa hồng cá nhân:** Tự động nhân số buổi dạy `COMPLETED` trong tháng với đơn giá hoa hồng (150.000 đ/buổi) để hiển thị thu nhập cho PT.
- **Nhập chỉ số thể trạng InBody (UC-10):** Cân đo chiều cao, cân nặng, % mỡ, cơ bắp và lưu trữ vào hồ sơ học viên.

---

### 4. Phân hệ 4: Cổng Hội Viên (Member Portal)
- **Thẻ thành viên điện tử Mã QR động 60 giây (UC-03):** Mã QR tự động làm mới sau mỗi 60 giây (kèm đồng hồ đếm ngược) chống việc chụp màn hình gửi cho người khác dùng chung thẻ.
- **Đặt lịch tập 1-1 với PT (UC-05 & Scenario 8, 9, 10):**
  - Chọn Huấn luyện viên, xem các khung giờ rảnh trong tuần.
  - Kiểm tra điều kiện số buổi còn lại `remainingSessions >= 1`.
  - Chống trùng lịch bằng giao dịch an toàn (Database Transaction).
  - Hủy lịch trước 2 giờ không mất buổi (`CANCELLED_ON_TIME`), hủy trễ bị trừ buổi (`CANCELLED_LATE`).
- **Biểu đồ theo dõi chỉ số InBody:** Biểu đồ đường trực quan theo dõi cân nặng, tỷ lệ mỡ và khối lượng cơ qua từng tuần rèn luyện.

---

### 5. Phân hệ 5: Dashboard BI Quản Trị (Admin Portal)
- Thống kê tổng doanh thu, số lượng hội viên đang hoạt động, tỷ lệ chuyển đổi khách tập thử thành hội viên.
- **Biểu đồ nhiệt giờ cao điểm (Peak Hours Heatmap):** Thể hiện mật độ hội viên check-in theo các khung giờ trong ngày (sáng 06:00 - 08:00 và tối 17:30 - 20:30) giúp bố trí nhân sự quầy tối ưu.

