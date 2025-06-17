const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const [departments] = await pool.query(`
      SELECT d.*, u.name as university_name 
      FROM departments d
      LEFT JOIN universities u ON d.university_id = u.id
      ORDER BY d.name ASC
    `);
    res.json(departments);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ message: 'Error fetching departments' });
  }
});

// Add a new department
router.post('/', async (req, res) => {
  const { university_id, name, faculty_name, level, duration, tuition_fee, language_of_education, description, requirements } = req.body;

  if (!name || !level || !duration || !university_id) {
    return res.status(400).json({ message: 'Department name, level, duration, and university are required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO departments (
        university_id, name, faculty_name, level, duration, 
        tuition_fee, language_of_education, description, requirements
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        university_id, name, faculty_name, level, duration,
        tuition_fee, language_of_education, description, requirements
      ]
    );
    
    const [newDepartment] = await pool.query(
      `SELECT d.*, u.name as university_name 
       FROM departments d
       LEFT JOIN universities u ON d.university_id = u.id
       WHERE d.id = ?`,
      [result.insertId]
    );

    res.status(201).json(newDepartment[0]);
  } catch (error) {
    console.error('Error adding department:', error);
    res.status(500).json({ message: 'Error adding department' });
  }
});

// Update a department
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { university_id, name, faculty_name, level, duration, tuition_fee, language_of_education, description, requirements } = req.body;

  if (!name || !level || !duration || !university_id) {
    return res.status(400).json({ message: 'Department name, level, duration, and university are required.' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE departments SET 
        university_id = ?, name = ?, faculty_name = ?, level = ?, duration = ?,
        tuition_fee = ?, language_of_education = ?, description = ?, requirements = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        university_id, name, faculty_name, level, duration,
        tuition_fee, language_of_education, description, requirements,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    const [updatedDepartment] = await pool.query(
      `SELECT d.*, u.name as university_name 
       FROM departments d
       LEFT JOIN universities u ON d.university_id = u.id
       WHERE d.id = ?`,
      [id]
    );

    res.json(updatedDepartment[0]);
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ message: 'Error updating department' });
  }
});

// Delete a department
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({ message: 'Error deleting department' });
  }
});

module.exports = router; 