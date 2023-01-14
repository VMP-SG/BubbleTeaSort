import {
  View,
  TextInput,
  Pressable,
  FlatList,
  Text,
  Keyboard,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { getLocation } from "../../utils/location";
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
          <Pressable onPress={() => clickHistoryHandler(history)}>
            <View className="bg-brown-400 px-4 py-2 rounded-full mr-2" key={i}>
              <Text className="font-secondary text-base">{history}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const SearchView = ({ posts, location, navigation }) => {
  const [showPosts, setShowPosts] = useState(false);

  return (
    <View className="flex-1">
      <ToggleBar
        showLeft={showPosts}
        setShowLeft={setShowPosts}
        leftText="Posts"
        rightText="Stores"
      />
      <View className="flex-1 bg-brown-400 p-4">
        <FlatList
          columnWrapperStyle={{
            justifyContent: "space-between",
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
        ></FlatList>
      </View>
    </View>
  );
};

const SearchScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [searchInput, setSearchInput] = useState("");
  const [searchWord, setSearchWord] = useState("");

  const [posts, setPosts] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [location, setLocation] = useState(null);
  const filteredPosts = posts
    .filter((post) => post.title.includes(searchInput))
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
    const fetchCurrentLocation = async () => {
      const location = await getLocation();
      setLocation(location);
    };
    const fetchPosts = async () => {
      const postQuerySnapshot = await getDocs(collection(db, "Post"));
      const userQuerySnapshot = await getDocs(collection(db, "User"));
      const fetchedPosts = [];
      const fetchedUsers = [];

      userQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedUsers.push({ ...data, id: doc.id });
      });

      postQuerySnapshot.forEach((doc) => {
        const post = doc.data();
        const uid = post.author;
        const user = fetchedUsers.find((fetchedUser) => fetchedUser.id === uid);
        if (user) {
          fetchedPosts.push({ ...post, id: doc.id, ...user });
        }
      });
      setPosts(fetchedPosts);
    };
    fetchCurrentLocation();
    fetchPosts();
    if (auth.currentUser) {
      fetchSearchHistory();
    }
  }, []); // TODO: reset this during production
  // },[isFocused]);

  const searchHandler = async ({ nativeEvent: { text } }) => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "User", uid);
      await updateDoc(userRef, {
        search_history: arrayUnion(text),
      });
      await fetchSearchHistory();
    }
    setSearchWord(text);
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
            />
          )}
        </>
      </Pressable>
    </SafeArea>
  );
};

export default SearchScreen;
