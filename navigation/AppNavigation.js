import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen'
import NewPage from '../screens/NewPage'
import HomePage from '../screens/HomePage';

const Stack =  createNativeStackNavigator() 
 

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home"  options={{headerShown : false}} component={HomePage} />
        <Stack.Screen name="Home"  component={HomeScreen} />
        <Stack.Screen name="Map" options={{headerShown : false}} component={MapScreen} />
        <Stack.Screen name ="newPage" component={NewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;