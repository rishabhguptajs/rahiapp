/**
 * @component Header
 * @description Renders the header section of the application, including navigation links, user authentication buttons, and a responsive menu.
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import BarsIcon from "../assets/bars.png";

/**
 * NavLink component
 * @param {Object} props - Component properties
 * @param {string} props.href - The URL to link to
 * @param {ReactNode} props.children - The content to display inside the link
 * @returns {JSX.Element} The rendered navigation link
 */
const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="hover:bg-customOrange hover:text-white px-4 py-2 rounded transition duration-300 text-base"
  >
    {children}
  </Link>
);

/**
 * Header component
 * @returns {JSX.Element} The rendered header section containing navigation links and user authentication options
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the visibility of the mobile menu
   * @function toggleMenu
   */
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { href: "/#services", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white text-black py-4 px-6 border-b w-full shadow-sm">
      <div className="container max-w-screen-xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition duration-300"
        >
          <Image
            src="/rahi_logo.png"
            width={60}
            height={60}
            alt="Logo"
            className="rounded-full"
          />
        </Link>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <Link
              className="bg-customOrange text-white px-5 py-2 rounded-md transition duration-300 hover:bg-opacity-90"
              href="/signup"
            >
              Sign Up
            </Link>
          </SignedOut>
          <SignedIn>
            <div className="hidden md:flex space-x-4">
              <Link
                href="/bill"
                className="bg-transparent text-customOrange border-customOrange border-2 hover:bg-orange-100/45 px-4 py-2 rounded-md hover:shadow-md hover:-translate-y-1 transition-all"
              >
                Bill Splitter
              </Link>
              <Link
                href="/dashboard"
                className="bg-customOrange text-white px-4 py-2 rounded-md hover:shadow-md hover:-translate-y-1 transition-all"
              >
                Dashboard
              </Link>
            </div>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>

          <button
            className="md:hidden flex items-center p-2 rounded-md hover:bg-gray-200 transition duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Image src={BarsIcon} width={24} height={24} alt="Menu" />
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-customOrange text-white mt-4 rounded-md overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-6 py-3 hover:bg-white hover:text-customOrange transition duration-300 text-base"
            onClick={toggleMenu}
          >
            {link.label}
          </Link>
        ))}
        <SignedIn>
          <Link
            href="/bill"
            className="block px-6 py-3 hover:bg-white hover:text-customOrange transition duration-300 text-base border-t border-orange-400"
            onClick={toggleMenu}
          >
            Bill Splitter
          </Link>
          <Link
            href="/dashboard"
            className="block px-6 py-3 hover:bg-white hover:text-customOrange transition duration-300 text-base border-t border-orange-400"
            onClick={toggleMenu}
          >
            Dashboard
          </Link>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
