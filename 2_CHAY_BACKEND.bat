@echo off
title CITYGYM - 2. BACKEND API (PORT 5000)
cd /d "%~dp0backend"

echo ===================================================
echo   CITYGYM - KHOI CHAY BACKEND API & SOCKET.IO
echo ===================================================
echo.

if not exist node_modules (
    echo [THONG BAO] Dang cai dat thu vien Backend (npm install)...
    call npm install
)

echo [OK] Dang kiem tra database Prisma...
call npx prisma db push --skip-generate 2>nul

echo [OK] Dang khoi dong Backend tai http://localhost:5000 ...
echo.
call npm run dev

pause
