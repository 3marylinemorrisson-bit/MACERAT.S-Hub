# run-macerat.ps1 - Lancement complet Backend + Frontend
# ⚠️ UTF-8 sans BOM obligatoire

# Chemins absolus
$backendPath  = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\BACKEND"
$frontendPath = "C:\Users\user\Desktop\MACERAT.S\PLATEFORM MACERATS\MACERAT.S-Hub\FRONTEND ADMIN\frontend-admin"

function Start-NodeProcess {
    param(
        [string]$Path,
        [string]$Script = "npm start"
    )

    # Vérifier si un node process existe dans ce dossier
    $existing = Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*$Path*" }

    if ($existing) {
        Write-Host "✅ Node déjà lancé dans $Path. PID: $($existing.Id)" -ForegroundColor Green
        return $existing
    }

    # Installer les dépendances si nécessaire
    if (!(Test-Path "$Path\node_modules")) {
        Write-Host "📦 Installation des dépendances dans $Path..."
        Push-Location $Path
        npm install
        Pop-Location
    }

    # Lancer le process
    Write-Host "🚀 Lancement du Node process dans $Path..."
    $proc = Start-Process "npm" "start" -WorkingDirectory $Path -PassThru
    Start-Sleep -Seconds 5
    Write-Host "✅ Node process lancé. PID: $($proc.Id)" -ForegroundColor Green
    return $proc
}

# Lancement backend
$backendProcess = Start-NodeProcess -Path $backendPath

# Lancement frontend
$frontendProcess = Start-NodeProcess -Path $frontendPath

Write-Host "`n🎉 Backend et Frontend sont en cours d'exécution !" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000/api/test"
Write-Host "Frontend: http://localhost:3000"
