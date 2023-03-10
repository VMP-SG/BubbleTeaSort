import { FlatList, View, SafeAreaView, Text } from "react-native";
import { getLocation } from "../../utils/location";
import { useIsFocused } from "@react-navigation/native";
import { db } from "../../utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostCard from "../../components/cards/PostCard";

const HomeScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getLocation();
      setLocation(location);
    };
    const fetchPosts = async () => {
      const fetchedPosts = [];
      let fetchedUsers = [];

      const postQuerySnapshot = await getDocs(collection(db, "Post"));
      const userQuerySnapshot = await getDocs(collection(db, "User"));

      userQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedUsers.push({ ...data, id: doc.id });
      });

      postQuerySnapshot.forEach((doc) => {
        const post = doc.data();
        const uid = post.author;
        const user = fetchedUsers.find(
          (fetchedUser) => fetchedUser.id === uid
        );
        if (user) {
          fetchedPosts.push({ ...post, post_id: doc.id, ...user });
        }
      });
      setPosts(fetchedPosts);
    };
    fetchCurrentLocation();
    fetchPosts();
  // }, []); // TODO: reset this during production
  },[isFocused]);

  return (
    <View className="px-4 pt-4 flex-1 mb-12">
      <FlatList
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        data={posts}
        numColumns={2}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => (
          <PostCard
            onPress={() => navigation.navigate("HomePost", item)}
            location={location}
            post={item}
            className="w-[48%] mb-4"
          />
        )}
      ></FlatList>
    </View>
  );
};

export default HomeScreen;
