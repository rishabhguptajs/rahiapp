/**
 * @component TripPlanner
 * @description Renders a trip planning interface where users can manage their itinerary, add activities, and view real-time weather.
 */
"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Calendar, Plus, Search } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import tripData from "../app/tripData";

/**
 * TripPlanner component
 * @returns {JSX.Element} The rendered trip planner interface
 */
const TripPlanner = () => {
  const [tripDataState, setTripDataState] = useState(tripData);
  const [weather, setWeather] = useState(null);
  const [newItemText, setNewItemText] = useState("");
  const [showInput, setShowInput] = useState({});

  /**
   * Fetches weather data after component mounts
   * @function useEffect
   */
  useEffect(() => {
    setTimeout(() => {
      setWeather({ temperature: 22, conditions: "Partly cloudy" });
    }, 1000);
  }, []);

  /**
   * Formats a date to a readable string
   * @function formatDate
   * @param {Date} date - The date to format
   * @returns {string} The formatted date string
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  /**
   * Adds a new activity to the specified day and time of day
   * @function addActivity
   * @param {number} dayIndex - The index of the day in the itinerary
   * @param {string} timeOfDay - The time of day (morning, afternoon, evening, night)
   */
  const addActivity = (dayIndex, timeOfDay) => {
    if (!newItemText.trim()) return;

    const updatedTripData = { ...tripDataState };
    updatedTripData.itinerary[dayIndex][timeOfDay].activities.push({
      name: newItemText,
      completed: false,
    });

    setTripDataState(updatedTripData);
    setNewItemText("");
    setShowInput({});
  };

  /**
   * Handles key press events to add an activity on Enter key
   * @function handleKeyPress
   * @param {Object} e - The key press event
   * @param {number} dayIndex - The index of the day in the itinerary
   * @param {string} timeOfDay - The time of day (morning, afternoon, evening, night)
   */
  const handleKeyPress = (e, dayIndex, timeOfDay) => {
    if (e.key === "Enter") {
      addActivity(dayIndex, timeOfDay);
    }
  };

  /**
   * Toggles the completion status of an activity
   * @function toggleActivityCompletion
   * @param {number} dayIndex - The index of the day in the itinerary
   * @param {string} timeOfDay - The time of day (morning, afternoon, evening, night)
   * @param {number} activityIndex - The index of the activity to toggle
   */
  const toggleActivityCompletion = (dayIndex, timeOfDay, activityIndex) => {
    const updatedTripData = { ...tripDataState };
    const activity =
      updatedTripData.itinerary[dayIndex][timeOfDay].activities[activityIndex];
    activity.completed = !activity.completed;
    setTripDataState(updatedTripData);
  };

  /**
   * Handles the end of a drag event to reorder activities
   * @function handleDragEnd
   * @param {Object} result - The result of the drag event
   * @param {number} dayIndex - The index of the day in the itinerary
   * @param {string} timeOfDay - The time of day (morning, afternoon, evening, night)
   */
  const handleDragEnd = (result, dayIndex, timeOfDay) => {
    if (!result.destination) return;

    const updatedTripData = { ...tripDataState };
    const activities = Array.from(
      updatedTripData.itinerary[dayIndex][timeOfDay].activities
    );
    const [moved] = activities.splice(result.source.index, 1);
    activities.splice(result.destination.index, 0, moved);
    updatedTripData.itinerary[dayIndex][timeOfDay].activities = activities;
    setTripDataState(updatedTripData);
  };

  /**
   * Calculates the date for a specific day in the itinerary
   * @function calculateDayDate
   * @param {Date} startDate - The start date of the trip
   * @param {number} dayIndex - The index of the day in the itinerary
   * @returns {Date} The calculated date for the specified day
   */
  const calculateDayDate = (startDate, dayIndex) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + dayIndex);
    return date;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-5/12 bg-white p-6 shadow-lg overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <MapPin className="inline mr-3 text-customOrange" size={28} />
            {tripDataState.location}
          </h1>
          <span className="text-gray-600 flex items-center">
            <Calendar className="inline mr-2 text-gray-500" size={20} />
            {formatDate(tripDataState.startDate)} -{" "}
            {formatDate(tripDataState.endDate)}
          </span>
        </div>

        <div className="bg-customOrange/10 p-5 rounded-lg mb-8 shadow-md">
          <h2 className="font-semibold text-xl mb-2 text-customOrange">
            {tripDataState.itinerary[0]?.morning?.accommodations[0]?.name ||
              "No Accommodation Info"}
          </h2>
        </div>

        {tripDataState?.itinerary?.length > 0 ? (
          tripDataState.itinerary.map((day, dayIndex) => (
            <div key={dayIndex} className="mb-8">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                Day {day.day}
                <span className="text-gray-500 text-sm ml-4">
                  {formatDate(
                    calculateDayDate(tripDataState.startDate, dayIndex)
                  )}
                </span>
              </h2>
              {["morning", "afternoon", "evening", "night"].map((timeOfDay) => (
                <div key={timeOfDay} className="mb-6">
                  <h3 className="font-semibold text-lg mb-3 capitalize text-gray-700">
                    {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}
                  </h3>
                  <DragDropContext
                    onDragEnd={(result) =>
                      handleDragEnd(result, dayIndex, timeOfDay)
                    }
                  >
                    <Droppable droppableId={`${dayIndex}-${timeOfDay}`}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {day[timeOfDay].activities.map(
                            (activity, actIndex) => (
                              <Draggable
                                key={actIndex}
                                draggableId={`${dayIndex}-${timeOfDay}-${actIndex}`}
                                index={actIndex}
                              >
                                {(provided) => (
                                  <div
                                    className="flex items-center mb-2 p-3 bg-gray-100 rounded-md"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={activity.completed}
                                      onChange={() =>
                                        toggleActivityCompletion(
                                          dayIndex,
                                          timeOfDay,
                                          actIndex
                                        )
                                      }
                                      className="mr-3 h-5 w-5 text-customOrange rounded"
                                    />
                                    <MapPin
                                      className="text-gray-400 mr-3"
                                      size={18}
                                    />
                                    <span
                                      className={`${
                                        activity.completed
                                          ? "line-through text-gray-500"
                                          : ""
                                      }`}
                                    >
                                      {activity.name}
                                    </span>
                                  </div>
                                )}
                              </Draggable>
                            )
                          )}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {showInput[`${dayIndex}-${timeOfDay}`] && (
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, dayIndex, timeOfDay)}
                      className="block mt-2 p-2 w-full border border-gray-300 rounded-md"
                      placeholder="Enter activity name"
                    />
                  )}
                  <button
                    className="text-customOrange flex items-center mt-2"
                    onClick={() =>
                      setShowInput((prevState) => ({
                        ...prevState,
                        [`${dayIndex}-${timeOfDay}`]: true,
                      }))
                    }
                  >
                    <Plus className="inline mr-2" size={18} />
                    Add Activity
                  </button>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No itinerary data available.</p>
        )}

        {weather && (
          <div className="bg-blue-50 p-5 rounded-lg mb-8 shadow-md">
            <h2 className="font-bold text-xl mb-2">Real-Time Weather</h2>
            <p className="text-lg">Temperature: {weather.temperature}°C</p>
            <p className="text-lg">Conditions: {weather.conditions}</p>
          </div>
        )}
      </div>

      {/* Right panel (Map) */}
      <div className="w-7/12 bg-gray-200 p-8">
        <div className="bg-white rounded-lg p-5 mb-6 shadow-md flex items-center">
          <Search className="text-gray-500 mr-4" size={24} />
          <input
            type="text"
            placeholder="Search for places"
            className="flex-grow outline-none text-lg"
          />
          <button className="bg-customOrange text-white px-6 py-2 rounded ml-4 shadow-lg hover:bg-customOrange-dark">
            Search
          </button>
        </div>

        {/* Placeholder for the map */}
        <div className="h-auto rounded-lg flex items-center justify-center bg-white shadow-lg">
          {/* Map Component Goes Here */}
          <p className="text-gray-400">Map will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
