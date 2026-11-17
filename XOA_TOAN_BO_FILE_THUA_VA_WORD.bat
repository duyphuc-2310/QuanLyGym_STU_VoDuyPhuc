@echo off
cd /d "%~dp0"
title XOA TOAN BO FILE WORD VA FILE TRUNG LAP

echo =========================================================
echo       CITYGYM - DANG XOA TOAN BO FILE WORD VA FILE THUA
echo =========================================================
echo.

echo [1/3] Xoa toan bo cac file Word (.docx, .doc, ~$*)...
del /s /f /q "*.docx" 2>nul
del /s /f /q "*.doc" 2>nul
del /s /f /q "~$*.*" 2>nul

echo [2/3] Xoa cac file bat/script cu khong con dung...
if exist "DAY_LEN_GITHUB.bat" del /f /q "DAY_LEN_GITHUB.bat"
if exist "DAY_LEN_GITHUB.ps1" del /f /q "DAY_LEN_GITHUB.ps1"
if exist "DOI_TEN_TAC_GIA_GIT.bat" del /f /q "DOI_TEN_TAC_GIA_GIT.bat"
if exist "DON_DEP_FILE_THUA.bat" del /f /q "DON_DEP_FILE_THUA.bat"
if exist "XUAT_LUAN_VAN_WORD.ps1" del /f /q "XUAT_LUAN_VAN_WORD.ps1"
if exist "XUAT_LUAN_VAN_WORD.bat" del /f /q "XUAT_LUAN_VAN_WORD.bat"
if exist "XUAT_LUAN_VAN.py" del /f /q "XUAT_LUAN_VAN.py"

echo.
echo [3/3] Cap nhat len GitHub repository...
git add -A
git commit -m "Don dep: Xoa toan bo file Word va file trung gian, chi giu source code va bat cap nhat" 2>nul
git push origin main 2>nul

echo.
echo =========================================================
echo [HOAN TAT] Thu muc du an da hoan toan sach se!
echo Chi con lai:
echo   - frontend/          (Ma nguon giao dien)
echo   - backend/           (Ma nguon may chu API)
echo   - docs/              (Tai lieu Markdown luan van)
echo   - CAP_NHAT_GITHUB.bat(File BAT duy nhat de cap nhat code)
echo   - CHAY_DU_AN.bat     (File BAT khoi dong du an)
echo =========================================================
echo.
pause
(goto) 2>nul & del "%~f0"

