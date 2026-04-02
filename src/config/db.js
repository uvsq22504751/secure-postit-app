const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const env = require('./env');

const dbDir = path.dirname(env.dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(env.dbPath, (err) => {
  if (err) {
    console.error('Erreur connexion base :', err.message);
  } else {
    console.log('Connexion SQLite réussie');
  }
});

module.exports = db;