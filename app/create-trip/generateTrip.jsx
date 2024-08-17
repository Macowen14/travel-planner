import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, SafeAreaView, Alert } from "react-native";
import LottieView from "lottie-react-native";
import { chatSession } from "../../configs/AiModel";
import { auth, db } from "../../configs/firebase";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { AI_PROMPT } from "../../constants/Options";
import { CreateTripContext } from "../../context/CreateTripContext";

const LoadingAnimation = () => {
  const { tripData } = useContext(CreateTripContext);

  const saveTripData = async (aiResponse) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Error", "User is not authenticated.");
      return;
    }

    const userId = user.uid;
    const tripDocRef = doc(db, "UsersTrips", userId); // Create a reference with the user's UID

    try {
      await setDoc(tripDocRef, {
        tripData: tripData,
        travelPlan: aiResponse, // Store the AI-generated response
        createdAt: new Date().toISOString(), // Optional: add a timestamp
      });
      Alert.alert("Success", "Your trip has been saved successfully!");
    } catch (error) {
      console.error("Error saving trip data:", error);
      Alert.alert("Error", "There was an issue saving your trip.");
    }
  };

  const generateAiTrip = async () => {
    if (!tripData) {
      console.error("Trip data is missing");
      return;
    }

    const FINAL_AI_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.["0"]?.name
    )
      .replace("{totalDays}", tripData?.days)
      .replace("{location}", tripData?.["0"]?.name)
      .replace("{budget}", tripData?.budget?.amount)
      .replace("{totalNights}", tripData?.nights)
      .replace("{travellers}", tripData?.travelPlan?.title)
      .replace("{estimate}", tripData?.travelPlan?.estimate)
      .replace("{startDate}", tripData?.date);

    console.log("Generated AI Prompt:", FINAL_AI_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_AI_PROMPT);
      const textResponse = await result.response.text(); // Await the text response

      try {
        const jsonResponse = JSON.parse(textResponse); // Parse the JSON response
        console.log("AI Response:", jsonResponse);

        // Save the AI response and trip data to Firestore
        saveTripData(jsonResponse);
      } catch (jsonParseError) {
        console.error("Failed to parse AI response as JSON:", jsonParseError);
        Alert.alert(
          "Error",
          "The AI response could not be parsed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error generating AI trip:", error);
      Alert.alert("Error", "There was an issue generating your trip.");
    }
  };

  useEffect(() => {
    if (tripData) {
      generateAiTrip();
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
            Do not go away. Kindly wait as we generate your trip.
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
