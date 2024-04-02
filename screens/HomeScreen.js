import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Platform, TouchableOpacity, Alert} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Bars3BottomRightIcon, MapPinIcon } from "react-native-heroicons/solid";
import { Bars3BottomLeftIcon } from "react-native-heroicons/solid";
import * as Location from 'expo-location'
import { useEffect } from "react";


import { SafeAreaView } from "react-native-safe-area-context";



const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-3'


const LOCATION_DISTANCE_THRESHOLD = 1;



const HomeScreen = () => {

  //const [location, setLocation] = useState({})

// const [connectButton, setConnectButton] = useState(false)

 const [errmsg, setErrMsg] = useState("");
 const [userLat, setUserLat] = useState(null);
 const [userLong, setUserLong] = useState(null)

 useEffect(() => {

  

    let subscription : Location.Subscription | null = null;

    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted") {
        Alert.alert("Permission to access location was denied")
        return;
      }


      subscription = await Location.watchPositionAsync(
        {
          accuracy : Location.Accuracy.High,
          distanceInterval : LOCATION_DISTANCE_THRESHOLD
        },
        (location) => {
          const {coords} = location;
          const {latitude, longitude} = coords;

          console.log("userLatitude" , latitude)
          console.log("userLongitude", longitude)

          setUserLat(latitude)
          setUserLong(longitude)
        }
      );
    })()




  return () => {
      if(subscription){
        subscription.remove()
      }

  }
 }, [])

 




//   useEffect(() => {
//     const getLocation = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           console.error("Permission to access location was denied");
//           return;
//         }

//         Location.watchPositionAsync(
//           { accuracy: Location.Accuracy.High, timeInterval: 3000 },
//           (newLocation) => {
//             const { latitude, longitude } = newLocation.coords;
//             setLocation({ latitude, longitude });
//           }
//         );
//       } catch (error) {
//         console.error('Error fetching location:', error);
//       }
//     };

//     getLocation();

//     console.log(location)
//   }, []);

  
//  console.log(location)











  // const [region, setRegion] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   const getLocation = async () => {
  //     try {
  //       const { status } = await Location.requestForegroundPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //         return;
  //       }

  //       setInterval(async () => {
  //         const location = await Location.getCurrentPositionAsync({});
  //         const { coords } = location;
  //         // const newRegion = {
  //         //   latitude: coords.latitude,
  //         //   longitude: coords.longitude,
  //         //   latitudeDelta: 0.01,
  //         //   longitudeDelta: 0.01
  //         // };
  //        // setRegion(newRegion);
  //         setLocation(coords)
  //       }, 3000);
  //     } catch (error) {
  //       console.error('Error fetching location:', error);
  //       setErrorMsg("Error fetching location");
  //     }
  //   };

  //   getLocation();
  // }, []);



//   const getPermissions = async () => {
//     let {status} = await Location.requestForegroundPermissionsAsync();
//     if(status !== 'granted') {
//         console.log("Please grant location permissions")
//         return;
//     }


//     //  let currentLocation = await Location.getCurrentPositionAsync({})
//     //  setLocation(currentLocation)

//     // setInterval( async () => {

//     //   currentLocation = await Location.getCurrentPositionAsync({})
//     //   setLocation(currentLocation)

//     // }, 1000)

//          let locationSubscription = await Location.watchPositionAsync(
//             { accuracy: Location.Accuracy.High, timeInterval: 3000 },
//             newLocation => {
//               setLocation(newLocation);
//              // sendLocationToServer(newLocation.coords.latitude, newLocation.coords.longitude);
//             }
//           );
   

   

//   }


 

 // console.log(location)

//  //console.log("Asif"+location.coords.longitude)
//  //console.log("Asif"+location.coords.latitude)

//  //console.log(" Asif : " + location.coords.latitude)

 
    
//   //location && console.log(location)

  



  

//   const handleLocationPress = () => {
//     getPermissions();

//   }

 

  
  

  return (
    <View style={styles.container}>

     

        <View style={styles.topBoxColor} className="rounded-2xl   flex-row  items-center  ml-2 shadow-lg w-80 mt-3 absolute top-10 z-20 " >
          <TouchableOpacity className="ml-3 rounded-lg p-2 bg-black" onPress={() => setConnectButton(prev => !prev)} >
            {/* <Bars3BottomLeftIcon color="white"/> */}
            <MapPinIcon color="white" />

          </TouchableOpacity>
          <Text className="text-white font-bold p-5 ml-2 text-xl">Shuttle Location</Text>

        </View>

    

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

         { userLat && <Marker
            coordinate={{
              latitude : userLat,
              longitude : userLong
            }}
            title="You are here"
           // draggable
            //onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
          />}


        
     
       
       
        
      </MapView>


    <View>

    </View>




  </View>
  );
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3D3535",
   // alignItems: "center",
   // justifyContent: "center",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  topBoxColor : {
    backgroundColor: 'rgba( 255, 153, 0, 0.5)'
  }
});