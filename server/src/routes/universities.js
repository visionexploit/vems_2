const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { auth: authenticateToken, checkRole } = require('../middleware/auth');

// Get all universities
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [universities] = await pool.query('SELECT * FROM universities ORDER BY name ASC');
    res.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    res.status(500).json({ message: 'Error fetching universities' });
  }
});

// Add a new university (Admin only)
router.post('/', authenticateToken, checkRole(['administrator']), async (req, res) => {
  const {
    name,
    country,
    city,
    website,
    contact_email,
    contact_phone,
    number_of_students = 0,
    status = 'pending'
  } = req.body;

  console.log('Received university data for addition:', req.body);

  if (!name || !country) {
    console.error('Validation error: Missing required fields (name or country)', req.body);
    return res.status(400).json({ message: 'University name and country are required.' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO universities (
        name, country, city, website, contact_email, contact_phone, number_of_students, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, country, city, website, contact_email, contact_phone, number_of_students, status]
    );

    const [newUniversity] = await pool.query('SELECT * FROM universities WHERE id = ?', [result.insertId]);
    console.log('University added successfully:', newUniversity[0]);
    res.status(201).json(newUniversity[0]);
  } catch (error) {
    console.error('Error adding university to database:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'University with this name already exists.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred while adding the university.' });
    }
  }
});

// Update a university (Admin only)
router.put('/:id', authenticateToken, checkRole(['administrator']), async (req, res) => {
  const { id } = req.params;
  const {
    name,
    country,
    city,
    website,
    contact_email,
    contact_phone,
    number_of_students,
    status
  } = req.body;

  console.log(`Received university data for update (ID: ${id}):`, req.body);

  if (!name || !country) {
    console.error('Validation error: Missing required fields for update', req.body);
    return res.status(400).json({ message: 'University name and country are required for update.' });
  }

  try {
    const [result] = await pool.query(
      `UPDATE universities SET
        name = ?,
        country = ?,
        city = ?,
        website = ?,
        contact_email = ?,
        contact_phone = ?,
        number_of_students = ?,
        status = ?
      WHERE id = ?`,
      [name, country, city, website, contact_email, contact_phone, number_of_students, status, id]
    );

    if (result.affectedRows === 0) {
      console.log(`University with ID ${id} not found for update.`);
      return res.status(404).json({ message: 'University not found.' });
    }

    const [updatedUniversity] = await pool.query('SELECT * FROM universities WHERE id = ?', [id]);
    console.log('University updated successfully:', updatedUniversity[0]);
    res.json(updatedUniversity[0]);
  } catch (error) {
    console.error('Error updating university in database:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'University with this name already exists.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred while updating the university.' });
    }
  }
});

// Delete a university (Admin only)
router.delete('/:id', authenticateToken, checkRole(['administrator']), async (req, res) => {
  const { id } = req.params;

  console.log(`Received request to delete university with ID: ${id}`);

  try {
    const [result] = await pool.query('DELETE FROM universities WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      console.log(`University with ID ${id} not found for deletion.`);
      return res.status(404).json({ message: 'University not found.' });
    }

    console.log(`University with ID ${id} deleted successfully.`);
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Error deleting university from database:', error);
    res.status(500).json({ message: 'An unexpected error occurred while deleting the university.' });
  }
});

module.exports = router; 