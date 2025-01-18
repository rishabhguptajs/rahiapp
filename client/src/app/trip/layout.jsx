/**
 * @page Layout
 * @description Renders the layout for the trip management page, including navigation and trip details.
 */
"use client"

import React, { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Calendar, List, Loader } from 'lucide-react';
import Header from '../../components/Header';
import axios from 'axios';

/**
 * Navigation items for the trip layout.
 * @type {Array<Object>}
 * @property {string} name - The name of the navigation item.
 * @property {React.Component} icon - The icon component for the navigation item.
 * @property {string} path - The path for the navigation item.
 */
const navItems = [
  {
    name: "Trip",
    icon: MapPin,
    path: "/trip",
  },
  {
    name: "Hotels",
    icon: Calendar,
    path: "/trip/hotels",
  },
];

/**
 * Layout component for the trip management page.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }) => {
  const pathname = usePathname();
  const params = useParams();
  const [tripData, setTripData] = useState(null);
  const [activeTab, setActiveTab] = useState('Trip');
  const [loading, setLoading] = useState(true);

  /**
   * Effect to set the active tab based on the current pathname.
   */
  useEffect(() => {
    const currentTab = navItems.find((item) => item.path === pathname.split('/').slice(0, 3).join('/'))?.name;
    if (currentTab) {
      setActiveTab(currentTab);
    }
  }, [pathname]);

  /**
   * Fetch trip data from local storage or server.
   * If the trip data is found in local storage, it is used.
   * Otherwise, it fetches from the server using the trip ID.
   */
  const fetchTripData = async() => {
    const localTripDetails = localStorage.getItem("tripDetails");
    if (localTripDetails && localTripDetails._id == params.id) {
      setTripData(JSON.parse(localTripDetails));
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/trip-details/${params.id}`);
      setTripData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trip data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTripData();
  }, [params.id]);

  /**
   * Format the date to a readable string.
   * @param {Date} date - The date to format.
   * @returns {string} - The formatted date string.
   */
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-customOrange" size={48} />
        <p className="ml-4 text-xl font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        <aside className="w-full md:w-1/5 bg-white shadow-md overflow-y-auto">
        {tripData && (
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-2">{tripData.location}</h2>
          </div>
        )}
          {tripData && (
            <div className="p-4 border-b">
              <p className="text-sm text-gray-600 mb-1">
                <Calendar className="inline-block mr-1" size={16} />
                {formatDate(tripData.startDate)} - {formatDate(tripData.endDate)}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <List className="inline-block mr-1" size={16} />
                {tripData.duration} days
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Budget: ₹{tripData.totalBudget}
              </p>
              <p className="text-sm text-gray-600">
                Interests: {tripData.interests?.length > 2 ? '...' : tripData.interests?.join(", ") || "None"}
              </p>
            </div>
          )}
          <nav className="p-4 border-b">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={`${item.path}/${params.id}`}
                className={`flex items-center p-2 rounded-md mb-2 ${
                  activeTab === item.name
                    ? "bg-customOrange text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(item.name)}
              >
                <item.icon className="mr-2" size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-grow md:w-4/5 p-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;