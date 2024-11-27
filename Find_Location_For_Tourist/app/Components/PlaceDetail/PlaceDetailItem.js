import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function PlaceDetail({ place }) {
  return (
    <View>
      <Text style={styles.title}>{place.title}</Text>
      <View style={styles.score}>
        <AntDesign name="star" size={20} color={"yellow"} />
        <Text>{place.totalScore || "Không có đánh giá."}</Text>
      </View>
      <Image
        source={
          place.imageUrl
            ? { uri: place.imageUrl }
            : require("../../../assets/images/logo.jpg") // Replace with your fallback image
        }
        style={styles.image}
      />
      <Text style={styles.address} numberOfLines={2}>
        {place.address}
      </Text>
      <View style={styles.action}>
        <View style={styles.actionButton}>
          <Ionicons name="navigate-circle-outline" size={24} color={"black"} />
          <Text style={{ fontSize: 16, fontFamily: "raleway" }}>Hướng đi</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color={"black"} />
          <Text style={{ fontSize: 16, fontFamily: "raleway" }}>Chia sẻ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  score: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
    flexDirection: "row",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 15,
    marginTop: 10,
  },
  address: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
  action: {
    marginTop: 10,
    flexDirection: 'row',
    display: "flex",
    gap: 10,
  },
  actionButton: {
    direction: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f0f0f0",
    width: 110,
    padding: 3,
    borderRadius: 40,
    justifyContent: "center",
  },
});