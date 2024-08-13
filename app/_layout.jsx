import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { ContextProvider } from "../context/CreateTripContext";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    outfitBold: require("../assets/fonts/Outfit-Bold.ttf"),
    outfitLight: require("../assets/fonts/Outfit-Light.ttf"),
    outfitMedium: require("../assets/fonts/Outfit-Medium.ttf"),
    outfitRegular: require("../assets/fonts/Outfit-Regular.ttf"),
    outfitThin: require("../assets/fonts/Outfit-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ContextProvider>
  );
}
