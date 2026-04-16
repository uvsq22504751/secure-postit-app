const { Pool } = require('pg');
const env = require('./env');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/postitdb',
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

console.log('Using PostgreSQL database');

module.exports = {
  pool
};