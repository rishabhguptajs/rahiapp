/**
 * @component VacationPlan
 * @description Renders a vacation plan interface where users can view and navigate through various vacation options.
 */
"use client";
import React, { useState } from "react";
import Image from "next/image";

/**
 * Array of vacation objects containing details about each vacation destination.
 * @type {Array<Object>}
 * @property {number} id - Unique identifier for the vacation.
 * @property {string} name - Name of the vacation destination.
 * @property {string} image - Path to the vacation image.
 * @property {string} duration - Duration of the trip.
 * @property {number} rating - User rating for the vacation.
 */
const vacations = [
  {
    id: 1,
    name: "Rome, Italy",
    image: "/rome_vacation.jpg", // Ensure this image is in the public folder
    duration: "10 Days Trip",
    rating: 4.8,
  },
  {
    id: 2,
    name: "London, UK",
    image: "/london_vacation.jpg", // Ensure this image is in the public folder
    duration: "07 Days Trip",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Osaka, Japan",
    image: "/osaka_vacation.jpg", // Ensure this image is in the public folder
    duration: "10 Days Trip",
    rating: 4.8,
  },
  {
    id: 4,
    name: "Shimla, India",
    image: "/shimla_vacation.jpg", // Ensure this image is in the public folder
    duration: "10 Days Trip",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Paris, France",
    image: "/paris_vacation.jpg", // Ensure this image is in the public folder
    duration: "10 Days Trip",
    rating: 4.8,
  },
];

/**
 * VacationPlan component
 * @returns {JSX.Element} The rendered vacation plan interface
 */
const VacationPlan = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * Handles the left button click to navigate to the previous set of vacations.
   */
  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? vacations.length - 3 : prevIndex - 1
    );
  };

  /**
   * Handles the right button click to navigate to the next set of vacations.
   */
  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= vacations.length - 3 ? 0 : prevIndex + 1
    );
  };

  /**
   * Slices the vacations array to get the currently displayed vacations based on the current index.
   * @type {Array<Object>}
   */
  const displayedVacations = vacations.slice(currentIndex, currentIndex + 3);

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Best <span className="text-customOrange">vacation plan</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Plan your perfect vacation with{" "}
          <span className="text-customOrange font-semibold">Rahi</span>.
          Discover and customize your journey to create your perfect trip and
          choose among hundreds of all-inclusive offers!
        </p>
        {displayedVacations.length > 0 ? (
          <div className="flex items-center justify-center">
            <button
              className="mr-4 focus:outline-none"
              onClick={handleLeftClick}
              disabled={currentIndex === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="30"
                fill={currentIndex === 0 ? "gray" : "orange"}
                className="bi bi-arrow-left-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
            </button>
            <div className="flex overflow-hidden">
              {displayedVacations.map((vacation) => (
                <div
                  key={vacation.id}
                  className="max-w-sm rounded-lg overflow-hidden shadow-lg mx-2 flex-shrink-0 bg-white transform transition duration-300 hover:scale-105"
                >
                  <Image
                    src={vacation.image}
                    alt={vacation.name}
                    width={300}
                    height={200}
                    objectFit="cover"
                    className="w-full h-48 object-cover"
                  />
                  <div className="px-6 py-4">
                    <h3 className="font-bold text-xl mb-2">{vacation.name}</h3>
                    <p className="text-gray-700 text-base mb-2">
                      <span className="font-semibold text-customOrange">
                        {vacation.price}
                      </span>{" "}
                      {vacation.duration}
                    </p>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">⭐</span>
                      <span className="text-gray-600">{vacation.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="ml-4 focus:outline-none"
              onClick={handleRightClick}
              disabled={currentIndex >= vacations.length - 3}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill={currentIndex >= vacations.length - 3 ? "gray" : "orange"}
                className="bi bi-arrow-right-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600">No vacations available.</p>
        )}
      </div>
    </div>
  );
};

export default VacationPlan;
