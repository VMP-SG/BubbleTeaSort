import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NewPostScreen from "../screens/NewPostScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MidFAB from "../components/buttons/MidFAB";
import ProfileNavigator from "./ProfileNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from 'react-native';
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/outline';

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#BCA480",
          position: "absolute",
          borderTopWidth: 0,
        }
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`bg-[#3E3E3E] rounded-full h-10 w-10 items-center justify-center ${focused ? "bottom-1" : "top-2"}`}>
              <HomeIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (<Text className='font-primary text-[#3E3E3E] text-xs'>{focused ? "Home" : ""}</Text>),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`bg-[#3E3E3E] rounded-full h-10 w-10 items-center justify-center ${focused ? "bottom-1" : "top-2"}`}>
              <MagnifyingGlassIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (<Text className='font-primary text-[#3E3E3E] text-xs'>{focused ? "Search" : ""}</Text>),
        }}
      />
      <Tab.Screen
        name="New Post"
        component={NewPostScreen}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
          tabBarButton: (props) => <MidFAB {...props} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`bg-[#3E3E3E] rounded-full h-10 w-10 items-center justify-center ${focused ? "bottom-1" : "top-2"}`}>
              <MaterialCommunityIcons
                name="compass-outline"
                color={color}
                size={size}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (<Text className='font-primary text-[#3E3E3E] text-xs'>{focused ? "Explore" : ""}</Text>),
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View className={`bg-[#3E3E3E] rounded-full h-10 w-10 items-center justify-center ${focused ? "bottom-1" : "top-2"}`}>
              <UserIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (<Text className='font-primary text-[#3E3E3E] text-xs'>{focused ? "Profile" : ""}</Text>),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export default RootNavigator;