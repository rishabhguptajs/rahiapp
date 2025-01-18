/**
 * Cleans the JSON response by removing unwanted characters and formatting.
 * 
 * @param {string} responseInput - The raw response input from the Generative AI.
 * @returns {string} - A cleaned JSON string ready for parsing.
 */
const cleanJsonResponse = (responseInput) => {
    // Remove any markdown code block indicators and whitespace
    let cleanedResponse = responseInput
        .replace(/^```json\s*/, '') // Remove starting ```json
        .replace(/```$/, '')        // Remove ending ```
        .replace(/^\s+|\s+$/g, ''); // Trim whitespace

    // Try to find JSON content between square brackets
    const jsonMatch = cleanedResponse.match(/\[.*\]/s);
    if (jsonMatch) {
        cleanedResponse = jsonMatch[0];
    }

    // Remove any remaining non-JSON characters
    cleanedResponse = cleanedResponse
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
        .replace(/[^\x20-\x7E]/g, '');                 // Keep only printable ASCII

    return cleanedResponse;
};

export { cleanJsonResponse };