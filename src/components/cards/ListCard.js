import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ({ details }) {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(details.id);
      }}
    >
      <View className="bg-brown-500 mx-4 my-2 p-2 rounded-xl">
        <Text className="font-primary-bold text-xl mb-4">
          {details.brand} @ {details.name}
        </Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center justify-center">
            <MaterialCommunityIcons name="map-marker" color="black" size={30} />
            <Text>
              {details?.distance ? details.distance.toFixed(2) : 0} km
            </Text>
          </View>
          <View className="flex flex-row">
            <View className="flex flex-row items-center justify-center">
              <MaterialCommunityIcons
                name="image-multiple"
                color="black"
                size={30}
              />
              <Text>{details?.count ? details.count : 0}</Text>
            </View>
            <View className="flex flex-row items-center justify-center">
              <MaterialCommunityIcons name="star" color="black" size={30} />
              <Text>{details?.rating ? details.rating : 0}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
