import mysql from 'mysql2/promise';

// Create the connection pool
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'satya',
  database: 'eventDB'
});

// Connect to the database
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL connected...');
    connection.release();  // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
};
