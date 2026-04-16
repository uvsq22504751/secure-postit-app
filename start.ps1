#!/usr/bin/env pwsh
# Script pour démarrer le projet PostIt avec PostgreSQL

Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Démarrage de l'application PostIt    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan

# Ajouter PostgreSQL au PATH
if (-not ($env:PATH -like "*PostgreSQL*")) {
    $env:PATH += ";C:\Program Files\PostgreSQL\17\bin"
    Write-Host "`n✓ PostgreSQL ajouté au PATH" -ForegroundColor Green
}

# Configurer les variables PostgreSQL
$env:PGPASSWORD = ""
$env:PGUSER = "postgres"
$env:PGHOST = "localhost"
$env:PGDATABASE = "postitdb"

Write-Host "`n📦 Vérification de PostgreSQL..." -ForegroundColor Yellow
$pgTest = psql -U postgres -h localhost -c "SELECT 1;" 2>&1 | Select-String "ERROR"
if ($pgTest) {
    Write-Host "✗ PostgreSQL ne répond pas" -ForegroundColor Red
    Write-Host "  Assurez-vous que le service PostgreSQL est démarré" -ForegroundColor Red
    exit 1
}
Write-Host "✓ PostgreSQL connecté" -ForegroundColor Green

# Démarrer l'application
Write-Host "`n🚀 Démarrage de l'application..." -ForegroundColor Yellow
Write-Host "Accédez à: http://localhost:3000" -ForegroundColor Cyan
Write-Host "`nIdentifiants de test:" -ForegroundColor Cyan
Write-Host "  Admin: admin / admin123" -ForegroundColor Cyan
Write-Host "  Guest: guest / guest-disabled (sans accès)" -ForegroundColor Cyan
Write-Host ""

cd "$PSScriptRoot"
npm run dev
