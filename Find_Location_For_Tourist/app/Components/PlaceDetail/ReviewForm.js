import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons"; // For star icons
import { addReview } from "../../Services/UserServices";
import { getLoggedInUser } from "../../Services/AuthUtils";

export default function ReviewForm({ placeId, onReviewAdded }) {
  const [rating, setRating] = useState(0); // Star-based rating
  const [comment, setComment] = useState("");

  // Function to handle star press
  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = async () => {
    const user = await getLoggedInUser();
    if (!user) {
      alert("Bạn phải đăng nhập để đánh giá và nhận xét!");
      return;
    }
    if (!rating) {
      alert("Hãy đánh giá.");
      return;
    }
  
    const result = await addReview(placeId, user.id, rating, comment);
    if (result?.error) {
      alert(result.error);
    } else {
      alert("Đã thêm đánh giá thành công!");
      onReviewAdded();
      setRating(0);
      setComment("");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Đánh giá:</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <AntDesign
              name={star <= rating ? "star" : "staro"} // Filled or outlined star
              size={30}
              color="gold"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nhận xét:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={comment}
        onChangeText={setComment}
        placeholder="Nhập nhận xét của bạn tại đây."
      />
      <Button title="Đánh giá" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  star: {
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
  },
});
