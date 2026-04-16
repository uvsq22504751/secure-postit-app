# Résolution des Problèmes de PostgreSQL

## ✅ Problèmes Résolus

### 1. **Authentification PostgreSQL échouée**
**Problème:** SASL: client password must be a string  
**Solution:** Modification du fichier `pg_hba.conf` pour utiliser l'authentification `trust` au lieu de `scram-sha-256` pour les connexions locales.

**Fichier modifié:** `C:\Program Files\PostgreSQL\17\data\pg_hba.conf`

### 2. **Utilisateur Windows au lieu de PostgreSQL**
**Problème:** le rôle « hocin » n'existe pas  
**Solution:** Spécification explicite de l'utilisateur `postgres` dans la chaîne de connexion PostgreSQL.

**Fichiers modifiés:**
- `src/config/db.js` - Utilisation de `postgresql://postgres@localhost:5432/postitdb`
- `.env` et `.env.example` - Ajout des variables `PGUSER`, `PGHOST`, etc.

### 3. **Colonne ID avec GENERATED ALWAYS**
**Problème:** ne peut pas insérer une valeur non par défaut dans la colonne « id »  
**Solution:** Ajout de `OVERRIDING SYSTEM VALUE` à l'insertion du board.

**Fichier modifié:** `src/db/schema.sql`

## Configuration Finale

### Fichier `.env`
```env
# Application Settings
PORT=3000
NODE_ENV=development
SESSION_SECRET=dev-secret-key-change-in-production
ADMIN_DEFAULT_PASSWORD=admin123

# PostgreSQL Database Configuration
DATABASE_URL=postgresql://postgres@localhost:5432/postitdb
PGUSER=postgres
PGHOST=localhost
PGDATABASE=postitdb
PGPASSWORD=

# HTTPS Configuration
HTTPS_ENABLED=false
HTTPS_KEY_PATH=./certs/key.pem
HTTPS_CERT_PATH=./certs/cert.pem
```

## ✅ Initialisation Réussie

La base de données a été initialisée avec succès:

```
Database initialized successfully.
Admin account: admin / admin123
```

### Tables créées:
- ✅ `users`
- ✅ `boards`
- ✅ `user_permissions`
- ✅ `postits`

### Comptes par défaut:
- **Admin:** admin / admin123
- **Guest:** guest / guest-disabled

## Prochaines Étapes

1. **Démarrer l'application:**
   ```bash
   npm run dev
   ```

2. **Vérifier la base de données:**
   ```bash
   $env:PATH += ";C:\Program Files\PostgreSQL\17\bin"
   $env:PGPASSWORD=""
   psql -U postgres -d postitdb -c "\dt"
   ```

3. **Accéder à l'application:**
   - URL: `http://localhost:3000`
   - Connexion: admin / admin123

## Architecture PostgreSQL Utilisée

- **Type d'authentification:** Trust (pour développement local)
- **Utilisateur principal:** postgres
- **Base de données:** postitdb
- **Type d'ID:** GENERATED ALWAYS AS IDENTITY
- **Timestamps:** TIMESTAMP avec DEFAULT CURRENT_TIMESTAMP
- **Booléens:** Type BOOLEAN natif PostgreSQL
