# CITYGYM - HỆ THỐNG QUẢN LÝ PHÒNG TẬP THỂ HÌNH TOÀN DIỆN
## ĐỀ TÀI LUẬN VĂN TỐT NGHIỆP ĐẠI HỌC (STU - KHOA CÔNG NGHỆ THÔNG TIN - 2026)

- **Đề tài:** Xây dựng hệ thống website quản lý phòng gym tích hợp đặt lịch PT, thanh toán trực tuyến và cổng khách hàng.
- **Sinh viên thực hiện:** Võ Duy Phúc
- **Giảng viên hướng dẫn:** ThS. Bùi Nhật Bằng
- **Đơn vị đào tạo:** Trường Đại học Công nghệ Sài Gòn (STU) – Khoa Công nghệ Thông tin

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG

Hệ thống được thiết kế theo mô hình **Client - Server hiện đại, phân tách rõ ràng (Decoupled Architecture)**:

```
+-----------------------------------------------------------------------------------+
|                           FRONTEND (React 18 + Vite)                              |
|  1. Landing Page (Khách vãng lai, Tính BMI/TDEE, Đăng ký vé tập thử E-Pass)        |
|  2. Lễ Tân Check-in (Quét mã QR Realtime, nhận diện gói tập, âm thanh phản hồi)   |
|  3. Quản Lý Hợp Đồng (Bảo lưu đóng băng thẻ, cộng bù hạn ngày tự động, in HĐ)     |
|  4. CRM Lead Bán Hàng (Đồng bộ khách từ Landing, chuyển đổi thành hội viên VIP)   |
|  5. Cổng Hội Viên (Mã QR động 60s chống chia sẻ, đặt lịch PT 1-1 không trùng)     |
|  6. Cổng Huấn Luyện Viên (Lịch dạy 1-1, xác nhận trừ buổi, cập nhật InBody 270)   |
|  7. BI Analytics Dashboard (Biểu đồ nhiệt giờ cao điểm, doanh thu, hoa hồng PT)   |
+-----------------------------------------------------------------------------------+
                                         │
                   RESTful APIs & WebSocket (Socket.io)
                                         │
+-----------------------------------------------------------------------------------+
|                        BACKEND (Node.js + Express + TS)                           |
|  • Prisma ORM (Type-safe Database Client & Schema Migration)                      |
|  • Socket.io Server (Realtime broadcast sự kiện quét thẻ Turnstile)               |
|  • Node-Cron Jobs (Quét tự động hết hạn 00:00 & tự động mở lại thẻ bảo lưu)      |
|  • JWT Authentication & Dynamic QR Security (Token 60 giây)                       |
+-----------------------------------------------------------------------------------+
                                         │
+-----------------------------------------------------------------------------------+
|                      CƠ SỞ DỮ LIỆU (MySQL 8.0 / Docker)                           |
|  13 bảng chuẩn 3NF: users, roles, packages, memberships, membership_freezes,     |
|  check_ins, leads, trial_bookings, pt_bookings, pt_profiles, member_profiles,    |
|  body_metrics, payments.                                                         |
+-----------------------------------------------------------------------------------+
```

---

## 2. HƯỚNG DẪN CÀI ĐẶT & KHỞI CHẠY HỆ THỐNG

### Cách 1: Xem nhanh giao diện Landing Page (Không cần cài đặt Node.js)
Mở trực tiếp file sau bằng trình duyệt Google Chrome, Edge hoặc Brave:
```
d:\QuanLyGym_LuanVanTN\frontend\landing-page.html
```

---

### Cách 2: Khởi chạy Full-stack (Frontend + Backend + Database)

#### Bước 1: Khởi động Cơ sở dữ liệu MySQL bằng Docker
Mở PowerShell hoặc Command Prompt tại thư mục gốc `d:\QuanLyGym_LuanVanTN`:
```bash
docker compose up -d
```
> *Lưu ý:* Cơ sở dữ liệu MySQL sẽ chạy tại `localhost:3306`, phpMyAdmin quản trị trực quan tại `http://localhost:8080`.

#### Bước 2: Cài đặt và khởi chạy Backend
```bash
cd d:\QuanLyGym_LuanVanTN\backend
npm install
npx prisma db push
npm run prisma:seed
npm run dev
```
> Máy chủ API Backend sẽ chạy tại: `http://localhost:5000` (Kiểm tra sức khỏe hệ thống: `http://localhost:5000/api/health`).

#### Bước 3: Cài đặt và khởi chạy Frontend
Mở một cửa sổ Terminal mới:
```bash
cd d:\QuanLyGym_LuanVanTN\frontend
npm install
npm run dev
```
> Ứng dụng web đa phân hệ sẽ chạy tại: `http://localhost:5173`.

