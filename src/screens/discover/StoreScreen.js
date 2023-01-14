import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import StorePageCard from "../../components/cards/StorePageCard";
import { getStoreData, getPostDataByStoreID, db } from "../../utils/firebase";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { StarIcon as StarIconOutline } from "react-native-heroicons/outline";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getDocs, collection } from "firebase/firestore";

import chi from "../../../assets/chi.png";
import gon from "../../../assets/gon.png";
import koi from "../../../assets/koi.png";
import lih from "../../../assets/lih.png";
import pla from "../../../assets/pla.png";

const IconText = ({ iconName, text, style, additionalButton }) => {
  return (
    <View className="flex flex-row items-between w-full mx-4 my-2">
      <View className="flex flex-row w-11/12">
        <MaterialCommunityIcons name={iconName} color="black" size={24} />
        <Text className="ml-2 w-full text-base" style={style}>
          {text}
        </Text>
      </View>
      {additionalButton ? <View>{additionalButton}</View> : null}
    </View>
  );
};

const ExternalLinkButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons name={"open-in-new"} color="black" size={24} />
    </TouchableOpacity>
  );
};

export default function ({ route, navigation }) {
  const [storeData, setStoreData] = useState({});
  const [time, setTime] = useState();
  const [flavours, setFlavours] = useState();
  const [posts, setPosts] = useState([]);
  const [img, setImg] = useState();
  const id = route.params?.id;
  useEffect(() => {
    getStoreData(id).then((d) => {
      setStoreData(d);
      setTime(d.hours.split(", ").join("\n"));
      setFlavours(d.flavours.slice(0, 3).join("\n"));
      switch (d.brand.slice(0, 3).toLowerCase()) {
        case "chi":
          setImg(chi);
          break;
        case "gon":
          setImg(gon);
          break;
        case "koi":
          setImg(koi);
          break;
        case "lih":
          setImg(lih);
          break;
        case "pla":
          setImg(pla);
          break;
        default:
          setImg(chi);
      }
    });
    getPostDataByStoreID(id).then(async (d) => {
      let fetchedUsers = [];
      let fetchedPosts = [];
      const userQuerySnapshot = await getDocs(collection(db, "User"));
      userQuerySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedUsers.push({ ...data, id: doc.id });
      });
      d.forEach((post) => {
        const uid = post.author;
        const user = fetchedUsers.find((fetchedUser) => fetchedUser.id === uid);
        if (user) {
          fetchedPosts.push({ ...post, ...user });
        }
      });
      setPosts(fetchedPosts);
    });
  }, []);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={img} />
        <View className="px-4 pt-2 pb-16">
          <Text className="px-8 text-center font-primary-light text-3xl">
            {`${storeData.brand} @ ${storeData.name}`}
          </Text>
          <View className="w-screen items-center justify-center">
            <View className="mt-2 mb-4 flex-row items-center">
              {Array.from(Array(5), (e, i) =>
                i < storeData.rating ? (
                  <StarIcon
                    fill="black"
                    style={{
                      marginLeft: i > 0 ? 8 : 0,
                    }}
                    key={i}
                  />
                ) : (
                  <StarIconOutline
                    stroke="black"
                    style={{
                      marginLeft: 8,
                    }}
                    strokeWidth={2}
                    key={i}
                  />
                )
              )}
            </View>
          </View>
          <IconText
            iconName="map-marker"
            text={storeData.address}
            className="font-secondary-bold"
          />
          <IconText
            iconName="clock-time-three"
            text={time}
            className="font-secondary"
          />
          <IconText
            iconName="thumb-up"
            text={flavours}
            className="font-secondary"
            additionalButton={
              <ExternalLinkButton
                onPress={() => {
                  Linking.openURL(storeData.menu_link);
                }}
              />
            }
          />
          {posts.length > 0 ? (
            <View className="bg-brown-400 mt-6">
              <View className="px-2 py-4">
                <Text className="text-xl font-primary pb-4">
                  Customer Posts
                </Text>
                <FlatList
                  style={{
                    flexGrow: 0,
                  }}
                  horizontal
                  data={posts}
                  renderItem={({ item }) => (
                    <StorePageCard
                      post={item}
                      onPress={() => navigation.navigate("Post", item)}
                    />
                  )}
                  keyExtractor={(item) => item.caption}
                />
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
