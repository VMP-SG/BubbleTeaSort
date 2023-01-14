import { View, Text, TouchableOpacity } from "react-native";
import { MapPinIcon, PhotoIcon, StarIcon } from "react-native-heroicons/solid";

export default function ({ navigation, details }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DiscoverStore", {
          id: details.id,
          rating: details.rating || 0,
          count: details.count || 0,
        });
      }}
    >
      <View className="bg-brown-500 mx-4 my-2 p-3 rounded-xl">
        <Text className="font-secondary-bold text-xl mb-4" numberOfLines={1}>
          {details.brand} @ {details.name}
        </Text>
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center justify-center">
            <MapPinIcon color="black" />
            <Text className="font-secondary ml-1 text-base">
              {details?.distance ? details.distance.toFixed(2) : 0} km
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <View className="flex flex-row items-center justify-center mr-2">
              <PhotoIcon color="black" />
              <Text className="font-secondary text-base ml-2">
                {details?.count ? details.count : 0}
              </Text>
            </View>
            <View className="flex-row items-center justify-center">
              <StarIcon color="black" />
              <Text className="font-secondary text-base ml-1">
                {details?.rating ? Math.round(details.rating * 10) / 10 : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
