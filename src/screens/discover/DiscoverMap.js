import MapView, { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";

export default function ({ overallList }) {
  const coords = {
    latitude: 1.3521,
    longitude: 103.8198,
    latitudeDelta: 0.85,
    longitudeDelta: 0.0921,
  };
  const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return (
    <View className="w-screen h-screen">
      <MapView style={styles.map} region={coords} onPanDrag={() => {}}>
        {overallList.map((marker, i) => {
          if (marker?.coordinates?.latitude) {
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: marker.coordinates.latitude,
                  longitude: marker.coordinates.longitude,
                }}
                title={`${marker.brand} @ ${marker.name}`}
                onCalloutPress={() => {
                  console.log(marker.id);
                }}
              />
            );
          }
        })}
      </MapView>
    </View>
  );
}
