# check-backend.ps1 - version propre UTF-8 sans BOM

$backendPath = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\BACKEND"

function Start-Backend {
    Write-Host "🔹 Vérification du backend..."

    $backendProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$backendPath*" }

    if ($backendProcess) {
        Write-Host "✅ Backend déjà en cours d'exécution. PID: $($backendProcess.Id)" -ForegroundColor Green
    } else {
        Write-Host "📦 Lancement du backend..."
        Start-Process "npm" "start" -WorkingDirectory $backendPath
        Start-Sleep -Seconds 3
        $backendProcess = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$backendPath*" }
        if ($backendProcess) {
            Write-Host "✅ Backend lancé avec succès. PID: $($backendProcess.Id)" -ForegroundColor Green
        } else {
            Write-Host "❌ Impossible de lancer le backend." -ForegroundColor Red
        }
    }
}

Start-Backend
