/**
 * @page Hotels
 * @description Renders the hotels page for a specific trip, displaying available hotels based on trip details.
 */
"use client"

import React, { useState, useEffect } from "react"
import { Star, Info, Loader } from "lucide-react"
import axios from "axios"
import { useParams } from "next/navigation"

const Hotels = () => {
  const [hotels, setHotels] = useState([]) // State to hold the list of hotels
  const params = useParams() // Get trip ID from URL parameters
  const [tripData, setTripData] = useState(null) // State to hold trip data
  const [loading, setLoading] = useState(true) // State to manage loading state
  const [error, setError] = useState(null) // State to manage error messages

  /**
   * Fetch trip data from local storage or server.
   * If the trip data is found in local storage, it is used.
   * Otherwise, it fetches from the server using the trip ID.
   */
  const fetchTripData = async () => {
    const localTripDetails = localStorage.getItem("tripDetails")
    if (localTripDetails && JSON.parse(localTripDetails)._id === params.id) {
      setTripData(JSON.parse(localTripDetails))
      return
    }
    try {
      console.log(params)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/trip-details/${params.id}`
      )
      setTripData(response.data)
    } catch (error) {
      console.error("Error fetching trip data:", error)
    }
  }

  /**
   * Fetch hotels based on trip data including check-in and check-out dates.
   * Sends a request to the server to retrieve available hotels.
   */
  const fetchHotels = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotels/get-hotels`,
        {
          stay: {
            checkIn: tripData.startDate,
            checkOut: tripData.endDate,
          },
          location: tripData.location,
          occupancies: [
            {
              rooms: 1,
              adults: 2,
              children: 0,
            },
          ],
        }
      )
      setHotels(response.data.hotels.hotels || [])
      setLoading(false)
    } catch (err) {
      console.error("Error fetching hotels:", err)
      setError("Failed to load hotels. Please try again later.")
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTripData() // Fetch trip data when the component mounts or trip ID changes
  }, [params.id])

  useEffect(() => {
    if (
      tripData &&
      tripData.startDate &&
      tripData.endDate &&
      tripData.location
    ) {
      fetchHotels() // Fetch hotels when trip data is available
    }
  }, [tripData])

  /**
   * Render star icons based on the hotel's category name.
   * @param {string} categoryName - The category name of the hotel.
   * @returns {JSX.Element[]} - An array of star icons.
   */
  const renderStars = (categoryName) => {
    const starCount = parseInt(categoryName.split(" ")[0])
    return Array(starCount)
      .fill()
      .map((_, i) => <Star key={i} size={16} className="text-yellow-400" />)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-customOrange" size={48} />
        <p className="ml-4 text-xl font-semibold text-gray-700">
          Loading hotels...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchHotels}
          className="px-4 py-2 bg-customOrange text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold text-gray-700 mb-4">
          No hotels found for your search criteria.
        </p>
        <p className="text-lg text-gray-600">Try for a different location.</p>
      </div>
    )
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Available Hotels
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-6 bg-white hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              {hotel.name}
            </h3>
            <div className="flex items-center mb-4">
              {renderStars(hotel.categoryName)}
              <span className="ml-2 text-sm text-gray-600">
                {hotel.categoryName}
              </span>
            </div>
            <p className="mb-2 text-sm text-gray-700">
              {hotel.destinationName}, {hotel.zoneName}
            </p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-gray-700">
                Available Rooms:
              </h4>
              {hotel.rooms.map((room, roomIndex) => (
                <div key={roomIndex} className="mb-4 p-3 bg-gray-50 rounded-md">
                  <h5 className="font-medium mb-2 text-gray-800">
                    {room.name}
                  </h5>
                  {room.rates.map((rate, rateIndex) => (
                    <div
                      key={rateIndex}
                      className="mb-2 p-3 bg-white rounded-md shadow-sm"
                    >
                      <p className="font-medium text-green-600">
                        Rate: ${rate.net}
                      </p>
                      <p className="text-gray-700">Board: {rate.boardName}</p>
                      <p className="text-gray-700">
                        Payment Type: {rate.paymentType}
                      </p>
                      {rate.offers && rate.offers.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium text-blue-600">Offers:</p>
                          {rate.offers.map((offer, offerIndex) => (
                            <p key={offerIndex} className="text-gray-700">
                              {offer.name}: ${offer.amount}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 flex items-center">
              <Info size={16} className="mr-2 text-blue-500" />
              <span>
                Cancellation policies and full details available upon request
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hotels
