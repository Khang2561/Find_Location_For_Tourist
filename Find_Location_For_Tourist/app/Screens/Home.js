import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../Components/Home/Header';
import GoogleMapView from '../Components/Home/GoogleMapView';
import CategoryList from '../Components/Home/CategoryList';
import { SafeAreaView } from 'react-native-safe-area-context';
import nearByPlace from '../../app/Services/GlobalApi';

export default function Home() {
  // State to store nearby places data
  const [places, setPlaces] = useState([]);

  // Coordinates for testing (e.g., Times Square in New York)
  const latitude = 40.7580;
  const longitude = -73.9855;

  // Function to fetch nearby places
  const getNearbyPlaces = async () => {
    try {
      const results = await nearByPlace(latitude, longitude);
      setPlaces(results); // Update state with API response
      console.log("Nearby Places:", results); // Log results to console
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  // Call the function when the component mounts
  useEffect(() => {
    getNearbyPlaces();
  }, []);

  // Log places data whenever it updates
  useEffect(() => {
    console.log("Updated places:", places);
  }, [places]);

  return (
    <View style={styles.container}>
      <Header />
      {/* Hiển thị map */}
      <GoogleMapView style={styles.map} />
      {/* Hiển thị loại */}
      <CategoryList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  map: {
    borderRadius: 20,
  }
});
