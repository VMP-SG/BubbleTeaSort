import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { db, auth } from "../../utils/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import usePostPicture from "../../hooks/usePostPicture";
import { HeartIcon } from "react-native-heroicons/solid";
import { nFormatter } from "../../utils/number";

// post: Post Document from Firebase
// location: Location object from getLocation util
// style: Transfers tailwind styles
// onPress: function that executes when the post card is pressed (navigation)

const StorePageCard = ({ post, style, onPress }) => {
  const imageUri = usePostPicture(post.photo);
  const [likeCount, setLikeCount] = useState(post.likes.length);
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
  return (
    <TouchableOpacity
      className="bg-brown-500 rounded-xl w-28 mx-2"
      style={style}
      onPress={onPress}
    >
      <Image
        source={
          imageUri === null
            ? require("../../../assets/huix.jpeg")
            : { uri: imageUri }
        }
        className="h-36 w-full rounded-xl"
      />
      <View className="p-3">
        <Text className="font-secondary-bold" numberOfLines={1}>
          {post.title}
        </Text>
        <View className="flex-row justify-between mt-6">
          <View className="flex-row items-center">
            <Pressable hitSlop={10} onPress={likeHandler}>
              <HeartIcon
                size={16}
                color="transparent"
                stroke="black"
                fill={isLiked ? "#E92424" : "transparent"}
                strokeWidth={2}
              />
            </Pressable>
            <Text className="font-secondary text-sm ml-1">
              {nFormatter(likeCount, 1)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StorePageCard;
