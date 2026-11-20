@echo off
chcp 65001 >nul
title DONG BO CODE MOI LEN GITHUB - CITYGYM STU
echo ========================================================
echo   HE THONG QUAN LY PHONG GYM - LUAN VAN TOT NGHIEP STU
echo   Tac gia: Vo Duy Phuc ^| GVHD: ThS. Bui Nhat Bang
echo ========================================================
echo.
echo [1/3] Dang kiem tra va them toan bo file thay doi...
git add -A

echo.
echo [2/3] Dang tao commit moi: Chuan hoa luong khach vang lai dang ky tap thu va mua goi tap...
git commit -m "Chuan hoa luong: Tap thu khong can dang nhap; Mua goi tap yeu cau tao tai khoan, thanh toan xong Admin moi cap quyen vao Cong Hoi Vien"

echo.
echo [3/3] Dang day code len GitHub (duyphuc-2310/QuanLyGym_STU_VoDuyPhuc)...
git push origin main

echo.
echo ========================================================
echo   DA DAY CODE LEN GITHUB THANH CONG!
echo   Vercel se tu dong bat dau Build va cap nhat website trong 10 giay.
echo ========================================================
pause
