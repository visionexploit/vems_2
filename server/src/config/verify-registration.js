const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function verifyRegistration() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'Lucky200%man',
      database: process.env.DB_NAME || 'vems_db'
    });

    console.log('Connected to database');

    // Get all users
    const [users] = await connection.query('SELECT * FROM users');
    console.log('\nAll users in database:');
    users.forEach(user => {
      console.log({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        password_length: user.password.length
      });
    });

    // Test password verification for each user
    console.log('\nTesting password verification:');
    for (const user of users) {
      const testPassword = 'password123'; // The password you're using
      const isValid = await bcrypt.compare(testPassword, user.password);
      console.log(`User ${user.email}: Password verification ${isValid ? 'SUCCESSFUL' : 'FAILED'}`);
    }

  } catch (error) {
    console.error('Error verifying registration:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

verifyRegistration(); 