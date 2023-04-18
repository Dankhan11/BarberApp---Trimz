import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {  NavigationContainerRefContext, useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const BarberSlider = ({name}) => {
  
const navigation = useNavigation()//useNavigation hook being used 
function bookNavigate(){
  navigation.navigate('Book Now')//function to navigate to the booking screen
}
function messageNavigate(){
  navigation.navigate('Messages')
}

  return (
    <View style = {styles.view}>
          <TouchableOpacity style = {styles.opacity}>
            <Image style = {styles.image} source = {require('../assets/reallogo.jpg')}/>
            <Text style = {{alignSelf:'center' , fontSize:25,fontWeight:'bold',color:'#fff'}}>{name}</Text>
            <View style ={styles.view2}>  
              <TouchableOpacity style = {styles.opacity2} onPress= {bookNavigate}>
                <Ionicons name = 'bookmarks-outline' size = {30}/>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.opacity3} onPress= {messageNavigate}>
                <Ionicons name = 'mail-unread-outline' size = {34}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
      </View>
  )
}

export default BarberSlider

const styles = StyleSheet.create({

    opacity:{
        marginTop:30,
        backgroundColor:'#3167bd',
        width:400, 
        height:250,
        borderRadius:50,
       
        margin:10
    },
    image:{
        resizeMode:'contain',
        width:450,
        height:140,
        alignSelf:'center'
        
    },
    text:{
        color:'#fff', 
        fontFamily:'AppleSDGothicNeo-SemiBold',
        fontWeight:'bold'
    },
    opacity2:{
      justifyContent:'center',     
      marginLeft:20,
      marginRight:20,
      marginBottom:10,
      paddingLeft:20,
      paddingRight:20,
      backgroundColor:'#97bcf7',
      width:110,
      height:45,
      borderRadius:100,
      alignItems:'center'
    },

    view:{
        alignItems:'center', 
        flexDirection:'row'
    },
    view2:{
        flexDirection:'row',
        padding:10,
        
    },
    opacity3:{
      marginLeft:110,
      backgroundColor:'#97bcf7',
      marginBottom:10,
      borderRadius:100,
      width:110,
      height:45,
      alignItems:'center',
      justifyContent:'space-evenly',    
    }

    
})