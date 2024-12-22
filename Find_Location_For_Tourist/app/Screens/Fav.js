import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Text } from "react-native";
import PlaceItem from "../Components/Home/PlaceItem";
import { fetchFavorites } from "../Services/UserServices";
import { getLoggedInUser } from "../Services/AuthUtils";
import { useNavigation } from "@react-navigation/native";

export default function Fav() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  const fetchUserFavorites = async () => {
    setLoading(true);
    const user = await getLoggedInUser();
    if (user) {
      const data = await fetchFavorites(user.id);
      setFavorites(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Chưa có nơi yêu thích.</Text>
      </View>
    );
  }

  const handlePlaceClick = (place) => {
    navigation.navigate("place-detail", { place });
  };

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePlaceClick(item)}>
          <PlaceItem location={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 10,
  },
});
