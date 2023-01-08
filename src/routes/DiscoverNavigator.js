import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DiscoverScreen from "../screens/discover/DiscoverScreen";
import DiscoverFilter from "../screens/discover/DiscoverFilter";
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
    </Stack.Navigator>
  );
};

export default DiscoverNavigator;
