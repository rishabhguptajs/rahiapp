import axios from 'axios';
import { uuid } from 'uuidv4';

/**
 * Base URL for the OLA Maps Routing API
 * @constant {string}
 */
const ROUTE_API_URL = 'https://api.olamaps.io/routing/v1';

/**
 * Fetches directions between the specified origin and destination.
 * 
 * @async
 * @param {string} origin - The starting point for the directions.
 * @param {string} destination - The endpoint for the directions.
 * @returns {Promise<Object>} The directions data.
 * @throws {Error} If either origin or destination is not provided.
 */
export const getDirections = async (origin, destination) => {
  try {
    if (!origin || !destination) {
      return {
        message: 'Origin and destination are required'
      };
    }

    const requestId = uuid();
    const correlationId = uuid();

    const params = {
      origin,
      destination,
      mode: 'driving',
      alternatives: 'true',
      steps: 'true',
      overview: 'full',
      language: 'en',
      traffic_metadata: true,
      api_key: process.env.OLAMAPS_API_KEY
    };

    const response = await axios.post(`${ROUTE_API_URL}/directions?${new URLSearchParams(params)}`, null, {
      headers: {
        'X-Request-Id': requestId,
        'X-Correlation-Id': correlationId
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching directions:', error.response?.data || error.message);
    return {
      message: error.response?.data?.error || error.message,
      error: error
    };
  }
};

/**
 * Retrieves the estimated time of arrival (ETA) and distance between the specified origins and destinations.
 * 
 * @async
 * @param {Object} req - The request object containing origin and destination.
 * @param {Object} res - The response object used to send back the ETA and distance data.
 * @throws {Error} If either origin or destination is not provided.
 */
export const getETAandDistance = async (req, res) => {
  try {
    const {
      origin,
      destination,
    } = req.body;

    if (!origin || !destination) {
      return res.status(400).json({ message: 'Origin and destination are required' });
    }

    const requestId = uuid();
    const correlationId = uuid();

    const params = {
      origins: origin,
      destinations: destination,
      api_key: process.env.OLAMAPS_API_KEY
    };

    const response = await axios.get(`${ROUTE_API_URL}/distanceMatrix?${new URLSearchParams(params)}`, {
      headers: {
        'X-Request-Id': requestId,
        'X-Correlation-Id': correlationId
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching ETA and distance:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data?.error || error.message,
      error: error
    });
  }
}