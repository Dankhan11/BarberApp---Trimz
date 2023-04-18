import React from 'react';
import {  StyleSheet,View, Pressable, Image ,Button, SafeAreaView, Text,TouchableHighlight , Alert, Dimensions, TouchableOpacity, Platform,TextInput} from 'react-native';
import ButtonWithBackGround from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated from 'react-native-reanimated';
import { TapGestureHandler ,State } from 'react-native-gesture-handler';
import {AppLoading} from 'expo'
import * as Animatable from 'react-native-animatable';
import { useState } from 'react/cjs/react.development';
const axios = require("axios")





//Beginning of our welcome screen 
const WelcomeScreen = () =>{

  function requestFromServer(){
    //ensures all fields have been filled in 
    //Returns an error otherwise 
    if (!name && !password && !email ){ 
      return SetError('Must fill in Login information')
    }else if (!password) {//check if password is false
      return SetError('Must fill in Login information')//returns appropriate error message
    }else if (!name){ //checking if username has been entered
      return SetError('Please enter your username')//returns appropriate error message
    }else if( !email){//checking if email has been entered 
      return SetError('Please enter your email')//returns appropriate error message
    }

 
  

    
    //Sends a post request , referencing the one made in the backend
    axios.post("http://localhost:4000/api/user/login",{
      //taking these values below as input
        email,password,name
    },{
      withCredentials:true,
    }).then(res=>{
      //output result and message declaring that it is working correctly 
        // console.log(res)
        if(res.status === 200){
            console.log('hello it works')
            navigation.navigate('Customer')
        }
    })
  }

  //Navigation function for getStarted button 
  function goToSignUp(){
    navigation.navigate('SignUp')
    }
  //States for our login Functionality  
  const [email,SetEmail] = useState()//Email input state
  const [password,SetPassword]= useState()//password input state
  const [error,SetError] = useState()//Error state
  const [name, Setname] = useState()//Username state


  //States for our animation
  //Box dictates the animation of the slide up 
  const [box,Setbox] = useState(false);
  //bounce dictates the image animaiton
  const [bounce,Setbounce] = useState(false);
  //Use Navigation hook implemented here to make it simpler to navigate
  const navigation = useNavigation();
  //function that declares the setbox state as true 
  const onPressHandler = () => {
    
   Setbox(!box)
    Setbounce(!bounce)
}
//navigates to a sign up page with the press of the sign up button 
const onSignUpPress = () => {
    navigation.navigate('SignUp')
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
               <Text style = {styles.sloganTxt}>Booking barbers made easy </Text>
              
             </View>}

            {/* This displays checking of the bounce variable
            Initiating the overall animation  */}
          { bounce ? <Animatable.View animation = 'fadeInUpBig' style = {styles.footer}> 
            <Text style = {styles.loginTxt}>Enter your login details below</Text>
            <View style = {styles.button}>
              {error?
            <Animatable.View animation = 'wobble' duration = {1000} style = {styles.inputContainer}>  
                  <Text style = {{marginTop:15,fontSize:15,color:'#fff',alignSelf:'center'}}>{error}</Text>
              <TextInput 
                      
                      onChangeText = {text =>Setname(text)} 
                      value = {name} placeholder = 'Username' 
                      secureTextEntry = {false} style = {styles.input2}/>  
              <TextInput 
                      onChangeText = { text => SetEmail(text)}
                      value = {email} placeholder = 'Email' 
                      style = {styles.input2}/> 
              <TextInput 
                      onChangeText = {text =>SetPassword(text)} 
                      value = {password} placeholder = 'Password' 
                      secureTextEntry = {true} 
                      style = {styles.input2}/>
                      
                  
            </Animatable.View> 
            :
            <View style = {styles.inputContainer}>
              
          
                
              <TextInput 
                      onChangeText = {text =>Setname(text)} 
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
            </View>}

            <View style = {{flexDirection:'row' , justifyContent:'space-between' , marginTop:25,}}>
              <TouchableOpacity style = {styles.enterBtn} onPress = {requestFromServer}>
                <Text style = {{color:'#fff'}}>Enter</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.signup} onPress = {goToSignUp}>
                 <Text style = {styles.signupTxt}>Don't have an account Sign Up</Text>
              </TouchableOpacity>
            </View>
             
         
              
            </View>
          </Animatable.View>
          : 
          <View style = {styles.opacity}>
             <Text style = {styles.description}>Save time by choosing Trimz to book your next appointment</Text>
          <TouchableOpacity style = {styles.signIn} onPress = {onPressHandler}>
            <Text style = {styles.BtnTxt}>Get Started</Text>
          </TouchableOpacity>
          </View>}  
          {/* This is the intitial output for the user when no interaction has taken place     
          */}
          
        </View>
    )
};

export default WelcomeScreen;


//Obtaining dimensions of the screen to aid with the styling 
const {height} = Dimensions.get("screen");
const height_logo = height * 0.5;



// styles sheet for both the background and images overall welcome screen
// React native styles features 
const styles = StyleSheet.create({
    background:{
        height:'100%',
        width:'100%',
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
    width: height_logo,
    height: height_logo
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
  marginTop:15,
  borderColor:'white'
  

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
  marginTop:15,
  borderColor:'#a1241b',
  borderWidth:5  
}

    
})
