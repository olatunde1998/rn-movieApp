import icons from "@/constants/icons";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Controller } from "react-hook-form";

import { FormFieldProps } from "@/types/type";

const FormField = ({
  title,
  secureTextEntry,
  placeholder,
  otherStyles,
  control,
  name,
  rules,
  keyboardType,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className={`space-y-2 ${otherStyles}`}>
                <Text className="text-xl text-gray-100 font-poppins-semibold mb-2">
                  {title}
                </Text>

                <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
                  <TextInput
                    className="flex-1 text-white font-poppins-semibold text-base"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    keyboardType={keyboardType}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                  />

                  {title === "Password" && (
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Image
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {errors[name]?.message && (
                  <Text className="text-red-500">
                    {String(errors[name]?.message)}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
        name={name}
      />
    </>
  );
};

export default FormField;
