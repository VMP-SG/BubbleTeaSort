import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../screens/discover/DiscoverScreen";
import DiscoverFilter from "../screens/discover/DiscoverFilter";
import { auth } from "../utils/firebase";

const Stack = createNativeStackNavigator();

const DiscoverNavigator = () => {
  const currentUser = auth.currentUser;

  return (
    <Stack.Navigator initialRouteName={"Discover"}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Discover"
        component={DiscoverScreen}
      />
      <Stack.Screen name="DiscoverFilter" component={DiscoverFilter} />
    </Stack.Navigator>
  );
};

export default DiscoverNavigator;
