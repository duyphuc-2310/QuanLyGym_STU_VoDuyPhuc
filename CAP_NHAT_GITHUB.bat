@echo off
cd /d "%~dp0"
title CAP NHAT DU AN CITYGYM LEN GITHUB

echo =========================================================
echo       CITYGYM - DANG DONG BO DU AN LEN GITHUB
echo =========================================================
echo.

git add -A
git commit -m "Cap nhat ma nguon du an CITYGYM"
git push origin main

echo.
echo =========================================================
if %errorlevel% equ 0 (
    echo [THANH CONG] Da dong bo ma nguon moi nhat len GitHub!
) else (
    echo [CHUA XONG] Co loi khi dong bo, vui long kiem tra lai.
)
echo =========================================================
echo.
pause

