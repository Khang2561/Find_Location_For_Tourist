import React, { useContext, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { MaterialIcons } from "@expo/vector-icons";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoia2hhbmcxNDEyMDMiLCJhIjoiY20zdDltNHZvMDd3MjJsc2ZsZmVzOXZlZCJ9.DZj1STnMXQgd_ftwT88I1Q"
);

export default function MapboxView({ locations, loading }) {
  const { location } = useContext(UserLocationContext);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (cameraRef.current && locations.length === 1) {
      const { longitude, latitude } = locations[0];
      cameraRef.current.setCamera({
        centerCoordinate: [longitude, latitude],
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  }, [locations]);

  const handleRecenter = () => {
    if (cameraRef.current && location) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  };

  if (!location) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Những địa điểm gần bạn</Text>
      <View style={styles.mapView}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            ref={cameraRef}
            centerCoordinate={[location.longitude, location.latitude]}
            zoomLevel={14}
          />
          <MapboxGL.UserLocation
            visible
            showsUserHeadingIndicator
          />
          {!loading &&
            locations.map((loc, index) => (
              <MapboxGL.PointAnnotation
                key={`location-${index}`}
                id={`marker-${index}`}
                coordinate={[loc.longitude, loc.latitude]}
              >
                <View />
              </MapboxGL.PointAnnotation>
            ))}
        </MapboxGL.MapView>
        {loading && (
          <View style={styles.blurOverlay}>
            <ActivityIndicator size="large" color="#ff4500" />
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  mapView: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.25,
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  recenterButton: {
    position: "absolute",
    bottom: 20,
    right: 30,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
