@echo off
title CITYGYM - 1. DATABASE DOCKER
cd /d "%~dp0"

echo ===================================================
echo   CITYGYM - KHOI DONG MYSQL & PHPMYADMIN (DOCKER)
echo ===================================================
echo.

docker compose up -d

echo.
echo [OK] MySQL: localhost:3306
echo [OK] phpMyAdmin: http://localhost:8080
echo.
pause
