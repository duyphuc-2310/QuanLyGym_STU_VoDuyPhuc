@echo off
cd /d "%~dp0"
title XOA SACH TOAN BO FILE BAT

echo Dang xoa sach toan bo file .bat, .ps1 va file word...
del /s /f /q "*.docx" 2>nul
del /s /f /q "*.doc" 2>nul
del /f /q "run.ps1" 2>nul

for %%i in (*.bat) do if not "%%i"=="%~nx0" del /f /q "%%i"

git add -A 2>nul
git commit -m "Xoa toan bo cac file bat va file rac" 2>nul
git push origin main 2>nul

(goto) 2>nul & del "%~f0"
