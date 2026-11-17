# Script day code len GitHub tu dong
Set-Location -Path $PSScriptRoot

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   CITYGYM - DANG DAY MA NGUON LEN GITHUB REPOSITORY    " -ForegroundColor Green
Write-Host "   Repository: duyphuc-2310/QuanLyGym_STU_VoDuyPhuc      " -ForegroundColor Yellow
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/5] Khoi tao Git..." -ForegroundColor Yellow
git init

Write-Host "[2/5] Them toan bo file vao Git..." -ForegroundColor Yellow
git add .

Write-Host "[3/5] Tao ban commit..." -ForegroundColor Yellow
git commit -m "Khoi tao he thong quan ly phong gym CITYGYM - Luon Van STU 2026"

Write-Host "[4/5] Cau hinh branch main va remote..." -ForegroundColor Yellow
git branch -M main
git remote remove origin 2>$null
git remote add origin https://github.com/duyphuc-2310/QuanLyGym_STU_VoDuyPhuc.git

Write-Host "[5/5] Dang push len GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "[THANH CONG] Da day toan bo ma nguon len GitHub!" -ForegroundColor Green
    Write-Host "Link repository: https://github.com/duyphuc-2310/QuanLyGym_STU_VoDuyPhuc" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "[CHU Y] Kiem tra lai xac thuc tren trinh duyet neu co." -ForegroundColor Red
}

Write-Host ""
Read-Host "Nhan Enter de hoan tat..."

