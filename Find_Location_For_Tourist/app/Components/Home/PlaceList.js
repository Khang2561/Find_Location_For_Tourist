import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import PlaceItem from "../../Components/Home/PlaceItem";
import { useNavigation } from "@react-navigation/native";

export default function PlaceList({ locations }) {
  const [data, setData] = useState([]); // State to hold the data
  const [page, setPage] = useState(1); // State to track the current page
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [hasMore, setHasMore] = useState(true); // State to track if more data is available
  const navigator = useNavigation();

  // Fetch data based on the current page
  const fetchData = async (pageNumber) => {
    if (!locations || !locations.length) return;

    setLoading(true);
    const pageSize = 10; // Number of items to load per page
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Load the new data slice
    const newItems = locations.slice(startIndex, endIndex);
    setData((prevData) => [...prevData, ...newItems]);

    // Check if we've reached the end
    if (newItems.length < pageSize) {
      setHasMore(false);
    }

    setLoading(false);
  };

  // Load initial data
  useEffect(() => {
    setData([]); // Clear previous data
    setHasMore(true); // Reset the flag
    setPage(1); // Reset the page counter
    fetchData(1); // Fetch the first page
  }, [locations]);

  // Load more data when the user scrolls to the end
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  // Render footer component for the loading indicator
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <ActivityIndicator
        size="small"
        color="#000"
        style={styles.loadingIndicator}
      />
    );
  };

  if (!data.length && !loading) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No locations available.</Text>
      </View>
    );
  }

  const onPlaceClick = (item) => {
    navigator.navigate('place-detail', {place:item});
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPlaceClick(item)}>
          {<PlaceItem location={item} />}
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
  loadingIndicator: {
    marginVertical: 20,
  },
});
