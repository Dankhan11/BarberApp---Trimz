import { StyleSheet, Text, View ,TextInput, Button, TouchableOpacity,ScrollView} from 'react-native'
import React , {useState, useEffect} from 'react'


const Chat = ({socket,username,room}) => {

    const [curretnMessage, setCurrentMessage] = useState('')
    const [messageList , SetMessageList] = useState([])
    const sendMessage =  async ()=>{
        if (curretnMessage !== ''){
            const messageData  = {
                room: room,
                message: curretnMessage,
                time: new Date(Date.now()).getHours()
                      + ':' +
                      new Date(Date.now()).getMinutes()

            };
            //emit socket message and send data through it 
            await socket.emit('send_message',messageData)
            SetMessageList((list)=>[...list,messageData])
            setCurrentMessage('')
            
        }
    }



    //listen whenever there are changes to our socket
    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            SetMessageList((list)=>[...list,data])
        })
    },[socket])

  return (
    <View style = {styles.chatContainer}>
        <View>
            <ScrollView>
          
                {messageList.map((messageContent,index)=>{
                    return(
    
                <Text key = {index}>{messageContent.message}</Text>
                )
                })}
            </ScrollView>
         </View>
        <View>

        </View>
        <View style = {styles.view}>
          <TextInput
                placeholder = 'Send message here' 
                style = {styles.input}
                value = {curretnMessage} 
                onChangeText = {curretnMessage=> setCurrentMessage(curretnMessage)}/>
                <TouchableOpacity onPress = {sendMessage} style = {styles.button}>
                    <Text style = {styles.text}>Message</Text>
                </TouchableOpacity>
    
        </View>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    input:{
        width:200,
        height:75,
        borderWidth:2,
        borderColor:'black',
        
        
    },
    view:{
        alignItems:"center",
        justifyContent:'center',
        flexDirection:"row",
        marginTop:500,
    },
    button:{
        borderRadius:20,
        borderWidth:2,
        borderColor:'red',
        width:100,
        height:50,
        justifyContent:'center'
    },
    text:{
        color:'blue',
        fontSize:15,
        alignSelf:'center'

    },
    chatContainer:{
        borderWidth:2,
    borderColor:'blue',
    borderRadius:20,
    height:250,
    marginTop:50
    }
})