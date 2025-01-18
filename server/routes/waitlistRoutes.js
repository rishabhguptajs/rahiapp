import express from 'express';
import { waitlistAdd } from '../controllers/waitlistController.js';

/**
 * @fileoverview Waitlist routes for managing user waitlist operations
 * @module waitlistRoutes
 * @requires express
 * @requires ../controllers/waitlistController.js
 */

const router = express.Router();

/**
 * Route for adding a user to the waitlist
 * @function
 * @name post/join
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/join', waitlistAdd);

export default router;