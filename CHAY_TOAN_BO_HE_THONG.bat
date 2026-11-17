@echo off
title CITYGYM - KHOI CHAY HE THONG
cd /d "%~dp0"

echo ===================================================
echo   CITYGYM - HE THONG QUAN LY PHONG TAP (STU)
echo ===================================================
echo.

echo [1/3] Khoi dong Docker MySQL (neu co)...
docker compose up -d 2>nul
echo.

echo [2/3] Mo cua so Backend API...
start "CITYGYM Backend" cmd /k "call 2_CHAY_BACKEND.bat"
timeout /t 2 /nobreak >nul

echo [3/3] Mo cua so Frontend React...
start "CITYGYM Frontend" cmd /k "call 3_CHAY_FRONTEND.bat"

echo.
echo ===================================================
echo   Cua so Frontend dang chay tai http://localhost:5173
echo   Khi cua so Frontend hien "ready in ... ms",
echo   Nhan phim bat ky de mo trinh duyet:
echo ===================================================
echo.
pause

start http://localhost:5173
