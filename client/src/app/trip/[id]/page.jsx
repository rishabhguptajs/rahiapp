"use client"

/**
 * @fileoverview Trip Planner page for managing trip details and activities
 * @module TripPlanner
 * @requires React
 * @requires axios
 * @requires lucide-react
 * @requires @clerk/nextjs
 * @requires next/link
 * @requires next/navigation
 */

import React, { useState, useEffect } from "react"
import { MapPin, Calendar, Plus, Check, X } from "lucide-react"
import { RedirectToSignIn, useUser } from "@clerk/nextjs"
import Link from "next/link"
import { useParams } from "next/navigation"
import axios from "axios"

const TripPlanner = () => {
  const [tripDetails, setTripDetails] = useState(null)
  const { id: tripId } = useParams()
  const [weather, setWeather] = useState(null)
  const [newActivityInputs, setNewActivityInputs] = useState({})
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState(null)

  useEffect(() => {
    /**
     * Fetch trip data from local storage or server.
     * If the trip data is found in local storage, it is used.
     * Otherwise, it fetches from the server using the trip ID.
     */
    const fetchTripData = async () => {
      if (!user || !tripId) return

      const localTripDetails = localStorage.getItem("tripDetails");
      if (localTripDetails) {
        const parsed = JSON.parse(localTripDetails);
        if (parsed._id === tripId) {
          setTripDetails(parsed);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/users/trip-details/${tripId}`
        );
        setTripDetails(response.data);
        localStorage.setItem("tripDetails", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching trip data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTripData();
  }, [user, tripId])

  useEffect(() => {
    /**
     * Fetch weather data based on the trip location.
     * It retrieves the weather information from an external API.
     */
    const fetchWeatherData = async () => {
      if (!tripDetails?.location) return;
      
      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const tripLocation = tripDetails.location.split(",")[0];
        const response = await axios.request({
          method: 'GET',
          url: `https://open-weather13.p.rapidapi.com/city/${tripLocation}/EN`,
          headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY,
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
          }
        });

        const temperatureInFahrenheit = response.data.main.temp;
        const temperatureInCelsius = Math.round((temperatureInFahrenheit - 32) * 5 / 9);

        setWeather({
          temperature: temperatureInCelsius,
          conditions: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherError("Unable to fetch weather data");
      } finally {
        setWeatherLoading(false);
      }
    };

    if (tripDetails) {
      fetchWeatherData();
    }
  }, [tripDetails?.location]);

  /**
   * Format the date to a readable string.
   * @param {Date} date - The date to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  /**
   * Add a new activity input field for a specific day and time of day.
   * @param {number} dayIndex - The index of the day in the itinerary.
   * @param {string} timeOfDay - The time of day (morning, afternoon, evening, night).
   */
  const addActivity = (dayIndex, timeOfDay) => {
    setNewActivityInputs((prev) => ({
      ...prev,
      [`${dayIndex}-${timeOfDay}`]: "",
    }))
  }

  /**
   * Handle changes to the new activity input field.
   * @param {number} dayIndex - The index of the day in the itinerary.
   * @param {string} timeOfDay - The time of day.
   * @param {string} value - The new value for the activity input.
   */
  const handleNewActivityChange = (dayIndex, timeOfDay, value) => {
    setNewActivityInputs((prev) => ({
      ...prev,
      [`${dayIndex}-${timeOfDay}`]: value,
    }))
  }

  /**
   * Save a new activity to the trip itinerary.
   * @param {number} dayIndex - The index of the day in the itinerary.
   * @param {string} timeOfDay - The time of day for the activity.
   */
  const saveNewActivity = async (dayIndex, timeOfDay) => {
    const activityName = newActivityInputs[`${dayIndex}-${timeOfDay}`]
    if (activityName.trim()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/trips/${tripId}/add-activity`,
          {
            day: dayIndex,
            timeOfDay,
            activity: {
              name: activityName,
              completed: false,
            },
          }
        )

        setTripDetails(response.data)
        setNewActivityInputs((prev) => ({
          ...prev,
          [`${dayIndex}-${timeOfDay}`]: "",
        }))
      } catch (error) {
        console.error("Error adding activity:", error)
      }
    }
  }

  /**
   * Cancel a new activity input field for a specific day and time of day.
   * @param {number} dayIndex - The index of the day in the itinerary.
   * @param {string} timeOfDay - The time of day.
   */
  const cancelNewActivity = (dayIndex, timeOfDay) => {
    setNewActivityInputs((prev) => {
      const updatedInputs = { ...prev }
      delete updatedInputs[`${dayIndex}-${timeOfDay}`]
      return updatedInputs
    })
  }

  /**
   * Calculate the date for a specific day index based on the start date.
   * @param {Date} startDate - The start date of the trip.
   * @param {number} dayIndex - The index of the day to calculate.
   * @returns {Date} - The calculated date.
   */
  const calculateDayDate = (startDate, dayIndex) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + dayIndex)
    return date
  }

  if (!user) {
    return <RedirectToSignIn />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!tripDetails) {
    return <div>No trip data available.</div>
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-grow flex overflow-y-auto">
        <div className="w-full bg-white p-4 md:p-6 shadow-lg overflow-y-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold flex items-center mb-4 md:mb-0">
              Itinerary
            </h1>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
              <Link
                href={`/dashboard/${tripDetails._id}`}
                className="text-white bg-customOrange p-2 rounded-md text-base md:text-lg transition-transform transform hover:shadow-lg hover:-translate-y-1 whitespace-nowrap"
              >
                Access Offline as PDF
              </Link>
              <span className="text-gray-600 flex items-center text-base md:text-lg">
                <Calendar className="inline mr-2 text-gray-500" size={16} />
                {tripDetails.startDate && tripDetails.endDate
                  ? `${formatDate(tripDetails.startDate)} - ${formatDate(
                      tripDetails.endDate
                    )}`
                  : "Dates not specified"}
              </span>
            </div>
          </div>

          <div className="bg-customOrange/10 p-4 md:p-5 rounded-lg mb-6 md:mb-8 shadow-md">
            <h2 className="font-semibold text-lg md:text-xl text-customOrange">
              {tripDetails?.itinerary?.[0]?.night?.accommodations?.[0]?.name ||
                "No Accommodation Info"}
            </h2>
          </div>

          {tripDetails?.itinerary?.length > 0 ? (
            tripDetails.itinerary.map((day, dayIndex) => (
              <div key={dayIndex} className="mb-6 md:mb-8">
                <h2 className="font-bold text-lg md:text-xl mb-3 md:mb-4 flex flex-wrap items-center">
                  <span className="mr-2">Day {day.day}</span>
                  {day.cost && (
                    <span className="text-gray-500 text-sm mr-2">
                      Cost: ₹{day.cost}
                    </span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {formatDate(
                      calculateDayDate(tripDetails.startDate, dayIndex)
                    )}
                  </span>
                </h2>
                {["morning", "afternoon", "evening", "night"].map(
                  (timeOfDay) => (
                    <div key={timeOfDay} className="mb-4 md:mb-6">
                      <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 capitalize text-gray-700">
                        {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
                      </h3>
                      {day[timeOfDay]?.activities?.map((activity, actIndex) => (
                        <React.Fragment key={actIndex}>
                          <div className="font-semibold text-customOrange text-sm md:text-base mb-1">
                            Activities
                          </div>
                          <div className="flex items-center mb-2 p-2 md:p-3 bg-gray-100 rounded-md">
                            <MapPin
                              className="text-gray-400 mr-2 md:mr-3"
                              size={16}
                            />
                            <span
                              className={`${
                                activity.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              } text-sm md:text-base`}
                            >
                              {activity.name}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                      {day[timeOfDay]?.dining?.map((dining, dinIndex) => (
                        <React.Fragment key={dinIndex}>
                          <div className="font-semibold text-customOrange text-sm md:text-base mb-1">
                            Dining
                          </div>
                          <div className="flex items-center mb-2 p-2 md:p-3 bg-gray-100 rounded-md">
                            <MapPin
                              className="text-gray-400 mr-2 md:mr-3"
                              size={16}
                            />
                            <span
                              className={`${
                                dining.completed
                                  ? "line-through text-gray-500"
                                  : ""
                              } text-sm md:text-base`}
                            >
                              {dining.name}
                            </span>
                          </div>
                        </React.Fragment>
                      ))}
                      {day[timeOfDay]?.accommodations?.map(
                        (accommodation, accIndex) => (
                          <React.Fragment key={accIndex}>
                            <div className="font-semibold text-customOrange text-sm md:text-base mb-1">
                              Accommodations
                            </div>
                            <div className="flex items-center mb-2 p-2 md:p-3 bg-gray-100 rounded-md">
                              <MapPin
                                className="text-gray-400 mr-2 md:mr-3"
                                size={16}
                              />
                              <span
                                className={`${
                                  accommodation.completed
                                    ? "line-through text-gray-500"
                                    : ""
                                } text-sm md:text-base`}
                              >
                                {accommodation.name}
                              </span>
                            </div>
                          </React.Fragment>
                        )
                      )}
                      {day[timeOfDay]?.transportation?.map(
                        (transport, tranIndex) => (
                          <React.Fragment key={tranIndex}>
                            <div className="font-semibold text-customOrange text-sm md:text-base mb-1">
                              Transportation
                            </div>
                            <div className="flex items-center mb-2 p-2 md:p-3 bg-gray-100 rounded-md">
                              <MapPin
                                className="text-gray-400 mr-2 md:mr-3"
                                size={16}
                              />
                              <span
                                className={`${
                                  transport.completed
                                    ? "line-through text-gray-500"
                                    : ""
                                } text-sm md:text-base`}
                              >
                                {transport.name}
                              </span>
                            </div>
                          </React.Fragment>
                        )
                      )}
                      {newActivityInputs[`${dayIndex}-${timeOfDay}`] !==
                      undefined ? (
                        <div className="flex items-center mt-2">
                          <input
                            type="text"
                            value={
                              newActivityInputs[`${dayIndex}-${timeOfDay}`]
                            }
                            onChange={(e) =>
                              handleNewActivityChange(
                                dayIndex,
                                timeOfDay,
                                e.target.value
                              )
                            }
                            className="flex-grow mr-2 p-2 border rounded text-sm md:text-base"
                            placeholder="Enter new activity"
                          />
                          <button
                            onClick={() => saveNewActivity(dayIndex, timeOfDay)}
                            className="bg-green-500 text-white p-2 rounded mr-2"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() =>
                              cancelNewActivity(dayIndex, timeOfDay)
                            }
                            className="bg-red-500 text-white p-2 rounded"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="text-customOrange flex items-center mt-2 text-sm md:text-base"
                          onClick={() => addActivity(dayIndex, timeOfDay)}
                        >
                          <Plus className="inline mr-2" size={16} />
                          Add Activity
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>
            ))
          ) : (
            <p className="text-sm md:text-base">No itinerary data available.</p>
          )}

          {weatherLoading ? (
            <div className="bg-blue-50 p-4 md:p-5 rounded-lg mb-6 md:mb-8 shadow-md">
              <p>Loading weather data...</p>
            </div>
          ) : weatherError ? (
            <div className="bg-red-50 p-4 md:p-5 rounded-lg mb-6 md:mb-8 shadow-md">
              <p className="text-red-500">{weatherError}</p>
            </div>
          ) : weather ? (
            <div className="bg-blue-50 p-4 md:p-5 rounded-lg mb-6 md:mb-8 shadow-md">
              <h2 className="font-bold text-lg md:text-xl mb-2">
                Current Weather in {tripDetails.location}
              </h2>
              <div className="flex items-center">
                {weather.icon && (
                  <img 
                    src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                    alt={weather.description}
                    className="w-16 h-16 mr-4"
                  />
                )}
                <div>
                  <p className="text-base md:text-lg font-medium">
                    {weather.temperature}°C
                  </p>
                  <p className="text-base md:text-lg text-gray-600 capitalize">
                    {weather.description}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default TripPlanner
