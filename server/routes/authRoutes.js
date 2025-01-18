/**
 * @fileoverview Authentication routes for handling user login, registration, and email sending
 * @module authRoutes
 * @requires express
 * @requires ../controllers/authController.js
 */

import express from 'express';
import { loginController, mailController, registerController } from '../controllers/authController.js';

const router = express.Router();

/**
 * Route for user registration
 * @function
 * @name post/register
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/register', registerController);

/**
 * Route for user login
 * @function
 * @name post/login
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/login', loginController);

/**
 * Route for sending email
 * @function
 * @name post/sendmail
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/sendmail', mailController);

export default router;