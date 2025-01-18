/**
 * @fileoverview TripContext module for managing trip-related state and actions.
 * @module TripContext
 * @requires createContext
 * @requires useState
 * @requires useContext
 * @requires axios
 */

"use client";

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

/**
 * TripContext for providing trip-related state and actions.
 * @type {React.Context}
 */
const TripContext = createContext();

/**
 * TripProvider component that wraps the application and provides trip context.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered TripProvider component.
 */
export const TripProvider = ({ children }) => {
  /** 
   * State to hold trip details including interests and itinerary.
   * @type {Object}
   * @property {Array<string>} interests - List of user interests for the trip.
   * @property {Array<Object>} itinerary - List of itinerary items for the trip.
   */
  const [tripDetails, setTripDetails] = useState({
    interests: [],
    itinerary: []
  });

  /** 
   * State to indicate loading status of trip data fetching.
   * @type {boolean}
   */
  const [loading, setLoading] = useState(false);

  /** 
   * State to hold error messages related to trip data fetching.
   * @type {string|null}
   */
  const [error, setError] = useState(null);

  /**
   * Fetches trip data based on the provided trip ID.
   * @async
   * @param {string} tripId - The ID of the trip to fetch details for.
   * @returns {Promise<Object>} The fetched trip details.
   * @throws {Error} If fetching trip data fails.
   */
  const tripData = async (tripId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/trip-details/${tripId}`);
      setTripDetails(response.data);
      localStorage.setItem("tripDetails", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error fetching trip data:", error);
      setError('Error fetching trip details');
      throw error;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Creates a new trip with the provided request data.
   * @async
   * @param {Object} requestData - The data for the new trip.
   * @returns {Promise<void>}
   * @throws {Error} If creating the trip fails.
   */
  const createTrip = async (requestData) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/create-trip`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      setTripDetails(data);
    } catch (err) {
      setError('Error fetching trip details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates the trip details with new trip data.
   * @param {Object} newTrip - The new trip data to set.
   */
  const updateTripDetails = (newTrip) => {
    setTripDetails(newTrip);
  };

  return (
    <TripContext.Provider
      value={{ tripDetails, createTrip, updateTripDetails, tripData, loading, error }}
    >
      {children}
    </TripContext.Provider>
  );
};

/**
 * Custom hook to use the TripContext.
 * @returns {Object} The trip context values.
 * @throws {Error} If used outside of a TripProvider.
 */
export const useTripContext = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTripContext must be used within a TripProvider');
  }
  return context;
};
