@echo off
cd /d "%~dp0"
title CITYGYM - XUAT FILE LUAN VAN WORD CHUAN STU

echo ====================================================================
echo      CITYGYM - BIEN TAP VA XUAT FILE LUAN VAN TOT NGHIEP (STU)
echo ====================================================================
echo.

echo [BUOC 1/3] Kiem tra thu vien python-docx...
python -m pip install python-docx
if %errorlevel% neq 0 (
    echo Dang thu lai voi trinh quan ly goi py...
    py -m pip install python-docx
)

echo.
echo [BUOC 2/3] Dang tong hop va xuat luan van ra file Microsoft Word...
python docs\build_docx.py
if %errorlevel% neq 0 (
    echo Dang thu chay lai bang trinh thuc thi py...
    py docs\build_docx.py
)

echo.
echo [BUOC 3/3] Kiem tra ket qua...
if exist "docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx" (
    echo.
    echo ====================================================================
    echo [THANH CONG] Da tao xong file Word:
    echo  docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx
    echo ====================================================================
    echo.
    echo Dang tu dong mo file Word...
    start "" "docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx"
) else (
    echo.
    echo ====================================================================
    echo [CHU Y] Chua tim thay file docx.
    echo Vui long mo Command Prompt (cmd) va go lenh sau:
    echo     python docs\build_docx.py
    echo hoac:
    echo     py docs\build_docx.py
    echo ====================================================================
)

echo.
pause
