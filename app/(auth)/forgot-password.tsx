import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";

const ForgotPassword = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
  });

  const submit = async () => {
    if (form.email === "") {
      Alert.alert("Error", "Please fill in all fields");
    }
    setSubmitting(true);
    try {
      Alert.alert("Success", "User signed in successfully");
      router.replace("/sign-in");
    } catch (error: any) {
      // Alert.alert("Error", error.message);
      console.log(error, "error occurred here==");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full px-8 mt-20">
          {/* <Image
            source={images.brandLogo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          /> */}
          <Text className="text-3xl font-semibold text-white mt-16 font-poppins-semibold">
            Forgot Password
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder="joedoe@mail.com"
          />

          <CustomButton
            title="Forgot Password"
            handlePress={submit}
            className="mt-7"
            // isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-poppins-regular">
              Remember Password?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-poppins-semibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
