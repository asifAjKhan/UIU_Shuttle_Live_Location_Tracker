import { View, Text , Image, Dimensions, Platform, TouchableOpacity, Pressable} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import {LinearGradient} from 'expo-linear-gradient'


import {styles} from '../theme'
import { useNavigation } from '@react-navigation/native'



var {width, height} = Dimensions.get('window')

const ios = Platform.OS === "ios";
const topMargin = ios? '' : 'mt-3'

const WelcomeScreen = () => {

  const navigation = useNavigation()
  return ( 
    <View className="flex-1 bg-neutral-900"> 

       {/* UIU Background and linear gradient  */}

        <View>
              <Image
                  //source={require('../assets/moviePoster2.jpg')}
                  source={ require('../assets/UIUPhoto.jpg')}
                  style ={{width , height :  height*0.55 }}
              />

              <LinearGradient 
                  colors={['transparent', 'rgba(23,23,23,0.8)' , 'rgba(23,23,23,1)']}
                  style ={{width, height : height*0.4}}
                  start={{x:0.5, y:0}}
                  end={{x:0.5, y : 1}}
                  className="absolute bottom-0"
              />
          </View>

        {/*Bus Icon and title and Reg buttons */}
          <View  style={{marginTop : -200}} className="space-y-3  flex justify-center">
            <Text className="text-white text-center text-3xl font-bold -tracking-wider mb-3">
              UIU Shuttle Tracker 
            </Text>


            <View className="flex ml-20">

              <Image
                source={require('../assets/bus.png')}
                //style ={{width , height :  height*0.1 }}
              />

            </View>

            <View className='flex justify-center items-center' >

              <TouchableOpacity onPress={() => navigation.navigate("SignupDri", {role : "driver"})}  >
                  <Text style={[styles.background, styles.text]} className="p-4 text-center rounded-md mt-10 ml-5 mr-5 w-80 font-extrabold">Register as a Driver</Text>
              </TouchableOpacity >
                <TouchableOpacity onPress={() => navigation.navigate("SignupStu", {role : "student"})}>
                  <Text style={[styles.backgroundTwo, styles.text]}  className="p-4 text-center rounded-md mt-3  ml-5 mr-5 w-80 font-extrabold">Register as a Student</Text>
                </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Login", {role : 'student'})}>
                <Text style={{color : '#ff9900'}} className="text-center mt-3 font-light ">Already have an account? click here </Text>

              </TouchableOpacity>

            </View>
            
          </View>
    

   </View>
  )
}

export default WelcomeScreen