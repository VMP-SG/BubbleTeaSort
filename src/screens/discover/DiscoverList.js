import { SafeAreaView, View, ScrollView } from "react-native";
import ListCard from "../../components/cards/ListCard";

export default function ({ navigation, overallList }) {
  return (
    <SafeAreaView>
      <View className="mt-28 mb-16">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {overallList.map((item, i) => {
            return (
              <ListCard
                navigation={navigation}
                key={i}
                details={item}
                navigatePage="DiscoverStore"
              />
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
