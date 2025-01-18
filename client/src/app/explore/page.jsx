"use client"

/**
 * @page ExplorePage
 * @description Renders the Explore page showcasing the app's features and co-founders.
 */

import { TailwindButton } from "../../components/ui/tailwindcss-buttons";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import Image from "next/image";

/**
 * Renders a grid pattern for the background.
 * @param {Object} props - The properties for the grid.
 * @param {Array} props.pattern - The pattern for the grid.
 * @param {number} props.size - The size of the grid.
 * @returns {JSX.Element} The grid component.
 */
const Grid = ({ pattern, size }) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          pattern={p}
          className="absolute inset-0 h-full w-full opacity-20"
        />
      </div>
    </div>
  );
};

/**
 * Renders the grid pattern for the background.
 * @param {Object} props - The properties for the grid pattern.
 * @param {Array} props.pattern - The pattern for the grid.
 * @param {number} props.width - The width of the grid.
 * @param {number} props.height - The height of the grid.
 * @param {string} props.className - Additional class names for styling.
 * @returns {JSX.Element} The grid pattern component.
 */
const GridPattern = ({ pattern, width, height, className }) => (
  <svg className={className} width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
    {pattern.map((p, i) => (
      <rect
        key={i}
        x={p[0]}
        y={p[1]}
        width={width}
        height={height}
        className="fill-gray-200 dark:fill-gray-700"
      />
    ))}
  </svg>
);

/**
 * Renders the Explore page with features and co-founders.
 * @returns {JSX.Element} The Explore page component.
 */
const ExplorePage = () => {

  const grid = [
    {
      title: "Personalized Itineraries",
      description:
        "Rahi's AI-driven tool creates customized daily plans based on your preferences, interests, and budget. From must-see attractions to hidden gems, your travel itinerary will be tailored just for you.",
    },
    {
      title: "Real-Time Data Integration",
      description:
        "Access up-to-date information on attractions, activities, restaurants, and accommodations through integrated APIs. Stay informed about current offerings and availability.",
    },
    {
      title: "Optimized Travel Experience",
      description:
        "Prioritize your activities and destinations based on your interests and budget. Rahi optimizes your itinerary for a seamless travel experience, ensuring you make the most of your time.",
    },
    {
      title: "Accommodation Recommendations",
      description:
        "Receive suggestions for hotels and other accommodations near your planned activities. Compare options and book your stay with ease, all within the app.",
    },
    {
      title: "Transportation Suggestions",
      description:
        "Get recommendations for transportation options and routes between locations. Whether it's public transit or ride-sharing, Rahi helps you navigate your destination effortlessly.",
    },
    {
      title: "Discounts and Offers",
      description:
        "Explore exclusive discounts and special offers available to card members. Enhance your travel experience while saving money on various activities and services.",
    },
    {
      title: "Comprehensive Cost Breakdown",
      description:
        "View a detailed cost breakdown for each day of your trip. Rahi provides a clear view of your daily and total expenses, helping you stay within budget.",
    },
    {
      title: "Interactive Itinerary Display",
      description:
        "Navigate through your itinerary with user-friendly tabs for daily plans, accommodations, activities, dining, transportation, and cost breakdown. Edit, save, and share your plans with ease.",
    },
  ];

  const team = [
    {
      name: "Rishabh Gupta",
      role: "Backend Developer & CEO",
      image: '',
      linkedIn: 'https://www.linkedin.com/in/rishabhguptajs'
    },
    {
      name: "Navya Bijoy",
      role: "ML Engineer & CTO",
      image: '',
      linkedIn: 'https://www.linkedin.com/in/navya-bijoy-883a35249/'
    },
    {
      name: "Pulkit Kumar",
      role: "Frontend Developer & CFO",
      image: '',
      linkedIn: 'https://www.linkedin.com/in/pulkit-kumar-199534201/'
    },
  ];

  return (
    <div className="h-fit w-full bg-black dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center overflow-visible">
      <header className="w-full flex flex-col items-center relative px-4 md:px-8">
        <div className="fixed z-50 top-0 left-0 mt-4 ml-4">
          <Link href="/">
            <TailwindButton text="Back to Waitlist" back />
          </Link>
        </div>
        <div className="text-4xl md:text-6xl lg:text-7xl mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-6">
          Explore our App
        </div>
      </header>

      <div className="z-20 px-4 md:px-8">
        <p className="text-neutral-500 max-w-lg mx-auto my-2 mb-4 text-sm md:text-base text-center">
          Welcome to{" "}
          <span className="bg-yellow-300 p-1 rounded-md text-lg text-zinc-800">
            Rahi
          </span>
          , your own travel app. <br />
        </p>

        <p className="text-neutral-500 max-w-lg mx-auto my-2 mb-4 text-sm md:text-base text-center">
          Discover the world like never before with Rahi! Our cutting-edge AI-powered travel planner crafts personalized itineraries tailored to your preferences, budget, and interests.
        </p>
      </div>

      {/* Features */}
      <div className="text-4xl md:text-5xl lg:text-6xl mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-6">
        Features
      </div>
      <div className="py-10 mx-4 md:mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {grid.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 lg:p-8 rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <Grid size={20} />
              <p className="text-base md:text-lg font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 md:mt-4 text-sm md:text-base font-normal relative z-20">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-4xl md:text-5xl lg:text-6xl mt-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-6">
        Meet the Co-Founders
      </div>
      <div className="py-10 mx-4 md:mx-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-4 md:p-6 lg:p-8 rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 z-10 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-full"
                />
              </div>
              <div className="relative z-20 text-center">
                <h3 className="text-lg md:text-xl font-bold text-neutral-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1 text-sm md:text-base font-normal">
                  {member.role}
                </p>
                <div className="flex justify-center mt-2">
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 dark:text-neutral-300 mx-2"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-800 dark:text-neutral-300 mx-2"
                  >
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
