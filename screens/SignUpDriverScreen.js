
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
import React, { useEffect, useState } from 'react'

import {styles} from '../theme'
import { useNavigation , useRoute} from '@react-navigation/native';
//import router from '../../ShuttleServer/routeHandler/driverLocationHandler';

import axios from 'axios'




const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-10'

const SignUpDriverScreen = () => {

  const navigation = useNavigation()

  const {params : role} = useRoute()


  const [name, setName] = useState('');
  const [email, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async () => {
      try {
        const response = await axios.post(`http://10.10.250.63:3000/auth/register`, {
          role,
          name,
          email,
          password
        });
        console.log('Form submitted successfully:', response.data);

        navigation.navigate('Login', {role : 'driver'})
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

  
    


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
              value={name}
              onChangeText={text => setName(text)}
            />
          
          {/* <TextInput
              style={{ height: 40,
                borderBottomWidth: 1,
                borderBottomColor: '#ff9900',
                marginBottom: 10,
                color : 'white',

              
              }}

              className="font-semibold ml-5 mr-5 text-lg "
              placeholder='Bus Number'
              placeholderTextColor="#999"
            /> */}

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

              value={email}
              onChangeText={text => setEmailOrPhone(text)}
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

              value={password}
              onChangeText={text => setPassword(text)}
              
            />


            <TouchableOpacity className="mt-9" onPress={handleFormSubmit} >
              <Text style={[styles.background, styles.text]}  className="p-4 text-center rounded-md mt-3  ml-5 mr-5 w-80 font-extrabold">Register</Text>
            </TouchableOpacity>



            <TouchableOpacity onPress={() => navigation.navigate("Login", {role : "driver"})}>
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