import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constants/images";

interface EmptyStateProps {
  title: string;
  subTitle: string;
}
const EmptyState = ({ title, subTitle }: EmptyStateProps) => {
  return (
    <View className="justify-center items-center px-4 ">
      <Image
        source={images.trash}
        resizeMode="contain"
        className="w-[270px] h-[215px]"
      />
      <Text className="text-center font-spaceMono-regular font-bold text-3xl mt-2">
        {title}
      </Text>
      <Text className="font-semibold text-base text-gray-100">{subTitle}</Text>

      <TouchableOpacity
        // onPress={handlePress}
        activeOpacity={0.7}
        className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center w-full my-5"
      >
        <Text className="text-white font-semibold text-xl ">
          Reload
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
