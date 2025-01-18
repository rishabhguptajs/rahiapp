import express from 'express';
import { autocompleteController, nearbySearchController, placeDetailsController, textSearchController } from '../controllers/placeController.js';

/**
 * @fileoverview Place routes for handling various place-related queries
 * @module placeRoutes
 * @requires express
 * @requires ../controllers/placeController.js
 */

const router = express.Router();

/**
 * Route for retrieving autocomplete suggestions based on user input
 * @function
 * @name get/autocomplete
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/autocomplete', autocompleteController);

/**
 * Route for retrieving detailed information about a specific place
 * @function
 * @name post/details
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/details', placeDetailsController);

/**
 * Route for searching nearby places based on location
 * @function
 * @name post/nearby
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/nearby', nearbySearchController);

/**
 * Route for performing a text search for places
 * @function
 * @name post/textsearch
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/textsearch', textSearchController);

export default router;