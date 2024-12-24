import { StyleSheet, View, FlatList } from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailItem from "../PlaceDetail/PlaceDetailItem";
import MapboxView from "../Home/MapboxView";
import Review from "../PlaceDetail/Review";
import ReviewForm from "../PlaceDetail/ReviewForm";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { fetchDirections } from "../../Services/GlobalApi";
import {
  addToFavorites,
  isLocationFavorited,
  removeFromFavorites,
} from "@/app/Services/UserServices";
import { getLoggedInUser } from "@/app/Services/AuthUtils";

export default function PlaceDetail() {
  const param = useRoute().params;
  const [place, setPlace] = useState([]);
  const { location } = useContext(UserLocationContext);
  const [route, setRoute] = useState(null);
  const [refreshReviews, setRefreshReviews] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const flatListRef = useRef(null); // Ref for FlatList

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
        if (success) {
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

  const onScrollToReviews = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: 1, animated: true }); // Scroll to the second item
    }
  };

  const renderItem = ({ item, index }) => {
    if (index === 0) {
      return (
        <PlaceDetailItem
          place={place}
          onGetDirections={handleGetDirections}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          onScrollToReviews={onScrollToReviews} // Pass the scroll handler
        />
      );
    } else {
      return (
        <View>
          <Review placeId={param.place.id} key={refreshReviews} />
          <ReviewForm placeId={param.place.id} onReviewAdded={handleReviewAdded} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={[1, 2]} // Two items: details and reviews
        renderItem={renderItem}
        keyExtractor={(item, index) => `place-detail-${index}`}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.mapContainer}>
        <MapboxView locations={[place]} route={route} onPinPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    height: 260,
    padding: 20,
  },
  contentContainer: {
    padding: 20,
  },
});
