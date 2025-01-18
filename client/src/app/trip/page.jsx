/**
 * @page ErrorPage
 * @description Renders an error page to inform users that something went wrong.
 */
import React from 'react';

/**
 * Page component that displays an error message.
 * @returns {JSX.Element} The rendered error page.
 */
const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
    </div>
  );
}

export default Page;
