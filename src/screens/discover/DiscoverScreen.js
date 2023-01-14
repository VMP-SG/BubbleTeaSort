import { useState, useEffect } from "react";
import { Text, SafeAreaView, View } from "react-native";
import DiscoverFAB from "../../components/buttons/DiscoverFAB";
import DiscoverMap from "./DiscoverMap";
import DiscoverList from "./DiscoverList";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterButton from "../../components/buttons/FilterButton";
import { db } from "../../utils/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { getLocation, getDistanceFromLatLonInKm } from "../../utils/location";
import * as sort from "../../utils/sorting";

const DiscoverScreen = ({ route, navigation }) => {
  const [isMap, setIsMap] = useState(true);
  const toggleMap = () => {
    setIsMap(!isMap);
  };
  const [overallList, setOverallList] = useState([]);
  const [originalList, setOriginalList] = useState([]);
  // const [posts, setPosts] = useState([]);
  const [filters, setFilters] = useState({
    distance: false,
    rating: false,
    numPosts: false,

    one: false,
    two: false,
    five: false,
    more: false,

    star45: false,
    star34: false,
    star23: false,
    star12: false,
    star01: false,

    liho: false,
    koi: false,
  });
  useEffect(() => {
    (async () => {
      const postCount = {};
      const ratingAvg = {};
      const q = query(collection(db, "Post"));
      const querySnapshot = await getDocs(q);
      const queriedPostData = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        queriedPostData.push(doc.data());
      });
      for (const post of queriedPostData) {
        if (post.store_id in postCount) {
          postCount[post.store_id]++;
          ratingAvg[post.store_id] += post.rating;
        } else {
          postCount[post.store_id] = 1;
          ratingAvg[post.store_id] = post.rating;
        }
      }
      for (const post of Object.keys(postCount)) {
        ratingAvg[post] /= postCount[post];
      }
      const q2 = query(collection(db, "Store"));
      const location = await getLocation();
      const querySnapshot2 = await getDocs(q2);
      const queriedStoreData = [];
      querySnapshot2.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var distance, rating, count;
        if (doc.data()?.coordinates) {
          distance = getDistanceFromLatLonInKm(
            location.coords.latitude,
            location.coords.longitude,
            doc.data().coordinates.latitude,
            doc.data().coordinates.longitude
          );
        }
        if (doc.id in postCount) {
          rating = ratingAvg[doc.id];
          count = postCount[doc.id];
        } else {
          rating = 0;
          count = 0;
        }
        queriedStoreData.push({
          ...doc.data(),
          distance,
          id: doc.id,
          rating,
          count,
        });
      });
      setOverallList(queriedStoreData);
      setOriginalList(queriedStoreData);
    })();
  }, []);
  useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
      const f = route.params.filters;
      var currentList = [...originalList];
      if (f.one) {
        currentList = sort.filterLess1km(currentList);
      }
      if (f.two) {
        currentList = sort.filterLess2km(currentList);
      }
      if (f.five) {
        currentList = sort.filterLess5km(currentList);
      }
      if (f.more) {
        currentList = sort.filterMore5km(currentList);
      }
      currentList = sort.filterStars(currentList, f);
      currentList = sort.filterStore(currentList, f);
      if (f.distance) {
        currentList = sort.sortByDistance(currentList);
      }
      if (f.rating) {
        currentList = sort.sortByRating(currentList);
      }
      if (f.numPosts) {
        currentList = sort.sortByNumPosts(currentList);
      }
      setOverallList(currentList);
    }
  }, [route.params?.filters]);
  const goToFilter = () => {
    navigation.navigate("DiscoverFilter", { filters });
  };
  return (
    <SafeAreaView>
      <FilterButton onPress={goToFilter}>
        <MaterialCommunityIcons name="tune-vertical" color="black" size={30} />
        <Text className="font-primary-bold text-xl mr-1">Filters</Text>
        <View className="flex w-6 h-6 bg-black rounded-full items-center justify-center">
          <Text className="font-primary-bold text-xl text-white">
            {filters ? Object.values(filters).filter(Boolean).length : 1}
          </Text>
        </View>
      </FilterButton>
      <DiscoverFAB onPress={toggleMap}>
        <MaterialCommunityIcons
          name={isMap ? "view-list" : "map-legend"}
          color={"black"}
          size={30}
        />
      </DiscoverFAB>
      {isMap ? (
        <DiscoverMap
          route={route}
          navigation={navigation}
          overallList={overallList}
        />
      ) : (
        <DiscoverList
          route={route}
          navigation={navigation}
          overallList={overallList}
        />
      )}
    </SafeAreaView>
  );
};

export default DiscoverScreen;
