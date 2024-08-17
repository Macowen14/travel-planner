import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { CreateTripContext } from "../../context/CreateTripContext";
import { chatSession } from "../../configs/AiModel";
import { AI_PROMPT } from "../../constants/Options";
import { useNavigation, useRouter } from "expo-router";

const LoadingAnimation = () => {
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

  const generateAiTrip = async () => {
    if (!tripData) {
      console.error("Trip data is missing");
      Alert.alert("Trip data is missing");
      return;
    }

    const FINAL_AI_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.["0"]?.name
    )
      .replace("{totalDays}", tripData?.days)
      .replace("{destination}", tripData?.["0"]?.name)
      .replace("{budget}", tripData?.budget?.amount)
      .replace("{totalNights}", tripData?.nights)
      .replace("{travellers}", tripData?.travelPlan?.title)
      .replace("{estimate}", tripData?.travelPlan?.estimate)
      .replace("{startDate}", tripData?.date);

    console.log("Generated AI Prompt:", FINAL_AI_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_AI_PROMPT);
      console.log("result", result);
      console.log("AI Response:", result.response.text());
      setLoading(!loading);
      router.push("/(tabs)/mytrip");
      // Now you can use the `jsonResponse` object to process or display the trip data
    } catch (error) {
      console.error("Error generating AI trip:", error);
      Alert.alert("Error", "There was an issue generating your trip.");
      setLoading(!loading);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (tripData) {
      generateAiTrip(); // Generate AI trip when trip data is available
    }
  }, [tripData]);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <>
          <Text style={styles.text}>Generating Trip</Text>
          <Text style={styles.subText}>Please wait .....</Text>
          <LottieView
            source={require("../../assets/animation/travel.json")}
            autoPlay
            loop
            style={styles.lottie}
          />

          <Text className="text-slate-500 font-outfitMedium text-center">
            Do not go away. Kindly wait as we generate your trip
          </Text>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    marginBottom: 20,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});

export default LoadingAnimation;
