import React, { useContext, useRef, useState } from "react";
import MapboxGL from "@rnmapbox/maps";
import { MAPBOX_TOKEN } from "../../Services/GlobalApi";
import { Dimensions, StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { UserLocationContext } from "@/app/Context/UserLocationContext";
import PlaceItem from "../Home/PlaceItem"; 
import { useNavigation } from "@react-navigation/native"; 

MapboxGL.setAccessToken(MAPBOX_TOKEN);

export default function MapboxFullView({ locations = [], loading }) {
  const { location } = useContext(UserLocationContext); // Fetch user location from context
  const cameraRef = useRef(null);
  const [hoveredLocation, setHoveredLocation] = useState(null); // State to track hovered location
  const navigation = useNavigation(); 

  const handleRecenter = () => {
    if (cameraRef.current && location) {
      cameraRef.current.setCamera({
        centerCoordinate: [location.longitude, location.latitude],
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  };

  const handleMapPress = () => {
    setHoveredLocation(null); // Clear hovered location when clicking outside the pin
  };

  const handlePlaceItemPress = () => {
    if (hoveredLocation) {
      navigation.navigate("place-detail", { place: hoveredLocation }); // Navigate to PlaceDetail screen
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
      <MapboxGL.MapView style={styles.mapView} onPress={handleMapPress}>
        {/* Camera to center map on the user's location */}
        <MapboxGL.Camera
          ref={cameraRef}
          centerCoordinate={[location.longitude, location.latitude]}
          zoomLevel={14}
        />

        {/* Display user location */}
        <MapboxGL.UserLocation
          visible={true}
          showsUserHeadingIndicator={true}
        />
        {!loading &&
          locations.map((loc, index) => (
            <MapboxGL.PointAnnotation
              key={`location-${index}`}
              id={`marker-${index}`}
              coordinate={[loc.longitude, loc.latitude]}
              onSelected={() => setHoveredLocation(loc)} // Set hovered location on pin hover
              onDeselected={() => setHoveredLocation(null)} // Clear hovered location on pin deselect
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
      {/* Recenter Button */}
      <TouchableOpacity style={styles.recenterButton} onPress={handleRecenter}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </TouchableOpacity>
      {/* Display PlaceItem when hovering over a pin */}
      {hoveredLocation && (
        <TouchableOpacity style={styles.placeItemContainer} onPress={handlePlaceItemPress}>
          <PlaceItem location={hoveredLocation} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height * 0.7,
    overflow: "hidden",
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
    top: 70,
    right: 20,
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
  placeItemContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    elevation: 5,
  },
});
