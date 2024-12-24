import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import SearchCategoryItem from "../../Components/Search/SearchCategoryItem";

export default function SearchCategoryList({ onCategorySelect, selectedCategory }) {
  const CategoryList = [
    {
      id: 1,
      name: "Cà phê",
      value: "coffeeshop",
      icon: require("./../../../assets/images/coffee-cup.png"),
    },
    {
      id: 2,
      name: "Nhà hàng",
      value: "restaurant",
      icon: require("./../../../assets/images/restaurant-icon.png"),
    },
    {
      id: 3,
      name: "Khách sạn",
      value: "hotel",
      icon: require("./../../../assets/images/hotel-icon.jpg"),
    },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
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
            <SearchCategoryItem category={item} />
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
    alignItems: "center", // Căn giữa toàn bộ container
    width: "100%"
  },
  flatListContent: {
    alignItems: "center", // Căn giữa các phần tử trong FlatList
  },
  itemContainer: {
    marginHorizontal: 0
  },
});
