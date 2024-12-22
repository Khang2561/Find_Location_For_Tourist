import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { fetchReviews } from "../../Services/UserServices";

export default function Review({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    setLoading(true); // Start loading
    const data = await fetchReviews(placeId);
    setReviews(data); // Update the reviews state
    setLoading(false); // Stop loading
  };

  useEffect(() => {
    loadReviews();
  }, [placeId]);

  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const filledStars = "★".repeat(Math.floor(rating));
    const emptyStars = "☆".repeat(5 - Math.floor(rating));
    return filledStars + emptyStars;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.username}>{item.username || "Anonymous"}</Text>
      <Text style={styles.rating}>
        {renderStars(item.rating || 0)} {/* Display stars */}
      </Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Đánh giá và Nhận xét</Text>

      {/* No Reviews */}
      {reviews.length === 0 ? (
        <View style={styles.noReviews}>
          <Text>Chưa có đánh giá nào về nơi này.</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : index.toString()
          }
          renderItem={renderReviewItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  reviewItem: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    elevation: 1,
  },
  username: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    color: "#FFD700", // Gold color for stars
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    color: "#555",
  },
  noReviews: {
    alignItems: "center",
    marginTop: 20,
  },
});
