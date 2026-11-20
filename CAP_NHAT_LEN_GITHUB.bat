@echo off
chcp 65001 >nul
title DONG BO GIAO DIEN LANDING PAGE 24/7 KIEU ANYTIME FITNESS LEN GITHUB
echo ========================================================
echo   HE THONG QUAN LY PHONG GYM - LUAN VAN TOT NGHIEP STU
echo   Tac gia: Vo Duy Phuc ^| GVHD: ThS. Bui Nhat Bang
echo ========================================================
echo.
echo [1/3] Dang kiem tra va them cac file thay doi...
git add -A

echo.
echo [2/3] Dang tao commit moi: Nang cap Landing Page chuan Anytime Fitness...
git commit -m "Nang cap toan dien Landing Page chuan Anytime Fitness: 4 tru cot gia tri, thanh tim phong tap 24/7 va he thong chi nhanh"

echo.
echo [3/3] Dang day code len GitHub (duyphuc-2310/QuanLyGym_STU_VoDuyPhuc)...
git push origin main

echo.
echo ========================================================
echo   DA DAY CODE LEN GITHUB THANH CONG!
echo   Vercel se tu dong bat dau Build va cap nhat website trong 10 giay.
echo ========================================================
pause
