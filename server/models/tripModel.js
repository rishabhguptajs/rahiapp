import mongoose from "mongoose";

/**
 * @fileoverview Trip model schema for MongoDB using Mongoose
 * @module tripModel
 * @requires mongoose
 */

/**
 * Schema definition for a trip
 * 
 * @typedef {Object} Trip
 * @property {string} userId - The ID of the user who created the trip
 * @property {Date} startDate - The start date of the trip
 * @property {Date} endDate - The end date of the trip
 * @property {number} duration - The duration of the trip in days
 * @property {string} location - The location of the trip
 * @property {number} totalBudget - The total budget for the trip
 * @property {Array<string>} interests - List of interests for the trip
 * @property {Array<Object>} itinerary - The itinerary for the trip
 * @property {Array<Object>} discounts - List of discounts applicable to the trip
 * @property {Date} createdAt - The date the trip was created
 * @property {Date} updatedAt - The date the trip was last updated
 */

const tripSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  duration: { type: Number, required: true },
  location: { type: String, required: true },
  totalBudget: { type: Number, required: true, default: 1000 },
  interests: [{ type: String, required: true }],
  itinerary: [{
    day: { type: Number, required: true },
    cost: { type: Number, required: true },
    morning: {
      activities: [{ name: { type: String, required: true } }],
      accommodations: [{ name: { type: String, required: true } }],
      dining: [{ name: { type: String, required: true } }],
      transportation: [{ name: { type: String, required: true } }]
    },
    afternoon: {
      activities: [{ name: { type: String, required: true } }],
      accommodations: [{ name: { type: String, required: true } }],
      dining: [{ name: { type: String, required: true } }],
      transportation: [{ name: { type: String, required: true } }]
    },
    evening: {
      activities: [{ name: { type: String, required: true } }],
      accommodations: [{ name: { type: String, required: true } }],
      dining: [{ name: { type: String, required: true } }],
      transportation: [{ name: { type: String, required: true } }]
    },
    night: {
      activities: [{ name: { type: String, required: true } }],
      accommodations: [{ name: { type: String, required: true } }],
      dining: [{ name: { type: String, required: true } }],
      transportation: [{ name: { type: String, required: true } }]
    }
  }],
  discounts: [{
    code: { type: String },
    amount: { type: Number }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;
