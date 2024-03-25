import { View, Text , Button} from 'react-native'
import React, { useEffect, useState } from 'react'

import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native';

export default function NewPage() {

    const navigation = useNavigation()

    const [location, setLocation]  = useState({
      "latitude": 23.800252988157126,
      "longitude": 90.44866735115647
    });

    useEffect(() => {

        const getPermissions = async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                console.log("Please grant location permissions")
                return;
            }


             let currentLocation = await Location.getCurrentPositionAsync({})
             setLocation(currentLocation)

            // setInterval( async () => {

            //   currentLocation = await Location.getCurrentPositionAsync({})
            //   setLocation(currentLocation)

            // }, 1000)
           

            console.log("Location : " )
            console.log(currentLocation)
        }

        getPermissions()


    },[])

    
    
  return (
    <View>
      <Button title="Show my location " onPress={() => navigation.navigate('Map', location.coords)}/>
    </View>
  )
}