const bcrypt = require('bcrypt');
const env = require('../config/env');
const userModel = require('../models/userModel');

function validateUsername(username) {
  const cleanUsername = String(username || '').trim().toLowerCase();

  if (!cleanUsername) {
    throw new Error("Nom d'utilisateur requis.");
  }

  if (cleanUsername.length < 3) {
    throw new Error("Le nom d'utilisateur doit contenir au moins 3 caractères.");
  }

  if (cleanUsername.length > 50) {
    throw new Error("Le nom d'utilisateur est trop long.");
  }

  if (!/^[a-z0-9_.-]+$/.test(cleanUsername)) {
    throw new Error("Le nom d'utilisateur contient des caractères non autorisés.");
  }

  if (['guest', 'admin', 'root', 'system'].includes(cleanUsername)) {
    throw new Error("Ce nom d'utilisateur est réservé.");
  }

  return cleanUsername;
}

function validatePassword(password) {
  const cleanPassword = String(password || '');

  if (!cleanPassword) {
    throw new Error('Mot de passe requis.');
  }

  if (cleanPassword.length < 8) {
    throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
  }

  if (cleanPassword.length > 100) {
    throw new Error('Le mot de passe est trop long.');
  }

  if (!/[a-z]/.test(cleanPassword)) {
    throw new Error('Le mot de passe doit contenir au moins une lettre minuscule.');
  }

  if (!/[A-Z]/.test(cleanPassword)) {
    throw new Error('Le mot de passe doit contenir au moins une lettre majuscule.');
  }

  if (!/[0-9]/.test(cleanPassword)) {
    throw new Error('Le mot de passe doit contenir au moins un chiffre.');
  }

  if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(cleanPassword)) {
    throw new Error('Le mot de passe doit contenir au moins un caractère spécial.');
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

  const passwordHash = await bcrypt.hash(cleanPassword, env.bcryptRounds);
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