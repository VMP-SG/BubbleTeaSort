import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '../screens/profile/LoginScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import RegisterScreen from '../screens/profile/RegisterScreen';
import ResetPasswordScreen from '../screens/profile/ResetPasswordScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { auth } from '../utils/firebase';
import ChangePasswordScreen from '../screens/profile/ChangePasswordScreen';
import PostScreen from '../screens/common/PostScreen';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  const currentUser = auth.currentUser;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName={currentUser === null ? "Login" : "Profile"}
    >
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen 
        name="ResetPassword"
        component={ResetPasswordScreen}
      />
      <Stack.Screen 
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen 
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: "black",
          headerTitleStyle: {
            fontFamily: "Comfortaa_400Regular",
          }
        }}
      />
      <Stack.Screen 
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: "black",
          headerTitleStyle: {
            fontFamily: "Comfortaa_400Regular",
          },
          title: "Settings"
        }}
      />
      <Stack.Screen 
        name="ProfilePosts"
        component={PostScreen}
        options={({ route }) => ({
          headerShown: true,
          headerBackTitle: "",
          headerTintColor: "black",
          title: "",
        })}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
