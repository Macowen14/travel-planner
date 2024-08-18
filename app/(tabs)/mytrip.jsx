import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../context/CreateTripContext";
import UserTripList from "../../components/UserTripList";

const MyTrip = () => {
  const { userData } = useContext(CreateTripContext);
  const [userTrips, setUserTrips] = useState([]);
  const router = useRouter();

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

      {userTrips.length === 0 ? <UserTripList /> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
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
  },
});

export default MyTrip;
