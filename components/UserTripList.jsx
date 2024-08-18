import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { dataResponse } from "../constants/apiResponse";
import dayjs from "dayjs";

const UserTripList = () => {
  return (
    <View>
      <Text className="text-sm font-outfitMedium text-slate-500">
        Your trip details and options are generated below
      </Text>
      <View className="mt-10">
        <Image
          src={require("../assets/images/place1.jpg")}
          className="w-full object-cover rounded-md h-[40vh]"
        />
      </View>
      <View className="mt-5">
        <Text className="font-outfitMedium text-lg">
          {dataResponse?.trip_details?.destination}
        </Text>
        <Text className>
          {dayjs(dataResponse?.trip_details?.start_date).format("DD/MM/YYYY")}
        </Text>
      </View>
    </View>
  );
};

export default UserTripList;

const styles = StyleSheet.create({});
