const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Auth endpoint is working!' });
});

// Login route
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    console.log('Login attempt received:', {
      email: req.body.email,
      passwordLength: req.body.password?.length
    });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', details: errors.array() } });
    }

    const { email, password } = req.body;

    // Get user from database
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log('Database query result:', {
      foundUsers: users.length,
      userEmail: users[0]?.email,
      userRole: users[0]?.role
    });

    if (users.length === 0) {
      console.log('No user found with email:', email);
      return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    const user = users[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation result:', {
      email: user.email,
      isValid: isValidPassword,
      providedPasswordLength: password.length,
      storedHashLength: user.password.length
    });

    if (!isValidPassword) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ error: { code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' } });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Remove password from user object
    delete user.password;

    console.log('Login successful for user:', {
      id: user.id,
      email: user.email,
      role: user.role
    });

    res.json({ token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'An error occurred during login' } });
  }
});

// Register route
router.post('/register', [
  body('name').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['student', 'staff', 'admin'])
], async (req, res) => {
  try {
    console.log('Registration attempt received:', {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      passwordLength: req.body.password?.length
    });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ error: { code: 'VALIDATION_ERROR', details: errors.array() } });
    }

    const { name, email, password, role } = req.body;

    // Check if user already exists
    try {
      const [existingUsers] = await pool.execute(
        'SELECT id FROM users WHERE email = ?',
        [email]
      );

      if (existingUsers.length > 0) {
        console.log('Email already exists:', email);
        return res.status(400).json({ error: { code: 'EMAIL_EXISTS', message: 'Email already registered' } });
      }
    } catch (dbError) {
      console.error('Database error checking existing user:', dbError);
      throw new Error('Database error checking existing user');
    }

    // Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      throw new Error('Error hashing password');
    }

    // Insert new user
    try {
      console.log('Attempting to insert user with role:', role);
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
      );
      console.log('User created with ID:', result.insertId);

      console.log('Registration successful for:', email);
      res.status(201).json({
        message: 'Registration successful',
        user: {
          id: result.insertId,
          name,
          email,
          role
        }
      });
    } catch (insertError) {
      console.error('Database error inserting user:', {
        error: insertError.message,
        code: insertError.code,
        sqlMessage: insertError.sqlMessage,
        sqlState: insertError.sqlState,
        stack: insertError.stack
      });
      throw new Error(`Database insert error: ${insertError.sqlMessage || insertError.message}`);
    }
  } catch (error) {
    console.error('Registration error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code || 'UNKNOWN_ERROR',
      sqlMessage: error.sqlMessage || '',
      sqlState: error.sqlState || ''
    });
    res.status(500).json({ 
      error: { 
        code: 'INTERNAL_ERROR', 
        message: 'An error occurred during registration',
        details: error.message 
      } 
    });
  }
});

module.exports = router; 