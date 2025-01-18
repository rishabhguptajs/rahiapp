/**
 * @page RefundPolicyPage
 * @description Renders the Refund Policy page outlining the terms regarding refunds for Rahi's services.
 */
"use client"

import Footer from "../../components/Footer"
import Header from "../../components/Header"

const RefundPolicyPage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-orange-500 mb-10 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center">
          Refund Policy
        </h1>
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-gray-800">
          <p className="mb-6">
            Welcome to Rahi's Refund Policy page. Please review our policy
            carefully to understand our terms regarding refunds.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            1. General Policy
          </h2>
          <p className="mb-6">
            At Rahi, we strive to provide you with a satisfactory experience. If
            you are not completely satisfied with our service, please review the
            following refund policy.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            2. Eligibility for Refunds
          </h2>
          <div className="mb-6">
            <p className="mb-2">
              To be eligible for a refund, your request must be made within 7
              days of the purchase date. We only offer refunds for the following
              reasons:
            </p>
            <ul className="list-disc list-inside ml-6 mb-6">
              <li>
                Service issues that were not resolved within the expected
                timeframe.
              </li>
              <li>Technical problems that prevent the use of the service.</li>
              <li>Billing errors or incorrect charges.</li>
            </ul>
            <p>Refunds are not available for:</p>
            <ul className="list-disc list-inside ml-6 mb-6">
              <li>Change of mind or dissatisfaction with the service.</li>
              <li>Any issues that arise after the 7-day refund period.</li>
            </ul>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            3. Requesting a Refund
          </h2>
          <div className="mb-6">
            <p className="mb-2">
              To request a refund, please contact our support team at
              support@rahiapp.tech with the following information:
            </p>
            <ul className="list-disc list-inside ml-6 mb-6">
              <li>Your account details.</li>
              <li>The reason for the refund request.</li>
              <li>Proof of purchase or transaction ID.</li>
            </ul>
            <p>
              We will review your request and respond within 5 business days. If
              approved, the refund will be processed and applied to the original
              payment method.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            4. Changes to Policy
          </h2>
          <p className="mb-6">
            We may update this refund policy from time to time. Any changes will
            be posted on this page, and your continued use of the service after
            such changes constitutes your acceptance of the revised policy.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about our refund policy or need assistance
            with a refund request, please contact us at support@rahiapp.tech.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RefundPolicyPage
