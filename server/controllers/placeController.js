import axios from "axios";
import { uuid } from "uuidv4";

const ROUTE_API_URL = 'https://api.olamaps.io/places/v1';

/**
 * Autocomplete controller for fetching place predictions based on user input.
 * 
 * @async
 * @param {string} input - The input query for place predictions.
 * @returns {Promise<Object>} The predicted places data.
 * @throws {Error} If the input query is not provided.
 */
export const autocompleteFullController = async(input) => {
    try {
        if(!input) {
            throw new Error("Please provide an input query");
        }

        const params = {
            input,
            api_key: process.env.OLAMAPS_API_KEY
        };

        const requestId = uuid();
        const correlationId = uuid();

        const places = await axios.get(`${ROUTE_API_URL}/autocomplete?${new URLSearchParams(params)}`, {
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId
            }
        });

        return places.data;
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

/**
 * Autocomplete controller for handling HTTP requests and responses.
 * 
 * @async
 * @param {Object} req - The request object containing the input query.
 * @param {Object} res - The response object used to send back the predicted places data.
 * @throws {Error} If the input query is not provided.
 */
export const autocompleteController = async(req, res) => {
    try {
        const { input } = req.query;

        if(!input) {
            throw new Error("Please provide an input query");
        }

        const params = {
            input,
            api_key: process.env.OLAMAPS_API_KEY
        };

        const requestId = uuid();
        const correlationId = uuid();

        const places = await axios.get(`${ROUTE_API_URL}/autocomplete?${new URLSearchParams(params)}`, {
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId
            }
        });

        res.status(200).json(places.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "Error while fetching autocomplete data",
            error: error.message
         });
    }
}

/**
 * Controller for fetching detailed information about a specific place.
 * 
 * @async
 * @param {Object} req - The request object containing the placeId.
 * @param {Object} res - The response object used to send back the place details.
 * @throws {Error} If the placeId is not provided.
 */
export const placeDetailsController = async(req, res) => {
    try {
        const { placeId } = req.query;

        if(!placeId) {
            return res.status(400).json({ message: "Please provide placeId" });
        }

        const params = {
            place_id: placeId,
            api_key: process.env.OLAMAPS_API_KEY
        };

        const requestId = uuid();
        const correlationId = uuid();

        const placeDetails = await axios.get(`${ROUTE_API_URL}/details?${new URLSearchParams(params)}`, {
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId
            }
        });

        res.status(200).json(placeDetails.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            message: "Error while fetching place details",
            error: error.message
         });
    }
}

/**
 * Controller for searching nearby places based on location and types.
 * 
 * @async
 * @param {Object} req - The request object containing location and types.
 * @param {Object} res - The response object used to send back nearby places data.
 * @throws {Error} If location or types are not provided.
 */
export const nearbySearchController = async (req, res) => {
    try {
        const { location, types } = req.query;

        if (!location || !types) {
            return res.status(400).json({ message: "Please provide both location and types" });
        }

        const params = {
            layers: "venue",
            location,      
            types,           
            radius: 6000,  
            strictbounds: false,
            withCentroid: false,
            limit: 10,
            api_key: process.env.OLAMAPS_API_KEY   
        };

        const requestId = uuid();
        const correlationId = uuid();

        const nearbyPlaces = await axios.get(`${ROUTE_API_URL}/nearbysearch?${new URLSearchParams(params)}`, {
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId
            }
        });

        res.status(200).json(nearbyPlaces.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error while fetching nearby places",
            error: error.message
        });
    }
}

/**
 * Controller for performing a text search for places based on user input.
 * 
 * @async
 * @param {Object} req - The request object containing the text input.
 * @param {Object} res - The response object used to send back the search results.
 * @throws {Error} If the text input is not provided.
 */
export const textSearchController = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: "Please provide an input query" });
        }

        const params = {
            input: text,
            api_key: process.env.OLAMAPS_API_KEY
        };

        const requestId = uuid();
        const correlationId = uuid();

        const response = await axios.get(`${ROUTE_API_URL}/textsearch?${new URLSearchParams(params)}`, {
            headers: {
                'X-Request-Id': requestId,
                'X-Correlation-Id': correlationId
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error while fetching text search data",
            error: error.message
         });
    }
}