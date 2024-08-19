import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { dataResponse } from "../constants/apiResponse";
import dayjs from "dayjs";
import { router } from "expo-router";
import { place1 } from "../assets/images";

const UserTripList = () => {
  return (
    <ScrollView horizontal={false} scrollEnabled={true} className="space-y-2">
      <TouchableOpacity
        className="p-2 flex items-center space-y-5 bg-gray-400 rounded-xl"
        onPress={() => router.push("/discover")}
      >
        <Text className="text-sm font-outfitMedium text-white">
          Your trip details and options are generated below
        </Text>

        <Image
          source={place1}
          className="w-full object-contain rounded-md h-[30vh]"
        />

        {/* Trip Details */}
        <View className="mt-2 flex justify-between flex-row bg-gray-50 shadow-md rounded-md space-x-10 py-3 p-1">
          <View className="space-y-2">
            <Text className="font-outfitMedium text-lg">
              {dataResponse?.trip_details?.destination}
            </Text>
            <Text>
              Start date:{" "}
              {dayjs(dataResponse?.trip_details?.start_date).format(
                "DD/MM/YYYY"
              )}
            </Text>
          </View>
          <View className="space-y-1">
            <Text className="text-sm">
              {dataResponse?.trip_details?.duration}
            </Text>
            <Text className="text-sm">
              {dataResponse?.trip_details?.travelers}
            </Text>
            <Text className="text-sm">
              {dataResponse?.trip_details?.budget}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UserTripList;

const styles = StyleSheet.create({});
