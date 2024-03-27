import 
{ View, 
  Text, 
  StyleSheet, 
  StatusBar,
  SafeAreaView,
  Platform, 
  Image, 
  TextInput ,
  TouchableOpacity,
  ScrollView

}
 from 'react-native'
import React, { useState } from 'react'

import {styles} from '../theme'
import { useNavigation } from '@react-navigation/native';




const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-10'

const SignUpDriverScreen = () => {

  const navigation = useNavigation()
  return (
    <ScrollView style={style.container}>

      {/* Status bar design */}
      <StatusBar
              animated={true}
              backgroundColor="transparent"
              //barStyle="dark-content" 
              barStyle="light-content"
              translucent={true} 
              //color = "white"
            // barStyle={}
            // showHideTransition={statusBarTransition}
            // hidden={hidden}
      />

      <SafeAreaView className={""+topMargin}>

        <View className="bg-neutral-800 rounded-2xl mt-1 shadow-lg " >
          <Text className="text-white font-bold p-5 ml-2 text-xl">Driver Register</Text>
        </View>

      </SafeAreaView>

      {/* Driver logo Image  */}

      <View className="flex justify-center">

        <View className="ml-28 mt-20 mb-10">
          <Image
            source={require('../assets/logo_driver.png')}
          />
        </View>

        <View className="space-y-3">
            <TextInput
              style={{ height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#ff9900',
                marginBottom: 10,
                color : 'white',

              
              }}

              className="font-semibold ml-5 mr-5 text-lg "
              placeholder='Driver Name'
              placeholderTextColor="#999"
            />

            <TextInput
              style={{ height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#ff9900',
                marginBottom: 10,
                color : 'white',

              
              }}

              className="font-semibold ml-5 mr-5 text-lg "
              placeholder='Bus Number'
              placeholderTextColor="#999"
            />

            <TextInput
              style={{ height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#ff9900',
                marginBottom: 10,
                color : 'white',

              
              }}

              className="font-semibold ml-5 mr-5 text-lg "
              placeholder='Email'
              placeholderTextColor="#999"
              keyboardType="email-address" 
            />

            <TextInput
              style={{ height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#ff9900',
                marginBottom: 10,
                color : 'white',

              
              }}

              className="font-semibold ml-5 mr-5 text-lg "
              placeholder='Password'
              placeholderTextColor="#999"
              secureTextEntry 
            />


            <TouchableOpacity className="mt-9" >
              <Text style={[styles.background, styles.text]}  className="p-4 text-center rounded-md mt-3  ml-5 mr-5 w-80 font-extrabold">Register</Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={{color : '#ff9900'}} className="text-center mt-3 font-light ">Already have an account? click here </Text>

              </TouchableOpacity>

        </View>




      </View>

      


     
              
    </ScrollView>
  )
}

export default SignUpDriverScreen


const style = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "#3D3535",
    //display : 'flex',
    flexDirection : 'column',
    gap : 3,
    //alignContent : 'center'
   // alignItems : 'center',
   // justifyContent : 'center'
   // backgroundColor : "white",

  }
})