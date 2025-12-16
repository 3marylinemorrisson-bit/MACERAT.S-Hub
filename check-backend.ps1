# check-backend.ps1

# Chemin du backend (adapter si nécessaire)
$backendPath = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\BACKEND"

Write-Host "🚀 Lancement du backend sur le port 5000..." -ForegroundColor Cyan

# Lancer Node.js en arrière-plan
$backendProcess = Start-Process "node" "$backendPath\index.js" -PassThru

# Attendre que le serveur démarre
Start-Sleep -Seconds 2

# Tester la route /api/test
$testUrl = "http://localhost:5000/api/test"

try {
    $response = Invoke-RestMethod -Uri $testUrl -Method Get -TimeoutSec 5
    Write-Host "✅ Backend accessible ! Message reçu : $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend non accessible sur $testUrl" -ForegroundColor Red
    Write-Host "   Vérifie si Node.js écoute bien le port 5000 et que le firewall n'empêche pas les connexions locales."
}

Write-Host "🔹 Backend en cours d'exécution. PID: $($backendProcess.Id)" -ForegroundColor Yellow