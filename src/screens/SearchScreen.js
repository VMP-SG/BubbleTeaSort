import { View, Text } from "react-native";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getLocation } from "../utils/location";

const SearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      (async() => {
        const location = await getLocation();
        console.log(location);
      })();
    }
  },[isFocused]);

  return (
    <View>
      <Text>This is the Search Screen</Text>
    </View>
  );
};

export default SearchScreen;
