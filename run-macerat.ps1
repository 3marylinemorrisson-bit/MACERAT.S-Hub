# run-macerat.ps1
# Script pour lancer backend et frontend MACERAT.S

$projectPath = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub"
$backendPath = "$projectPath\BACKEND"
$frontendPath = "$projectPath\FRONTEND ADMIN\frontend-admin"

function Start-NodeProcess {
    param (
        [string]$path,
        [string]$script = "start"
    )

    Set-Location $path

    if (!(Test-Path "node_modules")) {
        Write-Host "Installing dependencies in $path..."
        npm install
    }

    Write-Host "Launching $path..."
    Start-Process "npm" $script
}

# Lancer le backend
Start-NodeProcess -path $backendPath

# Lancer le frontend
Start-NodeProcess -path $frontendPath

Write-Host "Backend and Frontend are running." -ForegroundColor Green
