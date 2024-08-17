import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../configs/firebase";
import { setDoc } from "firebase/firestore";
import { db } from "../../../configs/firebase";

const SignupPage = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState(""); // Add state for username

  const handleSignUp = async () => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      fullname.length === 0 ||
      username.length === 0
    ) {
      ToastAndroid.show("Please fill in all fields", ToastAndroid.TOP);
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with display name (username)
      await updateProfile(user, { displayName: username });
      console.log("User profile updated with username:", username);

      await setDoc(doc(db, "UsersTrips", user.uid), {
        email: user.email,
        displayName: username,
        fullName: fullname,
      });
      console.log("User info saved to Firestore");

      // Optionally, navigate to another screen or show a success message
    } catch (error) {
      console.error("Error signing up:", error.code, error.message);
      ToastAndroid.show(
        "Error signing up. Please try again.",
        ToastAndroid.TOP
      );
    }
  };

  return (
    <View className="flex-1 bg-gray-200 justify-center items-center p-6">
      <Image
        source={require("../../../assets/images/signup.jpg")}
        className="w-28 h-28 mb-8 rounded-full border-4 border-blue-500"
      />
      <Text className="text-3xl font-extrabold text-gray-900 mb-6">
        Create Your Account
      </Text>
      <View className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-gray-50"
          placeholder="Username"
          placeholderTextColor="#6B7280"
          value={username}
          onChangeText={setUsername} // Directly updating the username state
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-gray-50"
          placeholder="Full Name"
          placeholderTextColor="#6B7280"
          value={fullname}
          onChangeText={setFullname} // Directly updating the fullname state
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-gray-50"
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail} // Directly updating the email state
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6 text-gray-800 bg-gray-50"
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Directly updating the password state
        />
        <TouchableOpacity
          className="bg-blue-600 py-4 rounded-lg shadow-md"
          onPress={handleSignUp} // Calling the handleSignUp function on press
        >
          <Text className="text-white text-center text-lg font-bold">
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            route.back(); // Navigate back to the previous screen
          }}
        >
          <Text className="text-gray-600 text-center mt-4">
            Already have an account?
            <Text className="text-blue-600 font-semibold"> Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupPage;
