import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Header from "../Components/Home/Header";
import MapboxView from "../Components/Home/MapboxView";
import CategoryList from "../Components/Home/CategoryList";
import PlaceList from "../Components/Home/PlaceList";
import { fetchLocations } from "../Services/GlobalApi";
import { UserLocationContext } from "../Context/UserLocationContext";
import { useIsFocused } from "@react-navigation/native";

export default function Home() {
  const { location: userLocation } = useContext(UserLocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused(); // Check if the screen is focused

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedCategory || !userLocation) {
        setLocations([]);
        return;
      }

      setLoading(true); // Start loading
      const fetchedLocations = await fetchLocations(
        selectedCategory,
        userLocation
      );
      setLocations(fetchedLocations);
      setLoading(false); // Stop loading
    };

    fetchLocation();
  }, [selectedCategory, userLocation]);

  const handlePinPress = (location) => {
    if (selectedLocation && selectedLocation.id === location.id) {
      setSelectedLocation(null); // Clear selection if the same pin is clicked again
    } else {
      setSelectedLocation(location); // Highlight the selected location
    }
  };

  const handleSearch = (results) => {
    setLocations(results);
  };

  return (
    <View style={styles.container}>
      <Header onLocationSelect={setSelectedLocation} onSearch={handleSearch} />
      <Text style={styles.title}>Những địa điểm gần đây</Text>
      {isFocused && (
        <MapboxView
          locations={locations}
          loading={loading}
          onPinPress={handlePinPress}
          selectedLocation={selectedLocation} // Pass the selectedLocation
        />
      )}
      <CategoryList onCategorySelect={setSelectedCategory} />
      <PlaceList
        locations={locations}
        selectedLocation={selectedLocation} // Pass the selectedLocation
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  map: {
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});
