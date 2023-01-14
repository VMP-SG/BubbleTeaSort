import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home/HomeScreen";
import PostScreen from "../screens/common/PostScreen";

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Comfortaa_400Regular",
        },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="HomePost"
        component={PostScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: "black",
          title: "",
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
