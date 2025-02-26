import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView className="bg-gray-500 h-full">
      <ScrollView>
        <Text>Bookmark</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Bookmark;
