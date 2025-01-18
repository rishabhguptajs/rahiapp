/**
 * @component Services
 * @description Renders a section displaying various services offered, each represented by a service card.
 */
'use client'
import React from "react";
import { motion } from "framer-motion";
import { FaCloudSun, FaMapSigns, FaCogs, FaHotel } from "react-icons/fa";
import { MdEmojiTransportation, MdLocalHotel } from "react-icons/md";

/**
 * ServiceCard component
 * @param {Object} props - Component properties
 * @param {React.ElementType} props.icon - The icon component to display
 * @param {string} props.title - The title of the service
 * @param {string} props.description - A brief description of the service
 * @returns {JSX.Element} The rendered service card
 */
const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="p-8 bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between"
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="text-6xl text-customOrange mb-6" />
        <h4 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {title}
        </h4>
        <p className="text-gray-600 text-center leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

/**
 * Services component
 * @returns {JSX.Element} The rendered services section containing multiple service cards
 */
const Services = () => {
  const services = [
    {
      icon: FaCloudSun,
      title: "Real time Weather",
      description:
        "Get accurate weather forecasts and climate insights for your travel destinations.",
    },
    {
      icon: FaMapSigns,
      title: "Best Tour Guide",
      description:
        "Experience local expertise with our handpicked guides for unforgettable adventures.",
    },
    {
      icon: FaCogs,
      title: "Customization",
      description:
        "Tailor your travel experiences to match your unique preferences and interests.",
    },
    {
      icon: MdEmojiTransportation,
      title: "Transportation Suggestions",
      description:
        "Tailor your travel experiences to match your unique preferences and interests.",
    },
    {
      icon: FaHotel,
      title: "Personalized Itineraries",
      description:
        "Tailor your travel experiences to match your unique preferences and interests.",
    },
    {
      icon: MdLocalHotel,
      title: "Hotel Recommendations",
      description:
        "Tailor your travel experiences to match your unique preferences and interests.",
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl text-customPink font-cursive italic mb-4">
            What we serve
          </h2>
          <h3 className="text-5xl font-bold text-gray-800 leading-tight">
            We offer our best services
          </h3>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
