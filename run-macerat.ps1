# ---------------------------------------------------
# Script tout-en-un MACERAT.S
# ---------------------------------------------------

# Chemins vers les dossiers
$backendDir = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\BACKEND"
$frontendDir = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\FRONTEND ADMIN\frontend-admin"

# Port backend
$backendPort = 10000
$backendUrl = "http://localhost:$backendPort/api/test"

Write-Host "🚀 Démarrage du backend..." -ForegroundColor Cyan
Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd `"$backendDir`"; npm start"

Start-Sleep -Seconds 5

# Vérification backend
Write-Host "🔍 Vérification du backend..."
try {
    $response = Invoke-RestMethod -Uri $backendUrl -Method Get -TimeoutSec 5
    Write-Host "✅ Backend accessible : $($response.message)" -ForegroundColor Green
} catch {
    Write-Host "❌ Backend non accessible sur $backendUrl" -ForegroundColor Red
    Write-Host "⚠️ Vérifie que le serveur backend tourne correctement avant de lancer le frontend." -ForegroundColor Yellow
    exit
}

# Lancement frontend
Write-Host "🚀 Démarrage du frontend..." -ForegroundColor Cyan
Start-Process "powershell" -ArgumentList "-NoExit","-Command","cd `"$frontendDir`"; npm start"

Write-Host "🎯 MACERAT.S : Backend et Frontend en cours d'exécution." -ForegroundColor Green
Write-Host "🖥 Ouvre ton navigateur sur http://localhost:3000 pour tester la connexion admin."
