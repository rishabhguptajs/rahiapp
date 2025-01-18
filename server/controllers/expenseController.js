import Expense from "../models/expenseModel.js";
import Participant from "../models/participantModel.js";
import { sendInvitationEmailForExpense } from "../utils/emailService.js";

/**
 * Creates a new expense and sends invitations to participants
 * 
 * @async
 * @param {Object} req - The request object containing expense details
 * @param {Object} res - The response object to send back the result
 * @returns {Promise<void>} Sends a response with the created expense and invited participants
 * @throws {Error} If creation fails
 */
export const createExpense = async (req, res) => {
    try {
        const { whoPaid, amount, description, splitAmong, splitter_name, expenseName } = req.body;

        // Validate required fields
        if (!whoPaid || !amount || !description || !splitAmong || splitAmong.length === 0) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const participantsToInvite = [];
        const existingParticipants = [];

        // Check for existing participants and prepare invitations
        for (const participant of splitAmong) {
            const { name, email } = participant;
            const existingParticipant = await Participant.findOne({ email });

            if (existingParticipant) {
                existingParticipants.push(existingParticipant._id);
            } else {
                participantsToInvite.push({ name, email });
            }
        }

        // Send invitation emails to new participants
        if (participantsToInvite.length > 0) {
            for (const participant of participantsToInvite) {
                await sendInvitationEmailForExpense(participant.email, participant.name, splitter_name, expenseName);
            }
        }

        // Create and save the expense
        const expense = new Expense({
            whoPaid,
            amount,
            description,
            splitAmong: existingParticipants,
            trip: req.body.trip
        });

        await expense.save();

        // Respond with the created expense and invited participants
        res.status(201).json({
            expense,
            invitedParticipants: participantsToInvite
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
}