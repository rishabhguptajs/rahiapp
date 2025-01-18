import express from 'express';
import { getHotels } from '../controllers/hotelController.js';

/**
 * @fileoverview Hotel routes for retrieving hotel information
 * @module hotelRoutes
 * @requires express
 * @requires ../controllers/hotelController.js
 */

const router = express.Router();

/**
 * Route for retrieving hotels based on search criteria
 * @function
 * @name post/get-hotels
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/get-hotels', getHotels);

export default router;