import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import CategoryItem from "../../Components/Home/CategoryItem";

export default function CategoryList({ onCategorySelect, selectedCategory }) {
  const CategoryList = [
    {
      id: 1,
      name: "Coffee",
      value: "coffeeshop",
      icon: require("./../../../assets/images/coffee-cup.png"),
    },
    {
      id: 2,
      name: "Restaurants",
      value: "restaurant",
      icon: require("./../../../assets/images/restaurant-icon.png"),
    },
    {
      id: 3,
      name: "Hotel",
      value: "hotel",
      icon: require("./../../../assets/images/hotel-icon.jpg"),
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.title}>Chọn loại cửa hàng</Text>
      <FlatList
        data={CategoryList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onCategorySelect(item.value)}
            style={[
              styles.itemContainer,
              item.value === selectedCategory && styles.selectedItem,
            ]}
          >
            <CategoryItem category={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent} // Canh giữa FlatList
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center", // Căn giữa toàn bộ container
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  flatListContent: {
    alignItems: "center", // Căn giữa các phần tử trong FlatList
  },
  itemContainer: {
    marginHorizontal: 10, // Cung cấp không gian giữa các mục
  },
});
