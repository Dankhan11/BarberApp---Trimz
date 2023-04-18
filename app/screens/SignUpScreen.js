import react, { useState } from 'react';
import React from 'react';
import { TextInput, ViewBase, StyleSheet,Button, TouchableOpacity, Image, Alert } from 'react-native';
import {View ,Text} from 'react-native'
import ButtonWithBackGround from '../components/button';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';



const RegisterScreen = () => {



    function enterData(){//enter data function used with the onpress of the enter button
        //Validation checking if both passwords match 
        if (password === passwordConfirm){//checking both of the variables
            console.log('password confirmation is correct')
            console.log(typeof password)//checking the datatype of the password is correct
        }else{
            return Seterror('Passwords must be the same')//error returned if password is incorrext
        }

   
        if (error){//if error is true 
          let size = password.length
          if (size < 7){//nested if statement checking the length of the password
            return Seterror('Password is too short')//returning appropriate error
          }
        }else{return Seterror('Details are incorrect')}//if length is correct we return basic error

      
        axios.post("http://localhost:4000/api/user/register",{//post request to register route created in backend
            name,//here is our user input variable
            email,
            password,
        }).then(res =>{
            console.log(res)//creation of new user gets sent to console for testing
            navigation.navigate('Customer')
            if(res.status === 201){//validation checking if creation of new user was successful
                console.log('registration successful')//sending confirmation to the terminal
                navigation.navigate('Customer')//navigating the user to the home screen 
            }
            if(res.status === 404){//common status code when registration unsuccessful
                console.log('registration unsuccessful')

            }
        })
    
    };
    
    function loginNavigate(){//function to go back to login 
      navigation.navigate('Welcome')//Navigating back to login page using navigation hook 
    }

    const navigation = useNavigation()



    //text input states
    const [name, SetUserName] = useState("")//username state
    const [email,SetEmail] =  useState("")//email state
    const [password,SetPassword] =  useState("")//password state
    const [passwordConfirm, SetPasswordConfirm] = useState("")//confirming password state
    //Animation states
    const [box,Setbox ] = useState('')
    const [bounce,Setbounce ] = useState(true)
    //error states 
    const [error,Seterror] = useState('')
    
    const returnToLogin = () => {
        navigation.navigate('Welcome')
    }

    return (

<View style = {styles.background} >
          <LinearGradient style = {styles.gradient}  colors={[ '#00498D','#00498D',]}/> 
            {box ?  
             <View style = {styles.components}>        
              <Animatable.Image 
                          animation = 'bounceInUp' 
                          duration = {3000} style = {styles.image} 
                          source = {require('../assets/reallogo.jpg')}/> 
             </View>:
             
             <View style = {styles.altScreen}> 
               <Image style = {styles.image} source = {require('../assets/reallogo.jpg')}/>
               {/* <Text style = {styles.sloganTxt}>Booking barbers made easy </Text>
               */}
             </View>}

            {/* This displays checking of the bounce variable
            Initiating the overall animation  */}
          { bounce ? <Animatable.View animation = 'fadeInUpBig' style = {styles.footer}> 
            <Text style = {styles.loginTxt}>Sign up enter your details below</Text>
            <View style = {styles.button}>
              {error?
            <Animatable.View animation = 'wobble' duration = {1000} style = {styles.inputContainer}>  
                  <Text style = {{marginTop:15,fontSize:15,color:'#fff',alignSelf:'center'}}>{error}</Text>
              <TextInput 
                      
                      onChangeText = {text =>SetUserName(text)} 
                      value = {name} placeholder = 'Username' 
                      secureTextEntry = {false} style = {styles.input2}/>  
              <TextInput 
                      onChangeText = { text => SetEmail(text)}
                      value = {email} placeholder = 'Email' 
                      style = {styles.input2}/> 
              <TextInput 
                      onChangeText = {text =>SetPassword(text)} 
                      value = {password} placeholder = 'Password' 
                      secureTextEntry = {true} detail
                      style = {styles.input2}/>
             <TextInput 
                      onChangeText = {text =>SetPasswordConfirm(text)} 
                      value = {passwordConfirm} placeholder = ' Confirm Password' 
                      secureTextEntry = {true} 
                      style = {styles.input2}/>
             
                      
                  
            </Animatable.View> 
            :
            <View style = {styles.inputContainer}>
              
          
                
              <TextInput 
                      onChangeText = {text =>SetUserName(text)} 
                      value = {name} placeholder = 'Username' 
                      secureTextEntry = {false} style = {styles.input}/>  
              <TextInput 
                      onChangeText = { text => SetEmail(text)}
                      value = {email} placeholder = 'Email' 
                      style = {styles.input}/> 
              <TextInput 
                      onChangeText = {text =>SetPassword(text)} 
                      value = {password} placeholder = 'Password' 
                      secureTextEntry = {true} 
                      style = {styles.input}/>
            <TextInput 
                      onChangeText = {text =>SetPasswordConfirm(text)} 
                      value = {passwordConfirm} placeholder = ' Confirm Password' 
                      secureTextEntry = {true} 
                      style = {styles.input}/>
            </View>}

            <View style = {{flexDirection:'row' , justifyContent:'space-between' , marginTop:25,}}>
              <TouchableOpacity style = {styles.enterBtn} onPress = {enterData}>
                <Text style = {{color:'#fff'}}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.signup} onPress = {loginNavigate}>
                 <Text style = {styles.signupTxt}>Already have an account Log in</Text>
              </TouchableOpacity>
            </View>
             
         
              
            </View>
          </Animatable.View>
          : 
          <View style = {styles.opacity}>
             <Text style = {styles.description}>Save time by choosing Trimz to book your next appointment</Text>
          <TouchableOpacity style = {styles.signIn} onPress = {()=>{}}>
            <Text style = {styles.BtnTxt}>Get Started</Text>
          </TouchableOpacity>
          </View>}  
          {/* This is the intitial output for the user when no interaction has taken place     
          */}
          
        </View>

      
    )
}


