import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Text, SafeAreaView , StyleSheet, Image, TouchableOpacity,Button, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Booking from './Booking';




function CustomerScreen(){


const navigation = useNavigation()



function logOut(){
    axios.get('http://localhost:4000/api/signout',{
        
    }).then(res=>{
        console.log(res)
        navigation.navigate('Welcome')
        
    })
}




    return(
        <SafeAreaView style = {styles.view}>
             <LinearGradient style = {styles.gradient}  colors={['#ebedd5', '#ebedd5']}/>
            <Text>WELCOME TO THE CUSTOMER SCREEN </Text>
            <Button title = 'sign out' onPress = {logOut} style = {styles.button}/>
            
        </SafeAreaView>
    );
}

export default CustomerScreen;











const styles = StyleSheet.create({
    image:{
        resizeMode:"contain",
            width:'90%',
            height:'45%',
            borderRadius:300, 
            alignItems:'center',
        
    },
    view:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    button:{
        backgroundColor:'#A8A39F',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems: 'center',
    },
    gradient:{
        position:'absolute',
        left: 0,
        right: 0,
        top:0,
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})