import {
  View,
  Text,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../utils/firebase";
import { Cog6ToothIcon } from "react-native-heroicons/outline";
import useProfilePicture from "../../hooks/useProfilePicture";
import ToggleBar from "../../components/ToggleBar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CurrencyDollarIcon } from "react-native-heroicons/solid";
import { ContributionGraph } from "react-native-chart-kit";
import ActivityGraph from "../../components/ActivityGraph";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  getActivityPercentagesAndLabels,
  getCommitsData,
  getCupsInPastMonth,
  getSpendingInPastMonth,
} from "../../utils/profile";
import { getLocation } from "../../utils/location";
import { useIsFocused } from "@react-navigation/native";
import PostCard from "../../components/cards/PostCard";

const SummaryView = ({ posts }) => {
  const commitsData = getCommitsData(posts);
  const pastMonthCupCount = getCupsInPastMonth(posts);
  const pastMonthSpending = getSpendingInPastMonth(posts);

  const [labels, setLabels] = useState(["", "", "", ""]);
  const [percentages, setPercentages] = useState([0, 0, 0, 0]);

  // left top right bottom
  useEffect(() => {
    (async () => {
      const [fetchedLabels, fetchedPercentages] =
        await getActivityPercentagesAndLabels(posts);
      setLabels(fetchedLabels);
      setPercentages(fetchedPercentages);
    })();
  }, []);

  return (
    <View className="px-4 py-6">
      <Text className="font-primary-bold text-2xl mb-2">Past Month</Text>
      <View className="flex-row">
        <View className="flex-1 mr-4 bg-brown-400 items-center py-4 rounded-xl">
          <View className="rounded-full w-12 h-12 items-center justify-center bg-brown-500 border">
            <MaterialCommunityIcons name="beer" size={24} />
          </View>
          <View className="flex-row items-end mt-2">
            <Text className="font-primary text-3xl">{pastMonthCupCount} </Text>
            <Text className="font-primary text-xl">Cups</Text>
          </View>
          <Text className="font-secondary text-xl text-gray-light-transparent">
            In Total
          </Text>
        </View>
        <View className="flex-1 bg-brown-400 items-center py-4 rounded-xl">
          <View className="rounded-full w-12 h-12 items-center justify-center bg-brown-500 border">
            <CurrencyDollarIcon color="black" size={32} />
          </View>
          <View className="flex-row items-end mt-2">
            <Text className="font-primary text-xl">$</Text>
            <Text className="font-primary text-3xl">{pastMonthSpending}</Text>
          </View>
          <Text className="font-secondary text-xl text-gray-light-transparent">
            Spent
          </Text>
        </View>
      </View>
      <Text className="font-primary-bold text-2xl mt-6 mb-2">Cups</Text>
      <View className="rounded-xl bg-brown-400 w-full pb-4">
        <ScrollView
          horizontal={true}
          contentOffset={{ x: 220, y: 0 }}
          showsHorizontalScrollIndicator={false}
        >
          <ContributionGraph
            values={commitsData}
            height={118}
            width={578}
            chartConfig={{
              backgroundGradientFrom: "#FFFFFF",
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: "#FFFFFF",
              backgroundGradientToOpacity: 0,
              fillShadowGradientFrom: "#FFFFFF",
              color: (opacity = 1) => `rgba(64, 47, 31, ${opacity})`,
              labelColor: (opacity = 0.44) => `rgba(00, 00, 00, ${opacity})`,
              propsForLabels: {
                translateY: 24,
              },
            }}
            numDays={365}
            gutterSize={2}
            squareSize={8}
            showOutOfRangeDays={true}
            style={{
              marginLeft: -15,
              marginTop: -15,
            }}
          />
        </ScrollView>
        <View className="flex-row mt-2 items-center justify-end">
          <Text className="text-xs mr-2">Less</Text>
          <View className="bg-brown-500 h-2 w-2 mr-[2]" />
          <View className="bg-brown-600 h-2 w-2 mr-[2]" />
          <View className="bg-brown-700 h-2 w-2 mr-[2]" />
          <View className="bg-brown-800 h-2 w-2 mr-[2]" />
          <View className="bg-brown-900 h-2 w-2" />
          <Text className="ml-2 text-xs mr-4">More</Text>
        </View>
      </View>
      <Text className="font-primary-bold text-2xl mt-6 mb-2">Activity</Text>
      <View className="rounded-xl bg-brown-400 w-full p-4 justify-center items-center mb-16">
        <Text className="font-secondary text-base text-gray-light-transparent">
          {percentages[1]}%
        </Text>
        <Text className="font-primary text-base">{labels[1]}</Text>
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="font-secondary text-base text-gray-light-transparent text-right">
              {percentages[0]}%
            </Text>
            <Text className="font-primary text-base text-right">
              {labels[0]}
            </Text>
          </View>
          <ActivityGraph percentages={percentages} />
          <View className="flex-1">
            <Text className="font-secondary text-base text-gray-light-transparent text-left">
              {percentages[2]}%
            </Text>
            <Text className="font-primary text-base text-left">
              {labels[2]}
            </Text>
          </View>
        </View>
        <Text className="font-secondary text-base text-gray-light-transparent mt-[-2]">
          {percentages[3]}%
        </Text>
        <Text className="font-primary text-base">{labels[3]}</Text>
      </View>
    </View>
  );
};

