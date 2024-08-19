import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router"; // Ensure you import this
import { CreateTripContext } from "../../context/CreateTripContext";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { userData, updateUserDetails, setUserData } =
    useContext(CreateTripContext);
  const [updating, setUpdating] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || "");
      setFullName(userData.fullName || "");
      setUsername(userData.displayName || "");
      if (userData.avatar) {
        setSelectedAvatar(userData.avatar);
      }
    }
  }, [userData]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedAvatar(result.assets[0].uri); // Updated for better compatibility
    }
  };

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const saveProfile = async () => {
    try {
      setUpdating(true);
      await updateUserDetails({
        username,
        avatar: selectedAvatar,
        fullName,
        email,
      });
      Alert.alert(
        "Profile Saved",
        "Your profile has been updated successfully."
      );
    } catch (err) {
      Alert.alert("Error: " + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            setUserData(null); // Clear user data
            router.push("/(auth)/signin"); // Navigate to sign-in page
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 pt-10 items-center relative">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: "100%" }}
      >
        <Text className="font-outfitBold text-xl text-center mb-4">
          Hello {username || "user"}, welcome to your profile
        </Text>
        <TouchableOpacity
          className="mt-2 bg-red-500 py-2 px-4 rounded-lg flex-row items-center absolute top-6 right-2"
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="white" />
          <Text className="text-white font-bold ml-2">Logout</Text>
        </TouchableOpacity>
        <View className="items-center mt-4">
          <Image
            source={
              selectedAvatar
                ? { uri: selectedAvatar }
                : require("../../assets/images/man.png")
            }
            style={{ height: 182, width: 182, borderRadius: 96 }}
          />

          <View className="mt-4 space-y-4">
            <TextInput
              placeholder="Enter your username"
              value={username}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Enter your email"
              value={email}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72"
              onChangeText={setEmail}
            />
            <Text className="text-slate-500 text-xs mt-4">
              Full name is read-only
            </Text>
            <TextInput
              placeholder="Enter your full name"
              value={fullName}
              editable={false}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72 mt-0"
            />
          </View>

          <TouchableOpacity
            className="mt-6 bg-blue-600 py-2 px-4 rounded-lg"
            onPress={pickImage}
          >
            <Text className="text-white font-bold">Upload New Image</Text>
          </TouchableOpacity>

          <View className="flex-row mt-6 space-x-4">
            <TouchableOpacity
              onPress={() =>
                setAvatar(require("../../assets/images/woman.png"))
              }
            >
              <Image
                source={require("../../assets/images/woman.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAvatar(require("../../assets/images/boy.png"))}
            >
              <Image
                source={require("../../assets/images/boy.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAvatar(require("../../assets/images/girl.png"))}
            >
              <Image
                source={require("../../assets/images/girl.png")}
                style={{ height: 80, width: 80, borderRadius: 40 }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mt-6 bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
            onPress={saveProfile}
            disabled={updating}
          >
            <MaterialIcons name="save" size={24} color="white" />
            <Text className="text-white font-bold ml-2">Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
