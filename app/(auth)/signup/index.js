import { useRouter } from "expo-router";
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

const SignupPage = () => {
  const route = useRouter();
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
          placeholder="Full Name"
          placeholderTextColor="#6B7280"
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-800 bg-gray-50"
          placeholder="Email"
          placeholderTextColor="#6B7280"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-gray-300 rounded-lg p-4 mb-6 text-gray-800 bg-gray-50"
          placeholder="Password"
          placeholderTextColor="#6B7280"
          secureTextEntry
        />
        <TouchableOpacity className="bg-blue-600 py-4 rounded-lg shadow-md">
          <Text className="text-white text-center text-lg font-bold">
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            route.back();
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
