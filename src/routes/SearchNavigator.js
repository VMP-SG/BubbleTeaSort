import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from '../screens/search/SearchScreen';
import PostScreen from '../screens/common/PostScreen';

const Stack = createNativeStackNavigator();

const SearchNavigator = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Comfortaa_400Regular",
        }
      }}
    >
      <Stack.Screen 
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="SearchPost"
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

export default SearchNavigator
