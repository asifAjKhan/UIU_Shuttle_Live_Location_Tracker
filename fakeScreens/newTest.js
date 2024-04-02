// import React, { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import MapView from "react-native-maps";
// import * as Location from "expo-location";
// import * as Permissions from "expo-permissions";
// import * as TaskManager from "expo-task-manager";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// const LOCATION_TASK_NAME = "background-location-task";

// const App = () => {
//   const [region, setRegion] = useState(null);
//   const [error, setError] = useState('');

//   const getLocationAsync = async () => {
//     await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//       enableHighAccuracy: true,
//       distanceInterval: 1,
//       timeInterval: 5000
//     });
    
//     const location = await Location.watchPositionAsync(
//       {
//         enableHighAccuracy: true,
//         distanceInterval: 1,
//         timeInterval: 10000
//       },
//       newLocation => {
//         const { coords } = newLocation;
//         const newRegion = {
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//           latitudeDelta: 0.045,
//           longitudeDelta: 0.045
//         };
//         setRegion(newRegion);
//       },
//       error => setError(error)
//     );

//     return location;
//   };

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       const { status } = await Permissions.askAsync(Permissions.LOCATION);
//       if (status === "granted") {
//         getLocationAsync();
//       } else {
//         setError("Location services needed");
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         initialRegion={region}
//         showsCompass={true}
//         showsUserLocation={true}
//         rotateEnabled={true}
//         style={{ flex: 1 }}
//       />
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   }
// });

// export default App;
