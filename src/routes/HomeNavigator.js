import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../screens/home/HomeScreen';
import PostScreen from '../screens/home/PostScreen';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Comfortaa_400Regular",
        }
      }}
    >
      <Stack.Screen 
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={({ route }) => ({
          headerBackTitle: "",
          headerTintColor: "black",
          title: route.params.display_name
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigator
