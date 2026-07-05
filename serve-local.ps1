# AI Engineer Learning Platform - PowerShell Launcher

Write-Host "" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   AI Engineer Learning Platform Launcher" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check for Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not found." -ForegroundColor Red
    Write-Host "Please install it from: https://nodejs.org/" -ForegroundColor Yellow
    Pause
    exit
}

# 2. Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] node_modules not found. Installing..." -ForegroundColor Cyan
    npm install
}

# 3. Build if needed
if (-not (Test-Path ".next")) {
    Write-Host "[INFO] Building platform..." -ForegroundColor Cyan
    npm run build
}

Write-Host "[SUCCESS] Starting platform..." -ForegroundColor Green
Start-Process "http://localhost:3000"

npm start
