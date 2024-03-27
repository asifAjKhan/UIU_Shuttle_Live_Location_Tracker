import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpStudentScreen from '../screens/SignUpStudentScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignUpDriverScreen from '../screens/SignUpDriverScreen';

const Stack =  createNativeStackNavigator() 
 

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="welcome"  options={{headerShown : false}} component={WelcomeScreen} />
        <Stack.Screen name="Login"  options={{headerShown : false}}  component={LoginScreen} />
        <Stack.Screen name="SignupStu" options={{headerShown : false}} component={SignUpStudentScreen} />
        <Stack.Screen name="SignupDri" options={{headerShown : false}} component={SignUpDriverScreen} />
        <Stack.Screen name ="Home"  options={{headerShown : false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;