# run-backend.ps1 - Lance le backend Node.js sur le port 5000

# ⚠️ UTF-8 sans BOM obligatoire

# Chemin du backend
$backendPath = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Vérifie si node_modules existe
if (!(Test-Path "$backendPath\node_modules")) {
    Write-Host "📦 Installation des dépendances dans $backendPath..."
    Push-Location $backendPath
    npm install
    Pop-Location
}

# Vérifie si un process Node est déjà lancé
$existing = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$backendPath*" }

if ($existing) {
    Write-Host "✅ Node déjà lancé. PID: $($existing.Id)" -ForegroundColor Green
} else {
    Write-Host "🚀 Lancement du backend sur le port 5000..."
    Push-Location $backendPath
    $proc = Start-Process "node" "index.js" -WorkingDirectory $backendPath -PassThru
    Pop-Location
    Start-Sleep -Seconds 3
    Write-Host "✅ Backend lancé. PID: $($proc.Id)" -ForegroundColor Green
}

Write-Host "➡️ Test de connexion au backend..."
try {
    $response = Invoke-RestMethod -Uri http://localhost:5000/api/test -Method Get -TimeoutSec 5
    Write-Host "✅ Backend accessible: $($response.message)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Impossible de joindre le backend sur http://localhost:5000/api/test" -ForegroundColor Red
}
