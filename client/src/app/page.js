/**
 * @page Home
 * @description Renders the home page of the application, including the header, hero section, main content, and footer.
 */
"use client"; // Indicates that this file is a client component

import Header from "../components/Header"; // Importing the Header component
import VacationPlan from "../components/Vacation"; // Importing the VacationPlan component
import Footer from "../components/Footer"; // Importing the Footer component
import Services from "../components/Services"; // Importing the Services component
import HomePage from "../components/Home"; // Importing the HomePage component
import HeroSection from "../components/HeroSection"; // Importing the HeroSection component

/**
 * Home component
 * @returns {JSX.Element} The rendered home page.
 */
export default function Home() {
  return (
    <div className="h-[100vh]"> {/* Main container for the home page */}
      <Header /> {/* Renders the header of the page */}
      <main> 
        <HeroSection /> {/* Renders the hero section of the home page */}
        <HomePage /> {/* Renders the main content of the home page */}
        <VacationPlan /> {/* Renders the vacation planning section */}
        <Services /> {/* Renders the services offered */}
      </main>
      <Footer /> {/* Renders the footer of the page */}
    </div>
  );
} 
