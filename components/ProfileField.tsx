import { View, Text, TextInput } from "react-native";

interface ProfileFieldProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  otherStyles: string;
}
const ProfileField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}: ProfileFieldProps) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-xl text-slate-500 font-JakartaMedium mb-2">
        {title}
      </Text>

      <View className="w-full h-16 px-4 bg-slate-100 rounded-3xl flex flex-row items-center">
        <TextInput
          className="flex-1 text-black font-semibold text-xl"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  );
};

export default ProfileField;
