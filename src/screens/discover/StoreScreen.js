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
import { getStoreData, getPostDataByStoreID } from "../../utils/firebase";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

const DropdownButton = ({ onPress, open }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name={open ? "chevron-up" : "chevron-down"}
        color="black"
        size={24}
      />
    </TouchableOpacity>
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
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const id = route.params?.id;
  const rating = route.params?.rating;
  const count = route.params?.count;
  useEffect(() => {
    getStoreData(id).then((d) => {
      setStoreData(d);
      setTime(d.hours.split(", ").join("\n"));
      setFlavours(d.flavours.slice(0, 3).join("\n"));
    });
    getPostDataByStoreID(id).then((d) => {
      setPosts(d);
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
        <Image source={require("../../../assets/lihotea.jpg")} />
        <View className="px-4 pt-2 pb-16">
          <Text className="px-4 text-center font-primary-light text-3xl">
            {storeData.brand} @ {storeData.name}
          </Text>
          <IconText
            iconName="map-marker"
            text={storeData.address}
            className="font-secondary-bold"
          />
          <IconText
            iconName="clock-time-three"
            text={open ? timeOpen : time}
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
                  renderItem={({ item }) => <StorePageCard post={item} />}
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