//Obtaining dimensions of the screen to aid with the styling 

export default RegisterScreen
// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.5;

const styles = StyleSheet.create({
    background:{
                
        flex: 2,
        justifyContent: 'flex-start',
        backgroundColor: '#003367',
    },
    image:{      
        resizeMode:"contain",
        width:240,
        height:240,
        borderRadius:300, 
        alignItems:'center',
        marginTop:132, 
    },
    loginButton:{
        alignItems:'center',
        height: 40,
        width:150,
        flexDirection: 'column',
        borderRadius:10,
        backgroundColor : "grey",
        marginTop :'20%',
        color:"white",
        alignItems:'center'
    },
    text:{
        
        fontSize:20,
        marginBottom:0,
        justifyContent:'center',
        color:'white',
        fontWeight:'bold',
        fontFamily:'AppleSDGothicNeo-SemiBold'
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
        borderRadius:10
    },
    footer: {
        flex: 1.5,
        backgroundColor: '#285794',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        paddingVertical: 50,
        paddingHorizontal: 30,
        alignItems:'center'
  },
  components:{
      alignItems:'center',
      flex:2,
      alignItems:'center'
  },
  signIn:{
      width: 250,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 100,
      flexDirection: 'row',
      backgroundColor:'#fff',
      marginTop:90
  }, 
  BtnTxt:{
    color: 'black',
    fontWeight: 'bold',
    fontSize:15,
    
  },
  button:{
    alignItems: 'flex-end',
   
  }, 
  logo:{
    width: 50,
    height: 50
  },
  altScreen:{
    alignItems:'center',
    justifyContent:'center',
    paddingRight:10,
    paddingLeft:10
  }, 
  sloganTxt:{
    color:'#fff',
    fontWeight:'bold',
    justifyContent:'center',
    fontSize:40,
    marginTop:45,
  
  },
  opacity:{
    alignItems:'center',
    justifyContent:'flex-end',
    marginTop:20,
    paddingRight:50,
    paddingLeft:50
  },
  description:{
    color:'#fff',
    fontSize:19,
    

  }, 

  inputContainer:{
    width:300,
    borderColor:'white'



},
input:{
 
  backgroundColor:'#fff',
  paddingHorizontal:15,
  paddingVertical:10,
  borderRadius:5,
  marginTop:20,
  borderColor:'white',
  borderWidth:2,
  

},
loginTxt:{
  color:'#fff',
  fontWeight:'bold',
}, 
enterBtn:{
  backgroundColor:'#00498D',
  borderRadius:10,
  height:30,
  width:60,
  marginTop:0,
  alignItems:'center',
  justifyContent:'center',
  marginRight:15,

}, 
signup:{
  justifyContent:'center',
  alignItems:'center',
  backgroundColor:'#fff',
  height:30,
  width:230, 
  borderRadius:10,

},
signupTxt:{
  fontWeight:'400',
  fontStyle:'italic'
}, 
signUpView:{
  justifyContent:'center',
  alignItems:'center'
},
input2:{
  backgroundColor:'#fff',
  paddingHorizontal:15,
  paddingVertical:10,
  borderRadius:5,
  marginTop:25,
  borderColor:'#a1241b',
  borderWidth:5  
}


    })

