import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import { Link, router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const { control, handleSubmit } = useForm();

  const onSubmitHandler = async (data: any) => {
    setSubmitting(true);
    console.log(data.email, "this is email here==");
    try {
      // Alert.alert("Success", "Verification link sent to email");
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
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            otherStyles="mt-7"
          />

          <CustomButton
            title="Forgot Password"
            handlePress={handleSubmit(onSubmitHandler)}
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
