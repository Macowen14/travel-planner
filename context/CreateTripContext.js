// CreateTripContext.js
import React, { createContext, useState } from "react";

// Create a Context
export const CreateTripContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState([]); // Initialize state

  // Function to add or update trip data

  const updateTripData = (newData) => {
    setTripData((prevData) => ({
      ...prevData,
      ...newData, // Merge the new data into the existing state
    }));
  };

  return (
    <CreateTripContext.Provider
      value={{ tripData, setTripData, updateTripData }}
    >
      {children}
    </CreateTripContext.Provider>
  );
};
