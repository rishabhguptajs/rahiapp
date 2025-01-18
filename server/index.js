/**
 * @fileoverview Main server file for initializing the Express application
 * @module index
 * @requires express
 * @requires dotenv
 * @requires cors
 * @requires ./config/db.js
 * @requires ./routes/waitlistRoutes.js
 * @requires ./routes/authRoutes.js
 * @requires ./routes/blogRoutes.js
 * @requires ./routes/routeRoutes.js
 * @requires ./routes/placeRoutes.js
 * @requires ./routes/userRoutes.js
 * @requires ./routes/hotelRoutes.js
 * @requires express-rate-limit
 * @requires morgan
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import waitlistRoutes from './routes/waitlistRoutes.js';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import userRoutes from './routes/userRoutes.js';
import hotelRoutes from './routes/hotelRoutes.js';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Rate limiter middleware to limit repeated requests
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after a minute.',
  headers: true, // Send rate limit info in the response headers
});

// Apply rate limiting middleware
app.use(limiter);
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(morgan('combined')); // Log HTTP requests

// Default route for testing
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define API routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);

// Set the port for the server
const port = process.env.PORT || 10000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});