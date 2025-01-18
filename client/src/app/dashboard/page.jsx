"use client";
/**
 * @page Dashboard
 * @description Renders the user dashboard displaying travel preferences and planned trips.
 */
import React, { useEffect, useState } from "react";
import { useUser, UserButton, RedirectToSignIn } from "@clerk/nextjs";
import Link from "next/link";
import axios from "axios";
import EditPreferencesModal from "../../components/EditPreferences";
import { IoIosArrowBack } from "react-icons/io";
import {
  FaPlane,
  FaHotel,
  FaUtensils,
  FaMapMarkerAlt,
  FaWallet,
  FaHeart,
  FaLeaf,
  FaCar,
  FaClock,  
} from "react-icons/fa";

/**
 * Fetches user data including travel preferences and trips.
 * @async
 * @function fetchUserData
 */
const fetchUserData = async (userId, setUserData, setLoading) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/details/${userId}`
    );

    const sortedTrips = response.data.trips.sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    setUserData({...response.data, trips: sortedTrips});
    setLoading(false);
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};

const Dashboard = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData(user.id, setUserData, setLoading);
    }
  }, [user]);

  if (!user) {
    return <RedirectToSignIn />;
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-customOrange"></div>
      </div>
    );
  }

  const preferenceLabels = {
    budget: "Budget",
    interests: "Interests",
    dietaryPreferences: "Dietary Preferences",
    accomodationPreferences: "Accommodation Preferences",
    travelPreferences: "Travel Preferences",
  };

  const PreferenceIcon = ({ preference }) => {
    const iconMap = {
      Budget: FaWallet,
      Interests: FaHeart,
      "Dietary Preferences": FaLeaf,
      "Accommodation Preferences": FaHotel,
      "Travel Preferences": FaCar,
    };
    const Icon = iconMap[preference] || FaHeart;
    return <Icon className="text-customOrange text-2xl" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link
              href="/"
              className="bg-gradient-to-r sm:py-2 from-orange-400 to-red-500 text-white px-4 py-1 rounded-full hover:shadow-lg transition-all duration-200 ease-in-out flex items-center gap-2"
            >
              <IoIosArrowBack size={20} />
              <span className="">Back to Homepage</span>
            </Link>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full font-bold hover:shadow-lg transition-all duration-200">
                Plan: {userData.membership.type.toUpperCase()}
              </div>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-11 h-11",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">
          Welcome back, {user.firstName}!
        </h1>

        <section className="mb-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Your Travel Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(userData.preferences).map(([key, value], index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center gap-3 mb-2">
                  <PreferenceIcon preference={preferenceLabels[key]} />
                  <h3 className="text-lg font-medium text-gray-700">
                    {preferenceLabels[key] || key}
                  </h3>
                </div>

                {Array.isArray(value) && value.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-600">
                    {value.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : key === "budget" ? (
                  <p className="text-gray-600">
                    ₹{value.min} - ₹{value.max}
                  </p>
                ) : (
                  <p className="text-gray-600 text-sm">
                    Add preferences for {preferenceLabels[key]}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              className="px-6 py-2 bg-customOrange text-white rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 ease-in-out"
              onClick={() => setShowModal(true)}
            >
              Edit Preferences
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Your Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.trips.length !== 0 ? (
              userData.trips.map((trip) => (
                <div
                  key={trip.tripId}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://picsum.photos/800/600?random=${trip.location})`,
                    }}
                  ></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {trip.location}
                    </h3>
                    <p className="flex items-center gap-2 mb-1 text-gray-600">
                      <FaMapMarkerAlt />{" "}
                      {new Date(trip.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2 mb-1 text-gray-600">
                      <FaPlane /> {trip.duration} days
                    </p>
                    <p className="flex items-center gap-2 mb-1 text-gray-600">
                      <FaHotel /> Budget: ₹{trip.budget}
                    </p>
                    <p className="flex items-center gap-2 mb-4 text-gray-600">
                      <FaClock /> Created At:{" "}
                      {new Date(trip.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between gap-x-4">
                      <Link href={`/dashboard/${trip.tripId}`}>
                        <button className="px-4 py-2 bg-customOrange text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                          View Details
                        </button>
                      </Link>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 ease-in-out"
                        onClick={async () => {
                          const confirmed = confirm(
                            "Are you sure you want to delete this trip?"
                          );
                          if (confirmed) {
                            try {
                              await axios.delete(
                                `${process.env.NEXT_PUBLIC_SERVER_URL}/users/delete-trip/${trip._id}`
                              );
                              fetchUserData(user.id, setUserData, setLoading);
                            } catch (error) {
                              console.error("Error deleting trip", error);
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center bg-white p-8 rounded-xl shadow-md">
                <FaUtensils className="text-5xl mx-auto mb-4 text-customOrange" />
                <p className="text-xl font-semibold mb-2 text-gray-800">
                  No trips planned yet!
                </p>
                <p className="text-gray-600">
                  Start planning your next adventure by clicking the button
                  below.
                </p>
                <Link
                  href="/#generate-trip"
                  className="inline-block mt-4 px-6 py-2 bg-customOrange text-white rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                  Plan a Trip
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      {showModal && (
        <EditPreferencesModal
          closeModal={() => setShowModal(false)}
          userId={user.id}
          userData={userData}
          fetchUserData={fetchUserData}
        />
      )}
    </div>
  );
};

export default Dashboard;
