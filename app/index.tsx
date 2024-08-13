import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Welcome from "../components/Welcome";
import { auth } from "../configs/firebase";
import { Href, useRouter } from "expo-router";

export default function Index() {
  const [loading, setLoading] = useState(true); // State to manage loading
  const router = useRouter();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Navigate to '/mytrip' if user is authenticated
        router.push("/mytrip" as Href<string>);
      } else {
        // Set loading to false if no user
        setLoading(false);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (loading) {
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

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Welcome />
    </View>
  );
}
