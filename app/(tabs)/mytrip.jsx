import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import UserTripList from "../../components/UserTripList";
import StartTripCard from "../../components/StartTripCard";

const MyTrip = () => {
  const { userData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Exit App",
        "Do you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => null, // Do nothing if "Cancel" is pressed
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp(), // Exit the app if "OK" is pressed
          },
        ],
        { cancelable: false } // Prevent dismissal by tapping outside the alert
      );
      return true; // Returning true indicates that we have handled the back button
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Clean up the event listener on component unmount
    return () => backHandler.remove();
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.headerContainer}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity
          onPress={() => router.push("/create-trip/search-place")}
        >
          <AntDesign name="pluscircle" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {!userData ||
      !Array.isArray(userData.trips) ||
      userData.trips.length === 0 ? (
        <StartTripCard />
      ) : (
        <UserTripList />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default MyTrip;
