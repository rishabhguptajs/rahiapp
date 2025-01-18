"use client"

/**
 * @page TripDetails
 * @description Renders the details of a specific trip, including itinerary and PDF download functionality.
 */
import React, { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"
import { usePDF } from "react-to-pdf"

/**
 * Fetches trip data from the server based on the trip ID.
 * @async
 * @function fetchTripData
 */
const TripDetails = () => {
  const { id } = useParams()
  const [tripData, setTripData] = useState(null) // State to hold trip data
  const [loading, setLoading] = useState(true) // State to manage loading status
  const [isPDFReady, setIsPDFReady] = useState(false) // State to manage PDF readiness

  const targetRef = useRef(null) // Reference for the PDF target element

  const { toPDF, targetRef: pdfTargetRef } = usePDF({
    filename: "trip-details.pdf",
  }) 

  /**
   * Handles the fetching of trip data from the API.
   * @async
   */
  const fetchTripData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users/trip-details/${id}`
      )
      setTripData(response.data) // Set the trip data
    } catch (error) {
      console.error("Error fetching trip data", error) // Log any errors
    } finally {
      setLoading(false) // Update loading status
    }
  }

  useEffect(() => {
    if (id) {
      fetchTripData() // Fetch trip data if ID is available
    }
  }, [id])

  useEffect(() => {
    if (targetRef.current && !loading && tripData) {
      setIsPDFReady(true) // Set PDF readiness
      pdfTargetRef.current = targetRef.current // Set the target reference for PDF
    }
  }, [loading, tripData, pdfTargetRef])

  /**
   * Handles the PDF download action.
   */
  const handleDownloadPDF = () => {
    if (isPDFReady && pdfTargetRef.current) {
      toPDF() // Trigger PDF download
    } else {
      console.error("PDF is not ready or target element not found") // Log error if PDF is not ready
    }
  }

  if (loading) {
    return <div className="text-center text-green-900 mt-8">Loading...</div> // Loading state
  }

  if (!tripData) {
    return (
      <div className="text-center text-red-600 mt-8">
        No trip details found. // No trip data state
      </div>
    )
  }

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <nav className="flex items-center justify-between mb-6">
        <Link href="/dashboard">
          <span className="bg-customOrange text-white px-4 py-2 rounded-lg hover:shadow-lg flex items-center gap-2 transition-all duration-300 ease-in-out">
            <IoIosArrowBack /> Back to Dashboard
          </span>
        </Link>
      </nav>

      <div
        ref={targetRef}
        className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-green-900">
            Trip to {tripData.location}
          </h1>

          <button
            onClick={handleDownloadPDF}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out ${
              isPDFReady
                ? "bg-customOrange text-white hover:shadow-lg"
                : "bg-gray-400 text-white cursor-not-allowed"
            }`}
            disabled={!isPDFReady}
          >
            {isPDFReady ? "Download PDF" : "Preparing PDF..."}
          </button>
        </div>

        <p className="text-gray-600">
          Start Date: {new Date(tripData.startDate).toLocaleDateString()} | End
          Date: {new Date(tripData.endDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600 mb-4">
          Total Budget: ₹{tripData.totalBudget}
        </p>

        <h2 className="text-2xl font-semibold text-green-900 mt-6 mb-4">
          Itinerary
        </h2>
        {tripData.itinerary.map((day, index) => (
          <div key={index} className="border-b border-gray-300 pb-4 mb-6">
            <h3 className="text-xl font-semibold text-green-800">
              Day {day.day}
            </h3>

            <div className="mt-4">
              <h4 className="font-semibold text-green-600">Morning:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {day.morning.activities.map((activity) => (
                  <li key={activity._id}>{activity.name}</li>
                ))}
                {day.morning.dining.map((dine) => (
                  <li key={dine._id}>Dining: {dine.name}</li>
                ))}
                {day.morning.transportation.map((transport) => (
                  <li key={transport._id}>Transport: {transport.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-green-600">Afternoon:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {day.afternoon.activities.map((activity) => (
                  <li key={activity._id}>{activity.name}</li>
                ))}
                {day.afternoon.dining.map((dine) => (
                  <li key={dine._id}>Dining: {dine.name}</li>
                ))}
                {day.afternoon.transportation.map((transport) => (
                  <li key={transport._id}>Transport: {transport.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-green-600">Evening:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {day.evening.activities.map((activity) => (
                  <li key={activity._id}>{activity.name}</li>
                ))}
                {day.evening.dining.map((dine) => (
                  <li key={dine._id}>Dining: {dine.name}</li>
                ))}
                {day.evening.transportation.map((transport) => (
                  <li key={transport._id}>Transport: {transport.name}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-green-600">Night:</h4>
              <ul className="list-disc list-inside text-gray-600">
                {day.night.accommodations.map((acc) => (
                  <li key={acc._id}>Accommodation: {acc.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripDetails
