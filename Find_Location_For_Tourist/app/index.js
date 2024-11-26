import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import TabNavigation from "./Navigations/TabNavigation";
import { UserLocationContext } from "./Context/UserLocationContext";

export default function Page() {
  const [location, setLocation] = useState(null); // User location state
  const [errorMsg, setErrorMsg] = useState(null); // Error message state

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords); // Save only `coords` object
    })();
  }, []);

  return (
    <View style={styles.container}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <NavigationContainer independent={true}>
          <TabNavigation />
        </NavigationContainer>
      </UserLocationContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
