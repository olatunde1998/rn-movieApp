import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-gray-500 h-full">
      <ScrollView>
        <Text>Profile</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
