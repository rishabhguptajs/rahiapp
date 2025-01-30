import User from "../models/userModel.js";
import Waitlist from "../models/waitlistModel.js";
import Trip from "../models/tripModel.js";
import generateTrip from "../helpers/tripGenerator.js";
import { upload_on_cloudinary } from "../utils/cloudinary.utils.js";

/**
 * Creates a new user in the system.
 * 
 * @async
 * @param {Object} req - The request object containing user details.
 * @param {Object} res - The response object used to send back the created user data.
 * @throws {Error} If the user already exists or if there is a server error.
 */
export const createUser = async (req, res) => {
    try {
        const { userId, email } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const waitlistUser = await Waitlist.findOne({ email });

        let user;
        if (waitlistUser) {
            const startDate = Date.now();
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 28);

            user = await User.create({
                userId,
                email,
                membership: {
                    type: 'premium',
                    startDate: startDate,
                    endDate: endDate
                }
            });

            return res.status(201).json({
                user,
                message: "Congratulations! You have been rewarded with a premium membership for 28 days."
            })
        } else {
            user = await User.create({ userId, email });
        }

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Creates a new trip for a user.
 * 
 * @async
 * @param {Object} req - The request object containing trip details.
 * @param {Object} res - The response object used to send back the created trip data.
 * @throws {Error} If the user is not found, or if there is a server error.
 */
export const createTrip = async (req, res) => {
    try {
        const { userId, location, accommodation, startDate, totalBudget, duration, interests } = req.body;

        const user = await User.findOne({ userId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.membership.type === 'free') {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const tripsThisMonth = user.trips.filter(trip => {
                const tripDate = new Date(trip.date);
                return tripDate.getMonth() === currentMonth && tripDate.getFullYear() === currentYear;
            });

            if (tripsThisMonth.length >= 3) {
                return res.status(403).json({ message: "Basic users are limited to 3 itineraries per month." });
            }

            interests.length = Math.min(interests.length, 5);
        }

        const durationInDays = parseInt(duration);

        const tripGen = await generateTrip(location, accommodation, durationInDays, interests, totalBudget);

        const validatedItinerary = tripGen.map(day => ({
            day: day.day,
            cost: day.cost,
            morning: {
                activities: user.membership.type === 'free' ? day.morning?.activities.slice(0, 5) : day.morning?.activities,
                accommodations: day.morning?.accommodations || [],
                dining: day.morning?.dining || [],
                transportation: day.morning?.transportation || []
            },
            afternoon: {
                activities: user.membership.type === 'free' ? day.afternoon?.activities.slice(0, 5) : day.afternoon?.activities,
                accommodations: day.afternoon?.accommodations || [],
                dining: day.afternoon?.dining || [],
                transportation: day.afternoon?.transportation || []
            },
            evening: {
                activities: user.membership.type === 'free' ? day.evening?.activities.slice(0, 5) : day.evening?.activities,
                accommodations: day.evening?.accommodations || [],
                dining: day.evening?.dining || [],
                transportation: day.evening?.transportation || []
            },
            night: {
                activities: user.membership.type === 'free' ? day.night?.activities.slice(0, 5) : day.night?.activities,
                accommodations: day.night?.accommodations || [],
                dining: day.night?.dining || [],
                transportation: day.night?.transportation || []
            }
        }));

        const trip = await Trip.create({
            userId: userId,
            startDate: new Date(startDate),
            endDate: new Date(new Date(startDate).setDate(new Date(startDate).getDate() + durationInDays)),
            duration: durationInDays,
            location,
            totalBudget: parseInt(totalBudget),
            itinerary: validatedItinerary,
            interests
        });

        await User.findOneAndUpdate({ userId: userId }, {
            $push: {
                trips: {
                    tripId: trip._id,
                    date: trip.startDate,
                    createdAt: trip.createdAt,
                    location: trip.location,
                    duration: trip.duration,
                    budget: trip.totalBudget,
                    interests: trip.interests,
                    dietaryPreferences: [],
                    accomodationPreferences: [],
                    travelPreferences: []
                }
            }
        }, { new: true });

        res.status(201).json({ tripId: trip._id, message: "Trip created successfully" });
    } catch (error) {
        console.error('Error creating trip:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Retrieves the details of a specific trip.
 * 
 * @async
 * @param {Object} req - The request object containing the trip ID.
 * @param {Object} res - The response object used to send back the trip details.
 * @throws {Error} If the trip is not found or if there is a server error.
 */
export const getTripDetails = async (req, res) => {
    try {
        const tripId = req.params.tripId;

        const trip = await Trip.findOne({ _id: tripId });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(trip);
    } catch (error) {
        console.error('Error fetching trip details:', error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * Adds an activity to a specific trip.
 * 
 * @async
 * @param {Object} req - The request object containing trip ID, day, time of day, and activity.
 * @param {Object} res - The response object used to send back the updated trip data.
 * @throws {Error} If the trip is not found or if there is a server error.
 */
export const addActivityToTrip = async (req, res) => {
    try {
        const { tripId, day, timeOfDay, activity } = req.body;

        const trip = await Trip.findOne({ _id: tripId });

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, {
            $push: {
                [`itinerary.${day}.${timeOfDay}.activities`]: activity
            }
        }, { new: true });

        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error('Error adding activity to trip:', error);
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieves the details of a specific user.
 * 
 * @async
 * @param {Object} req - The request object containing the user ID.
 * @param {Object} res - The response object used to send back the user details.
 * @throws {Error} If the user is not found or if there is a server error.
 */
export const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Retrieves the details of a user's specific trip.
 * 
 * @async
 * @param {Object} req - The request object containing the trip ID.
 * @param {Object} res - The response object used to send back the trip details.
 * @throws {Error} If the trip is not found or if there is a server error.
 */
export const getUserTripDetails = async (req, res) => {
    try {
        const tripId = req.params.tripId;

        const trip = await Trip.findOne({ _id: tripId }).lean();

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(trip);
    } catch (error) {
        console.error("Error fetching trip:", error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * Updates the preferences of a specific user.
 * 
 * @async
 * @param {Object} req - The request object containing user ID and preferences.
 * @param {Object} res - The response object used to send back the updated user data.
 * @throws {Error} If the user is not found or if there is a server error.
 */
export const updateUserPreferences = async(req, res) => {
    try {
        const userId = req.params.id;
        const { preferences } = req.body;

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findOneAndUpdate({ userId }, {
            preferences
        }, { new: true });

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Deletes a specific trip from a user's account.
 * 
 * @async
 * @param {Object} req - The request object containing the trip ID.
 * @param {Object} res - The response object used to send back the deletion confirmation.
 * @throws {Error} If the trip is not found or if there is a server error.
 */
export const deleteTrip = async (req, res) => {
    try {
        const tripId = req.params.tripId;

        const user = await User.findOne({ "trips._id": tripId });

        if (!user) {
            return res.status(404).json({ message: "Trip not found" });
        }

        await Trip.findOneAndDelete({ _id: tripId });

        await User.findOneAndUpdate({ "trips._id": tripId }, {
            $pull: {
                trips: { _id: tripId }
            }
        });

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



export const updateImage = async (req, res) => {
    try {
        // Check if userId is provided in the request params
        const userId = req.body;
        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Check if a file is uploaded
        const filebuffer = req.file ? req.file.buffer : null;
        if (!filebuffer) {
            return res.status(400).json({ error: "No image file uploaded." });
        }

        // Upload image to Cloudinary
        const uploaded_url = await upload_on_cloudinary(filebuffer);
        if (!uploaded_url) {
            return res.status(500).json({ error: "Failed to upload image to Cloudinary." });
        }

        // Find the user by ID
        const fetchedUser = await User.findById(userId);
        if (!fetchedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        // Update the user's image URL
        fetchedUser.image = uploaded_url;

        // Save the updated user
        await fetchedUser.save();

        // Return success response
        res.status(200).json({ message: "Image updated successfully.", imageUrl: uploaded_url });
    } catch (error) {
        console.error("Error updating image:", error);

        // Handle specific errors
        if (error.name === "CastError") {
            return res.status(400).json({ error: "Invalid user ID format." });
        }

        // Generic error response
        res.status(500).json({ error: "Internal server error." });
    }
};