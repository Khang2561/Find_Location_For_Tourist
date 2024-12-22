import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Components/Home/Header";
import MapboxView from "../Components/Home/MapboxView";
import CategoryList from "../Components/Home/CategoryList";
import PlaceList from "../Components/Home/PlaceList";
import { fetchLocations } from "../Services/GlobalApi";
import { UserLocationContext } from "../Context/UserLocationContext";

export default function Home() {
  const { location: userLocation } = useContext(UserLocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedCategory || !userLocation) {
        setLocations([]);
        return;
      }

      setLoading(true); // Start loading
      const fetchedLocations = await fetchLocations(selectedCategory, userLocation);
      setLocations(fetchedLocations);
      setLoading(false); // Stop loading
    };

    fetchLocation();
  }, [selectedCategory, userLocation]);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setLocations([location]); // Only show the selected location
  };

  const handlePinPress = (location) => {
    setSelectedLocation(location);
    setLocations([location]); // Only show the selected location
  };

  const handleSearch = (results) => {
    setLocations(results);
  };

  return (
    <View style={styles.container}>
      <Header onLocationSelect={handleLocationSelect} onSearch={handleSearch} />
      <MapboxView locations={locations} loading={loading} onPinPress={handlePinPress} />
      <CategoryList onCategorySelect={setSelectedCategory} />
      <PlaceList locations={locations} />
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
});