const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const BCRYPT_ROUNDS = 10;

function validateUsername(username) {
  const cleanUsername = String(username || '').trim();

  if (!cleanUsername) {
    throw new Error("Nom d'utilisateur requis.");
  }

  if (cleanUsername.length < 3) {
    throw new Error("Le nom d'utilisateur doit contenir au moins 3 caractères.");
  }

  if (cleanUsername.length > 50) {
    throw new Error("Le nom d'utilisateur est trop long.");
  }

  if (cleanUsername.toLowerCase() === 'guest') {
    throw new Error("Le nom guest est réservé.");
  }

  return cleanUsername;
}

function validatePassword(password) {
  const cleanPassword = String(password || '');

  if (!cleanPassword) {
    throw new Error('Mot de passe requis.');
  }

  if (cleanPassword.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
  }

  return cleanPassword;
}

async function registerUser(username, password) {
  const cleanUsername = validateUsername(username);
  const cleanPassword = validatePassword(password);

  const existingUser = await userModel.findByUsername(cleanUsername);

  if (existingUser) {
    throw new Error("Nom d'utilisateur déjà pris.");
  }

  const passwordHash = await bcrypt.hash(cleanPassword, BCRYPT_ROUNDS);

  const insertedUser = await userModel.createUser(cleanUsername, passwordHash);

  await userModel.createDefaultPermissions(insertedUser.lastID);


  return {
    id: insertedUser.lastID,
    username: cleanUsername,
    permissions: {
      canCreate: true,
      canUpdate: true,
      canDelete: true,
      isAdmin: false
    }
  };
}
module.exports = {
  registerUser
};