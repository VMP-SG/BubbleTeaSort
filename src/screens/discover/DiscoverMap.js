import MapView from "react-native-maps";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function () {
  const [coords, setCoords] = useState({
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.85,
    longitudeDelta: 0.0921,
  });
  const onRegionChange = (coords) => {
    setCoords(coords);
  };
  const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return (
    <View className="w-screen h-screen">
      <MapView
        style={styles.map}
        region={coords}
        onRegionChange={onRegionChange}
        onPanDrag={() => {}}
      />
    </View>
  );
}
