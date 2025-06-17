const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const studentsRoutes = require('./routes/students');
const universitiesRoutes = require('./routes/universities');
const departmentsRoutes = require('./routes/departments');
const applicationsRoutes = require('./routes/applications');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test database connection
testConnection();

// Routes
app.use('/api/test', require('./routes/test'));
app.use('/api/auth', authRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/universities', universitiesRoutes);
app.use('/api/departments', departmentsRoutes);
app.use('/api/applications', applicationsRoutes);

// Root route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Something went wrong',
      details: err.details || {}
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Test the server at: http://localhost:${PORT}`);
  console.log(`Test route at: http://localhost:${PORT}/api/test`);
}); 