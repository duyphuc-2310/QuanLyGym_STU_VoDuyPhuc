@echo off
cd /d "%~dp0"
title DON DEP CAC FILE BAT VA FILE WORD TRUNG LAP

echo =========================================================
echo       CITYGYM - DANG DON DEP CAC FILE KHONG CAN THIET
echo =========================================================
echo.

echo [1/3] Dang xoa cac file script trung gian...
if exist "DAY_LEN_GITHUB.bat" del /f /q "DAY_LEN_GITHUB.bat"
if exist "DAY_LEN_GITHUB.ps1" del /f /q "DAY_LEN_GITHUB.ps1"
if exist "DOI_TEN_TAC_GIA_GIT.bat" del /f /q "DOI_TEN_TAC_GIA_GIT.bat"
if exist "XUAT_LUAN_VAN_WORD.ps1" del /f /q "XUAT_LUAN_VAN_WORD.ps1"
if exist "XUAT_LUAN_VAN.py" del /f /q "XUAT_LUAN_VAN.py"

echo [2/3] Dang don dep cac file Word cu / file tam (~$...)...
if exist "Luan_van_tot_nghiep_Gym_C1_C3.docx" del /f /q "Luan_van_tot_nghiep_Gym_C1_C3.docx"
if exist "docs\Luan_van_tot_nghiep_Gym_C1_C3.docx" del /f /q "docs\Luan_van_tot_nghiep_Gym_C1_C3.docx"
if exist "LVTN.docx" del /f /q "LVTN.docx"
if exist "docs\LVTN.docx" del /f /q "docs\LVTN.docx"
del /f /q "~$*.docx" 2>nul
del /f /q "docs\~$*.docx" 2>nul

echo.
echo [3/3] Dang cap nhat lai trang thai len GitHub...
git add .
git commit -m "Don dep cac file trung gian va file tam khong can thiet" 2>nul
git push origin main 2>nul

echo.
echo =========================================================
echo [THANH CONG] Da don dep sach se thu muc du an!
echo.
echo Cac file duoc GIU LAI chinh thuc gom:
echo   - 1_KHOI_DONG_DATABASE.bat  (Khoi dong MySQL)
echo   - 2_CHAY_BACKEND.bat        (Chay Backend API)
echo   - 3_CHAY_FRONTEND.bat       (Chay Frontend React)
echo   - XUAT_LUAN_VAN_WORD.bat    (Xuat file Word Luan Van STU)
echo   - docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx (File Word chinh thuc)
echo =========================================================
echo.
pause
(goto) 2>nul & del "%~f0"

