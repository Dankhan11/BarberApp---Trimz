import React, { useState  } from 'react';
import { Text,StyleSheet,View, Pressable, Image ,Button, SafeAreaView, TouchableHighlight , Alert, TextInput , KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import ButtonWithBackGround from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const axios = require("axios")

const MasterLogin = ('DK9120')
const MasterPassword = ('b4rb3rmAn')

function LoginScreen(){
    
    const navigation = useNavigation()

   
    const [email,SetEmail] = useState()
    const [password,SetPassword]= useState()
    const [error,SetError] = useState()
    const [userName, SetUserName] = useState()

function handleRegisterPress(){
    navigation.navigate('SignUp')
}

function requestFromServer(){
    if (!email || !password || !userName ) return SetError('Must fill in all fields ')
    


//checks if email or password is not there through the use of or and not gates




    axios.post("http://localhost:4000/api/signin",{
        email,password,userName
    }).then(res=>{
        console.log(res)
        if(res.status === 200){
            console.log('hello it works')
            navigation.navigate('Customer')
        }
    })
}



   


    return (


        <KeyboardAvoidingView behavior = 'padding' style = {styles.container}>
             <LinearGradient style = {styles.gradient}  colors={['#ebedd5', '#6a6b48']}/>  
            <Image style = {styles.Image} source = {require('../assets/logo.png')}/>
            <Text style = {styles.Text}>Enter details below to Login</Text>
                <View style = {styles.inputContainer}>  
                    <TextInput  onChangeText = {text =>SetUserName(text)} value = {userName} placeholder = 'Username' secureTextEntry = {false} style = {styles.input}/>  
                    <TextInput onChangeText = { text => SetEmail(text)} value = {email} placeholder = 'Email' style = {styles.input}/> 
                    <TextInput onChangeText = {text =>SetPassword(text)} value = {password} placeholder = 'Password' secureTextEntry = {true} style = {styles.input}/>     
                </View> 
            <View style = {styles.buttonContainer}>
        {/* Condition to check if user is signed in 
            If the user is signed in will display Sign Out button */}

{/*                     
        {isSignedIn === true?
        <Button title = 'Sign out' onPress = {signOutUser}/>
        
        :
        <Button style = {[styles.buttonOutline,styles.button]} title = 'Sign in' onPress = {signInUser} />}
      
 */}
        { error?
        <Text>{error}</Text>
        
        :
        <Text></Text>
        }


        <TouchableOpacity style = {[styles.registerButton,styles.buttonOutline]} onPress = {handleRegisterPress}>
            <Text style = {styles.buttonOutlineText}> Register Now</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {requestFromServer} style = {[styles.button,styles.buttonOutline]} >
            <Text style = {styles.buttonOutlineText}>Login</Text> 
        </TouchableOpacity> 
        </View>
        </KeyboardAvoidingView>
    )
}   

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent:'center',

    },

    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        alignItems:'center'
        

    },
    inputContainer:{
        width:'80%',
        justifyContent:'center',


    },

    button:{
        backgroundColor:'#6a6b48',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems: 'center',
    },
    buttonOutline:{
        backgroundColor:'#6a6b48',
        marginTop:5,
        borderColor:'#808000',
        borderWidth:2,

    },
    buttonContainer:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,

    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,

    },
    buttonOutlineText:{
        color:'white',
        fontWeight:'700',
        fontSize:16,

    },
    Image:{
        resizeMode:"contain",
            width:'50%',
            height:'25%',
            borderRadius:300,
            alignItems:'center',
            

    },
    Text:{
        fontWeight:'bold',
        fontSize:19,
        marginBottom:20,
        justifyContent:'flex-start'
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
    },
    registerButton:{
        backgroundColor:'#0b8793',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems: 'center',
    }

    })

