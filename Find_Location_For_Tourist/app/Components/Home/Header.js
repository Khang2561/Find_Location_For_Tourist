import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import { Portal } from "react-native-paper"; // Import Portal
import { searchLocations } from "../../Services/GlobalApi";

export default function Header({ onLocationSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);

    if (text.trim() === "") {
      setSuggestions([]);
      return;
    }

    const data = await searchLocations(text);
    setSuggestions(data);
  };

  const handleSelect = (location) => {
    setQuery(location.title);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handleSelect(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/images/logo.jpg")} style={styles.logo} />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Điền vào nơi mà bạn muốn đến"
          style={styles.search}
          value={query}
          onChangeText={handleSearch}
        />
      </View>
      <Image source={require("../../../assets/images/logo.jpg")} style={styles.userImage} />

      {/* Render the suggestions in a Portal */}
      <Portal>
        {query.trim() !== "" && suggestions.length > 0 && (
          <View style={styles.suggestionsOverlay}>
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          </View>
        )}
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logo: { width: 40, height: 40 },
  searchContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "black",
    padding: 6,
    borderRadius: 30,
    paddingLeft: 15,
  },
  suggestionsOverlay: {
    position: "absolute",
    top: 60, // Adjust based on your design
    left: 40, // Align with the search bar
    width: Dimensions.get("screen").width * 0.8,
    backgroundColor: "white",
    borderRadius: 5,
    elevation: 5, // Add shadow
    zIndex: 1000, // Ensure it's above all other components
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  userImage: { width: 40, height: 40, borderRadius: 20 },
});
