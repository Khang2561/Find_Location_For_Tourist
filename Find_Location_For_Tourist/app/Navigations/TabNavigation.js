import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fav from "../Screens/Fav";
import Profile from "../Screens/Profile";
import Entypo from "react-native-vector-icons/Entypo"; 
import HomeNavigation from "./HomeNavigation";
import {isLoggedIn, onAuthStateChange} from "../Services/AuthUtils";

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async ()=> {
      const status = await isLoggedIn();
      setLoggedIn(status);
    };
    
    checkLoginStatus();
    const unsubscribe = onAuthStateChange((status) => {
      setLoggedIn(status);
    });

    return () => {
      unsubscribe();
    }
  }, []);

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

      {/* Tab Fav */}
      {loggedIn && (<Tab.Screen
        name="Fav"
        component={Fav}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="heart" color={color} size={size} />
          ),
        }}
      />
)}
      
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
