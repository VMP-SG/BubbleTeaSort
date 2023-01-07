import React from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NewPostScreen from "../screens/NewPostScreen";
import ExploreScreen from "../screens/ExploreScreen";
import MidFAB from "../components/buttons/MidFAB";
import ProfileNavigator from "./ProfileNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarActiveTintColor: "black",
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="magnify"
              color={color}
              size={size}
            />
          ),
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
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="compass"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Me"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={size}
            />
          ),
          headerShown: false
        }}
      />
    </Tab.Navigator>
  )
}

export default RootNavigator;
