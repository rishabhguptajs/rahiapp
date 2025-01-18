/**
 * @fileoverview Waitlist model schema for MongoDB using Mongoose
 * @module waitlistModel
 * @requires mongoose
 */

/**
 * Schema definition for a waitlist entry
 * 
 * @typedef {Object} Waitlist
 * @property {string} email - The email address of the person on the waitlist
 * @property {string} ipAddress - The IP address of the person on the waitlist
 * @property {Date} createdAt - The date the waitlist entry was created
 */

import mongoose from 'mongoose';

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  ipAddress: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Waitlist = mongoose.model('Waitlist', waitlistSchema);

export default Waitlist;
