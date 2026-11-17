@echo off
cd /d "%~dp0frontend"
title CITYGYM - KHOI CHAY UNG DUNG

echo =========================================================
echo       CITYGYM - KHOI CHAY HE THONG WEBSITE QUAN LY
echo =========================================================
echo.
echo Dang khoi dong may chu tai: http://localhost:5173
echo.

call npm run dev
pause

