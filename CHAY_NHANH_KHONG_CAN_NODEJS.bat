@echo off
chcp 65001 >nul
title [CITYGYM] - XEM NHANH GIAO DIỆN (KHÔNG CẦN CÀI NODEJS HAY DOCKER)
color 0B

echo =====================================================================
echo           CITYGYM - HỆ THỐNG QUẢN LÝ PHÒNG TẬP THỂ HÌNH (STU)
echo                XEM TRỰC TIẾP TRÊN TRÌNH DUYỆT 100%% HOẠT ĐỘNG
echo =====================================================================
echo.
echo Đang mở giao diện CITYGYM đầy đủ trên trình duyệt của bạn...
echo Bao gồm:
echo   - Trang chủ CityGym (Slogan: No Pain No Gain, Lộ trình 3 tháng)
echo   - Công cụ tính BMI / TDEE trực tiếp
echo   - Bảng giá gói tập & Huấn luyện viên
echo   - Đăng ký vé tập thử 03 ngày 0Đ và nhận mã QR E-Pass
echo.

cd /d "%~dp0"
start "" "frontend\landing-page.html"

echo [HOÀN TẤT] Trình duyệt đã mở trang web!
timeout /t 3 >nul
exit

