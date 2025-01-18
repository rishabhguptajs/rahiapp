/**
 * @component HeroSection
 * @description Renders the hero section of the application, featuring a call to action for users to start planning their journey.
 */
"use client"
import Image from "next/image"
import logo from "../assets/bg.png"

/**
 * Handles the smooth scrolling to the "generate-trip" section of the page.
 * @function handleScroll
 */
const handleScroll = () => {
  document
    .getElementById("generate-trip")
    .scrollIntoView({ behavior: "smooth" })
}

/**
 * HeroSection component
 * @returns {JSX.Element} The rendered hero section containing a call to action and an image.
 */
const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white p-10 rounded-lg shadow-lg max-w-screen overflow-hidden">
      <div className="w-full md:w-1/2 mb-10 md:mb-0 p-6 md:p-10 lg:p-14">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">
          Get started on your exciting journey with us.
        </h1>
        <p className="text-base md:text-lg text-gray-500 mb-6">
          Let Rahi create your perfect travel plan and provide you with the best
          advice and tips for your desired destination.
        </p>
        <button
          onClick={handleScroll}
          className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105 active:scale-95"
        >
          Plan Now
        </button>
      </div>

      <div className="relative w-full md:w-1/2 flex justify-center h-auto">
        <Image
          src={logo}
          alt="Background Image"
          layout="responsive"
          width={450}
          height={450}
          className="rounded-lg"
        />
      </div>
    </div>
  )
}

export default HeroSection
