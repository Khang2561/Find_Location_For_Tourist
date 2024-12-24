import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MapboxFullView from "../Components/Search/MapboxFullView";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SearchCategoryList from "../Components/Search/SearchCategoryList";
import { fetchLocations, searchLocations } from "../Services/GlobalApi";
import { UserLocationContext } from "../Context/UserLocationContext";

export default function Search() {
  const { location: userLocation } = useContext(UserLocationContext);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      if (!selectedCategory || !userLocation) {
        setLocations([]);
        return;
      }

      setLoading(true); // Start loading
      const fetchedLocations = await fetchLocations(
        selectedCategory,
        userLocation
      );
      setLocations(fetchedLocations);
      setLoading(false); // Stop loading
    };

    fetchLocation();
  }, [selectedCategory, userLocation]);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.trim() === "") {
      setLocations([]);
      return;
    }

    setLoading(true); // Start loading
    const searchResults = await searchLocations(text);
    setLocations(searchResults);
    setLoading(false); // Stop loading
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <LinearGradient
          colors={["#FFFFFF", "rgba(255, 255, 255, 0.5)", "transparent"]}
          style={styles.gradientWrapper}
        >
          <View style={styles.searchHeader}>
            {/* Back Button */}
            <TouchableOpacity
              onPress={() => navigation.goBack()} // Navigate back to home
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={24}
                color="gray"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchBar}
                placeholder="Tìm kiếm địa điểm.."
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>
          </View>
        </LinearGradient>
      </View>
      <MapboxFullView locations={locations} loading={loading} />
      <SearchCategoryList onCategorySelect={setSelectedCategory} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    alignItems: "center",
  },
  gradientWrapper: {
    width: Dimensions.get("screen").width,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 10,
    width: "90%",
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
});
