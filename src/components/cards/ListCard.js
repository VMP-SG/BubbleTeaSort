import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ({ details }) {
  return (
    <TouchableOpacity>
      <View className="bg-brown-500 mx-4 my-2 p-2 rounded-xl">
        <Text className="font-primary-bold text-xl mb-4">
          LiHo Tea @ Clementi Mall
        </Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center justify-center">
            <MaterialCommunityIcons name="map-marker" color="black" size={30} />
            <Text>0.5 km</Text>
          </View>
          <View className="flex flex-row">
            <View className="flex flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="image-multiple"
                color="black"
                size={30}
              />
              <Text>300</Text>
            </View>
            <View className="flex flex-row items-center justify-center">
              <MaterialCommunityIcons name="star" color="black" size={30} />
              <Text>3.5</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
