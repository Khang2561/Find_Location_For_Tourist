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

export default function MapboxView({ locations, loading, route }) {
  const { location } = useContext(UserLocationContext);
  const cameraRef = useRef(null);

  const calculateBounds = (locations) => {
    if (!locations.length) return null;
    const lons = locations.map((loc) => loc.longitude);
    const lats = locations.map((loc) => loc.latitude);

    return {
      southwest: [Math.min(...lons), Math.min(...lats)],
      northeast: [Math.max(...lons), Math.max(...lats)],
    };
  };

  useEffect(() => {
    if (cameraRef.current && route) {
      const bounds = calculateBounds([
        ...locations,
        { longitude: location.longitude, latitude: location.latitude },
      ]);
      if (bounds) {
        const { southwest, northeast } = bounds;
        const center = [
          (southwest[0] + northeast[0]) / 2,
          (southwest[1] + northeast[1]) / 2,
        ];

        const zoom = 10; // Adjust to fit both points well
        cameraRef.current.setCamera({
          centerCoordinate: center,
          zoomLevel: zoom,
          animationDuration: 1000,
        });
      }
    }
  }, [locations, route]);

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
      <Text style={styles.title}>Những địa điểm gần đây</Text>
      <View style={styles.mapView}>
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera
            ref={cameraRef}
            centerCoordinate={[location.longitude, location.latitude]}
            zoomLevel={14}
          />
          <MapboxGL.UserLocation visible showsUserHeadingIndicator />
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
          {route && (
            <MapboxGL.ShapeSource id="routeSource" shape={route}>
              <MapboxGL.LineLayer
                id="routeLayer"
                style={{
                  lineColor: "rgba(0, 0, 255, 0.5)", // Transparent blue
                  lineWidth: 4,
                }}
              />
            </MapboxGL.ShapeSource>
          )}
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
