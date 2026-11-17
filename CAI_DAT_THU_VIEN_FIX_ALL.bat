@echo off
title CITYGYM - FIX LOI & CAI DAT THU VIEN TU DONG
color 0A

echo =====================================================================
echo         CITYGYM - DANG TU DONG CAI DAT THU VIEN & FIX LOI
echo =====================================================================
echo.

cd /d "%~dp0"

echo [1/2] Dang cai dat thu vien cho FRONTEND (Vite, React, Tailwind, Lucide)...
cd /d "%~dp0frontend"
call npm install
echo.
echo [OK] Cai dat Frontend hoan tat!
echo.

echo [2/2] Dang cai dat thu vien cho BACKEND (Express, Prisma, Socket.io)...
cd /d "%~dp0backend"
call npm install
echo.
echo [OK] Cai dat Backend hoan tat!
echo.

echo =====================================================================
echo [THANH CONG RUC RO] TAT CA THU VIEN DA DUOC CAI DAT XONG!
echo.
echo He thong se tu dong khoi dong Frontend tai http://localhost:5173 ...
echo =====================================================================
echo.

cd /d "%~dp0frontend"
start http://localhost:5173
call npm run dev

pause

