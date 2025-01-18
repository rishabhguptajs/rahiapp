/**
 * @page RootLayout
 * @description The main layout for the application, providing context and structure for all pages.
 */
import { Inter } from "next/font/google"; // Importing the Inter font from Google
import "./globals.css"; // Importing global styles
import { Analytics } from "@vercel/analytics/react"; // Importing analytics for tracking
import {
  ClerkProvider, // Importing ClerkProvider for authentication
} from "@clerk/nextjs"; 
import { neobrutalism } from "@clerk/themes"; // Importing neobrutalism theme for Clerk
import { TripProvider } from '../context/TripContext'; // Importing TripProvider for trip context management
// import { CSPostHogProvider } from "./providers"; // Uncomment if using PostHog for analytics

const inter = Inter({ subsets: ["latin"] }); // Initializing the Inter font with Latin subset

export const metadata = {
  title: "Rahi | Your own travel app", // Title of the application
  description: "A travel app for all of your needs.", // Description of the application
  icons: {
    icon: "/favicon.ico", // Favicon for the application
  },
};

/**
 * RootLayout component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render within the layout.
 * @returns {JSX.Element} The rendered layout for the application.
 */
export default function RootLayout({ children }) {
  return (
    <TripProvider> {/* Providing trip context to child components */}
      <html lang="en"> {/* Setting the language for the document */}
        <head>
          <title>{metadata.title}</title> {/* Setting the document title */}
          <meta name="description" content={metadata.description} /> {/* Setting the document description */}
          <link rel="icon" href={metadata.icons.icon} /> {/* Setting the favicon */}
        </head>
        <body className={inter.className}> {/* Applying the Inter font class to the body */}
          <ClerkProvider
            appearance={{
              baseTheme: neobrutalism, // Setting the appearance theme for Clerk
            }}
          >
            {children} {/* Rendering child components */}
            <Analytics /> {/* Including analytics tracking */}
          </ClerkProvider>
        </body>
      </html>
    </TripProvider>
  );
}
