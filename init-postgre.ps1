#!/usr/bin/env pwsh
# Script pour initialiser PostgreSQL avec la base postitdb

$env:PATH += ";C:\Program Files\PostgreSQL\17\bin"

Write-Host "Initialisation de PostgreSQL pour l'application PostIt..." -ForegroundColor Cyan

# Essayer avec mot de passe vide
Write-Host "`nTentative 1: Connexion sans mot de passe..." -ForegroundColor Yellow
$env:PGPASSWORD = ""
$result = psql -U postgres -h localhost -c "SELECT version();" 2>&1

if ($result -match "PostgreSQL") {
    Write-Host "Connexion réussie sans mot de passe!" -ForegroundColor Green
} else {
    Write-Host "Essai 2: Utilisation du mot de passe 'postgres'..." -ForegroundColor Yellow
    $env:PGPASSWORD = "postgres"
    $result = psql -U postgres -h localhost -c "SELECT version();" 2>&1
    
    if ($result -match "PostgreSQL") {
        Write-Host "Connexion réussie avec mot de passe 'postgres'!" -ForegroundColor Green
    } else {
        Write-Host "ERREUR: Impossible de se connecter à PostgreSQL" -ForegroundColor Red
        Write-Host "Veuillez vérifier que PostgreSQL est démarré et configuré correctement" -ForegroundColor Red
        exit 1
    }
}

# Créer la base de données
Write-Host "`nCréation de la base de données 'postitdb'..." -ForegroundColor Yellow
psql -U postgres -h localhost -c "CREATE DATABASE postitdb;" 2>&1

# Vérifier
$checkDb = psql -U postgres -h localhost -l 2>&1 | Select-String 'postitdb'
if ($checkDb) {
    Write-Host "Base de données 'postitdb' créée avec succès!" -ForegroundColor Green
} else {
    Write-Host "Base de données 'postitdb' existe peut-être déjà" -ForegroundColor Cyan
}

# Lancer l'initialisation de l'application
Write-Host "`nLancement de npm run init-db..." -ForegroundColor Yellow
cd c:\Users\hocin\secure-postit-app
npm run init-db

Write-Host "`nInitialisation terminée!" -ForegroundColor Green
