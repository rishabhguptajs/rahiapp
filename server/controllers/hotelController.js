import axios from "axios";
import crypto from 'crypto';
import { autocompleteFullController } from "./placeController.js";

const baseURL = "https://api.test.hotelbeds.com/hotel-api/1.0";

/**
 * Generates a SHA256 signature for API requests.
 * 
 * @param {string} apiKey - The API key for authentication.
 * @param {string} secret - The secret key for generating the signature.
 * @returns {string} The generated signature.
 */
const generateSignature = (apiKey, secret) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const dataToSign = apiKey + secret + timestamp;
  const signature = crypto.createHash('sha256').update(dataToSign).digest('hex');
  return signature;
}

/**
 * Retrieves hotel information based on user input.
 * 
 * @async
 * @param {Object} req - The request object containing stay, location, and occupancies.
 * @param {Object} res - The response object used to send back the hotel data.
 * @throws {Error} If any required information is missing or invalid.
 */
export const getHotels = async (req, res) => {
  try {
    const {
      stay,
      location,
      occupancies
    } = req.body;

    const locationFilter = location.split(",")[0];

    if (!stay || !stay.checkIn || !stay.checkOut) {
      throw new Error("Invalid stay information");
    }

    const geolocation = await autocompleteFullController(locationFilter);

    const latitude = geolocation.predictions[0].geometry.location.lat;
    const longitude = geolocation.predictions[0].geometry.location.lng;
    const radius = 10;
    const unit = "km";

    if (!geolocation || !longitude || !latitude || !radius || !unit) {
      throw new Error("Invalid geolocation information");
    }

    if (!occupancies || !Array.isArray(occupancies) || occupancies.length === 0) {
      throw new Error("Invalid occupancies information");
    }

    const apiKey = process.env.HOTELBEDS_API_KEY;
    const apiSecret = process.env.HOTELBEDS_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("Missing API credentials");
    }

    const signature = generateSignature(apiKey, apiSecret);

    const headers = {
      'Api-key': apiKey,
      'X-Signature': signature,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    const requestBody = {
      stay: {
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
      },
      geolocation: {
        longitude: longitude,
        latitude: latitude,
        radius: radius,
        unit: unit,
      },
      occupancies: occupancies.map(occ => ({
        rooms: occ.rooms,
        adults: occ.adults,
        children: occ.children,
        paxes: occ.children > 0 ? Array(occ.children).fill().map(() => ({ type: 'CH', age: 7 })) : undefined
      })),
      filter: {
        maxRooms: 4,
        minRate: "0",
        maxRate: "100",
        maxCategory: 3,
      }
    }; 

    const response = await axios.post(`${baseURL}/hotels`, requestBody, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    if (error.response) {
      console.error("Response Status:", error.response.status);
      console.error("Response Headers:", error.response.headers);
      console.error("Response Data:", error.response.data);
    }
    res.status(500).json({ message: "Error while getting hotels", error: error.message, details: error.response ? error.response.data : null });
  }
}
