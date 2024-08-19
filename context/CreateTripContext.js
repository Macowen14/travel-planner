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
  const [tripData, setTripData] = useState([]);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Function to add or update trip data
  const updateTripData = (newTrip) => {
    setTripData((prevTrips) => [...prevTrips, newTrip]);
  };

  // Function to load user data from Firestore, including trips
  const loadUserData = async (uid) => {
    try {
      const userRef = doc(db, "UsersTrips", uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData) {
        setUserData(userData);
        setTripData(userData.trips || []); // Set trips if they exist, otherwise set an empty array
      }
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
        router.push("/(auth)/signin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const updateUserDetails = async ({ username, avatar, fullname, email }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const updatedData = {};
        if (username !== undefined) updatedData.displayName = username;
        if (avatar !== undefined) updatedData.avatar = avatar;
        if (fullname !== undefined) updatedData.fullName = fullname;
        if (email !== undefined) updatedData.email = email;

        await updateDoc(doc(db, "UsersTrips", userId), updatedData);

        if (avatar !== undefined) {
          await upload(avatar);
        }

        await loadUserData(userId);
        console.log("User details updated successfully.");
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
        userId: auth.currentUser?.uid,
      }}
    >
      {children}
    </CreateTripContext.Provider>
  );
};
