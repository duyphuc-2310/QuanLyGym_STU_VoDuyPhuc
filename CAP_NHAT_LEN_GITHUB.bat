@echo off
cd /d "%~dp0"
title CAP NHAT FIX LOI VERCEL LEN GITHUB

echo =========================================================
echo       CITYGYM - DANG DAY MA NGUON FIX LOI LEN GITHUB
echo =========================================================
echo.

git add -A
git commit -m "Fix Vercel deployment: move vite and plugins to dependencies"
git push origin main

echo.
echo =========================================================
if %errorlevel% equ 0 (
    echo [THANH CONG] Da day ban sua loi len GitHub!
    echo Vercel se TU DONG build lai ngay lap tuc sau 30 giay!
) else (
    echo [CHUA XONG] Co loi xay ra khi push, vui long kiem tra.
)
echo =========================================================
echo.
pause
(goto) 2>nul & del "%~f0"

