import { View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlaceDetailItem from "../PlaceDetail/PlaceDetailItem";
import MapboxView from "../Home/MapboxView";

export default function PlaceDetail() {
    const param=useRoute().params;
    const [place, setPlace]=useState([]);

    useEffect(()=>{
        setPlace(param.place)
    },[])

    return (
        <View style={styles.container}>
            <PlaceDetailItem place={place}/>
            <MapboxView locations={[place]}/>
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