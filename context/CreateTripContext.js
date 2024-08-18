import React, { createContext, useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../configs/firebase";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { Alert } from "react-native";
import upload from "../services/upload";

// Create a Context
export const CreateTripContext = createContext();

// Create a Provider Component
export const ContextProvider = ({ children }) => {
  const [tripData, setTripData] = useState({});
  const [userData, setUserData] = useState(null); // Changed initial state to null
  const router = useRouter();

  // Function to add or update trip data
  const updateTripData = (newData) => {
    setTripData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function to load user data from Firestore and handle navigation
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "UsersTrips", uid); // Reference to the user's document
      const userSnap = await getDoc(userRef); // Fetch the user document
      const userData = userSnap.data(); // Extract the user data

      setUserData(userData); // Update the userData state
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadUserData(user.uid);
      } else {
        // Optionally handle cases where the user is not authenticated
        router.push("/(auth)/signin");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [router]);

  const updateUserDetails = async ({ username, avatar, fullname, email }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        // Update user data in Firestore
        await updateDoc(doc(db, "UsersTrips", userId), {
          displayName: username,
          avatar,
          fullName: fullname,
          email,
        });

        // Update user data in the local state
        setUserData((prevData) => ({
          ...prevData,
          displayName: username,
          avatar,
          fullName: fullname,
          email,
        }));

        // if data was updated successfully store the image in Firestore
        upload(avatar);
      } else {
        console.error("No user is currently authenticated.");
      }
    } catch (err) {
      Alert.alert("Error: " + err.message);
      console.error("Error updating user details:", err);
    }
  };

  return (
    <CreateTripContext.Provider
      value={{
        tripData,
        setTripData,
        updateTripData,
        loadUserData,
        userData,
        updateUserDetails,
        userId: auth.currentUser?.uid, // Added userId to the context provider for accessing user data in other components
      }}
    >
      {children}
    </CreateTripContext.Provider>
  );
};
