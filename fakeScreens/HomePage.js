import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from 'react';
import * as Location from 'expo-location'

const HomePage = () => {

        const [location, setLocation] = useState(null);
        //const [draggableMarkerCoor, setDraggableMarkerCoor] = useState(location)

        useEffect(() => {
            // Request permission and get initial location
            (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            })();

            // Set up location listener for continuous updates
            const locationSubscription = Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 9000, distanceInterval: 10 },
            (newLocation) => {
                setLocation(newLocation);
            }
            );

            return () => {
            // Clean up the location listener when the component unmounts
           // locationSubscription.remove();
            };
        }, [location]);

       //console.log(location)




  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
       // onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 23.798028012899962,
          latitudeDelta: 0.0008512833927092345,
          longitude: 90.44958399608731,
          longitudeDelta: 0.0004268065094947815,
        }}
      >

        {location && <Marker
         // pinColor="blue"
         
         coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}

          onDragEnd={(e) => set(e.nativeEvent.coordinate)}

          title='Updating location'
        />}

       
        
       
      </MapView>
    </View>
  )
}

export default HomePage


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  
    map: {
      width: "100%",
      height: "100%",
    },
  });
  