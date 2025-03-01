import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import FormField from "@/components/FormField";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useSignIn } from "@clerk/clerk-expo";
import { useForm } from "react-hook-form";

const SignInPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { control, handleSubmit } = useForm();

  // Handle the submission of the sign-in form
  const onSignInPress = async (data: any) => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, check why. User might need to complete further steps.
        // console.error(signInAttempt, null, 2)
        Alert.alert("Error", JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert(
        "Error",
        err.errors[0].message === "Couldn't find your account."
          ? "Invalid Credentials"
          : err.errors[0].message ===
            "Password is incorrect. Try again, or use another method."
          ? "Invalid Credentials"
          : err.errors[0].message
      );
      // console.error(JSON.stringify(err.errors[0].longMessage, null, 2));
    }
  };

  // const EMAIL_REGEX =
  //   /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
            Sign in
          </Text>

          <FormField
            title="Email"
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: EMAIL_REGEX,
                message: "Invalid email address",
              },
            }}
            placeholder="Your Email"
            keyboardType="email-address"
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should be minimum 6 characters long",
              },
            }}
            placeholder="Your Password"
            otherStyles="mt-7"
          />

          <Link
            href="/forgot-password"
            className="text-lg text-gray-100 font-poppins-regular pt-5 text-right"
          >
            Forgot Password
          </Link>

          <CustomButton
            title="Sign In"
            handlePress={handleSubmit(onSignInPress)}
            className="mt-7"
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-poppins-regular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-poppins-semibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInPage;
