import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import TabNavigation from "./Navigations/TabNavigation";
import { UserLocationContext } from "./Context/UserLocationContext"; // Import context chính xác

export default function Page() {
  const [location, setLocation] = useState(null); // Khởi tạo state cho location
  const [errorMsg, setErrorMsg] = useState(null); // Khởi tạo state cho errorMsg

  useEffect(() => {
    (async () => {
      // Yêu cầu quyền truy cập vị trí
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
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
    backgroundColor: '#fff',
  }
});
