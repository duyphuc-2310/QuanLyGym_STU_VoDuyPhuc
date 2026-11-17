Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  CITYGYM - CAI DAT THU VIEN & KHOI CHAY HE THONG" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

Set-Location -Path "$PSScriptRoot\frontend"
Write-Host "[1/2] Dang cai dat thu vien Frontend..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "[2/2] Dang khoi dong Frontend tai http://localhost:5173 ..." -ForegroundColor Green
Start-Process "http://localhost:5173"
npm run dev

