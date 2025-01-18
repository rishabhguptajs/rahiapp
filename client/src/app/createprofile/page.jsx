"use client";

/**
 * @page CreateProfile
 * @description Renders a form for creating a user profile.
 */
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const CreateProfile = () => {
  const { user } = useUser(); // Get the current user from Clerk
  const [userId, setUserId] = useState(""); // State to hold the user ID
  const [email, setEmail] = useState(""); // State to hold the user's email
  const router = useRouter(); // Hook to programmatically navigate

  useEffect(() => {
    /**
     * Effect to set user ID and email when user data is available.
     */
    if (user) {
      setUserId(user.id); // Set the user ID
      setEmail(user.primaryEmailAddress.emailAddress); // Set the user's email
    }
  }, [user]);

  /**
   * Handles the form submission to create a user profile.
   * @async
   * @param {Event} e - The event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/create`, {
        userId,
        email,
      }); // Send a POST request to create the user profile

      router.push("/dashboard"); // Redirect to the dashboard on success
    } catch (error) {
      router.push("/dashboard"); // Redirect to the dashboard on error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white bg-customOrange">
      <h2 className="text-2xl font-bold mb-6">Create Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-customOrange"
          >
            User ID
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            disabled
            className="w-full p-2 mt-1 border rounded bg-gray-100 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-customOrange"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full p-2 mt-1 border rounded bg-gray-100 text-gray-700"
          />
        </div>

        <p className="text-customOrange text-sm text-center mb-4">
          Just one step away from traveling freely!
        </p>

        <button
          type="submit"
          className="w-full flex text-center items-center justify-center gap-2 bg-customOrange text-white font-bold py-2 px-4 rounded"
        >
          Create Profile <FaLongArrowAltRight />
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
