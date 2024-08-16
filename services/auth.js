import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { ResponseType } from "expo-auth-session";
import {auth} from "../configs/firebase"


// Hook to handle Google Sign-In
export const useGoogleAuth = () => {
  // Configure Google Auth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "111845673401-9981o8lgkbf45ep1l96o0vurb4p4sao1.apps.googleusercontent.com",
    androidClientId: "", // Optional: Add your Android Client ID if you have one
    iosClientId: "", // Optional: Add your iOS Client ID if you have one
    expoClientId:
      "111845673401-9981o8lgkbf45ep1l96o0vurb4p4sao1.apps.googleusercontent.com", // Expo Client ID (same as web client ID)
    responseType: ResponseType.IdToken, // Request an ID token
  });

  // Handle the response after user signs in with Google
  useEffect(() => {
    if (response?.type === "success") {
      // Extract the ID token from the response
      const { id_token } = response.params;

      // Create a Firebase credential with the ID token
      const credential = GoogleAuthProvider.credential(id_token);

      // Sign in the user with the credential
      signInWithCredential(auth, credential)
        .then((result) => {
          // Successfully signed in, handle the user info here
          console.log("User signed in:", result.user);
        })
        .catch((error) => {
          // Handle errors during sign-in
          console.error("Error signing in with Google:", error);
        });
    }
  }, [response]);

  // Return the promptAsync function and request object
  return {
    promptAsync,
    request,
  };
};

// Function to handle sign in with email and password
export const signInWithEmail = async (email, password) => {
  const auth = getAuth();
  try {
    // Sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // If successful, return the user object
    return userCredential.user;
  } catch (error) {
    // Handle errors, such as invalid credentials or user not found
    throw error;
  }
};
