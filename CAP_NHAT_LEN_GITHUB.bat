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
echo [2/3] Dang tao commit moi: He thong phan quyen RBAC - Chi Admin co quyen cap tai khoan HLV va Hoi vien...
git commit -m "Them he thong phan quyen RBAC: Chi Admin co quyen cap tai khoan cho HLV, Hoi vien va Le tan"

echo.
echo [3/3] Dang day code len GitHub (duyphuc-2310/QuanLyGym_STU_VoDuyPhuc)...
git push origin main

echo.
echo ========================================================
echo   DA DAY CODE LEN GITHUB THANH CONG!
echo   Vercel se tu dong bat dau Build va cap nhat website trong 10 giay.
echo ========================================================
pause
