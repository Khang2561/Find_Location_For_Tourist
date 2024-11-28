import { View, StyleSheet } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailItem from "../PlaceDetail/PlaceDetailItem";
import MapboxView from "../Home/MapboxView";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { fetchDirections } from "../../Services/GlobalApi";

export default function PlaceDetail() {
    const param = useRoute().params;
    const [place, setPlace]= useState([]);
    const { location } = useContext(UserLocationContext);
    const [route, setRoute] = useState(null);

    useEffect(()=>{
        setPlace(param.place)
    },[])

    const handleGetDirections = async () => {
        if (location && place) {
          const routeGeometry = await fetchDirections(
            { longitude: location.longitude, latitude: location.latitude },
            { longitude: place.longitude, latitude: place.latitude }
          );
          if (routeGeometry) {
            setRoute({
              type: "Feature",
              geometry: routeGeometry,
            });
          }
        }
      };

    return (
        <View style={styles.container}>
            <PlaceDetailItem place={place} onGetDirections={handleGetDirections} />
            <MapboxView locations={[place]} route={route}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
    },
});