const PostsView = ({
  location,
  navigation,
  posts,
  profilePictureUrl,
  username,
  showPosts,
  setShowPosts,
}) => {
  return (
    <FlatList
      columnWrapperStyle={{
        justifyContent: "space-between",
        padding: 16,
      }}
      ListHeaderComponent={
        <ProfileTop
          navigation={navigation}
          posts={posts}
          profilePictureUrl={profilePictureUrl}
          username={username}
          showPosts={showPosts}
          setShowPosts={setShowPosts}
        />
      }
      data={posts}
      numColumns={2}
      renderItem={({ item }) => (
        <PostCard location={location} post={item} className="w-[48%]" />
      )}
    />
  );
};

const ProfileTop = ({
  profilePictureUrl,
  navigation,
  posts,
  showPosts,
  setShowPosts,
  username,
}) => {
  return (
    <>
      <View className="flex-row items-center py-8">
        <View className="flex-1 items-center">
          <Image
            className="w-24 h-24 rounded-full border"
            source={
              profilePictureUrl === null
                ? require("../../../assets/icons/DefaultProfilePicture.png")
                : { uri: profilePictureUrl }
            }
          />
        </View>
        <View className="flex-1">
          <View className="flex-row w-full pr-8 items-center">
            <Text className="font-primary-bold text-2xl pr-2" numberOfLines={1}>
              {username}
            </Text>
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              hitSlop={10}
            >
              <Cog6ToothIcon color="black" strokeWidth={2} />
            </Pressable>
          </View>
          <Text className="font-secondary text-base mt-1">
            {posts.length} Post{posts.length === 1 ? "" : "s"}
          </Text>
        </View>
      </View>
      <ToggleBar
        className="bg-brown-400"
        showLeft={showPosts}
        setShowLeft={setShowPosts}
        leftText="Posts"
        rightText="Summary"
      />
    </>
  );
};

const ProfileScreen = ({ route, navigation }) => {
  const profilePictureUrl = useProfilePicture(
    !route.params || !route.params.photoURL ? undefined : route.params.photoURL
  );
  const username =
    !route.params || !route.params.displayName
      ? auth.currentUser.displayName
      : route.params.displayName;
  const [showPosts, setShowPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchCurrentLocation = async () => {
      const location = await getLocation();
      setLocation(location);
    };
    if (isFocused) {
      fetchCurrentLocation();
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      let queriedPostData = [];
      const q = query(
        collection(db, "Post"),
        where("author", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.timestamp = new Date(data.timestamp.seconds * 1000);
        queriedPostData.push(data);
      });
      setPosts(queriedPostData);
    })();
  }, []); // TODO: add isFocused here

  return (
    <SafeAreaView className="flex-1">
      {!showPosts ? (
        <ScrollView>
          <ProfileTop
            navigation={navigation}
            posts={posts}
            profilePictureUrl={profilePictureUrl}
            username={username}
            showPosts={showPosts}
            setShowPosts={setShowPosts}
          />
          <SummaryView posts={posts} />
        </ScrollView>
      ) : (
        <View className="flex-1">
          <PostsView
            location={location}
            navigation={navigation}
            posts={posts}
            profilePictureUrl={profilePictureUrl}
            username={username}
            showPosts={showPosts}
            setShowPosts={setShowPosts}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
