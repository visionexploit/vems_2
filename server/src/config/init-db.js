const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const { config } = require('./db');

async function initDatabase() {
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    multipleStatements: true
  });

  try {
    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
    await connection.query(`USE ${config.database}`);

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
        status ENUM('active', 'pending', 'inactive') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Database and tables initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

initDatabase()
  .then(() => {
    console.log('Database initialization completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }); 