---

## 3. TÀI KHOẢN MẪU ĐỂ BẢO VỆ LUẬN VĂN (SEED DATA)

| Vai trò (Role) | Email / SĐT đăng nhập | Mật khẩu mặc định | Mục đích thử nghiệm |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@citygym.vn` | `Admin@123` | Toàn quyền cấu hình gói tập & xem BI Analytics |
| **Lễ tân (Receptionist)** | `letan@citygym.vn` | `Staff@123` | Quét check-in mã QR tại quầy & bảo lưu thẻ |
| **Huấn luyện viên (PT)** | `pt.tuan@citygym.vn` | `Pt@123456` | Xác nhận buổi dạy 1-1 & cập nhật InBody |
| **Hội viên VIP** | `phuc.vo@stu.edu.vn` (`0901234567`) | `Member@123` | Cổng hội viên: QR động 60s & đặt lịch tập |

---

## 4. KỊCH BẢN DEMO TRÌNH DIỄN HỘI ĐỒNG (TEST SCENARIOS)

1. **Khách vãng lai chuyển đổi (Lead Conversion):**
   - Vào Tab `1. Khách Vãng Lai`, nhập thông tin nhận vé tập thử $\rightarrow$ Nhận mã `TRIAL-xxxxxx`.
   - Chuyển sang Tab `2. Lễ Tân Check-in`, quét mã `TRIAL-xxxxxx` $\rightarrow$ Cửa nhận diện hợp lệ và đổi trạng thái trên Tab `4. CRM Lead Khách Tập Thử`.
   - Tại Tab `4. CRM Lead`, bấm **"Chốt Gói Hội Viên"** $\rightarrow$ Hệ thống lập tức kích hoạt Hợp đồng hội viên mới có mã `HD-2026-xxxx`.

2. **Kiểm soát ra vào Turnstile (Check-in Validation):**
   - Quét số `0901234567` (Võ Duy Phúc) $\rightarrow$ **HỢP LỆ (Màu xanh)**: Gói CityVIP còn hạn.
   - Quét số `0912333444` (Nguyễn Thị Bích) $\rightarrow$ **TỪ CHỐI (Màu xanh dương)**: Gói đang đóng băng bảo lưu.
   - Quét số `0988777666` (Lê Hoàng Nam) $\rightarrow$ **TỪ CHỐI (Màu đỏ)**: Gói đã hết hạn.

3. **Nghiệp vụ Bảo lưu thẻ (Membership Freeze/Unfreeze):**
   - Vào Tab `3. Hợp Đồng & Bảo Lưu`, bấm **"Bảo Lưu"** hợp đồng đang Active $\rightarrow$ Trạng thái chuyển sang FROZEN và khóa quyền quét check-in.
   - Bấm **"Mở Lại (Cộng Bù)"** $\rightarrow$ Hệ thống tự động tính số ngày bảo lưu và cộng bù tương ứng vào ngày kết thúc mới.
   - Bấm **"In HĐ"** $\rightarrow$ Xuất hiện Hợp đồng chuẩn Biểu mẫu 01 Khoa CNTT - STU sẵn sàng in.

4. **Đặt lịch và cấn trừ buổi PT (PT Booking & Deduction):**
   - Vào Tab `5. Cổng Hội Viên`, đặt lịch kèm 1-1 với HLV Nguyễn Minh Tuấn.
   - Chuyển sang Tab `6. Cổng Huấn Luyện Viên`, PT bấm **"Xác Nhận Hoàn Thành"** $\rightarrow$ Số buổi của hội viên Phúc tự động giảm từ 18 còn 17 buổi, hoa hồng của PT tự động tăng thêm +150.000 đ.

5. **Báo cáo kinh doanh thông minh (Executive BI Dashboard):**
   - Xem Tab `7. Dashboard BI Admin` để kiểm tra Biểu đồ nhiệt khung giờ cao điểm (Peak Hours Heatmap) và bảng xếp hạng hoa hồng HLV.

---

## 5. XUẤT TÀI LIỆU LUẬN VĂN WORD (.DOCX) CHUẨN STU

Để xuất file luận văn tốt nghiệp hoàn chỉnh định dạng Word (`.docx`) theo đúng thể thức căn lề `2cm - 2cm - 3cm - 2cm`, font `Times New Roman 13pt`, giãn dòng `1.3 line spacing`:

```bash
cd d:\QuanLyGym_LuanVanTN
python docs/build_docx.py
```
> File Word xuất ra tại: `d:\QuanLyGym_LuanVanTN\docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx`.

