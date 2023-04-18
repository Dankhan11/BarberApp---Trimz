import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect } from 'react';
import{BrowserRouter as Router , Switch, Route, Link} from "react-router-dom";
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import SignUpScreen from './app/screens/SignUpScreen'
import ClientScreen from './app/screens/ClientScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
import CustomerScreen from './app/screens/CustomerScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Booking from './app/screens/Booking';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {

  
  return ( 
        <NavigationContainer>
          
          <Stack.Navigator>
    
            <Stack.Screen name="Welcome" component={WelcomeScreen} options = {{headerShown: false}} />
            <Stack.Screen  name="Login" component={LoginScreen} options = {{headerShown: false}} />
            <Stack.Screen name = "SignUp"component = {SignUpScreen} options = {{headerShown: false}}/>
            <Stack.Screen name = "Client" component = {ClientScreen} options = {{headerShown: false}}/>
            <Stack.Screen name = "Customer" component = {Booking} options = {{headerShown:false}} />
 
          </Stack.Navigator>
          
      

        </NavigationContainer>



   )
  
}
























//import ButtonCont from './app/components/button';
//import Customer from './app/screens/CustomerScreen';
//const history = createBrowserHistory({ forceRefresh :true});
 
//These components allow us to represent our code in an abstract way 