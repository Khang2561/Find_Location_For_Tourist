import React from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import Home from "../Screens/Home";
import PlaceDetail from "../Components/PlaceDetail/PlaceDetail";

export default function HomeNavigation() {
  const Stack = createStackNavigator();
  const isAndroid=true;

  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled:true,
        headerShown:false,
        ...(isAndroid&&TransitionPresets.ModalPresentationIOS)
    }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="place-detail"
        component={PlaceDetail}
        screenOptions={{ presentation: "modal" }}
        options={{
            headerShown: true, 
            headerTitle: "", 
            headerBackTitleVisible: false, 
          }}
      />
    </Stack.Navigator>
  );
}
