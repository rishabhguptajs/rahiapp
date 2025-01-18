/**
 * @component Waitlist
 * @description Renders a waitlist interface where users can join the waitlist by providing their email address.
 */
"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { BackgroundBeams } from "../components/ui/background-beams"
import Input from "./input"
import { Toaster, toast } from "react-hot-toast"
import { TailwindButton } from "./ui/tailwindcss-buttons"
import Link from "next/link"

export function Waitlist() {
  /** 
   * State to hold the user's email address.
   * @type {string}
   */
  const [email, setEmail] = useState("")

  /** 
   * State to hold the user's IP address.
   * @type {string}
   */
  const [ip, setIp] = useState("")

  /**
   * useEffect hook to fetch the user's IP address when the component mounts.
   * It calls the fetchIp function to retrieve the IP address from an external API.
   */
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const res = await axios.get("https://api.ipify.org?format=json")
        setIp(res.data.ip)
      } catch (error) {
        console.error("Error fetching IP address:", error)
      }
    }

    fetchIp()
  }, [])

  /**
   * Handles the change event for the email input field.
   * @param {Object} e - The event object.
   */
  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  /**
   * Handles the submission of the email to join the waitlist.
   * Validates the email format and sends a POST request to the server.
   */
  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.")
      return
    }

    if (email && ip) {
      try {
        const toastLoad = toast.loading("Joining the waitlist...")
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/waitlist/join`,
          { email, ipAddress: ip }
        )
        toast.dismiss(toastLoad)
        toast.success(res.data.message)
      } catch (error) {
        toast.dismiss()
        toast.error(`${error.response?.data?.message || error.message}`)
      }
    } else {
      toast.error("Please enter a valid email address.")
    }
  }

  return (
    <div className="h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <Toaster />

      <Link href="/blogs" className="fixed top-4 right-4 z-50">
        <TailwindButton text="Blogs" />
      </Link>

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold mb-6">
          Join the waitlist
        </h1>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 mb-4 text-sm text-center relative z-10">
          Welcome to{" "}
          <span className="bg-yellow-300 p-1 rounded-md text-lg text-zinc-800">
            Rahi
          </span>
          , your own travel app. <br />
          Discover the world like never before with Rahi! Our cutting-edge
          AI-powered travel planner crafts personalized itineraries tailored to
          your preferences, budget, and interests. Be the first to experience
          seamless travel planning, exclusive deals, and special discounts by
          joining our waitlist. Say goodbye to travel stress and hello to
          unforgettable adventures with Rahi – your ultimate guide to
          discovering hidden gems.
        </p>

        <div className="my-4">
          <Input
            placeholders={[
              "your@email.com",
              "email@yours.com",
              "your@email.com",
              "email@yours.com",
            ]}
            handleChange={handleChange}
            onSubmit={handleSubmit}
          />
        </div>
        <div className="flex justify-center">
          <Link href="/explore">
            <TailwindButton
              className="text-white cursor-pointer z-50 relative"
              text="Explore our App"
            />
          </Link>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  )
}
