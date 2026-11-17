@echo off
cd /d "%~dp0"
title DAY DU AN CITYGYM LEN GITHUB

echo =========================================================
echo    CITYGYM - DANG DAY MA NGUON LEN GITHUB REPOSITORY
echo    Repository: duyphuc-2310/QuanLyGym_STU_VoDuyPhuc
echo =========================================================
echo.

echo [1/5] Khoi tao Git...
git init

echo.
echo [2/5] Them toan bo ma nguon vao Git...
git add .

echo.
echo [3/5] Tao ban ghi commit...
git commit -m "Khoi tao he thong quan ly phong gym CITYGYM - Luon Van STU 2026"

echo.
echo [4/5] Cau hinh nhanh main va lien ket Remote GitHub...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/duyphuc-2310/QuanLyGym_STU_VoDuyPhuc.git

echo.
echo [5/5] Dang day toan bo code len GitHub...
echo (Neu co cua so trinh duyet bat len, ban chi can bam Sign in with browser de dang nhap).
git push -u origin main

echo.
echo =========================================================
if %errorlevel% equ 0 (
    echo [THANH CONG] Da day toan bo ma nguon len GitHub thanh cong!
    echo Link repo cua ban: https://github.com/duyphuc-2310/QuanLyGym_STU_VoDuyPhuc
) else (
    echo [CHUA XONG] Vui long kiem tra lai ket noi hoac xac thuc GitHub tren trinh duyet.
)
echo =========================================================
echo.
pause

