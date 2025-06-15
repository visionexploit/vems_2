const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { auth: authenticateToken } = require('../middleware/auth');

// Get all students
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [students] = await pool.query('SELECT * FROM students ORDER BY created_at DESC');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add a new student
router.post('/', authenticateToken, async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    university,
    course,
    status,
    avatar_url
  } = req.body;

  console.log('Received student data for addition:', req.body);

  // Basic validation (can be expanded with a validation library like Joi or Yup)
  if (!first_name || !last_name || !email || !phone || !university || !course || !status) {
    console.error('Validation error: Missing required fields', req.body);
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO students (
        first_name, last_name, email, phone, university, course, status, avatar_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, university, course, status, avatar_url]
    );

    const [newStudent] = await pool.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
    console.log('Student added successfully:', newStudent[0]);
    res.status(201).json(newStudent[0]);
  } catch (error) {
    console.error('Error adding student to database:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Email already exists' });
    } else if (error.code === 'ER_BAD_FIELD_ERROR') {
      res.status(400).json({ message: 'Invalid field in request.' });
    } else if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
      res.status(400).json({ message: 'Missing default value for a required field.' });
    } else if (error.code === 'ER_DATA_TOO_LONG') {
      res.status(400).json({ message: 'Data too long for one of the fields.' });
    } else if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
      res.status(400).json({ message: 'Invalid value for ENUM or date field.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred while adding the student.' });
    }
  }
});

// Update a student
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone,
    university,
    course,
    status,
    avatar_url
  } = req.body;

  try {
    await pool.query(
      `UPDATE students SET
        first_name = ?,
        last_name = ?,
        email = ?,
        phone = ?,
        university = ?,
        course = ?,
        status = ?,
        avatar_url = ?
      WHERE id = ?`,
      [first_name, last_name, email, phone, university, course, status, avatar_url, id]
    );

    const [updatedStudent] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
    if (updatedStudent.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Email already exists' });
    } else {
      res.status(500).json({ message: 'Error updating student' });
    }
  }
});

// Delete a student
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Error deleting student' });
  }
});

module.exports = router; 