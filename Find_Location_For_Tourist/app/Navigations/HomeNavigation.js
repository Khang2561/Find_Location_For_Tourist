import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";
import Search from "../Screens/Search";

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  const isAndroid = true;

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        ...(isAndroid && TransitionPresets.ModalPresentationIOS),
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="place-detail"
        component={PlaceDetail}
        options={{
          presentation: "modal",
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="search-full-screen"
        component={Search}
        options={{
          presentation: "fullScreenModal",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}