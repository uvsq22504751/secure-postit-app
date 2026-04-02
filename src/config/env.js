const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dbPath: path.resolve(process.cwd(), process.env.DB_PATH || './data/app.sqlite'),
  adminDefaultPassword: process.env.ADMIN_DEFAULT_PASSWORD || 'admin123'
};