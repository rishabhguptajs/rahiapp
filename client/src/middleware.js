/**
 * @fileoverview Middleware configuration for Clerk authentication in a Next.js application.
 * @module middleware
 * @requires clerkMiddleware
 */

import { clerkMiddleware } from "@clerk/nextjs/server";

/**
 * Default export of the Clerk middleware for handling authentication.
 * This middleware checks for user authentication on incoming requests.
 * @returns {Function} The Clerk middleware function.
 */
export default clerkMiddleware();

/**
 * Configuration object for the middleware.
 * This object defines the routes that the middleware should apply to.
 * @type {Object}
 * @property {Array<string>} matcher - An array of route patterns to match against.
 */
export const config = {
  matcher: [
    /**
     * Skip Next.js internals and all static files, unless found in search params.
     * This pattern ensures that the middleware does not interfere with static assets.
     */
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    
    /**
     * Always run for API routes.
     * This pattern ensures that the middleware is applied to all API and TRPC routes.
     */
    "/(api|trpc)(.*)",
  ],
};
