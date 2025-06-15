const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'Lucky200%man',
  database: 'vems_db'
};

const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = {
  pool,
  config
}; 