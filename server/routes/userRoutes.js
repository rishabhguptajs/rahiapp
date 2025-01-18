import express from 'express';
import { createTrip, createUser, getUserDetails, getUserTripDetails, updateUserPreferences, deleteTrip, addActivityToTrip, getTripDetails } from '../controllers/userController.js';

/**
 * @fileoverview User routes for handling user-related operations
 * @module userRoutes
 * @requires express
 * @requires ../controllers/userController.js
 */

const router = express.Router();

/**
 * Route for creating a new user
 * @function
 * @name post/create
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/create', createUser);

/**
 * Route for retrieving user details by user ID
 * @function
 * @name get/details/:id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/details/:id', getUserDetails);

/**
 * Route for updating user preferences by user ID
 * @function
 * @name put/preferences/:id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.put('/preferences/:id', updateUserPreferences);

/**
 * Route for creating a new trip
 * @function
 * @name post/create-trip
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/create-trip', createTrip);

/**
 * Route for retrieving trip details by trip ID
 * @function
 * @name get/trip-details/:tripId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/trip-details/:tripId', getTripDetails);

/**
 * Route for adding an activity to a trip
 * @function
 * @name post/add-activity
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/add-activity', addActivityToTrip);

/**
 * Route for retrieving user trip details by trip ID
 * @function
 * @name get/trip-details/:tripId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/trip-details/:tripId', getUserTripDetails);

/**
 * Route for deleting a trip by trip ID
 * @function
 * @name delete/delete-trip/:tripId
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.delete('/delete-trip/:tripId', deleteTrip);

export default router;