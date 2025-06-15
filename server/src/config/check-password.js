const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function checkPassword() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Lucky200%man',
      database: process.env.DB_NAME || 'vems_db'
    });

    console.log('Connected to database');

    // Get the admin user's password hash
    const [users] = await connection.query(
      'SELECT password FROM users WHERE email = ?',
      ['admin@example.com']
    );

    if (users.length === 0) {
      console.log('Admin user not found');
      return;
    }

    const storedHash = users[0].password;
    console.log('Stored hash:', storedHash);

    // Test password
    const testPassword = 'password123';
    const isValid = await bcrypt.compare(testPassword, storedHash);
    console.log('Password validation:', { isValid });

  } catch (error) {
    console.error('Error checking password:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkPassword(); 