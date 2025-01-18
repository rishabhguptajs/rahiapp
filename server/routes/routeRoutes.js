import express from 'express';
import { getDirections, getETAandDistance } from '../controllers/routeController.js';

/**
 * @fileoverview Route routes for handling directions and ETA/distance calculations
 * @module routeRoutes
 * @requires express
 * @requires ../controllers/routeController.js
 */

const router = express.Router();

/**
 * Route for retrieving directions between two locations
 * @function
 * @name post/directions
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/directions', getDirections);

/**
 * Route for calculating ETA and distance between two locations
 * @function
 * @name post/eta_distance
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/eta_distance', getETAandDistance);

export default router;
