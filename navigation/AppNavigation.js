import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack =  createNativeStackNavigator() 
 

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"  options={{headerShown : false}} component={WelcomeScreen} />
        <Stack.Screen name="Login"  options={{headerShown : false}}  component={LoginScreen} />
        <Stack.Screen name="Signup" options={{headerShown : false}} component={SignUpScreen} />
        <Stack.Screen name ="Welcome"  options={{headerShown : false}} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;