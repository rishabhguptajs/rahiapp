/**
 * @fileoverview AuthContext module for managing user authentication state.
 * @module AuthContext
 * @requires createContext
 * @requires useEffect
 * @requires useReducer
 */

import { createContext, useEffect, useReducer } from "react";

/**
 * Initial state for the authentication context.
 * @type {Object}
 * @property {Object|null} user - The authenticated user object or null if not authenticated.
 * @property {boolean} loading - Indicates if the authentication process is ongoing.
 * @property {string|null} error - Error message if authentication fails.
 */
const initial_state = {
  user: localStorage.getItem("user") !== undefined ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: null,
};

/**
 * AuthContext for providing authentication state and actions.
 * @type {React.Context}
 */
export const AuthContext = createContext(initial_state);

/**
 * Reducer function to manage authentication state transitions.
 * @param {Object} state - The current state of the authentication context.
 * @param {Object} action - The action to perform on the state.
 * @returns {Object} The new state after applying the action.
 */
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

/**
 * AuthContextProvider component to provide authentication state and actions to its children.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @returns {JSX.Element} The rendered AuthContextProvider component.
 */
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  /**
   * Effect to synchronize user state with localStorage.
   * Updates localStorage whenever the user state changes.
   */
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
