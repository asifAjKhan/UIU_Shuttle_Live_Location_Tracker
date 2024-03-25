import { 
  View,
  Text, 
  StyleSheet,
  Pressable,
  Button
  } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.navigate('Map')
  }

  return (
    <View style={styles.container}>
      <View style={styles.connectBox}>
         <Pressable style={styles.connectBtn} onPress={handlePress}>
            <Text style={styles.connectText}>Connect</Text>
         </Pressable>
      </View>

      <Button title="getLocation" onPress={() => navigation.navigate('newPage')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    gap : 10

  },

  connectBox : {
      backgroundColor : 'plum',
      height : 200,
      width : 200,
      justifyContent : 'center',
      alignItems : 'center',
      borderRadius : 100,
      //overflow : 'hidden'
      elevation : 10

  },

  connectBtn : {
    borderRadius : 5,
  },

  connectText : {
    color : 'white',
    fontSize : 20,
    fontWeight: 'bold'
  }
})