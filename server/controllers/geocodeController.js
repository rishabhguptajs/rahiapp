import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

/**
 * Base URL for the OLA Maps API
 * @constant {string}
 */
const ROUTE_API_URL = 'https://api.olamaps.io/places/v1';

/**
 * Converts a place name to its corresponding geographical coordinates
 * 
 * @async
 * @param {string} placeName - The name of the place to geocode
 * @returns {Promise<Object>} An object containing latitude and longitude
 * @throws {Error} If fetching coordinates fails
 */
export const addressToCoordinates = async (placeName) => {
    try {
        const requestId = uuidv4();
        const correlationId = uuidv4();

        const response = await axios.get(`${ROUTE_API_URL}/geocode`, {
            params: {
                address: placeName,
                api_key: process.env.OLAMAPS_API_KEY
            },
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId,
            },
        });


        const location = response.data.geocodingResults[0].geometry.location;
        const coordinates = {
            latitude: location.lat,
            longitude: location.lng,
        };

        return coordinates;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};
