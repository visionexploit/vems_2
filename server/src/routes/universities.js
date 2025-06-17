const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { auth: authenticateToken, checkRole } = require('../middleware/auth');
const { validateUniversity } = require('../middleware/validation');

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

// Add a new university
router.post('/', validateUniversity, async (req, res) => {
  const {
    name,
    location,
    website,
    university_type,
    diploma_intake_start,
    diploma_intake_end,
    bachelors_intake_start,
    bachelors_intake_end,
    masters_intake_start,
    masters_intake_end,
    phd_intake_start,
    phd_intake_end
  } = req.body;

  try {
    // Check for duplicate university name
    const [existing] = await pool.query(
      'SELECT id FROM universities WHERE name = ?',
      [name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'University with this name already exists' });
    }

    const [result] = await pool.query(
      `INSERT INTO universities (
        name, location, website, university_type,
        diploma_intake_start, diploma_intake_end,
        bachelors_intake_start, bachelors_intake_end,
        masters_intake_start, masters_intake_end,
        phd_intake_start, phd_intake_end
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        location,
        website,
        university_type,
        diploma_intake_start,
        diploma_intake_end,
        bachelors_intake_start,
        bachelors_intake_end,
        masters_intake_start,
        masters_intake_end,
        phd_intake_start,
        phd_intake_end
      ]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      location,
      website,
      university_type,
      diploma_intake_start,
      diploma_intake_end,
      bachelors_intake_start,
      bachelors_intake_end,
      masters_intake_start,
      masters_intake_end,
      phd_intake_start,
      phd_intake_end
    });
  } catch (error) {
    console.error('Error adding university:', error);
    res.status(500).json({ message: 'Error adding university' });
  }
});

// Update a university
router.put('/:id', validateUniversity, async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    website,
    university_type,
    diploma_intake_start,
    diploma_intake_end,
    bachelors_intake_start,
    bachelors_intake_end,
    masters_intake_start,
    masters_intake_end,
    phd_intake_start,
    phd_intake_end
  } = req.body;

  try {
    // Check if university exists
    const [existing] = await pool.query(
      'SELECT id FROM universities WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'University not found' });
    }

    // Check for duplicate name (excluding current university)
    const [duplicate] = await pool.query(
      'SELECT id FROM universities WHERE name = ? AND id != ?',
      [name, id]
    );

    if (duplicate.length > 0) {
      return res.status(400).json({ message: 'University with this name already exists' });
    }

    await pool.query(
      `UPDATE universities SET 
        name = ?,
        location = ?,
        website = ?,
        university_type = ?,
        diploma_intake_start = ?,
        diploma_intake_end = ?,
        bachelors_intake_start = ?,
        bachelors_intake_end = ?,
        masters_intake_start = ?,
        masters_intake_end = ?,
        phd_intake_start = ?,
        phd_intake_end = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        name,
        location,
        website,
        university_type,
        diploma_intake_start,
        diploma_intake_end,
        bachelors_intake_start,
        bachelors_intake_end,
        masters_intake_start,
        masters_intake_end,
        phd_intake_start,
        phd_intake_end,
        id
      ]
    );

    res.json({
      id,
      name,
      location,
      website,
      university_type,
      diploma_intake_start,
      diploma_intake_end,
      bachelors_intake_start,
      bachelors_intake_end,
      masters_intake_start,
      masters_intake_end,
      phd_intake_start,
      phd_intake_end
    });
  } catch (error) {
    console.error('Error updating university:', error);
    res.status(500).json({ message: 'Error updating university' });
  }
});

// Delete a university
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if university exists
    const [existing] = await pool.query(
      'SELECT id FROM universities WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'University not found' });
    }

    await pool.query('DELETE FROM universities WHERE id = ?', [id]);
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Error deleting university:', error);
    res.status(500).json({ message: 'Error deleting university' });
  }
});

module.exports = router; 