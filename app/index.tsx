import { Text, View, ActivityIndicator } from "react-native";
import Welcome from "../components/Welcome";
import { auth } from "../configs/firebase";
import { Href, useRouter } from "expo-router";
import React from "react";

export default function Index() {
  const router = useRouter();
  const user = auth.currentUser;

  // Handle user redirection
  React.useEffect(() => {
    if (user) {
      router.push("/mytrip" as Href<string>);
    }
  }, [user, router]);

  // Show a loading indicator while checking authentication status
  if (user === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Render the Welcome component if no user is logged in
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {!user && <Welcome />}
    </View>
  );
}
