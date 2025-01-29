import mongoose from "mongoose";

/**
 * @fileoverview User model schema for MongoDB using Mongoose
 * @module userModel
 * @requires mongoose
 */

/**
 * Schema definition for a user
 * 
 * @typedef {Object} User
 * @property {string} userId - The unique identifier for the user
 * @property {string} email - The email address of the user
 * @property {string} image - The profile picture url of the user 
 * @property {Object} preferences - User preferences for travel
 * @property {Object} preferences.budget - Budget preferences
 * @property {number} preferences.budget.min - Minimum budget
 * @property {number} preferences.budget.max - Maximum budget
 * @property {Array<string>} preferences.interests - List of user interests
 * @property {Array<string>} preferences.dietaryPreferences - User's dietary preferences
 * @property {Array<string>} preferences.accomodationPreferences - User's accommodation preferences
 * @property {Array<string>} preferences.travelPreferences - User's travel preferences
 * @property {Array<Object>} trips - List of trips associated with the user
 * @property {ObjectId} trips.tripId - The ID of the trip
 * @property {Date} trips.date - The date of the trip
 * @property {Date} trips.createdAt - The date the trip was created
 * @property {string} trips.location - The location of the trip
 * @property {number} trips.duration - The duration of the trip in days
 * @property {number} trips.budget - The budget for the trip
 * @property {Array<string>} trips.interests - Interests for the trip
 * @property {Array<string>} trips.dietaryPreferences - Dietary preferences for the trip
 * @property {Array<string>} trips.accomodationPreferences - Accommodation preferences for the trip
 * @property {Array<string>} trips.travelPreferences - Travel preferences for the trip
 * @property {Array<ObjectId>} friends - List of friends associated with the user
 * @property {Object} membership - Membership details of the user
 * @property {string} membership.type - Type of membership (free or premium)
 * @property {Date} membership.startDate - Start date of the membership
 * @property {Date} membership.endDate - End date of the membership
 * @property {Date} createdAt - The date the user was created
 * @property {Date} updatedAt - The date the user was last updated
 */

const userSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image:{type: String},
    preferences: {
        budget: {
            min: { type: Number, required: true, default: 0 },
            max: { type: Number, required: true, default: 1000 }
        },
        interests: [{ type: String }],
        dietaryPreferences: [{ type: String }],
        accomodationPreferences: [{ type: String }],
        travelPreferences: [{ type: String }],
    },
    trips: [{
        tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
        date: { type: Date, required: true, default: Date.now },
        createdAt: { type: Date, default: Date.now },
        location: { type: String, required: true },
        duration: { type: Number, required: true, default: 1 },
        budget: { type: Number, required: true, default: 0 },
        interests: [{ type: String }],
        dietaryPreferences: [{ type: String }],
        accomodationPreferences: [{ type: String }],
        travelPreferences: [{ type: String }],
    }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    membership: {
        type: { 
            type: String, 
            required: true, 
            enum: ['free', 'premium'], 
            default: 'free' 
        },
        startDate: { type: Date, required: true, default: Date.now },
        endDate: { 
            type: Date, 
            default: function() {
                return this.membership.type === 'free' ? null : Date.now();
            } 
        },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
