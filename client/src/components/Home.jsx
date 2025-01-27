/**
 * @component HomePage
 * @description Renders the home page where users can plan their trips by providing necessary details.
 */
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../assets/search.png";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

/**
 * Debounces a function to limit the rate at which it can be invoked.
 * @function debounce
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} A debounced version of the provided function.
 */
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

/**
 * HomePage component
 * @returns {JSX.Element} The rendered home page for trip planning.
 */
export default function HomePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: "",
    accommodation: "",
    startDate: "",
    totalBudget: "",
    duration: "",
    interests: "",
  });
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [userData, setUserData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [isBudgetValid, setIsBudgetValid] = useState(true);
  const { user } = useUser();

  /**
   * Fetches user data when the user is available.
   * @function useEffect
   */
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  /**
   * Fetches user details from the server.
   * @async
   * @function fetchUserData
   * @returns {Promise<void>}
   */
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/details/${user.id}`
      );
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  /**
   * Handles input changes in the form.
   * @function handleInputChange
   * @param {Object} e - The event object.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "totalBudget") {
      setIsBudgetValid(parseInt(value) >= 1000 || value === "");
    }
  };

  /**
   * Fetches autocomplete results based on the location input.
   * @function fetchAutocompleteResults
   * @param {string} location - The location input.
   */
  const fetchAutocompleteResults = useCallback(
    debounce(async (location) => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/places/autocomplete?input=${location}`
        );
        setAutocompleteResults(response.data.predictions.slice(0, 5));
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    }, 300),
    []
  );

  /**
   * Handles changes in the location input field.
   * @function handleLocationChange
   * @param {Object} e - The event object.
   */
  const handleLocationChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, location: value }));
    setIsLocationValid(false);

    if (value.length > 1) {
      fetchAutocompleteResults(value);
    } else {
      setAutocompleteResults([]);
    }
  };

  /**
   * Handles selection of an autocomplete suggestion.
   * @function handleAutocompleteSelect
   * @param {string} place - The selected place from autocomplete.
   */
  const handleAutocompleteSelect = (place) => {
    setFormData((prev) => ({ ...prev, location: place }));
    setAutocompleteResults([]);
    setIsLocationValid(true);
  };

  /**
   * Handles form submission for trip planning.
   * @async
   * @function handleSubmit
   * @param {Object} e - The event object.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLocationValid) {
      alert("Please select a valid location from the suggestions.");
      return;
    }
    if (!isBudgetValid) {
      alert("Total budget must be at least 1000.");
      return;
    }
    setIsSubmitting(true);

    const tripData = {
      ...formData,
      interests: formData.interests
        .split(",")
        .map((interest) => interest.trim()),
      userId: user.id,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/create-trip`,
        tripData
      );
      console.log(response);

      if (response.data && response.data.tripId) {
        router.push(`/trip/${response.data.tripId}`);
      } else {
        throw new Error("Failed to create trip");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center p-4"
      id="generate-trip"
    >
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-1/2 h-64 md:h-80 lg:h-auto">
            <Image
              src={logo}
              alt="Tropical beach paradise"
              fill
              objectFit="cover"
              className="rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
              <div className="backdrop-blur-lg rounded-lg p-4">
                <h1 className="text-white text-3xl md:text-4xl font-bold">
                  Plan Your Trip
                </h1>
                <p className="text-gray-200 text-sm md:text-base">
                  Start planning your dream vacation now.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-2">
                {/* Location Input with Autocomplete */}
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleLocationChange}
                    className={`w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                      isLocationValid
                        ? "border-green-500 focus:ring-green-300"
                        : "border-gray-300 focus:ring-orange-300"
                    }`}
                  />
                  {/* Autocomplete dropdown */}
                  {autocompleteResults.length > 0 && (
                    <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg max-h-40 overflow-y-auto">
                      {autocompleteResults.map((result, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            handleAutocompleteSelect(result.description)
                          }
                          className="p-2 text-sm hover:bg-orange-100 cursor-pointer truncate"
                        >
                          {result.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Accommodation Select Dropdown */}
                <select
                  required
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleInputChange}
                  className="w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                >
                  <option value="" disabled>
                    Select Accommodation
                  </option>
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Guest House">Guest House</option>
                  <option value="Villa">Villa</option>
                  <option value="Other">Any</option>
                </select>

                <input
                  required
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                  min={new Date().toISOString().split("T")[0]}
                />
                <input
                  required
                  type="number"
                  name="totalBudget"
                  placeholder="Total Budget (min 1000)"
                  value={formData.totalBudget}
                  onChange={handleInputChange}
                  className={`w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    isBudgetValid
                      ? "border-gray-300 focus:ring-orange-300"
                      : "border-red-500 focus:ring-red-300"
                  }`}
                />
              </div>

              <input
                required
                type="number"
                name="duration"
                placeholder="Duration (days)"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />

              <input
                required
                type="text"
                name="interests"
                placeholder="Interests (comma-separated)"
                value={formData.interests}
                onChange={handleInputChange}
                className="w-full p-3 md:p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              />

              {user ? (
                userData.membership?.type === "free" &&
                userData.trips?.length >= 3 ? (
                  <p className="text-white text-center cursor-default text-sm px-6 py-3 rounded-lg bg-orange-500">
                    You have reached the limit of 3 trips. Please upgrade to
                    plan more trips.
                  </p>
                ) : (
                  <button
                    type="submit"
                    className={`text-white text-sm px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 transition ${
                      isSubmitting || !isLocationValid || !isBudgetValid
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      isSubmitting || !isLocationValid || !isBudgetValid
                    }
                  >
                    {isSubmitting ? "Planning..." : "Plan Your Trip"}
                  </button>
                )
              ) : (
                <p className="text-white text-center cursor-default text-sm px-6 py-3 rounded-lg bg-orange-500">
                  Please login to plan your trip.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
