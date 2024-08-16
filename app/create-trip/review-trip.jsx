import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "expo-router";

const ReviewTrip = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        className="p-2 rounded-full absolute top-8 left-5 bg-[#00CCBB]"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Text>ReviewTrip</Text>
    </View>
  );
};

export default ReviewTrip;
