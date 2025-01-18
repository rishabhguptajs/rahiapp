import express from 'express';
import { addressToCoordinates } from '../controllers/geocodeController.js';

/**
 * @fileoverview Geocode routes for converting addresses and coordinates
 * @module geocodeRoutes
 * @requires express
 * @requires ../controllers/geocodeController.js
 */

const router = express.Router();

/**
 * Route for converting an address to coordinates
 * @function
 * @name post/convert-address
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/convert-address', addressToCoordinates);

/**
 * Route for converting coordinates to an address
 * @function
 * @name post/convert-coordinates
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/convert-coordinates', addressToCoordinates);

export default router;