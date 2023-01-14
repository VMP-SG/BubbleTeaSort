import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeNavigator from "./HomeNavigator";
import SearchScreen from "../screens/SearchScreen";
import NewPostScreen from "../screens/NewPostScreen";
import DiscoverNavigator from "./DiscoverNavigator";
import MidFAB from "../components/buttons/MidFAB";
import ProfileNavigator from "./ProfileNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "react-native-heroicons/outline";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        headerTitleStyle: {
          fontFamily: "Comfortaa_400Regular",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#BCA480",
          position: "absolute",
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`bg-gray-light rounded-full h-10 w-10 items-center justify-center ${
                focused ? "bottom-1" : "top-2"
              }`}
            >
              <HomeIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className="font-primary text-gray-light text-xs">
              {focused ? "Home" : ""}
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchNavigator"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`bg-gray-light rounded-full h-10 w-10 items-center justify-center ${
                focused ? "bottom-1" : "top-2"
              }`}
            >
              <MagnifyingGlassIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className="font-primary text-gray-light text-xs">
              {focused ? "Search" : ""}
            </Text>
          ),
          headerShown: false,
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
        name="DiscoverNavigator"
        component={DiscoverNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`bg-gray-light rounded-full h-10 w-10 items-center justify-center ${
                focused ? "bottom-1" : "top-2"
              }`}
            >
              <MaterialCommunityIcons
                name="compass-outline"
                color={color}
                size={size}
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className="font-primary text-gray-light text-xs">
              {focused ? "Discover" : ""}
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <View
              className={`bg-gray-light rounded-full h-10 w-10 items-center justify-center ${
                focused ? "bottom-1" : "top-2"
              }`}
            >
              <UserIcon size={size} color={color} strokeWidth={2} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text className="font-primary text-gray-light text-xs">
              {focused ? "Profile" : ""}
            </Text>
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
