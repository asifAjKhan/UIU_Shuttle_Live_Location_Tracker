import {LOCALHOST} from '@env'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import 
{ View,
   Text, 
   TextInput, 
   Button, Alert, 
   StyleSheet, 
   ImageBackground ,
   Dimensions,
   ScrollView,
   TouchableOpacity,
   Pressable
  
  } from 'react-native';

  import {MapPinIcon} from 'react-native-heroicons/solid'



  var {width, height} = Dimensions.get('window')


const LoginScreen = ({route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  const {role} = route.params

  //console.log(role)


  const handlePasswordChange = (text) => {
    setPassword(text)
  }

  const handleEmailChange = (text) => {
    setEmail(text)
  }

  const handleLogin = async () => {

    try{
      const logInResponse = await axios.post(`http://${LOCALHOST}:3000/auth/login`,{role,email,password})
      
      console.log("LogIn successfully", logInResponse.data.others);

      navigation.navigate("Home", {role : role, userData : logInResponse.data.others})
      

    }catch(err){
      console.error('Error submitting form:', err);
    }
  };




  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image background  */}

      <ImageBackground
        source={require('../assets/UIUPhoto.jpg')}
        style={{height : height*0.46, width : width}}
      >

        <View style={styles.topHeader}>
           <MapPinIcon color='#ff9900' size={80} />
           <Text style={styles.topHeaderText}>UIU Shuttle Tracker</Text>
        </View>




      </ImageBackground>


      {/* Main input container */}

      <View style={styles.mainContainer}>
         <View style={styles.mainContainerHeader}>
            <Text style={styles.headerText} className="text-xl font-bold ">Welcome To Shuttle Tracker</Text>
            <TouchableOpacity>
              <Text className=" from-neutral-600 font-light">Don't have an account? <Text className="text-red-700">register now</Text></Text>
            </TouchableOpacity>
         </View>

          {/* Input and button */}


        <View style={styles.inputBox}>
            <Text className="text-base font-light text-neutral-400 ">Email Or Phone</Text>

            <TextInput 
              style={styles.Input} 
              placeholder="asif@gmail.com" 
              keyboardType="email-address" 
              //className="mt-3 mb-3"

              onChangeText={handleEmailChange}
              value={email}
              
            />

            <Text className="text-base font-light text-neutral-400">Password</Text>

            <TextInput 
              style={styles.Input} 
              placeholder="****"
              secureTextEntry 
              onChangeText={handlePasswordChange}
              value={password}
             
            />


            <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
               <Text className="text-white font-bold">LOG IN</Text>
            </TouchableOpacity>
        </View>



      </View>


      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#3D3535',
     // Background color
  },

  topHeader : {
    //flex : 1,
    //justifyContent : 'center',
    marginTop : 50,
    alignItems : 'center'
  },

  topHeaderText : {
    color : "#ffffff",
    fontSize : 30,
    fontWeight : 'bold'
  },

  mainContainer : {
    backgroundColor : "#ffffff",
    flex :1.5,
    padding : 40,
    justifyContent : 'center',
   // padding : 50,
    marginTop : -30,
    borderTopStartRadius : 45,
    borderTopEndRadius : 45,
  },

  headerText : {
    color : '#ff9900',
    
  },

  inputBox : {
    marginTop : 50,
    justifyContent : 'center',

  },

  Input : {

    // paddingBottom : 10,
   //  paddingLeft : 10,
   //  marginTop: 100,
     paddingTop : 15,
     paddingBottom : 15,
     fontSize : 14,
     fontWeight : '100',
     borderBottomWidth : 1,
     borderColor : '#ff9900',
     marginBottom : 20,
     width : 300
     
     //Input

     //className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
   },


   logInButton : {
    // padding : 10,
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

export default LoginScreen;
