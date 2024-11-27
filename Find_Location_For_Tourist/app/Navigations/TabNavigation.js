import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fav from "../Screens/Fav";
import Search from "../Screens/Search";
import Profile from "../Screens/Profile";
import Entypo from "react-native-vector-icons/Entypo"; // Sử dụng đúng thư viện icon
import HomeNavigation from "./HomeNavigation";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Tab Home */}
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Tab Search */}
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="magnifying-glass" color={color} size={size} />
          ),
        }}
      />

      {/* Tab Fav */}
      <Tab.Screen
        name="Fav"
        component={Fav}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" color={color} size={size} />
          ),
        }}
      />

      {/* Tab Profile */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
