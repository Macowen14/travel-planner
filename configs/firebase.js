// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDIdtfg1aCR0qsWmmX7KbxxPPk6qgKb5dA",
  authDomain: "ai-travel-planner-17f9d.firebaseapp.com",
  projectId: "ai-travel-planner-17f9d",
  storageBucket: "ai-travel-planner-17f9d.appspot.com",
  messagingSenderId: "358217135841",
  appId: "1:358217135841:web:759e480358b4b667bc69a0",
  measurementId: "G-RX7QB42CGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

auth.useDeviceLanguage();

export { auth };
