import mongoose from "mongoose";

/**
 * @fileoverview Membership model schema for MongoDB using Mongoose
 * @module membershipModel
 * @requires mongoose
 */

/**
 * Schema definition for a membership plan
 * 
 * @typedef {Object} Membership
 * @property {string} planName - The name of the membership plan
 * @property {string} description - A description of the membership plan
 * @property {Array<string>} benefits - List of benefits included in the membership plan
 * @property {number} cost - The cost of the membership plan
 * @property {number} duration - The duration of the membership plan in months
 * @property {Date} createdAt - The date the membership plan was created
 * @property {Date} updatedAt - The date the membership plan was last updated
 */

const membershipSchema = new mongoose.Schema({
    planName: { type: String, required: true },
    description: { type: String },
    benefits: [{ type: String }],
    cost: { type: Number, required: true },
    duration: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
