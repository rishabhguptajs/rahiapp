/**
 * @page PricingPage
 * @description Renders the pricing options available for users, including a basic and premium plan.
 */
"use client"

import { FaCheckCircle } from "react-icons/fa"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import Link from "next/link"

const PricingPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-200 text-black flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-12 text-center">
          Pricing
        </h1>
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform hover:scale-105">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Basic Plan
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6">
              The essential plan for casual travelers.
            </p>
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Free
            </div>
            <ul className="mb-6 md:mb-8 space-y-2 md:space-y-4">
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Up to 3 itineraries per month
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Up to 5 activity suggestions per itinerary
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Basic budget management
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Access to popular public destinations
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Standard email support (48-hour response time)
              </li>
            </ul>
            <button className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 md:py-3 rounded-lg font-semibold transition duration-300 hover:opacity-90">
              <Link href="/#generate-trip">Get Started</Link>
            </button>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-yellow-500 text-white rounded-lg shadow-lg p-6 sm:p-8 transform transition-transform hover:scale-105">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Premium Plan
            </h2>
            <p className="text-white/90 mb-4 md:mb-6">
              Unlock advanced features for frequent travelers.
            </p>
            <div className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              ₹59/month
            </div>
            <div className="text-lg md:text-xl font-medium text-white/90 mb-4 md:mb-6">
              or ₹599/year
            </div>
            <ul className="mb-6 md:mb-8 space-y-2 md:space-y-4">
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Unlimited itineraries per month
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Up to 15 activity suggestions per itinerary
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Advanced budget management with multiple categories
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Access to exclusive destinations
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Customizable itineraries
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Offline access to itineraries
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Ad-free experience
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Priority email & chat support (12-hour response time)
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-white mr-2" />
                Family sharing (up to 4 members)
              </li>
            </ul>

            <a href="mailto:app@rahiapp.tech">
              <button className="w-full bg-white text-orange-500 py-2 md:py-3 rounded-lg font-semibold transition duration-300 hover:opacity-90">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PricingPage
