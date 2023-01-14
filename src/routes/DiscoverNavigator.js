import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../screens/discover/DiscoverScreen";
import DiscoverFilter from "../screens/discover/DiscoverFilter";
import PostScreen from "../screens/common/PostScreen";
import StoreScreen from "../screens/discover/StoreScreen";
import { auth } from "../utils/firebase";

const Stack = createNativeStackNavigator();

const DiscoverNavigator = () => {
  const currentUser = auth.currentUser;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"DiscoverMain"}
    >
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: "black",
          headerTitleStyle: {
            fontFamily: "Comfortaa_400Regular",
          },
        }}
        name="DiscoverFilter"
        component={DiscoverFilter}
      />
      <Stack.Screen
        name="DiscoverStore"
        component={StoreScreen}
        options={{
          title: "Discover",
          headerShown: true,
          headerBackTitle: "",
          headerTitleAlign: "center",
          headerTintColor: "black",
          headerTitleStyle: {
            fontFamily: "Comfortaa_400Regular",
          },
        }}
      />
      <Stack.Screen
        name="Post"
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

export default DiscoverNavigator;
