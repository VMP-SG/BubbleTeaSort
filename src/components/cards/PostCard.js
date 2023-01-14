import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../../utils/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import usePostPicture from "../../hooks/usePostPicture";
import { MapPinIcon, HeartIcon } from "react-native-heroicons/solid";
import { calcDistance } from "../../utils/location";
import { nFormatter } from "../../utils/number";
import { stores } from "../../data/store.js";

// post: Post Document from Firebase
// location: Location object from getLocation util
// style: Transfers tailwind styles
// onPress: function that executes when the post card is pressed (navigation)

const PostCard = ({ post, location, style, onPress }) => {
  const imageUri = usePostPicture(post.photo);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [distance, setDistance] = useState("-");
  const [isLiked, setIsLiked] = useState(
    auth.currentUser ? post.likes.includes(auth.currentUser.uid) : false
  );

  const likeHandler = async () => {
    if (auth.currentUser) {
      const postRef = doc(db, "Post", post.id);
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(auth.currentUser.uid),
        });
        setIsLiked(false);
        setLikeCount((prevLikeCount) => --prevLikeCount);
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(auth.currentUser.uid),
        });
        setIsLiked(true);
        setLikeCount((prevLikeCount) => ++prevLikeCount);
      }
    }
  };

  useEffect(() => {
    const getStore = async () => {
      try {
        const docRef = doc(db, "Store", post.store_id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const store = docSnap.data();
          const distance = calcDistance(
            location.coords.latitude,
            location.coords.longitude,
            store.coordinates.latitude,
            store.coordinates.longitude
          );
          setDistance(distance.toFixed(1));
        }
      } catch (error) {
        const targetStore = stores.find((store) => store.id === post.store_id);
        if (targetStore) {
          const distance = calcDistance(
            location.coords.latitude,
            location.coords.longitude,
            targetStore.coordinates.latitude,
            targetStore.coordinates.longitude
          );
          setDistance(distance.toFixed(1));
        }
      }
    };
    getStore();
  }, []);

  return (
    <TouchableOpacity
      className="bg-brown-500 rounded-xl"
      style={style}
      onPress={onPress}
    >
      <Image
        source={
          imageUri === null
            ? require("../../../assets/icons/Placeholder.png")
            : { uri: imageUri }
        }
        className="w-full h-60 rounded-xl"
      />
      <View className="p-3">
        <Text className="font-secondary-bold" numberOfLines={1}>
          {post.title}
        </Text>
        <View className="flex-row justify-between mt-6 items-center">
          <View className="flex-row items-center">
            <MapPinIcon size={20} color="black" />
            <Text className="font-secondary text-base ml-1">{distance}km</Text>
          </View>
          <View className="flex-row items-center">
            <Pressable hitSlop={10} onPress={likeHandler}>
              <HeartIcon
                size={20}
                color="transparent"
                stroke="black"
                fill={isLiked ? "#E92424" : "transparent"}
                strokeWidth={2}
              />
            </Pressable>
            <Text className="font-secondary text-base ml-1">
              {nFormatter(likeCount, 1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PostCard;
