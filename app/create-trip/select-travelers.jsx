import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigation } from "expo-router";
import { SelectTravelersList } from "../../constants/Options";
import TravelPlanCard from "../../components/TravelPlanCard";
import AntDesign from "@expo/vector-icons/AntDesign";
import { CreateTripContext } from "../../context/CreateTripContext";

const Travelers = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleCardPress = (item) => {
    setSelectedId(item.id);

    // Check if tripData has any objects
    if (tripData.length > 0) {
      // Copy current tripData and update the last object
      const updatedTripData = [...tripData];
      const lastIndex = updatedTripData.length - 1;

      updatedTripData[lastIndex] = {
        ...updatedTripData[lastIndex],
        title: item.title,
        estimate: item.people,
      };

      // Update the context with new tripData
      setTripData(updatedTripData);

      console.log(tripData);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Who&#39;s traveling?</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Choose Your Travelers</Text>
      </View>

      <FlatList
        data={SelectTravelersList}
        renderItem={({ item }) => (
          <TravelPlanCard
            item={item}
            isSelected={item.id === selectedId}
            onPress={handleCardPress}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View className="bg-tintLight rounded-t-3xl w-full h-32 items-center justify-center">
        <TouchableOpacity className="bg-background rounded-3xl min-w-[300px] py-3 items-center">
          <Link href="/create-trip/select-date" className="text-center">
            <Text className="text-white font-outfitMedium text-medium text-base">
              Continue
            </Text>
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 29,

    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#009688",
    borderRadius: 50,
  },
  title: {
    fontFamily: "outfitBold",
    fontSize: 24,
    color: "#333",
    textAlign: "center",
  },
  subtitleContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontFamily: "outfitRegular",
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});

export default Travelers;
