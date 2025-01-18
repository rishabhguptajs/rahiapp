/**
 * @fileoverview Trip generation module using Google's Generative AI
 * @module tripGenerator
 * @requires @google/generative-ai
 * @requires dotenv
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
import { prompt as Prompt } from "../constants/prompt.js";
import { cleanJsonResponse } from "../utils/tripParser.js";

/* Load environment variables */
dotenv.config();

/* Initialize API key from environment */
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/* Create Generative AI client */
const genai = new GoogleGenerativeAI(GEMINI_API_KEY);

/**
 * Generates a detailed trip itinerary using Google's Generative AI
 * 
 * @async
 * @param {string} location - The destination location
 * @param {string} accommodation - The hotel/accommodation name
 * @param {number} duration - Trip duration in days
 * @param {Array<string>} interests - Array of user interests
 * @param {number} totalBudget - Total budget for the trip in rupees
 * @returns {Promise<Object>} Parsed JSON response containing trip details
 * @throws {Error} If trip generation fails
 */
const generateTrip = async (location, accommodation, duration, interests, totalBudget) => {
  try {
    /* Initialize model with specific configuration */
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    /* Generate prompt using template */
    const prompt = Prompt(location, accommodation, duration, interests, totalBudget);

    /* Get response from Generative AI */
    const response = await model.generateContent(prompt)
    const responseText = response.response.candidates[0].content.parts[0].text;

    const cleanedResponse = cleanJsonResponse(responseText);

    console.log('Cleaned response:', cleanedResponse);

    /* Parse and return the JSON response */
    const parsedResponse = JSON.parse(cleanedResponse);

    return parsedResponse;

  } catch (error) {
    console.error('Error generating trip:', error);
    throw error;
  }
}

export default generateTrip;