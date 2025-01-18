/**
 * @component Footer
 * @description Renders the footer section of the application, including company information, important links, contact details, and social media connections.
 */
import React from "react"
import { FaLinkedin, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa"
import Link from "next/link"

/**
 * Footer component
 * @returns {JSX.Element} The rendered footer section containing links and contact information.
 */
const Footer = () => {
  return (
    <footer className="bg-customOrange text-white py-12 px-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="mb-8 md:mb-0">
            {/* Placeholder for additional content if needed */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blogs"
                  className="hover:underline transition duration-300"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Important Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:underline transition duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/tac"
                  className="hover:underline transition duration-300"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:underline transition duration-300"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">
              <a href="mailto:support@rahiapp.tech" className="hover:underline">
                support@rahiapp.tech
              </a>
            </p>
          </div>
        </div>
        <h4 className="text-xl font-semibold mb-4">Connect with Us</h4>
            <div className="flex space-x-6">
              <a
                href="https://www.linkedin.com/company/travelwithrahi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition duration-300"
              >
                <FaLinkedin className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/explorewithrahi/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://twitter.com/ExploreWithRahi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-300 transition duration-300"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="mailto:app@rahiapp.tech"
                className="hover:text-red-500 transition duration-300"
              >
                <FaEnvelope className="text-2xl" />
              </a>
            </div>

        <div className="mt-12 pt-8 border-t border-orange-400 text-center">
          <p>
            &copy; {new Date().getFullYear()} Rahi Pvt. Ltd. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
