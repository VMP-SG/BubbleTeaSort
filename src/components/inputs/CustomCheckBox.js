import CheckBox from "expo-checkbox";
import { View, Text } from "react-native";

export default function ({ onPress, text, value, children }) {
  return (
    <View className="flex flex-row my-1 items-center">
      <CheckBox value={value} onValueChange={onPress} color="#616161" />
      <Text className="ml-2 font-primary text-base">{text}</Text>
      {children}
    </View>
  );
}
