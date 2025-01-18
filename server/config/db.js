/**
 * @fileoverview Database connection module for MongoDB
 * @module db
 * @requires mongoose
 */

import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the URI from environment variables.
 * 
 * @async
 * @throws {Error} If the connection to the database fails.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

export default connectDB;