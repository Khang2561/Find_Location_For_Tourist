import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { UserLocationContext } from '@/app/Context/UserLocationContext';

export default function GoogleMapView() {
    //---------------------------------CONST--------------------------------------------------
    const { location } = useContext(UserLocationContext);
    const [mapRegion, setMapRegion] = useState(null); // Khởi tạo state với null

    //--------------------------------FUNCTION----------------------------------------------
    useEffect(() => {
        if (location) {
            setMapRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0522,
                longitudeDelta: 0.0421,
            });
        }
    }, [location]); // Thêm location vào mảng phụ thuộc

    //---------------------------------MAIN-------------------------------------------------
    return (
        <View style={styles.container}>
            {/*---------Title-------- */}
            <Text style={styles.title}>
                Những địa điểm gần bạn 
            </Text>
            {/*----------Map-------*/}
            {mapRegion && ( 
                // Kiểm tra mapRegion trước khi render MapView
                <MapView
                    style={styles.mapView}
                    provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    region={mapRegion}
                >
                    {/*Mũi tên màu đỏ định vị địa danh*/}
                    <Marker
                        title='You'
                        coordinate={mapRegion}
                    />
                </MapView>
               
            )}
        </View>
    );
}

//--------------------------------CSS-------------------------------------
const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center', // Căn giữa theo chiều ngang
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: '600',
        textAlign: 'center', // Căn giữa tiêu đề
    },
    mapView: {
        width: Dimensions.get('screen').width * 0.9,
        height: Dimensions.get('screen').height * 0.25,
        borderRadius: 20,
    },
});
