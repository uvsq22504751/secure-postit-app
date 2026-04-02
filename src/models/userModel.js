const { get, run } = require('../db/sqlite');

async function findByUsername(username) {
  
  return get(
    `SELECT id, username, password_hash, created_at
     FROM users
     WHERE username = ?`,
    [username]
  );
}

async function createUser(username, passwordHash) {
  console.log('userModel.createUser appelé avec :', username);

  return run(
    `INSERT INTO users (username, password_hash)
     VALUES (?, ?)`,
    [username, passwordHash]
  );
}

async function createDefaultPermissions(userId) {
  
  return run(
    `INSERT INTO user_permissions (user_id, can_create, can_update, can_delete, is_admin)
     VALUES (?, 1, 1, 1, 0)`,
    [userId]
  );
}

module.exports = {
  findByUsername,
  createUser,
  createDefaultPermissions
};