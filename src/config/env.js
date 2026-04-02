const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbPath: path.resolve(process.cwd(), process.env.DB_PATH || './data/app.sqlite'),
  adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'admin123',
  sessionSecret: process.env.SESSION_SECRET || 'change-this-secret',
  port: Number(process.env.PORT || 3000),
  bcryptRounds: Number(process.env.BCRYPT_ROUNDS || 12),
  nodeEnv: process.env.NODE_ENV || 'development'
};