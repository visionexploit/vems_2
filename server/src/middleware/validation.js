const validateUniversity = (req, res, next) => {
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

  // Required fields
  if (!name || !location || !university_type) {
    return res.status(400).json({
      message: 'University name, location, and type are required'
    });
  }

  // Validate university type
  if (!['public', 'private'].includes(university_type)) {
    return res.status(400).json({
      message: 'University type must be either "public" or "private"'
    });
  }

  // Validate website format if provided
  if (website && !isValidUrl(website)) {
    return res.status(400).json({
      message: 'Invalid website URL format'
    });
  }

  // Validate date ranges
  const dateFields = [
    { start: diploma_intake_start, end: diploma_intake_end, name: 'Diploma' },
    { start: bachelors_intake_start, end: bachelors_intake_end, name: 'Bachelors' },
    { start: masters_intake_start, end: masters_intake_end, name: 'Masters' },
    { start: phd_intake_start, end: phd_intake_end, name: 'PhD' }
  ];

  for (const { start, end, name } of dateFields) {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          message: `Invalid date format for ${name} intake dates`
        });
      }

      if (startDate > endDate) {
        return res.status(400).json({
          message: `${name} intake start date must be before end date`
        });
      }
    }
  }

  next();
};

// Helper function to validate URL format
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  validateUniversity
}; 