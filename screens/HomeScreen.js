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
import axios from "axios";



const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-3'
const LOCATION_DISTANCE_THRESHOLD = 1;



const HomeScreen = ({route}) => {

  const {role} = route.params

  console.log("My role is "+role)

 const [errmsg, setErrMsg] = useState("");
 const [location, setLocation] = useState();

 const [driverLocations, setDriverLocations] = useState([])

      useEffect(() => {

        if(role != "student"){
          
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
                console.log(location)
                setLocation(coords)
              }
            );
          })()

          return () => {
              if(subscription){
                subscription.remove()
              }

          }


        }else{
          (async () => {

            try{
              const getAllDriverLocation = await axios.get("http://localhost:3000/d_location/all")

              if(getAllDriverLocation){
                setDriverLocations(getAllDriverLocation.data)
                console.log(getAllDriverLocation.data)
              }

            }catch(err){
              console.log(err)
            }

          })()
        }
        
          
 }, [])

   


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

         { location && <Marker
            coordinate={{
              latitude : location.latitude,
              longitude : location.longitude
            }}
            title="You are here"
           
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

  },

  map: {
    width: "100%",
    height: "100%",
  },

  topBoxColor : {
    backgroundColor: 'rgba( 255, 153, 0, 0.5)'
  }
});