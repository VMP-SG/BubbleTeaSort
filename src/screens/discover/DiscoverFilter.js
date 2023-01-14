import { Text, View, ScrollView } from "react-native";
import { useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import CustomCheckBox from "../../components/inputs/CustomCheckBox";

export default function ({ navigation, route }) {
  const { filters } = route.params;
  // Sort By
  const [distance, setDistance] = useState(filters.distance);
  const [rating, setRating] = useState(filters.rating);
  const [numPosts, setNumPosts] = useState(filters.numPosts);
  // Distance
  const [one, setOne] = useState(filters.one);
  const [two, setTwo] = useState(filters.two);
  const [five, setFive] = useState(filters.five);
  const [more, setMore] = useState(filters.more);
  //Rating
  const [star45, setStar45] = useState(filters.star45);
  const [star34, setStar34] = useState(filters.star34);
  const [star23, setStar23] = useState(filters.star23);
  const [star12, setStar12] = useState(filters.star12);
  const [star01, setStar01] = useState(filters.star01);
  //Store
  const [liho, setLiho] = useState(filters.liho);
  const [koi, setKoi] = useState(filters.koi);
  // Sort By (radio)
  const setSortBy = (sorting) => {
    setDistance(false);
    setRating(false);
    setNumPosts(false);
    if (sorting == "distance") {
      setDistance(true);
    }
    if (sorting == "rating") {
      setRating(true);
    }
    if (sorting == "numPosts") {
      setNumPosts(true);
    }
  };
  // SetDistance
  const setByDistance = (distance) => {
    setOne(false);
    setTwo(false);
    setFive(false);
    setMore(false);
    if (distance == 1) {
      setOne(true);
    }
    if (distance == 2) {
      setTwo(true);
    }
    if (distance == 5) {
      setFive(true);
    }
    if (distance == 6) {
      setMore(true);
    }
  };
  //Select all stores
  const selectAll = () => {
    setLiho(true);
    setKoi(true);
  };
  // SetFilters
  const applyFilters = () => {
    navigation.navigate({
      name: "DiscoverMain",
      params: {
        filters: {
          distance,
          rating,
          numPosts,

          one,
          two,
          five,
          more,

          star45,
          star34,
          star23,
          star12,
          star01,

          liho,
          koi,
        },
      },
      merge: true,
    });
  };
  // Reset
  const reset = () => {
    setDistance(true);
    setRating(false);
    setNumPosts(false);

    setOne(false);
    setTwo(false);
    setFive(false);
    setMore(false);

    setStar45(false);
    setStar34(false);
    setStar23(false);
    setStar12(false);
    setStar01(false);

    setLiho(false);
    setKoi(false);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4">
      <View>
        <View>
          <Text className="font-primary-bold text-xl m-2">Sort By</Text>
          <CustomCheckBox
            value={distance}
            text={"Distance"}
            onPress={() => setSortBy("distance")}
          />
          <CustomCheckBox
            value={rating}
            text={"Rating"}
            onPress={() => setSortBy("rating")}
          />
          <CustomCheckBox
            value={numPosts}
            text={"Number of Posts"}
            onPress={() => setSortBy("numPosts")}
          />
        </View>
        <View>
          <Text className="font-primary-bold text-xl m-2">Distance</Text>
          <CustomCheckBox
            value={one}
            text={"< 1 KM"}
            onPress={() => setByDistance(1)}
          />
          <CustomCheckBox
            value={two}
            text={"< 2 KM"}
            onPress={() => setByDistance(2)}
          />
          <CustomCheckBox
            value={five}
            text={"< 5 KM"}
            onPress={() => setByDistance(5)}
          />
          <CustomCheckBox
            value={more}
            text={"> 5 KM"}
            onPress={() => setByDistance(6)}
          />
        </View>
        <View>
          <Text className="font-primary-bold text-xl m-2">Rating</Text>
          <CustomCheckBox
            value={star45}
            text={"4 - 5 stars"}
            onPress={() => setStar45(!star45)}
          />
          <CustomCheckBox
            value={star34}
            text={"3 - 4 stars"}
            onPress={() => setStar34(!star34)}
          />
          <CustomCheckBox
            value={star23}
            text={"2 - 3 stars"}
            onPress={() => setStar23(!star23)}
          />
          <CustomCheckBox
            value={star12}
            text={"1 - 2 stars"}
            onPress={() => setStar12(!star12)}
          />
          <CustomCheckBox
            value={star01}
            text={"0 - 1 stars"}
            onPress={() => setStar01(!star01)}
          />
        </View>
        <View>
          <View
            className="flex flex-row justify-between m-2"
            onTouchStart={selectAll}
          >
            <Text className="font-primary-bold text-xl">Store</Text>
            <Text className="font-primary text-lg underline">Select All</Text>
          </View>
          <CustomCheckBox
            value={liho}
            text={"LiHo"}
            onPress={() => setLiho(!liho)}
          />
          <CustomCheckBox
            value={koi}
            text={"KOI The"}
            onPress={() => setKoi(!koi)}
          />
        </View>
      </View>
      <View className="mb-16">
        <View className="my-2">
          <PrimaryButton onPress={applyFilters}>Apply</PrimaryButton>
        </View>
        <SecondaryButton onPress={reset}>Reset</SecondaryButton>
      </View>
    </ScrollView>
  );
}
