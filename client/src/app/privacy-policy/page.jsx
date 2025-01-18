/**
 * @page PrivacyPolicyPage
 * @description Renders the Privacy Policy page outlining how we collect, use, and protect personal information.
 */
"use client"

import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-orange-500 flex flex-col items-center py-12 px-4 mb-10">
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>

          <p className="text-gray-600 mb-6">
            At <span className="font-semibold">Rahi</span>, we take your privacy
            seriously. This Privacy Policy outlines how we collect, use, and
            protect your personal information when you use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-6">
            We collect the following types of information to provide you with a
            better experience:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-600 space-y-2">
            <li>
              Personal Identification Information (e.g., name, email address)
            </li>
            <li>Usage Data (e.g., how you use our services, preferences)</li>
            <li>Location Data (if you permit us to access it)</li>
            <li>Payment Information (for Premium Plan users)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-6">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-600 space-y-2">
            <li>To provide and maintain our services</li>
            <li>To improve and personalize your experience</li>
            <li>To manage your account and provide customer support</li>
            <li>To process payments and manage subscriptions</li>
            <li>
              To communicate with you about updates, offers, and new features
            </li>
            <li>To comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            3. Data Security
          </h2>
          <p className="text-gray-600 mb-6">
            We prioritize the security of your data. We implement appropriate
            technical and organizational measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-600 mb-6">
            We do not share your personal information with third parties except
            in the following cases:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-600 space-y-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>
              To protect the rights and safety of our users and the public
            </li>
            <li>
              With service providers who assist us in operating our services
              (e.g., payment processors, hosting providers)
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            5. Your Rights
          </h2>
          <p className="text-gray-600 mb-6">
            You have certain rights regarding your personal information,
            including the right to access, correct, or delete your data. You can
            also withdraw your consent to data processing at any time.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-600 mb-6">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the "Last Updated" date below.
          </p>

          <p className="text-gray-600 mb-6 text-center">
            Last Updated: August 2024
          </p>

          <p className="text-gray-600 text-center">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:rishabhgupta4523@gmail.com"
              className="text-blue-500 hover:underline"
            >
              support@rahiapp.tech
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
