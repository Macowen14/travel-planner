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
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [mode, setMode] = useState("single");
  const navigation = useNavigation();

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSelectedDate(dayjs());
    setSelectedRange({ start: null, end: null }); // Reset date range when switching mode
  };

  const handleDateChange = (params) => {
    if (mode === "single") {
      setSelectedDate(params.date);
    } else if (params.range) {
      setSelectedRange(params.range);
    }
  };

  const formatSelectedDate = () => {
    if (mode === "single") {
      return selectedDate.format("dddd, MMMM D, YYYY");
    }
    if (selectedRange.start && selectedRange.end) {
      return `${dayjs(selectedRange.start).format("MMMM D, YYYY")} - ${dayjs(
        selectedRange.end
      ).format("MMMM D, YYYY")}`;
    }
    return "Please select a date range";
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
          date={selectedDate}
          range={selectedRange}
          onChange={handleDateChange}
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

      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDateText}>Selected Date: </Text>
        <Text style={styles.selectedDateValue}>{formatSelectedDate()}</Text>
      </View>

      <TouchableOpacity style={styles.setDateButton}>
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
  selectedDateContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedDateText: {
    color: "#ffba00",
    fontFamily: "outfitRegular",
    fontSize: 18,
  },
  selectedDateValue: {
    color: "#fff",
    fontFamily: "outfitBold",
    fontSize: 20,
    marginTop: 4,
  },
  setDateButton: {
    marginTop: 30,
    backgroundColor: "#009688",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  setDateButtonText: {
    color: "#fff",
    fontFamily: "outfitBold",
    fontSize: 18,
  },
});

export default SelectDate;
