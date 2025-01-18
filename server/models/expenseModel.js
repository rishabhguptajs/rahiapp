import mongoose from "mongoose";

/**
 * @fileoverview Expense model schema for MongoDB using Mongoose
 * @module expenseModel
 * @requires mongoose
 */

/**
 * Schema definition for an expense
 * 
 * @typedef {Object} Expense
 * @property {ObjectId} whoPaid - The ID of the participant who paid the expense
 * @property {number} amount - The amount of the expense
 * @property {string} description - A description of the expense
 * @property {Array<ObjectId>} splitAmong - List of participants sharing the expense
 * @property {ObjectId} trip - The ID of the trip associated with the expense
 * @property {Date} createdAt - The date the expense was created
 * @property {Date} updatedAt - The date the expense was last updated
 */

const expenseSchema = new mongoose.Schema({
    whoPaid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    splitAmong: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
        required: true,
    }],
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
    },
}, {
    timestamps: true,
})

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;