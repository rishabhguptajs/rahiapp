"use client"

/**
 * @page TermsPage
 * @description Renders the Terms and Conditions page for the Rahi app, outlining user responsibilities and rights.
 */

import Footer from "../../components/Footer"
import Header from "../../components/Header"

const TermsPage = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen mb-10 bg-orange-500 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-12 text-center">
          Terms and Conditions
        </h1>
        <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-gray-800">
          <p className="mb-6">
            Welcome to Rahi. Please read these terms and conditions carefully
            before using our app.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-6">
            By using our app, you agree to be bound by these terms and
            conditions. If you do not agree to these terms, please do not use
            the app.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            2. Use of the App
          </h2>
          <p className="mb-6">
            You agree to use the app only for lawful purposes. You are
            responsible for ensuring that your use of the app does not violate
            any applicable laws, regulations, or rights of others.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            3. User Accounts
          </h2>
          <p className="mb-6">
            To access certain features of the app, you may be required to create
            an account. You are responsible for maintaining the confidentiality
            of your account information and for all activities that occur under
            your account.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            4. Subscription and Billing
          </h2>
          <p className="mb-6">
            If you choose to subscribe to a paid plan, you agree to pay the
            subscription fees associated with that plan. All fees can be
            refunded within 7 days of purchase. After 7 days, no refunds will be
            provided.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            5. Intellectual Property
          </h2>
          <p className="mb-6">
            All content, trademarks, and intellectual property related to the
            app are the property of Rahi. You may not reproduce, distribute, or
            use any content without prior written permission.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            6. Termination
          </h2>
          <p className="mb-6">
            We reserve the right to terminate or suspend your account at any
            time, without notice, for conduct that we believe violates these
            terms or is harmful to other users.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-6">
            To the maximum extent permitted by law, Rahi shall not be liable for
            any damages arising out of your use of the app.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            8. Changes to Terms
          </h2>
          <p className="mb-6">
            We may update these terms and conditions from time to time. Any
            changes will be posted on this page. Your continued use of the app
            after any changes signifies your acceptance of the updated terms.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold mb-4">9. Contact Us</h2>
          <p>
            If you have any questions about these terms and conditions, please
            contact us.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TermsPage