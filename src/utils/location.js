import * as Location from "expo-location";

export const getLocation = async () => {
  let location = await Location.getLastKnownPositionAsync();
  if (location === null) {
    location = await Location.getCurrentPositionAsync();
  }
  return location;
}
