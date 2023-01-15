import { View, Image, Text, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import usePostPicture from '../../hooks/usePostPicture';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { StarIcon as StarIconOutline } from 'react-native-heroicons/outline';
import { auth, db } from '../../utils/firebase';
import { nFormatter } from '../../utils/number';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import stores from "../../data/stores.json";

const PostScreen = ({ route, navigation }) => {
  const post = route.params;
  const imageUri = usePostPicture(post.photo);
  const [isLiked, setIsLiked] = useState(auth.currentUser ? post.likes.includes(auth.currentUser.uid) : false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [store, setStore] = useState(null);

  const likeHandler = async () => {
    if (auth.currentUser) {
      const postRef = doc(db, "Post", post.id);
      if (isLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(auth.currentUser.uid)
        });
        setIsLiked(false);
        setLikeCount((prevLikeCount) => --prevLikeCount);
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(auth.currentUser.uid)
        });
        setIsLiked(true);
        setLikeCount((prevLikeCount) => ++prevLikeCount);
      }
    }
  }

  useEffect(() => {
    // const docRef = doc(db, "Store", post.store_id);
    // const docSnap = await getDoc(docRef);

    const targetStore = stores.find((store) => store.id === post.store_id);
  
    if (targetStore) {
      setStore(store);
    }
  },[]);

  return (
    <ScrollView className='flex-1'>
      <Image 
        source={!imageUri ? require("../../../assets/icons/Placeholder.png") : { uri: imageUri }}
        className='w-full h-72 rounded-b-xl'
      />
      <View className='flex-grow basis-24 px-4 pt-4 pb-20'>
        <View className='flex-row items-center'>
          <Text className='font-primary-bold text-xl flex-1'>{post.title}</Text>
          <Pressable hitSlop={10} onPress={likeHandler}>
            <HeartIcon 
              size={22}
              color="transparent"
              stroke="black"
              fill={isLiked ? "#E92424" : "transparent"}
              strokeWidth={2}
            />
          </Pressable>
          <Text className='font-secondary text-lg ml-1'>{nFormatter(likeCount, 1)}</Text>
        </View>
        <View className='mt-2 flex-row items-center'>
          {Array.from(Array(5), (e, i) => i < post.rating ?
            <StarIcon 
              fill="black"
              style={{
                marginLeft: i > 0 ? 8 : 0
              }}
              key={i}
            /> :
            <StarIconOutline 
              stroke="black"
              style={{
                marginLeft: 8
              }}
              strokeWidth={2}
              key={i}
            />
          )}
          <Text className='ml-3 font-secondary text-base'>${post.price}</Text>
        </View>
        <View className='flex-row mt-2'>
          <MaterialCommunityIcons 
            name="store"
            size={22}
          />
          <Text className='font-secondary text-base ml-1'>{store === null ? "" : `${store.brand} @ ${store.name}`}</Text>
        </View>
        <Text className='font-secondary text-base mt-2 flex-1'>{post.caption}</Text>
        <Text className='font-primary-bold text-xl mt-2'>Flavour(s)</Text>
        <View className='mt-2 flex-wrap flex-row'>
          {post.flavours.map((flavour, i) => 
            <View className='bg-brown-400 mr-2 px-4 py-2 rounded-full mb-2' key={i}>
              <Text className='text-base font-secondary'>{flavour}</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default PostScreen
