/**
 * @fileoverview Utility functions for class name manipulation.
 * @module utils
 * @requires clsx
 * @requires tailwind-merge
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes.
 * This function uses clsx to handle conditional class names and tailwind-merge
 * to ensure that conflicting Tailwind classes are resolved correctly.
 *
 * @param {...(string|Object|Array<string>)} inputs - The class names to combine.
 * @returns {string} The merged class name string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}