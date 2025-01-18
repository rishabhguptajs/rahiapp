"use client";
/**
 * @page ContactUs
 * @description Renders a contact form for users to send messages.
 */
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function ContactUs() {
  /**
   * State to hold form data for email, subject, and message.
   * @type {Object}
   * @property {string} email - User's email address.
   * @property {string} subject - Subject of the message.
   * @property {string} message - Content of the message.
   */
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  /**
   * Handles changes in the input fields.
   * @param {Event} e - The event object from the input change.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Handles the form submission.
   * @async
   * @param {Event} e - The event object from the form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const toastLoad = toast.loading("Sending message...");
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sendmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.dismiss(toastLoad);
        toast.success("Message sent successfully!");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        const errorData = await response.json();
        alert(`Failed to send message: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error sending your message.");
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="flex flex-col items-center mb-10 justify-center py-16 bg-orange-500 text-white">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg"
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Your Problem"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-customOrange hover:bg-customOrange-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
