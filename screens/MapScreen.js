import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

// npx expo install react-native-maps
// npx expo install expo-sharing


//npx expo install expo-file-system

const  locationOfUIU = [
  {
    title: "UIU",
    location: {
      latitude: 23.797905612569373, 
      longitude: 90.44967485591769,
      
    },

    description : "Location of UIU "
  },
];

export default function MapScreen() {

  const { params: location} = useRoute()

  //console.log("Asif's location : ", location)

  const [draggableMarkerCoor, setDraggableMarkerCoor] = useState({
    "latitude": 23.800252988157126,
    "longitude": 90.44866735115647
  })

  const onRegionChange = (region) => {
    //console.log(region);
  };
  const showLocationOfUIU = () => {
    return locationOfUIU.map((item, index) => {
      return (
        <Marker 
          key={index}
          coordinate={item.location}
          title={item.title}
          description={item.description}
        />
      )
    })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 23.798028012899962,
          latitudeDelta: 0.0008512833927092345,
          longitude: 90.44958399608731,
          longitudeDelta: 0.0004268065094947815,
        }}
      >
        {showLocationOfUIU()}
        <Marker 
          draggable
          coordinate={draggableMarkerCoor}
          onDragEnd={(e) => setDraggableMarkerCoor(e.nativeEvent.coordinate)}
          pinColor='#000ff'
        />


        <Marker
          pinColor="blue"
          coordinate={location}
        />
      </MapView>
    </View>
  );
}

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
