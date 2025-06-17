const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

// Helper function to generate a unique 7-digit ID
async function generateUniqueStudentId() {
  let isUnique = false;
  let id;
  while (!isUnique) {
    id = Math.floor(1000000 + Math.random() * 9000000).toString(); // Generates a 7-digit number
    const [rows] = await pool.query('SELECT id FROM students WHERE id = ?', [id]);
    if (rows.length === 0) {
      isUnique = true;
    }
  }
  return id;
}

// Get all students
router.get('/', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT 
        id, 
        first_name,
        last_name,
        email, 
        phone_number, 
        gender, 
        nationality, 
        date_of_birth, 
        passport_number, 
        address, 
        education_level,
        status,
        created_at, 
        updated_at
      FROM students
      ORDER BY id DESC
    `);

    // Format the response to match the frontend expectations
    const formattedStudents = students.map(student => ({
      id: student.id,
      first_name: student.first_name || '',
      last_name: student.last_name || '',
      email: student.email,
      phone_number: student.phone_number,
      gender: student.gender,
      nationality: student.nationality,
      date_of_birth: student.date_of_birth,
      passport_number: student.passport_number,
      address: student.address,
      education_level: student.education_level,
      status: student.status || 'pending',
      created_at: student.created_at,
      updated_at: student.updated_at,
      // Add full_name for filtering/display on frontend
      full_name: `${student.first_name} ${student.last_name}`.trim()
    }));

    res.json(formattedStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ 
      message: 'Error fetching students', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    gender,
    nationality,
    date_of_birth,
    passport_number,
    address,
    education_level,
    status = 'pending' // Default status for new students
  } = req.body;

  console.log('Received student data:', req.body); // Debug log

  // Check each required field individually
  const requiredFields = {
    first_name,
    last_name,
    email,
    password,
    phone_number,
    gender,
    nationality,
    date_of_birth,
    education_level
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    console.log('Missing required fields:', missingFields); // Debug log
    return res.status(400).json({ 
      message: 'All required fields must be provided.',
      missingFields 
    });
  }

  try {
    // Generate unique 7-digit student ID
    const student_id = await generateUniqueStudentId();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new student directly into the students table
    const [result] = await pool.query(
      `INSERT INTO students (
        id,
        first_name,
        last_name,
        email,
        password,
        phone_number,
        gender,
        nationality,
        date_of_birth,
        passport_number,
        address,
        education_level,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_id,
        first_name,
        last_name,
        email,
        hashedPassword,
        phone_number,
        gender,
        nationality,
        date_of_birth,
        passport_number,
        address || null,
        education_level,
        status
      ]
    );

    // Fetch the newly created student for response
    const [newStudent] = await pool.query(
      `SELECT 
        id, 
        first_name,
        last_name,
        email, 
        phone_number, 
        gender, 
        nationality, 
        date_of_birth, 
        passport_number, 
        address, 
        education_level,
        status,
        created_at, 
        updated_at
      FROM students
      WHERE id = ?`,
      [student_id]
    );

    // Format the response (password should not be returned)
    const formattedStudent = {
      id: newStudent[0].id,
      first_name: newStudent[0].first_name,
      last_name: newStudent[0].last_name,
      email: newStudent[0].email,
      phone_number: newStudent[0].phone_number,
      gender: newStudent[0].gender,
      nationality: newStudent[0].nationality,
      date_of_birth: newStudent[0].date_of_birth,
      passport_number: newStudent[0].passport_number,
      address: newStudent[0].address,
      education_level: newStudent[0].education_level,
      status: newStudent[0].status,
      created_at: newStudent[0].created_at,
      updated_at: newStudent[0].updated_at,
      full_name: `${newStudent[0].first_name} ${newStudent[0].last_name}`.trim()
    };

    console.log('Sending response:', formattedStudent); // Debug log
    res.status(201).json(formattedStudent);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ 
      message: 'Failed to add student', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update a student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    phone_number,
    gender,
    nationality,
    date_of_birth,
    passport_number,
    address,
    education_level,
    status
  } = req.body;

  // Optional: Password change if provided
  let passwordUpdate = '';
  let passwordValue = [];
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    passwordUpdate = ', password = ?';
    passwordValue = [hashedPassword];
  }

  try {
    const [result] = await pool.query(
      `UPDATE students SET 
        first_name = ?,
        last_name = ?,
        email = ?,
        phone_number = ?, 
        gender = ?, 
        nationality = ?, 
        date_of_birth = ?, 
        passport_number = ?,
        address = ?,
        education_level = ?,
        status = ?
        ${passwordUpdate}
      WHERE id = ?`,
      [
        first_name,
        last_name,
        email,
        phone_number,
        gender,
        nationality,
        date_of_birth,
        passport_number,
        address || null,
        education_level,
        status,
        ...passwordValue,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch the updated student
    const [updatedStudent] = await pool.query(
      `SELECT 
        id, 
        first_name,
        last_name,
        email, 
        phone_number, 
        gender, 
        nationality, 
        date_of_birth, 
        passport_number, 
        address, 
        education_level,
        status,
        created_at, 
        updated_at
      FROM students
      WHERE id = ?`,
      [id]
    );

    const formattedStudent = {
      id: updatedStudent[0].id,
      first_name: updatedStudent[0].first_name,
      last_name: updatedStudent[0].last_name,
      email: updatedStudent[0].email,
      phone_number: updatedStudent[0].phone_number,
      gender: updatedStudent[0].gender,
      nationality: updatedStudent[0].nationality,
      date_of_birth: updatedStudent[0].date_of_birth,
      passport_number: updatedStudent[0].passport_number,
      address: updatedStudent[0].address,
      education_level: updatedStudent[0].education_level,
      status: updatedStudent[0].status,
      created_at: updatedStudent[0].created_at,
      updated_at: updatedStudent[0].updated_at,
      full_name: `${updatedStudent[0].first_name} ${updatedStudent[0].last_name}`.trim()
    };

    res.json(formattedStudent);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ 
      message: 'Failed to update student', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Delete a student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM students WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ 
      message: 'Failed to delete student', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router; 