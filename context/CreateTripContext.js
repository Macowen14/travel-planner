// CreateTripContext.js
import React, { createContext, useState } from "react";

// Create a Context
export const CreateTripContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState([]); // Initialize state

  // Function to add or update trip data
  const updateTripData = (newData) => {
    setTripData((prevData) => {
      // Log the previous data for reference
      console.log("Previous tripData:", prevData);

      // Clone previous data
      const updatedData = [...prevData];

      // Log the new data to be merged
      console.log("New data to merge:", newData);

      // Check if there are existing trips
      if (updatedData.length > 0) {
        // Log the last item before update
        console.log(
          "Last tripData item before update:",
          updatedData[updatedData.length - 1]
        );

        // Update the last trip's data with the new data
        updatedData[updatedData.length - 1] = {
          ...updatedData[updatedData.length - 1],
          ...newData, // Merge new data
        };

        // Log the updated last item
        console.log(
          "Last tripData item after update:",
          updatedData[updatedData.length - 1]
        );
      } else {
        // Add the new trip data if no existing data
        updatedData.push(newData);

        // Log the newly added data
        console.log("Added new tripData:", newData);
      }

      // Log the final updated data for debugging
      console.log("Final updated tripData:", updatedData);

      return updatedData;
    });
  };

  return (
    <CreateTripContext.Provider
      value={{ tripData, setTripData, updateTripData }}
    >
      {children}
    </CreateTripContext.Provider>
  );
};
