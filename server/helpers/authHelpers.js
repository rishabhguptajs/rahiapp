/**
 * @fileoverview Authentication helper module for password hashing and comparison
 * @module authHelpers
 * @requires bcryptjs
 */

import bcryptjs from 'bcryptjs';

/**
 * Hashes a password using bcryptjs
 * 
 * @async
 * @param {string} password - The plain text password to be hashed
 * @returns {Promise<string>} The hashed password
 * @throws {Error} If hashing fails
 */
export const hashPassword = async(password) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password
 * 
 * @async
 * @param {string} password - The plain text password to compare
 * @param {string} hashedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} True if the passwords match, false otherwise
 * @throws {Error} If comparison fails
 */
export const comparePasswords = async(password, hashedPassword) => {
    const isMatch = await bcryptjs.compare(password, hashedPassword);

    return isMatch;
}