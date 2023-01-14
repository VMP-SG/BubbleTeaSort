import { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import FilterButton from "../../components/buttons/FilterButton";
import ListCard from "../../components/cards/ListCard";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ({ route, navigation }) {
  const [overallList, setOverallList] = useState([1, 2]);
  const [filters, setFilters] = useState({});
  const goToFilter = () => {
    navigation.navigate("DiscoverFilter");
  };
  return (
    <SafeAreaView>
      <FilterButton onPress={goToFilter}>
        <MaterialCommunityIcons name="tune-vertical" color="black" size={30} />
        <Text className="font-primary-bold text-xl">Filter</Text>
      </FilterButton>
      <View className="mt-28">
        {overallList.map((item) => (
          <ListCard key={item} />
        ))}
      </View>
    </SafeAreaView>
  );
}
