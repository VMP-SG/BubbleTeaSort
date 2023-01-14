import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Comfortaa_300Light, Comfortaa_400Regular, Comfortaa_700Bold } from "@expo-google-fonts/comfortaa";
import { Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";
import { ActivityIndicator, View } from "react-native";
import RootNavigator from "./src/routes/RootNavigator";
import * as Location from "expo-location";
import { useEffect } from "react";

const BTSTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF3E0',
    card: '#EADAC1'
  },
}

export default function App() {
  const [status, requestPermission] = Location.useForegroundPermissions();

  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
    Raleway_400Regular, 
    Raleway_700Bold
  })

  useEffect(() => {
    (async () => {
      await requestPermission();
    })();
  },[])

  if (!fontsLoaded || !status || status.status !== "granted") {
    return (
      <View className='flex-1 items-center justify-center'>
        <ActivityIndicator />
      </View>
    )
  } else return (
    <NavigationContainer theme={BTSTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
