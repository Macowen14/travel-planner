import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRouter } from "expo-router";

const Signin = () => {
  const navigation = useNavigation();
  const route = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 pt-6 px-4 bg-white">
      <View className="mt-10">
        <Text
          className="font-bold text-center"
          style={{ fontFamily: "outfitBold", fontSize: 30 }}
        >
          Let's Sign You In
        </Text>
        <Text
          className="font-bold text-center text-slate-500 mt-4"
          style={{ fontFamily: "outfitMedium", fontSize: 20 }}
        >
          Welcome Back
        </Text>
        <Text
          className="font-bold text-center text-slate-500"
          style={{ fontFamily: "outfitRegular", fontSize: 20 }}
        >
          You've been missed
        </Text>
      </View>

      <View className="mt-16 space-y-6">
        <View>
          <Text
            className="font-bold mb-2"
            style={{ fontFamily: "outfitRegular", fontSize: 16 }}
          >
            Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Enter your email"
            keyboardType="email-address"
            style={{ fontFamily: "outfitRegular" }}
          />
        </View>

        <View>
          <Text
            className="font-bold mb-2"
            style={{ fontFamily: "outfitRegular", fontSize: 16 }}
          >
            Password
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3"
            placeholder="Enter your password"
            secureTextEntry
            style={{ fontFamily: "outfitRegular" }}
          />
        </View>

        <TouchableOpacity className="bg-blue-600 rounded-lg py-4 mt-10 items-center">
          <Text
            className="text-white font-bold"
            style={{ fontFamily: "outfitBold", fontSize: 18 }}
          >
            Sign In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="items-center mt-4"
          onPress={() => {
            route.push("/(auth)/forgotPassword");
          }}
        >
          <Text
            className="text-blue-600 font-bold"
            style={{ fontFamily: "outfitRegular", fontSize: 16 }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* "Don't have an account?" Section */}
      <View className="absolute bottom-4 w-full items-center">
        <View className="flex flex-row items-center">
          <Text
            className="text-gray-500 font-bold"
            style={{ fontFamily: "outfitRegular", fontSize: 16 }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => {
              route.push("/(auth)/signup");
            }}
          >
            <Text
              className="text-blue-600 font-bold"
              style={{ fontFamily: "outfitBold", fontSize: 16 }}
            >
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signin;
