import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="mytrip" />
      <Tabs.Screen name="discover" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;
