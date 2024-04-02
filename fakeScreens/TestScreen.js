// import React, { useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import * as Location from 'expo-location';
// import axios from 'axios';

// const LocationTracker = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [tracking, setTracking] = useState(false);

//   const startLocationTracking = async () => {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       setErrorMsg('Permission to access location was denied');
//       return;
//     }

//     let locationSubscription = await Location.watchPositionAsync(
//       { accuracy: Location.Accuracy.High, timeInterval: 3000 },
//       newLocation => {
//         setLocation(newLocation);
//         sendLocationToServer(newLocation.coords.latitude, newLocation.coords.longitude);
//       }
//     );

//     setTracking(true);
//   };

//   const stopLocationTracking = () => {
//     // Stop location tracking
//     setTracking(false);
//     setLocation(null); // Clear location
//   };

//   const sendLocationToServer = async (latitude, longitude) => {
//     try {
//       const response = await axios.post('https://your-server-url.com/location', {
//         latitude,
//         longitude,
//       });
//       if (!response.data.success) {
//         throw new Error('Failed to send location to server');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <View>
//       <Button
//         title={tracking ? 'Stop Tracking' : 'Start Tracking'}
//         onPress={tracking ? stopLocationTracking : startLocationTracking}
//       />
//       {errorMsg ? (
//         <Text>{errorMsg}</Text>
//       ) : location ? (
//         <Text>
//           Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
//         </Text>
//       ) : (
//         <Text>No location data</Text>
//       )}
//     </View>
//   );
// };

// export default LocationTracker;
