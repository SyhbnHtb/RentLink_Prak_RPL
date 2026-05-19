const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function run() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
  } catch (e) {
    console.error('Query error:', e);
  } finally {
    pool.end();
  }
}
run();
