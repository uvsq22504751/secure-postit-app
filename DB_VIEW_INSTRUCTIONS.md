# Instructions pour voir la base de données PostgreSQL

## 1. Via psql (ligne de commande)

Après installation de PostgreSQL, ouvrez un terminal et :

```bash
# Se connecter à la base postit_app
psql -U postgres -d postit_app

# Ou si vous avez un utilisateur spécifique
psql -U votre_username -d postit_app

# Dans psql, commandes utiles :
\l                    # Lister toutes les bases
\c postit_app         # Se connecter à la base
\dt                   # Lister les tables
\d users              # Voir la structure d'une table
SELECT * FROM users;  # Voir les données
\q                    # Quitter
```

## 2. Via pgAdmin (interface graphique)

1. Ouvrez pgAdmin 4
2. Connectez-vous au serveur PostgreSQL (localhost:5432)
3. Naviguez vers Databases > postit_app
4. Explorez les tables et exécutez des requêtes

## 3. Via DBeaver

1. Ouvrez DBeaver
2. Créez une nouvelle connexion PostgreSQL
3. Host: localhost, Port: 5432, Database: postit_app
4. Username/Password selon votre configuration
5. Explorez la base de données

## 4. Via le code Node.js

Vous pouvez ajouter des routes temporaires pour inspecter la DB :

```javascript
// Dans un contrôleur, ajouter :
app.get('/debug/db', async (req, res) => {
  try {
    const users = await all('SELECT * FROM users');
    const boards = await all('SELECT * FROM boards');
    const postits = await all('SELECT * FROM postits');
    res.json({ users, boards, postits });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## Configuration recommandée

Dans votre `.env` :
```
DATABASE_URL=postgresql://postgres:votre_password@localhost:5432/postit_app
```

Ou créez un utilisateur spécifique :
```sql
CREATE USER postit_user WITH PASSWORD 'motdepasse';
CREATE DATABASE postit_app OWNER postit_user;
GRANT ALL PRIVILEGES ON DATABASE postit_app TO postit_user;
```