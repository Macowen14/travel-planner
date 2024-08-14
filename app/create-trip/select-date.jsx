import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";

const SelectDate = () => {
  const [date, setDate] = useState(dayjs());
  const [mode, setMode] = useState("single"); // State to toggle between single and range modes
  const navigation = useNavigation();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setDate(dayjs()); // Reset date when switching mode
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
        <Text style={styles.headerText}>Select Travel Dates</Text>
      </View>

      <View style={styles.calendarContainer}>
        <DateTimePicker
          mode={mode}
          date={date}
          onChange={(params) => setDate(params.date)}
          styles={{
            header: {
              backgroundColor: "#1e3a5f",
              color: "white",
              fontFamily: "outfitBold",
            },
            week: {
              dayText: {
                color: "#1e3a5f",
                fontFamily: "outfitRegular",
              },
              selectedDayText: {
                color: "white",
              },
              selectedDayBackground: {
                backgroundColor: "#009688",
              },
            },
            month: {
              titleText: {
                color: "#1e3a5f",
                fontFamily: "outfitBold",
              },
              arrow: {
                color: "#009688",
              },
            },
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.modeButton,
            mode === "single" && styles.selectedButton,
          ]}
          onPress={() => handleModeChange("single")}
        >
          <Text style={styles.buttonText}>Select Single Date</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeButton, mode === "range" && styles.selectedButton]}
          onPress={() => handleModeChange("range")}
        >
          <Text style={styles.buttonText}>Select Date Range</Text>
        </TouchableOpacity>
      </View>
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
  calendarContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modeButton: {
    padding: 10,
    backgroundColor: "#1e3a5f",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectedButton: {
    backgroundColor: "#009688",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "outfitRegular",
  },
});

export default SelectDate;
