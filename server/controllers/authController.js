import nodemailer from 'nodemailer';
import User from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelpers.js";

/**
 * Handles user registration
 * 
 * @async
 * @param {Object} req - The request object containing user details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the registration result
 * @throws {Error} If registration fails
 */
export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required', success: false });
        }

        if (!email) {
            return res.status(400).json({ message: 'Email is required', success: false });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required', success: false });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters', success: false });
        }

        let hashedPassword = await hashPassword(password); // Await the hashed password

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                name,
                email
            },
            success: true
        });
    } catch (error) {
        console.log('Error in registerController:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

/**
 * Handles user login
 * 
 * @async
 * @param {Object} req - The request object containing login credentials
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the login result
 * @throws {Error} If login fails
 */
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required', success: false });
        }

        if (!password) {
            return res.status(400).json({ message: 'Password is required', success: false });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        const isMatch = await comparePasswords(password, user.password); // Await the password comparison

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password', success: false });
        }

        res.status(200).json({
            message: 'User logged in successfully',
            user: {
                name: user.name,
                email: user.email
            },
            success: true
        });
    } catch (error) {
        console.log('Error in loginController:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};

/**
 * Handles sending emails
 * 
 * @async
 * @param {Object} req - The request object containing email details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the email sending result
 * @throws {Error} If email sending fails
 */
export const mailController = async (req, res) => {
    try {
        const { email, subject, message } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required', success: false });
        }
        if (!subject) {
            return res.status(400).json({ message: 'Subject is required', success: false });
        }
        if (!message) {
            return res.status(400).json({ message: 'Message is required', success: false });
        }

        const account = await nodemailer.createTestAccount();

        const transporterConfig = process.env.NODE_ENV === 'production' ? {
            host: 'us2.smtp.mailhostbox.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        } : {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: account.user,
                pass: account.pass
            }
        };

        const transporter = nodemailer.createTransport(transporterConfig);

        const mailOptions = {
            from: `"Rahi App Support" <app@rahiapp.tech>`,
            to: 'rahitravelapp@gmail.com',
            subject: subject,
            text: `
                Email: ${email}
                Message: ${message}
            `
        };

        const info = await transporter.sendMail(mailOptions);

        const previewUrl = nodemailer.getTestMessageUrl(info);

        res.status(200).json({
            message: 'Email sent successfully',
            success: true,
            previewUrl: process.env.NODE_ENV !== 'production' ? previewUrl : undefined
        });

    } catch (error) {
        console.error('Error in mailController:', error);
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
