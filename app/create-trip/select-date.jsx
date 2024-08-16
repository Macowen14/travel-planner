import React, { useState, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { CreateTripContext } from "../../context/CreateTripContext";

const SelectDate = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const { tripData, updateTripData } = useContext(CreateTripContext);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // Keep the picker open on iOS, close on Android
    setDate(currentDate);
  };

  const handleSetDate = () => {
    updateTripData({ date: dayjs(date).format("YYYY-MM-DD") });
    console.log("Updated Trip Data:", tripData);
    router.push("/create-trip/select-budget");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>Select Travel Date</Text>
      </View>

      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>
          {dayjs(date).format("dddd, MMMM D, YYYY")}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.setDateButton} onPress={handleSetDate}>
        <Text style={styles.setDateButtonText}>Set Date</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1e3a5f",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
    backgroundColor: "#009688",
    borderRadius: 50,
  },
  header: {
    marginTop: 80,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "outfitBold",
  },
  datePickerButton: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  dateText: {
    color: "#1e3a5f",
    fontSize: 18,
    fontFamily: "outfitBold",
  },
  setDateButton: {
    backgroundColor: "#009688",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
  },
  setDateButtonText: {
    color: "#fff",
    fontFamily: "outfitBold",
    fontSize: 18,
  },
});

export default SelectDate;
