# ==============================
# MACERAT.S - RUN ALL SCRIPT
# ==============================

$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $rootPath "BACKEND"
$frontendPath = Join-Path $rootPath "FRONTEND ADMIN\frontend-admin"

function Start-NodeApp($path) {
    Write-Host "-----------------------------------"
    Write-Host "Starting app in $path"
    Write-Host "-----------------------------------"

    Set-Location $path

    if (!(Test-Path "node_modules")) {
        Write-Host "Installing dependencies..."
        npm install
    }

    Start-Process powershell -ArgumentList "npm start"
}

# Start Backend
Start-NodeApp $backendPath

# Start Frontend
Start-NodeApp $frontendPath

Write-Host "==================================="
Write-Host "BACKEND and FRONTEND are running"
Write-Host "==================================="
