const { pool } = require('./database');

const updateRoleEnum = async () => {
  try {
    // First, let's check the current table structure
    console.log('Current table structure:');
    const [beforeColumns] = await pool.execute('DESCRIBE users');
    console.log(beforeColumns);

    // Update the role column ENUM
    await pool.execute(`
      ALTER TABLE users 
      MODIFY COLUMN role ENUM('student', 'staff', 'administrator') NOT NULL
    `);
    console.log('Successfully updated role ENUM');

    // Verify the new table structure
    console.log('\nUpdated table structure:');
    const [afterColumns] = await pool.execute('DESCRIBE users');
    console.log(afterColumns);

  } catch (error) {
    console.error('Error updating role ENUM:', error);
    throw error;
  }
};

// Run the update
updateRoleEnum()
  .then(() => {
    console.log('Role ENUM update completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Role ENUM update failed:', error);
    process.exit(1);
  }); 