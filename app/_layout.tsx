import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";

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
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" /> */}

      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
