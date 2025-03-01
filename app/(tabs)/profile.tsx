import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import ProfileField from "@/components/ProfileField";
import { useUser, useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [form, setForm] = useState({
    username: "Joe Doe",
    lastName: "geodevcodes",
    email: "marin@jsmastery.pro",
    phoneNumber: "+2348133642798",
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <SafeAreaView className="bg-general-500 h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-3xl font-bold">Your profile</Text>
          <TouchableOpacity
            onPress={handleSignOut}
            className="p-4 rounded-full bg-white shadow-xs"
          >
            <Image source={icons.logout} className="size-6" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center flex mt-5 shadow-lg">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={images.avatar}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-2 right-2">
              <Image source={icons.editImage} className="size-10" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="bg-white  mt-10 rounded-2xl pb-8 px-4">
          <ProfileField
            title="Username"
            value={user?.username || form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <ProfileField
            title="Last name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-7"
          />
          <ProfileField
            title="Email"
            value={user?.emailAddresses[0].emailAddress || form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
          />
          <ProfileField
            title="Phone number"
            value={form.phoneNumber}
            handleChangeText={(e) => setForm({ ...form, phoneNumber: e })}
            otherStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
