/**
 * @fileoverview Axios instance configuration for making API requests.
 * @module axiosInstance
 * @requires axios
 */

import axios from "axios";

/**
 * Creates an Axios instance with a predefined base URL and headers.
 * @type {AxiosInstance}
 * @property {string} baseURL - The base URL for the API requests, sourced from environment variables.
 * @property {Object} headers - The headers to be sent with each request, including content type.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Exports the configured Axios instance for use in other modules.
 * @returns {AxiosInstance} The configured Axios instance.
 */
export default axiosInstance;
