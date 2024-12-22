import { StyleSheet, FlatList, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailItem from "../PlaceDetail/PlaceDetailItem";
import MapboxView from "../Home/MapboxView";
import Review from "../PlaceDetail/Review";
import ReviewForm from "../PlaceDetail/ReviewForm";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { fetchDirections } from "../../Services/GlobalApi";
import { addToFavorites, isLocationFavorited, removeFromFavorites } from "@/app/Services/UserServices";
import { getLoggedInUser } from "@/app/Services/AuthUtils";

export default function PlaceDetail() {
  const param = useRoute().params;
  const [place, setPlace] = useState([]);
  const { location } = useContext(UserLocationContext);
  const [route, setRoute] = useState(null);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true); // Manage FlatList scroll
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (param.place) setPlace(param.place);
    checkIfFavorite();
  }, [param]);

  const handleGetDirections = async () => {
    if (location && place.longitude && place.latitude) {
      const routeGeometry = await fetchDirections(
        { longitude: location.longitude, latitude: location.latitude },
        { longitude: place.longitude, latitude: place.latitude }
      );
      if (routeGeometry) {
        setRoute({
          type: "Feature",
          geometry: routeGeometry,
        });
      }
    }
  };

  const checkIfFavorite = async () => {
    try {
      const user = await getLoggedInUser();
      if (!user) return;

      const favoriteStatus = await isLocationFavorited(user.id, param.place.id);
      setIsFavorite(favoriteStatus);
    } catch (error) {
      console.error("Error checking favorite status:", error.message);
    }
  };

  const toggleFavorite = async () => {
    try {
      const user = await getLoggedInUser();
      if (!user) return;
  
      // Optimistically update the UI
      setIsFavorite((prev) => !prev);
  
      if (isFavorite) {
        const success = await removeFromFavorites(user.id, param.place.id);
        if (!success) {
          // Revert the UI if the operation fails
          setIsFavorite((prev) => !prev);
        }
      } else {
        const success = await addToFavorites(user.id, param.place.id);
        if (!success) {
          // Revert the UI if the operation fails
          setIsFavorite((prev) => !prev);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error.message);
      // Revert the UI in case of an error
      setIsFavorite((prev) => !prev);
    }
  };

  const handleReviewAdded = () => {
    setRefreshReviews((prev) => !prev);
  };

  const renderContent = () => (
    <View>
      <PlaceDetailItem
        place={place}
        onGetDirections={handleGetDirections}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <View
        style={styles.mapContainer}
        onTouchStart={() => setScrollEnabled(false)} // Disable FlatList scroll
        onTouchEnd={() => setScrollEnabled(true)} // Enable FlatList scroll
      >
        <MapboxView locations={[place]} route={route} />
      </View>
      <Review placeId={param.place.id} key={refreshReviews} />
      <ReviewForm placeId={param.place.id} onReviewAdded={handleReviewAdded} />
    </View>
  );

  return (
    <FlatList
      data={[1]}
      renderItem={renderContent}
      keyExtractor={() => "place-detail"}
      contentContainerStyle={styles.container}
      scrollEnabled={scrollEnabled} // Control FlatList scroll
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  mapContainer: {
    height: 300, // Set appropriate height for MapView
    marginBottom: 20,
  },
});
