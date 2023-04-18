import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')//connecting to the server

const Message = (props) => {



const joinRoom = ()=>{
    if ( room !== ""){//if field is not left blank will carry out this function
      socket.emit('join-room',room, chatMessage =>{
        handleAdd(chatMessage)
      })//emits join room event  
    }
  }
  

  return (
    <TouchableOpacity style = {styles.box}>
    <Ionicons name = 'person-circle-outline' size = {75} color = '#00498D'/>
    <View style = {{flexDirection:'column' }}>
      
      <Text style = {styles.Text}>Hi my name is {props.name}</Text>
      <Text style = {styles.Text}>Experience for {props.experience}</Text>
      <Text style = {styles.Text}>We will give you the best haircut</Text>
      <Text style = {styles.Text}>                                                     </Text>

    </View>
    <TouchableOpacity onpress = {joinRoom}style = {{justifyContent:'flex-end',marginLeft:20}}>
      <Ionicons name = 'mail-open-outline' size = {60} color = '#00498D'/>
    </TouchableOpacity>
  </TouchableOpacity>
  )
}

export default Message

const styles = StyleSheet.create({
    box:{
        width:'100%',
        height:170,
        borderColor:'white',
        borderWidth:2,
        padding:5,
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:'white'
      },
      boxView:{
        flexDirection:'column',
        marginTop:20,
        marginLeft:15,
        marginRight:15
      },
      Text:{
          color:'#00498D'
      }
})