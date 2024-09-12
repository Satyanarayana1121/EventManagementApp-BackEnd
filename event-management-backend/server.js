import cors from 'cors';
import express from 'express';
import eventRoutes from './routes/eventRoutes.js';
import { connectDB } from './config/db.js'; // Ensure this path is correct

const app = express();

// Connect to MySQL
connectDB();

// Enable CORS
app.use(cors({ origin: '*' }));

// Middleware to parse JSON
app.use(express.json());

// Event routes
app.use('/api', eventRoutes);  // All routes will be prefixed with /api

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
