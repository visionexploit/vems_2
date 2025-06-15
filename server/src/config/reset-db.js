const mysql = require('mysql2/promise');
require('dotenv').config();

async function resetDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Lucky200%man',
    multipleStatements: true
  });

  try {
    // Drop and recreate database
    await connection.query(`DROP DATABASE IF EXISTS ${process.env.DB_NAME || 'vems_db'}`);
    await connection.query(`CREATE DATABASE ${process.env.DB_NAME || 'vems_db'}`);
    await connection.query(`USE ${process.env.DB_NAME || 'vems_db'}`);

    // Create users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'staff', 'administrator') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create students table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        university VARCHAR(255) NOT NULL,
        course VARCHAR(255) NOT NULL,
        status ENUM('Active', 'Pending', 'Inactive') NOT NULL DEFAULT 'Pending',
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create universities table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS universities (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL UNIQUE,
        country VARCHAR(255) NOT NULL,
        city VARCHAR(255),
        website VARCHAR(255),
        contact_email VARCHAR(255),
        contact_phone VARCHAR(20),
        number_of_students INT DEFAULT 0,
        status ENUM('active', 'pending', 'inactive') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    await connection.query(`
      INSERT INTO universities (name, country, city, website, contact_email, contact_phone, number_of_students, status) VALUES
      ('Istanbul University', 'Turkey', 'Istanbul', 'https://www.istanbul.edu.tr', 'info@istanbul.edu.tr', '+90 212 123 4567', 50000, 'active'),
      ('Bogazici University', 'Turkey', 'Istanbul', 'https://www.boun.edu.tr', 'info@boun.edu.tr', '+90 212 234 5678', 30000, 'active'),
      ('Middle East Technical University', 'Turkey', 'Ankara', 'https://www.metu.edu.tr', 'info@metu.edu.tr', '+90 312 345 6789', 45000, 'active')
    `);

    console.log('Database reset and initialized successfully');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

resetDatabase()
  .then(() => {
    console.log('Database reset completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database reset failed:', error);
    process.exit(1);
  }); 