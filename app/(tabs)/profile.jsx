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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CreateTripContext } from "../../context/CreateTripContext";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const { userData, updateUserDetails } = useContext(CreateTripContext);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (userData) {
      setEmail(userData.email || "");
      setFullName(userData.fullName || "");
      setUsername(userData.displayName || "");
      // Set the initial avatar from userData
      if (userData.avatar) {
        setSelectedAvatar(userData.avatar);
      }
    }
  }, [userData]);

  useEffect(() => {
    console.log("Selected Avatar URI: ", selectedAvatar);
  }, [selectedAvatar]);

  useEffect(() => {
    console.log("email:", email);
    console.log("fullName:", fullName);
    console.log("username:", username);
  }, [email, fullName, username]);

  const pickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      // Set the selected image URI
      setSelectedAvatar(result.uri);
    }
  };

  const setAvatar = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const saveProfile = () => {
    updateUserDetails({
      username,
      avatar: selectedAvatar,
      fullName,
      email,
    });
    // Sample alert for demonstration
    Alert.alert("Profile Saved", "Your profile has been updated successfully.");
  };

  return (
    <SafeAreaView className="flex-1 pt-10 items-center">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ width: "100%" }}
      >
        <Text className="font-outfitBold text-xl text-center mb-4">
          Hello {username || "user"}, welcome to your profile
        </Text>

        <View className="items-center mt-4">
          {/* Display profile image */}
          <Image
            source={
              selectedAvatar
                ? { uri: selectedAvatar }
                : require("../../assets/images/man.png")
            }
            style={{ height: 192, width: 192, borderRadius: 96 }}
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
              readOnly={true}
              className="border border-gray-300 rounded-lg px-4 py-2 w-72 mt-0"
              onChangeText={setFullName}
            />
          </View>

          {/* Upload Image Button */}
          <TouchableOpacity
            className="mt-6 bg-blue-600 py-2 px-4 rounded-lg"
            onPress={pickImage}
          >
            <Text className="text-white font-bold">Upload New Image</Text>
          </TouchableOpacity>

          {/* Avatar Options */}
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

          {/* Save Button */}
          <TouchableOpacity
            className="mt-6 bg-green-600 py-2 px-4 rounded-lg flex-row items-center"
            onPress={saveProfile}
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
