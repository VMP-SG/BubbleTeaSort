import { View, Text, SafeAreaView, ScrollView, Image, Pressable } from 'react-native'
import React from "react";
import { auth } from '../../utils/firebase'
import { Cog6ToothIcon } from 'react-native-heroicons/outline'
import useProfilePicture from '../../hooks/useProfilePicture'

const ProfileScreen = ({ route, navigation }) => {
  const profilePictureUrl = useProfilePicture(!route.params || !route.params.photoURL ? undefined : route.params.photoURL);
  const username = !route.params || !route.params.displayName ? auth.currentUser.displayName : route.params.displayName;
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View className='flex-row items-center py-8'>
          <View className='flex-1 items-center'>
            <Image className='w-24 h-24 rounded-full border' source={profilePictureUrl === null ? require("../../../assets/icons/DefaultProfilePicture.png") : { uri: profilePictureUrl }} />
          </View>
          <View className='flex-1 justify-start'>
            <View className='flex-row w-full pr-8 items-center'>
              <Text className='font-primary-bold text-2xl pr-2' numberOfLines={1}>{username}</Text>
              <Pressable onPress={() => navigation.navigate("Settings")} hitSlop={10}>
                <Cog6ToothIcon color="black" strokeWidth={2} />
              </Pressable>
            </View>
            <Text className='font-secondary text-base mt-1'>100 Posts</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
