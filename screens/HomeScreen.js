import { useRoute } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, Platform, TouchableOpacity} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { Bars3BottomRightIcon } from "react-native-heroicons/solid";
import { Bars3BottomLeftIcon } from "react-native-heroicons/solid";





import { SafeAreaView } from "react-native-safe-area-context";



const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-3'



const HomeScreen = () => {
  

  

  
  

  return (
    <View style={styles.container}>

     

        <View style={styles.topBoxColor} className="rounded-2xl   flex-row  items-center  ml-2 shadow-lg w-80 mt-3 absolute top-10 z-20 " >
          <TouchableOpacity className="ml-3 rounded-lg p-2 bg-black" >
            <Bars3BottomLeftIcon color="white"/>

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