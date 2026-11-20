@echo off
title DONG BO CODE LEN GITHUB - CITYGYM STU
cd /d "%~dp0"

echo [1/3] Kiem tra va them toan bo file thay doi...
git add -A

echo [2/3] Tao commit moi...
git commit -m "Bao mat: Giau duong dan Admin vao hash #admin, xoa RoleSwitcher, phan quyen nghiem ngat Admin/LeTan/HLV/HoiVien"

echo [3/3] Day code len GitHub...
git push origin main

echo.
echo ==============================================
echo DA DAY CODE LEN GITHUB THANH CONG!
echo Vercel se tu dong build lai website trong 15s.
echo ==============================================
pause
