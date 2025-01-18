/**
 * @fileoverview Discount model schema for MongoDB using Mongoose
 * @module discountModel
 * @requires mongoose
 */

import mongoose from "mongoose";

/**
 * Schema definition for a discount
 * 
 * @typedef {Object} Discount
 * @property {string} name - The name of the discount
 * @property {string} description - A description of the discount
 * @property {number} percentage - The percentage of the discount
 * @property {Array<string>} applicableTo - List of items or categories the discount applies to
 * @property {Date} validFrom - The start date of the discount validity
 * @property {Date} validUntil - The end date of the discount validity
 * @property {Date} createdAt - The date the discount was created
 * @property {Date} updatedAt - The date the discount was last updated
 */

const discountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    percentage: { type: Number },
    applicableTo: [{ type: String }],
    validFrom: { type: Date },
    validUntil: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Discount = mongoose.model('Discount', discountSchema);

export default Discount;
