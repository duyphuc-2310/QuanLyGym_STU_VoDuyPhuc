# Script xuat file Luan Van Word (.docx) STU
Set-Location -Path $PSScriptRoot

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "     CITYGYM - BIEN TAP VA XUAT FILE LUAN VAN TOT NGHIEP (STU)      " -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Kiem tra va cai dat thu vien python-docx neu chua co..." -ForegroundColor Yellow
try {
    python -m pip install python-docx
} catch {
    py -m pip install python-docx
}

Write-Host ""
Write-Host "[2/3] Dang bien tap va xuat luan van thanh file Word..." -ForegroundColor Yellow
python docs\build_docx.py
if ($LASTEXITCODE -ne 0) {
    py docs\build_docx.py
}

Write-Host ""
$docxPath = Join-Path $PSScriptRoot "docs\LuanVan_TotNghiep_STU_VoDuyPhuc.docx"
if (Test-Path $docxPath) {
    Write-Host "====================================================================" -ForegroundColor Green
    Write-Host "[THANH CONG] Da xuat file Word thanh cong tai:" -ForegroundColor Green
    Write-Host " $docxPath" -ForegroundColor White
    Write-Host "====================================================================" -ForegroundColor Green
    Start-Process $docxPath
} else {
    Write-Host "[CHU Y] Kiem tra xem Python da duoc cai dat tren may chua." -ForegroundColor Red
}

Write-Host ""
Read-Host "Nhan Enter de thoat..."

