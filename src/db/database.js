const { pool } = require('../config/db');

function convertPlaceholders(sql) {
  let index = 0;
  return sql.replace(/\?/g, () => {
    index += 1;
    return `$${index}`;
  });
}

async function run(sql, params = []) {
  const finalSql = convertPlaceholders(sql);
  const result = await pool.query(finalSql, params);
  return {
    lastID: result.rows?.[0]?.id || null,
    changes: result.rowCount || 0,
    rows: result.rows || []
  };
}

async function get(sql, params = []) {
  const finalSql = convertPlaceholders(sql);
  const result = await pool.query(finalSql, params);
  return result.rows[0] || null;
}

async function all(sql, params = []) {
  const finalSql = convertPlaceholders(sql);
  const result = await pool.query(finalSql, params);
  return result.rows || [];
}

async function closeConnection() {
  await pool.end();
}

module.exports = {
  run,
  get,
  all,
  closeConnection
};