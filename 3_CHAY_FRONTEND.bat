@echo off
title CITYGYM - 3. FRONTEND (PORT 5173)
cd /d "%~dp0frontend"

echo ===================================================
echo   CITYGYM - KHOI CHAY FRONTEND REACT + VITE
echo ===================================================
echo.

if not exist node_modules (
    echo [THONG BAO] Dang cai dat thu vien Frontend (npm install)...
    echo Vui long cho trong giay lat...
    echo.
    call npm install
)

echo [OK] Dang khoi dong Vite tai http://localhost:5173 ...
echo.
call npm run dev

pause
