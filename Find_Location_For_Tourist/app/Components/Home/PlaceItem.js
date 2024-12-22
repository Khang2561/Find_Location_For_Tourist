import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const PlaceItem = React.memo(({ location }) => {
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>No location data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={
          location.imageUrl
            ? { uri: location.imageUrl }
            : require("../../../assets/images/logo.jpg") // Replace with your fallback image
        }
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{location.title || "Không có tên"}</Text>
        <Text style={styles.address}>{location.address || "Địa chỉ không được cung cấp"}</Text>
        <View style={styles.rating}>
          <AntDesign name="star" size={20} color="yellow" />
          <Text>{location.totalScore || "Không có đánh giá"}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  rating: {
    fontSize: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },
});

export default PlaceItem;