/**
 * @fileoverview Participant model schema for MongoDB using Mongoose
 * @module participantModel
 * @requires mongoose
 */

/**
 * Schema definition for a participant
 * 
 * @typedef {Object} Participant
 * @property {string} name - The name of the participant
 * @property {string} email - The email address of the participant
 * @property {Date} createdAt - The date the participant was created
 * @property {Date} updatedAt - The date the participant was last updated
 */

import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;