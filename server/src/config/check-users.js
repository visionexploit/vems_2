const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkUsers() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Lucky200%man',
      database: process.env.DB_NAME || 'vems_db'
    });

    console.log('Connected to database');

    const [users] = await connection.query('SELECT id, name, email, role FROM users');
    console.log('Users in database:', users);

  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUsers(); 