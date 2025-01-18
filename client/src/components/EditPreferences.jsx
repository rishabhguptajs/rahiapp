/**
 * @component EditPreferences
 * @description Renders a modal for editing user preferences including budget, interests, dietary preferences, and travel preferences.
 */
"use client";

import React, { useState } from "react";
import axios from "axios";

/**
 * EditPreferencesModal component
 * @param {Object} props - Component properties
 * @param {Object} props.userData - User data containing current preferences
 * @param {string} props.userId - ID of the user whose preferences are being edited
 * @param {function} props.closeModal - Function to close the modal
 * @param {function} props.fetchUserData - Function to fetch updated user data
 * @returns {JSX.Element} The rendered modal for editing preferences
 */
const EditPreferencesModal = ({ userData, userId, closeModal, fetchUserData }) => {
  const [budget, setBudget] = useState({
    min: userData.preferences.budget.min,
    max: userData.preferences.budget.max,
  });
  const [interests, setInterests] = useState(userData.preferences.interests);
  const [dietaryPreferences, setDietaryPreferences] = useState(
    userData.preferences.dietaryPreferences
  );
  const [travelPreferences, setTravelPreferences] = useState(
    userData.preferences.travelPreferences
  );

  /**
   * Handles saving the updated preferences to the server
   * @async
   * @function handleSavePreferences
   * @returns {Promise<void>}
   */
  const handleSavePreferences = async () => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/preferences/${userId}`,
        {
          preferences: {
            budget,
            interests,
            dietaryPreferences,
            travelPreferences,
          },
        }
      );
      fetchUserData();
      closeModal();
    } catch (error) {
      console.error("Error updating preferences", error);
    }
  };

  return (
    <div className="fixed top-10 mt-14 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Edit Preferences</h2>

        <div className="mb-4"> 
          <label className="block font-semibold">Budget</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={budget.min}
              onChange={(e) => setBudget({ ...budget, min: e.target.value })}
              className="border p-2 rounded w-1/2"
              placeholder="Min"
            />
            <input
              type="number"
              value={budget.max}
              onChange={(e) => setBudget({ ...budget, max: e.target.value })}
              className="border p-2 rounded w-1/2"
              placeholder="Max"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Interests</label>
          <input
            type="text"
            value={interests.join(", ")}
            onChange={(e) => setInterests(e.target.value.split(", "))}
            className="border p-2 rounded w-full"
            placeholder="Comma-separated interests"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Dietary Preferences</label>
          <input
            type="text"
            value={dietaryPreferences.join(", ")}
            onChange={(e) =>
              setDietaryPreferences(e.target.value.split(", "))
            }
            className="border p-2 rounded w-full"
            placeholder="Comma-separated dietary preferences"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Travel Preferences</label>
          <input
            type="text"
            value={travelPreferences.join(", ")}
            onChange={(e) =>
              setTravelPreferences(e.target.value.split(", "))
            }
            className="border p-2 rounded w-full"
            placeholder="Comma-separated travel preferences"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSavePreferences}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPreferencesModal;
