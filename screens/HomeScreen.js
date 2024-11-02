import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import 
{ StyleSheet,
   Text,
    View,
     Platform,
      TouchableOpacity,
       Alert,
       DrawerLayoutAndroid,
       ImageBackground,
       Image
      
} from "react-native";

import {IP_ADDRESS_OF_NETWORK} from '@env'

import MapView, { Marker } from "react-native-maps";
import { ArrowLeftIcon, Bars3BottomRightIcon, MapPinIcon, UserGroupIcon } from "react-native-heroicons/solid";
import { Bars3BottomLeftIcon } from "react-native-heroicons/solid";
import * as Location from 'expo-location'
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

import { useNavigation} from '@react-navigation/native';





const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-3'
const LOCATION_DISTANCE_THRESHOLD = 1;



const HomeScreen = ({route}) => {

  const {role, userData} = route.params

  const navigation = useNavigation()

  //console.log("From Home User : " + userData._id)
  

  //console.log("My role is "+role)

 const [errmsg, setErrMsg] = useState("");
 const [location, setLocation] = useState({});

 const [driverLocations, setDriverLocations] = useState([])
 const [driverLocationID, setDrvierLocationID] = useState("")

// const [drTitle, setDrTitle] = useState("")

 const [address, setAddress] = useState("")


 
      // for getting location permission and the location condinate of the user or driver
      useEffect(() => {

        let subscription = null;

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
               
                setLocation(coords)


                
              }
            );
          })()

          return () => {
              if(subscription){
                subscription.remove()
              }
          }
  
      }, [])


    // For posting the current location of the driver 
    // Your cureent location 



    useEffect( () => {

      async function postLoc () {
        if(role == 'driver'){
          const postLocation = await axios.post(`http://${IP_ADDRESS_OF_NETWORK}:3000/d_location/`, {
            driver_id : userData._id,
            latitude : location.latitude ,
            longitude : location.longitude 
          })
          .then((res) => {
              console.log("Location post successful")
             // console.log(res.data)
              //Set Location Table Id

              setDrvierLocationID(res.data.location._id)
              console.log("Driver_Location_id : " + res.data.location._id)

             // console.log("Location table id : " + res.data.location._id)

          })
          .catch((err) => {
            console.log("Location didnt post successfully something went wrong "+err)
          })
   
        }

      }

      postLoc();
      
      
   }, [role])





   // For getting all the driverLocation arr from the database 
   useEffect(() => {

    const getAllTheDriverLocation = async () => {
      try{

        const getAllDriverLocation = await axios.get(`http://${IP_ADDRESS_OF_NETWORK}:3000/d_location/all`)
        //console.log(getAllDriverLocation.data)
        setDriverLocations(getAllDriverLocation.data)
        

      }catch(err){
        console.log(err)
      }
    }

    getAllTheDriverLocation()


    // Set up polling to fetch data every 5 seconds
    const intervalId = setInterval(getAllTheDriverLocation, 3000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);

  }, [])









     // For continously updating the value of latitude and longitude of the driver
    //  Update location Post continously


      useEffect(  () => {

        async function update(){
          try{
            const postLocation = await axios.put(`http://${IP_ADDRESS_OF_NETWORK}:3000/d_location/`, {
            _id : driverLocationID,
            latitude :  location.latitude,
            longitude :   location.longitude
            })

            console.log(postLocation.data)

            // Set Post Location _id





          }catch(err){
            console.log(err)
          }

      }
      if(role=="driver"){
        update()

      }

      },[location])


      //LogOut Handler 


      const handleLogOut = async () => {

          if(role=="driver"){
            await axios.delete(`http://${IP_ADDRESS_OF_NETWORK}:3000/d_location/${driverLocationID}`)
              .then((data) => {
                console.log(data)
                

              })
              .catch((err) => {
                  console.log(err)
              })

          }

          navigation.navigate("welcome");
            
          
        

      }









 //If the role is "Drvier" i have to store the coords to the database
 // and update the data base with current data 
 // if the user close or logout there delete the coords from the database
 // if the role is "Student" i have to fetch the driverLocation Data from the server

  // console.log(location)







      //Drawer Machernisom


    const [drawerOpen, setDrawerOpen] = useState(false);

    const openDrawer = () => {
      drawerRef.openDrawer();
      setDrawerOpen(true);
    };

    const closeDrawer = () => {
      drawerRef.closeDrawer();
      setDrawerOpen(false);
    };

    let drawerRef;


    //console.log("My Locatin : " , location.latitude , location.latitude , location.altitude, location.accuracy )

    //get Driver Info by Id

    const onMarkerPress = async (ind) => {

      
      const reverseGeoCodeAddress = await Location.reverseGeocodeAsync({
        latitude : location.latitude,
        longitude : location.longitude
      })

      setAddress(reverseGeoCodeAddress[0].formattedAddress)
      // await axios.get(`http://192.168.0.101:3000/driver/${driver_id}`)
      // .then((res) => {
      //   setDrTitle(res.data.name)
      // })
      // .catch((err) => {
      //   console.log(err)
      // })
    }

 


  return (
    <View style={styles.container}>

        <DrawerLayoutAndroid
          ref={ref => (drawerRef = ref)}
          drawerWidth={300}
          drawerPosition="left"
          renderNavigationView={() => (
            <View style={styles.drawer} className="justify-between">
             
                <ImageBackground
                  source={require("../assets/UIUPhoto.jpg")}
                  style={{height : 300, width : 300 }}
                >
                  <View className="justify-center mt-40 ml-8">

                    {role == "driver" && <Image 
                       source={require("../assets/logo_driver.png")} 
                       style = {{height : 80, width : 80}}
                    />}

                    {role == "student" && <Image 
                       source={require("../assets/StudentIcon.png")} 
                       style = {{height : 80, width : 80}}
                    />}


                    <Text className="text-white font-bold text-lg">{userData.name}</Text>
                    <Text className="font-light text-gray-200">{userData.email}</Text>

                  </View>

                </ImageBackground>

                <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut} className=" flex-row justify-center items-center mb-12 p-3 ml-3">
                   <ArrowLeftIcon color="white" size={20} />
                  <Text className=" text-white font-bold ml-3">LOGOUT</Text>
                </TouchableOpacity>
              

            </View>
          )}
            
            
        >

          <View style={styles.topBoxColor} className="rounded-2xl   flex-row  items-center  ml-2 shadow-lg w-80 mt-3 absolute top-10 z-20 " >
            <TouchableOpacity className="ml-3 rounded-lg p-2 bg-black"  onPress={openDrawer} >
              <Bars3BottomLeftIcon color="white"/> 
              {/* <MapPinIcon color="white" /> */}

            </TouchableOpacity>
            <Text className="text-white font-bold p-5 ml-2 text-xl">{address}</Text>

          </View>


          {location.latitude && <MapView
            style={styles.map}
          // onRegionChange={onRegionChange}
            initialRegion={{
            latitude: location.latitude ? location.latitude : 23.798028012899962,
            longitude:location.longitude ? location.longitude : 90.44958399608731,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421,
          }}
          >



            { location.latitude && role != 'driver' && <Marker
                coordinate={{
                  latitude : location.latitude,
                  longitude : location.longitude
                }}
                title={userData.name}
              
                
              
              />}

              {
              driverLocations && driverLocations.map((driver, ind) => (
                    <Marker 
                      key={ind}
                      coordinate={{
                        latitude : driver.latitude ? parseFloat(driver.latitude)  : 0,
                        longitude : driver.longitude ?  parseFloat(driver.longitude) : 0
                      }}

                      image={require("../assets/busIcon.png")}
                      onPress={(e) => onMarkerPress(ind)}
                      title= {"Driver"}
                      
                     

                    
                    />
                ))
              }

              


          </MapView>}


        <View>

        </View>

      </DrawerLayoutAndroid>

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
  },


  // for Drawer exp
  hamburger: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#ddd',
    //padding: 20,
    //marginTop : 30
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 10,
  },


  logOutButton : {
    backgroundColor : '#ff9900',
     elevation : 5,
     justifyContent : 'center',
     alignItems : 'center',
     marginLeft : 26,
     width : 250,
     paddingTop : 14,
     paddingBottom : 14,
     borderRadius : 40,
     marginBottom : 40
     

  }
});