import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../Components/Home/Header";
import MapboxView from "../Components/Home/MapboxView";
import CategoryList from "../Components/Home/CategoryList";
import PlaceList from "../Components/Home/PlaceList";
import { fetchLocations } from "../Services/GlobalApi";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedCategory) {
        setLocations([]);
        return;
      }

      setLoading(true); // Start loading
      const fetchedLocations = await fetchLocations(selectedCategory);
      setLocations(fetchedLocations);
      setLoading(false); // Stop loading
    };

    fetchLocation();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Header />
      <MapboxView locations={locations} loading={loading} />
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
