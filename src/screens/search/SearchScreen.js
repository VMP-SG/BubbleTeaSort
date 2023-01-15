import {
  View,
  TextInput,
  Pressable,
  FlatList,
  Text,
  ScrollView,
  Keyboard,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { calcDistance, getLocation } from "../../utils/location";
import SafeArea from "../../components/SafeArea";
import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { db, auth } from "../../utils/firebase";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import ToggleBar from "../../components/ToggleBar";
import PostCard from "../../components/cards/PostCard";
import ListCard from "../../components/cards/ListCard";
import rawStores from "../../data/stores.json";

const PostsView = ({ posts, navigation, location }) => {
  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: "space-between",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
      }}
      data={posts}
      numColumns={2}
      renderItem={({ item }) => (
        <PostCard
          onPress={() => navigation.navigate("SearchPost", item)}
          location={location}
          post={item}
          className="w-[48%]"
        />
      )}
    />
  );
};

const StoreView = ({ stores, navigation }) => {
  return (
    <View className="mt-2 mb-16">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {stores.map((item, i) => {
          return (
            <ListCard
              navigation={navigation}
              key={i}
              details={item}
              navigatePage="SearchStore"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const SearchHistoryView = ({ searchHistory, fetchSearchHistory }) => {
  const clickHistoryHandler = async (text) => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "User", uid);
      await updateDoc(userRef, {
        search_history: arrayRemove(text),
      });
      await fetchSearchHistory();
    }
  };

  return (
    <View className="flex-1 px-4">
      <Text className="font-primary-bold text-base">Search History</Text>
      <View className="flex-row flex-wrap mt-3">
        {searchHistory.map((history, i) => (
          <Pressable onPress={() => clickHistoryHandler(history)} key={i}>
            <View className="bg-brown-400 px-4 py-2 rounded-full mr-2" key={i}>
              <Text className="font-secondary text-base">{history}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const SearchView = ({ posts, location, navigation, stores }) => {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <View className="flex-1">
      <ToggleBar
        showLeft={showPosts}
        setShowLeft={setShowPosts}
        leftText="Posts"
        rightText="Stores"
      />
      <View className="flex-1 bg-brown-400">
        {showPosts ? (
          <PostsView
            posts={posts}
            navigation={navigation}
            location={location}
          />
        ) : (
          <StoreView stores={stores} navigation={navigation} />
        )}
      </View>
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [posts, setPosts] = useState([]);
  const [stores, setStores] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [location, setLocation] = useState(null);
  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchInput))
    .slice(0, 10);
  const filteredStores = stores
    .filter(
      (store) =>
        store.name.toLowerCase().includes(searchInput) || store.brand.toLowerCase().includes(searchInput)
    )
    .slice(0, 10);

  const fetchSearchHistory = useCallback(async () => {
    const uid = auth.currentUser.uid;
    const userRef = doc(db, "User", uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      const fetchedSearchhistory = data.search_history.reverse();
      setSearchHistory(fetchedSearchhistory);
    }
  }, [auth.currentUser]);

  useEffect(() => {
    const fetchData = async () => {
      const currLocation = await getLocation();
      setLocation(currLocation);

      const postCount = {};
      const ratingAvg = {};

      const fetchedPosts = [];
      let fetchedUsers = [];
      // const fetchedStores = [];

      const postQuerySnapshot = await getDocs(collection(db, "Post"));
      const userQuerySnapshot = await getDocs(collection(db, "User"));

      userQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedUsers.push({ ...data, id: doc.id });
      });

      postQuerySnapshot.forEach((doc) => {
        const post = doc.data();
        const uid = post.author;
        const user = fetchedUsers.find((fetchedUser) => fetchedUser.id === uid);
        if (user) {
          fetchedPosts.push({ ...post, post_id: doc.id, ...user });
        }
      });

      for (const post of fetchedPosts) {
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

      // const storeQuerySnapshot = await getDocs(collection(db, "Store"));
      // storeQuerySnapshot.forEach((store) => {
      //   let distance;
      //   let rating;
      //   let count;

      //   const data = store.data();
      //   if (data && data.coordinates) {
      //     distance = calcDistance(
      //       location.coords.latitude,
      //       location.coords.longitude,
      //       data.coordinates.latitude,
      //       data.coordinates.longitude
      //     );
      //   }

      //   if (store.id in postCount) {
      //     rating = ratingAvg[store.id];
      //     count = postCount[store.id];
      //   } else {
      //     rating = 0;
      //     count = 0;
      //   }

      //   fetchedStores.push({...data, distance, id: store.id, rating, count});
      // });

      // fetchedStores.sort((a, b) => a.distance > b.distance);

      const storesWithData = rawStores.map((store) => {
        let rating, count;
        const distance = calcDistance(
          currLocation.coords.latitude,
          currLocation.coords.longitude,
          store.coordinates.latitude,
          store.coordinates.longitude
        );
        if (store.id in postCount) {
          rating = ratingAvg[doc.id];
          count = postCount[doc.id];
        } else {
          rating = 0;
          count = 0;
        }
        return {
          ...store,
          distance,
          rating,
          count,
        };
      });

      storesWithData.sort((a, b) => a.distance > b.distance);

      setPosts(fetchedPosts);
      setStores(storesWithData);
    };
    fetchData();
    if (auth.currentUser) {
      fetchSearchHistory();
    }
  }, []); // TODO: reset this during production
  // },[isFocused]);

  const searchHandler = async ({ nativeEvent: { text } }) => {
    setSearchWord(text);
    if (auth.currentUser) {
      try {
        const uid = auth.currentUser.uid;
        const userRef = doc(db, "User", uid);
        await updateDoc(userRef, {
          search_history: arrayUnion(text),
        });
        await fetchSearchHistory();
      } catch (error) {
        // don't update anything
      }
    }
  };

  return (
    <SafeArea className="flex-1">
      <Pressable onPress={Keyboard.dismiss} className="flex-1">
        <>
          <View className="px-4 pt-4 pb-3">
            <View className="w-full bg-brown-400 py-2 px-4 rounded-full flex-row items-center">
              <MagnifyingGlassIcon color="black" />
              <TextInput
                className="mx-2 flex-1 font-primary text-base py-0 leading-5 h-full"
                editable={true}
                placeholder="Search for Posts or Stores"
                numberOfLines={1}
                onSubmitEditing={searchHandler}
                value={searchInput}
                onChangeText={(text) => setSearchInput(text)}
              />
              {searchInput !== "" && (
                <Pressable
                  hitSlop={10}
                  onPress={() => {
                    setSearchInput("");
                    setSearchWord("");
                  }}
                >
                  <PlusCircleIcon
                    color="black"
                    size={20}
                    style={{
                      transform: [{ rotate: "45deg" }],
                    }}
                  />
                </Pressable>
              )}
            </View>
          </View>
          {searchWord === "" ? (
            <SearchHistoryView
              searchHistory={searchHistory}
              fetchSearchHistory={fetchSearchHistory}
            />
          ) : (
            <SearchView
              posts={filteredPosts}
              location={location}
              navigation={navigation}
              stores={filteredStores}
            />
          )}
        </>
      </Pressable>
    </SafeArea>
  );
};

export default SearchScreen;
