@echo off
chcp 65001 >nul
title [CITYGYM] - XEM NHANH LANDING PAGE TRÊN TRÌNH DUYỆT
color 0F

echo =====================================================================
echo           CITYGYM - HỆ THỐNG QUẢN LÝ PHÒNG TẬP THỂ HÌNH (STU)
echo                XEM TRỰC TIẾP LANDING PAGE TRÊN TRÌNH DUYỆT
echo =====================================================================
echo.
echo Đang mở trang web: frontend\landing-page.html...
echo Không cần cài đặt Node.js hay Docker!
echo.

cd /d "%~dp0"
start "" "frontend\landing-page.html"

timeout /t 2 >nul
exit

