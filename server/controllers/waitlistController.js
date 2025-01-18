import Waitlist from "../models/waitlistModel.js";

/**
 * Adds a user to the waitlist.
 * 
 * @async
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object used to send back the result of the operation.
 * @throws {Error} If email or IP address is missing, or if there is a server error.
 */
export const waitlistAdd = async (req, res) => {
    const { email, ipAddress } = req.body;

    // Validate input
    if (!email || !ipAddress) {
        return res.status(400).json({ message: 'Email and IP address are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Check if email already exists in the waitlist
    const emailExist = await Waitlist.findOne({ email });
    if (emailExist) {
        return res.status(400).json({ message: 'Email already exists in the waitlist' });
    }

    try {
        // Create a new waitlist entry
        const newWaitlistEntry = new Waitlist({ email, ipAddress });
        await newWaitlistEntry.save();

        return res.status(200).json({ 
            message: 'Successfully joined the waitlist',
            success: true
        });
    } catch (error) {
        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists in the waitlist' });
        }
        // Handle server error
        return res.status(500).json({ 
            message: 'Server error',
            success: false
        });
    }
};
