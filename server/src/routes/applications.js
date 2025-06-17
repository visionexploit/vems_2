const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'photo') {
      if (file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Only PNG images are allowed for photos'));
      }
    } else {
      if (file.mimetype === 'application/pdf') {
        cb(null, true);
      } else {
        cb(new Error('Only PDF files are allowed for documents'));
      }
    }
  }
});

// Get all applications
router.get('/', async (req, res) => {
  try {
    const [applications] = await pool.query(`
      SELECT 
        a.id, 
        a.status, 
        a.submission_date, 
        a.review_date, 
        a.decision_date, 
        a.notes,
        a.program,
        s.first_name, 
        s.last_name,
        s.status as student_status,
        u.name as university_name,
        GROUP_CONCAT(
          JSON_OBJECT(
            'type', d.type,
            'file_name', d.file_name,
            'file_path', d.file_path,
            'status', d.status
          )
        ) as documents
      FROM applications a
      LEFT JOIN students s ON a.student_id = s.id
      LEFT JOIN universities u ON a.university_id = u.id
      LEFT JOIN documents d ON a.id = d.application_id
      GROUP BY a.id
      ORDER BY a.submission_date DESC
    `);

    // Map the results to include full student name and parse documents
    const formattedApplications = applications.map(app => ({
      ...app,
      student_name: `${app.first_name} ${app.last_name}`.trim(),
      documents: app.documents ? JSON.parse(`[${app.documents}]`) : []
    }));

    res.json(formattedApplications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Add a new application
router.post('/', upload.fields([
  { name: 'diploma', maxCount: 1 },
  { name: 'transcript', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  const { student_id, university_id, program, submission_date, status, notes } = req.body;

  if (!student_id || !university_id || !program || !submission_date || !status) {
    return res.status(400).json({ message: 'Student, university, program, submission date, and status are required.' });
  }

  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Insert the application
      const [result] = await connection.query(
        `INSERT INTO applications (
          student_id, university_id, program, submission_date, status, notes
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [student_id, university_id, program, submission_date, status, notes]
      );

      const applicationId = result.insertId;

      // Insert documents if they exist
      if (req.files) {
        const documentTypes = {
          diploma: 'diploma',
          transcript: 'transcript',
          passport: 'passport',
          photo: 'photo'
        };

        for (const [fieldName, files] of Object.entries(req.files)) {
          const file = files[0];
          await connection.query(
            `INSERT INTO documents (
              application_id, type, file_name, file_path, status
            ) VALUES (?, ?, ?, ?, 'pending')`,
            [applicationId, documentTypes[fieldName], file.originalname, file.path]
          );
        }
      }

      // Commit the transaction
      await connection.commit();

      // Fetch the complete application with documents
      const [newApplication] = await connection.query(`
        SELECT 
          a.id, 
          a.status, 
          a.submission_date, 
          a.review_date, 
          a.decision_date, 
          a.notes,
          a.program,
          s.first_name, 
          s.last_name, 
          u.name as university_name,
          GROUP_CONCAT(
            JSON_OBJECT(
              'type', d.type,
              'file_name', d.file_name,
              'file_path', d.file_path,
              'status', d.status
            )
          ) as documents
        FROM applications a
        LEFT JOIN students s ON a.student_id = s.id
        LEFT JOIN universities u ON a.university_id = u.id
        LEFT JOIN documents d ON a.id = d.application_id
        WHERE a.id = ?
        GROUP BY a.id
      `, [applicationId]);

      connection.release();

      const formattedApplication = {
        ...newApplication[0],
        student_name: `${newApplication[0].first_name} ${newApplication[0].last_name}`.trim(),
        documents: newApplication[0].documents ? JSON.parse(`[${newApplication[0].documents}]`) : []
      };

      res.status(201).json(formattedApplication);
    } catch (error) {
      // If there's an error, rollback the transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error adding application:', error);
    res.status(500).json({ message: 'Error adding application' });
  }
});

// Update an application
router.put('/:id', upload.fields([
  { name: 'diploma', maxCount: 1 },
  { name: 'transcript', maxCount: 1 },
  { name: 'passport', maxCount: 1 },
  { name: 'photo', maxCount: 1 }
]), async (req, res) => {
  const { id } = req.params;
  const { student_id, university_id, program, submission_date, status, notes } = req.body;

  if (!student_id || !university_id || !program || !submission_date || !status) {
    return res.status(400).json({ message: 'Student, university, program, submission date, and status are required.' });
  }

  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Update the application
      const [result] = await connection.query(
        `UPDATE applications SET 
          student_id = ?, university_id = ?, program = ?, submission_date = ?, status = ?, notes = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [student_id, university_id, program, submission_date, status, notes, id]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ message: 'Application not found' });
      }

      // Update documents if new files are uploaded
      if (req.files) {
        const documentTypes = {
          diploma: 'diploma',
          transcript: 'transcript',
          passport: 'passport',
          photo: 'photo'
        };

        for (const [fieldName, files] of Object.entries(req.files)) {
          const file = files[0];
          
          // Delete old document if it exists
          await connection.query(
            `DELETE FROM documents WHERE application_id = ? AND type = ?`,
            [id, documentTypes[fieldName]]
          );

          // Insert new document
          await connection.query(
            `INSERT INTO documents (
              application_id, type, file_name, file_path, status
            ) VALUES (?, ?, ?, ?, 'pending')`,
            [id, documentTypes[fieldName], file.originalname, file.path]
          );
        }
      }

      // Commit the transaction
      await connection.commit();

      // Fetch the updated application with documents
      const [updatedApplication] = await connection.query(`
        SELECT 
          a.id, 
          a.status, 
          a.submission_date, 
          a.review_date, 
          a.decision_date, 
          a.notes,
          a.program,
          s.first_name, 
          s.last_name, 
          u.name as university_name,
          GROUP_CONCAT(
            JSON_OBJECT(
              'type', d.type,
              'file_name', d.file_name,
              'file_path', d.file_path,
              'status', d.status
            )
          ) as documents
        FROM applications a
        LEFT JOIN students s ON a.student_id = s.id
        LEFT JOIN universities u ON a.university_id = u.id
        LEFT JOIN documents d ON a.id = d.application_id
        WHERE a.id = ?
        GROUP BY a.id
      `, [id]);

      connection.release();

      const formattedApplication = {
        ...updatedApplication[0],
        student_name: `${updatedApplication[0].first_name} ${updatedApplication[0].last_name}`.trim(),
        documents: updatedApplication[0].documents ? JSON.parse(`[${updatedApplication[0].documents}]`) : []
      };

      res.json(formattedApplication);
    } catch (error) {
      // If there's an error, rollback the transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ message: 'Error updating application' });
  }
});

// Delete an application
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Start a transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Get the documents to delete their files
      const [documents] = await connection.query(
        'SELECT file_path FROM documents WHERE application_id = ?',
        [id]
      );

      // Delete the documents from the database
      await connection.query('DELETE FROM documents WHERE application_id = ?', [id]);

      // Delete the application
      const [result] = await connection.query('DELETE FROM applications WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ message: 'Application not found' });
      }

      // Delete the files from the filesystem
      for (const doc of documents) {
        if (fs.existsSync(doc.file_path)) {
          fs.unlinkSync(doc.file_path);
        }
      }

      // Commit the transaction
      await connection.commit();
      connection.release();

      res.json({ message: 'Application deleted successfully' });
    } catch (error) {
      // If there's an error, rollback the transaction
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Error deleting application' });
  }
});

module.exports = router; 