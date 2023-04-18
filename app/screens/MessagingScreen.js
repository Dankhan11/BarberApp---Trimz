import {  StyleSheet,View, Text,TextInput, Button,TouchableOpacity, ScrollView ,TouchableHighlight} from 'react-native'
import React , {useState} from 'react'
import Chat from '../components/Chat'
import {io} from 'socket.io-client'
import { Ionicons } from '@expo/vector-icons'
import BarberSlider from '../components/barberSlider'
import Message from '../components/Message'
//io function that we can call to get an individual socket 

  

const socket = io('http://localhost:3000')//connecting to the server

const MessagingScreen = () => {




socket.on('receive-message',(chatMessage)=>{ 
  SetChatMessages([...chatMessages,chatMessage])
})


  socket.on('connect', ()=>{
    SetChatMessages([...chatMessages,socket.id])
    socket.emit('send-message',chatMessage)
   
  })//event that will run every time a connection happens

//states are shown below each for a differnt component 
  const [chatMessage,SetchatMessage] = useState('')//empty string storing user input
  const [chatMessages,SetChatMessages] = useState([])//empty array storing messages sent
  const[room,SetRoomId] = useState('')//State for room id
  const [showChat, SetshowChat] = useState(true)//boolean to show chat room
  const [mahek, Setmahek] = useState([])//variable of usefulness
  const [receivedMessage, SetreceivedMessage] = useState([])//empty array 


  socket.on("chat message", msg=>{//listener for event of chat message
    SetChatMessages([...chatMessages,msg])//Adding the msg element onto the array
  })
  function submitChatMessage(){
    socket.emit("chat message", chatMessage )//submit an event to ther server
    SetchatMessage('')
  }

const joinRoom = ()=>{
  if ( room !== ""){//if field is not left blank will carry out this function
    socket.emit('join-room',room, chatMessage =>{
      handleAdd(chatMessage)
     
    })//emits join room event  
    SetshowChat(true)
  }
}


  const handleAdd = ()=>{//function used on button press 
    SetChatMessages([...chatMessages,chatMessage])//appends new message to array
    socket.emit('send-message',chatMessage,room)//emmitting send message event 
    SetchatMessage('')
  }

  // const messages  = chatMessages.map(chatMessage => <Text key = {chatMessage.id}>{chatMessage.value}</Text>)//for each chat message text element returned
  return (

    <View style = {styles.container}>
      {!showChat ?
      <View>
        <View style = {styles.boxView}>
        <TouchableOpacity style = {styles.box}>
            <Ionicons name = 'person-circle-outline' size = {75} color = '#00498D'/>
            <View style = {{flexDirection:'column' }}>
      
              <Text style = {styles.Text}>Hi my name is </Text>
              <Text style = {styles.Text}>Experience for </Text>
              <Text style = {styles.Text}>We will give you the best haircut</Text>
              <Text style = {styles.Text}>                                                     </Text>
            </View>
            <TouchableOpacity onpress = {joinRoom}style = {{justifyContent:'flex-end',marginLeft:20}}>
              <Ionicons name = 'mail-open-outline' size = {60} color = '#00498D'/>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.box}>
            <Ionicons name = 'person-circle-outline' size = {75} color = '#00498D'/>
            <View style = {{flexDirection:'column' }}>
      
              <Text style = {styles.Text}>Hi my name is </Text>
              <Text style = {styles.Text}>Experience for </Text>
              <Text style = {styles.Text}>We will give you the best haircut</Text>
              <Text style = {styles.Text}>                                                     </Text>
            </View>
            <TouchableOpacity onpress = {joinRoom}style = {{justifyContent:'flex-end',marginLeft:20}}>
              <Ionicons name = 'mail-open-outline' size = {60} color = '#00498D'/>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.box}>
            <Ionicons name = 'person-circle-outline' size = {75} color = '#00498D'/>
            <View style = {{flexDirection:'column' }}>
              <Text style = {styles.Text}>Hi my name is </Text>
              <Text style = {styles.Text}>Experience for </Text>
              <Text style = {styles.Text}>We will give you the best haircut</Text>
              <Text style = {styles.Text}>                                                     </Text>
            </View>
            <TouchableOpacity onpress = {joinRoom}style = {{justifyContent:'flex-end',marginLeft:20}}>
              <Ionicons name = 'mail-open-outline' size = {60} color = '#00498D'/>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>    
        <View style = {{alignItems:'center',marginTop:25}}>
            <Text style = {{color:'white'}}>Enter Room Name</Text>
            <Text style = {{color:'white'}}>Then select the Barber to message</Text>
              <TextInput  style = {styles.input}
                          value = {room}
                          placeholder = 'Join room '
                          autoCorrect = {false}
                          onChangeText={room=>SetRoomId(room)}/>
          </View>
        </View>
        
              :
        <View style = {{}}> 
                 
                 <ScrollView style = {styles.chatContainer}>
              {
            chatMessages.map((item, index)=>{
                return (
                  <TouchableHighlight key = {index} style ={styles.messageTxt}>
                      <Text style = {{color:'white',marginLeft:10}} key = {index}>{item}
                      </Text>
                  </TouchableHighlight>)
                })
              }
           

            </ScrollView>
            <View style = {{flexDirection:'row',alignItems:'center'}}>
            <TextInput
               value = {chatMessage}
               style = {styles.input}
               autoCorrect = {false}
               placeholder = 'Send...'
               onChangeText={chatMessage=>SetchatMessage(chatMessage)}
              />

           <TouchableOpacity onPress = {handleAdd} style = {styles.sendBtn}>
              <Text style = {{color:'white'}}>Send</Text>
           </TouchableOpacity>
           </View>
      </View>
      
}
    </View>
   
  )
}

export default MessagingScreen 


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#00498D'
  },
  input:{
    height:50,
    borderWidth:5,
    width:'80%',
    alignSelf:'center',
    borderRadius:10,
    borderColor:'white',
    marginTop:20,
    backgroundColor:'white'
  },
  chatContainer:{
    borderWidth:2,
    borderColor:'blue',
    borderRadius:20,
    height:'80%',
    marginTop:50,
    backgroundColor:'white'
  },
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
  },
  //styling for the message component 
  messageTxt:{
    backgroundColor:'#285794',
    marginTop:5,
    height:40,
    justifyContent:'center'
  },
  sendBtn:{
    backgroundColor:'#285794',
    height:50,
    width:75,
    marginTop:20,
    marginLeft:10,
    borderRadius:10,
    justifyContent:"center",
    alignItems:'center',
    marginRight:10
  },

})

