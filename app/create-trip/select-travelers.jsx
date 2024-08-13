import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { SelectTravelersList } from "../../constants/Options";
import TravelPlanCard from "../../components/TravelPlanCard";
import AntDesign from "@expo/vector-icons/AntDesign";

const Travelers = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        className="absolute top-10 left-6 z-10 p-2 bg-teal-400 rounded-full"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Who&#39;s traveling?</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Choose Your Travelers </Text>
      </View>

      <FlatList
        data={SelectTravelersList}
        renderItem={({ item }) => <TravelPlanCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 29,
    paddingHorizontal: 16,
    backgroundColor: "#f8f9fa",
    position: "relative",
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
  },
});

export default Travelers;
