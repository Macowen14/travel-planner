import React, { createContext, useState, useEffect } from "react";
import { auth } from "../configs/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Create a Context
export const CreateTripContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState({}); // Initialize as an object
  const [userDetails, setUserDetails] = useState(null); // Initialize userDetails state

  // Function to add or update trip data

  const updateTripData = (newData) => {
    setTripData((prevData) => ({
      ...prevData,
      ...newData, // Properly merge the new data with existing state
    }));
  };

  // Function to fetch user details
  const fetchUserDetails = (user) => {
    if (user) {
      // Fetch user details from Firebase
      const { email, displayName } = user;
      setUserDetails({ email, name: displayName });
    } else {
      // No user is signed in
      setUserDetails(null);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      fetchUserDetails(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <CreateTripContext.Provider
      value={{ tripData, setTripData, updateTripData, userDetails }}
    >
      {children}
    </CreateTripContext.Provider>
  );
};
