import CheckBox from "expo-checkbox";
import { View, Text } from "react-native";

export default function ({ onPress, text, value }) {
  return (
    <View className="flex flex-row my-1">
      <CheckBox value={value} onValueChange={onPress} />
      <Text className="ml-2">{text}</Text>
    </View>
  );
}
