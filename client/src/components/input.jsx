/**
 * @component Input
 * @description Renders an input component that utilizes placeholders and handles user input changes and submissions.
 */
"use client"

import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input"

/**
 * Input component
 * @param {Object} props - Component properties
 * @param {Array<string>} props.placeholders - An array of placeholder strings for the input
 * @param {function} props.handleChange - Function to handle changes in the input
 * @param {function} props.onSubmit - Function to handle form submission
 * @returns {JSX.Element} The rendered input component
 */
function Input({ placeholders, handleChange, onSubmit }) {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default Input