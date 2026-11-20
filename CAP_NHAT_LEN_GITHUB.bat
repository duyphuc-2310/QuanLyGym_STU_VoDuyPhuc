@echo off
title DONG BO CODE LEN GITHUB - CITYGYM STU
cd /d "%~dp0"

echo [1/3] Kiem tra va them toan bo file thay doi...
git add -A

echo [2/3] Tao commit moi...
git commit -m "Toi uu Landing Page va Admin: Bo the QR Hero va hop vang; Tap thu 0D va Mua goi VietQR dong bo CRM khong can dang ky; 1 chi nhanh STU Campus Q8; Admin cap tai khoan 4 vai tro va 1-click ban Zalo ZNS kem TK MK; Bo sung hinh anh 6 khu tien ich"

echo [3/3] Day code len GitHub...
git push origin main

echo.
echo ==============================================
echo DA DAY CODE LEN GITHUB THANH CONG!
echo Vercel se tu dong build lai website trong 15s.
echo ==============================================
pause
