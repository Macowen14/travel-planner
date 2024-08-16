import React from "react";
import { StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = () => {
  const generateAiTrip = () => {
    // Generate AI trip logic here
    Alert.alert(
      "Trip Generation",
      "Your trip has been generated successfully!"
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Generating Trip</Text>
      <Text style={styles.subText}>Please wait .....</Text>

      <LottieView
        source={require("../../assets/animation/travel.json")}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text className="text-slate-500 font-outfitMedium text-center">
        Do not away. Kindly wait as we generate your trip
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingTop: 60,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#64748B",
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  lottie: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
});

export default LoadingAnimation;
