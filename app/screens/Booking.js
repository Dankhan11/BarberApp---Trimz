import * as React from 'react';
import  { useState  } from 'react';
import { Text, View, Image ,Modal ,StyleSheet, Button,SafeAreaView,TouchableHighlight, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Card, Searchbar } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TextInput, TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import BarberSlider from '../components/barberSlider';
import {Rating} from 'react-native-ratings'
import MessagingScreen from './MessagingScreen';
import SellingItems from '../components/SellingItems';
import Modalcart from '../components/Modalcart';
import { WeekCalendar } from 'react-native-calendars';
import MyCalendar from '../components/Weekcalendar';
import FormReview from '../components/reviewForm';
import { Formik } from 'formik';
const axios = require("axios")




//Home screen function
function HomeScreen() {
  const navigation = useNavigation()
  
  return (
    <View style={styles.view}>
      <View style = {styles.view1}> 
     
        <Text style = {{flexDirection:'row',
                        color:'#fff',
                        marginTop:100,
                        fontWeight:'bold',
                        fontSize:25 ,
                        fontFamily:'AppleSDGothicNeo-SemiBold' }}>
                        Welcome back Testuser</Text>
                 
                                             
        <Searchbar placeholder = 'Search' style = {{marginTop:25 , borderRadius:20, backgroundColor:'#fff'}}/>
      
        {/* Barber slider component used within the scrollview */}
        {/* Horizontally placing the scrollview */}
        <ScrollView horizontal snapToAlignment = {'center'}>
          <View style = {{alignItems:'center', flexDirection:'row'}}>
            {/* Each slider component given a name prop */}
          
            <BarberSlider name = 'Barber 1 ' imageSource = {require('../assets/logo2.jpg')}/>
            <BarberSlider name ='Barber 2'/>
            <BarberSlider name = 'Barber 3'/>
          </View>
        </ScrollView>
         {/* SellingItems slider component used within the scrollview */}
        {/* Horizontally placing the scrollview */}
          <ScrollView horizontal  snapToInterval ={200} style = {{marginBottom:200}}>
            {/* Each item with correesponding price and name  */}
            <SellingItems price = '£2.00'  name = 'Shampoo' imageSource = {require('../assets/shampoo.png')}/>
            <SellingItems price = '£3.00' name = 'Comb' imageSource = {require('../assets/comb.png')}/>
            <SellingItems price = '£2.50' name = 'Aftershave' imageSource = {require('../assets/aftershave.png')}/>
            <SellingItems price = '£2.00'  name = 'Beard Trim' imageSource = {require('../assets/razor.png')}/>
        </ScrollView>
      </View>
    </View>
  );
}


//Review screen
function ReviewScreen() {
  //function for merge sort with reviews 
  function mergeReviews(left, right) {//takes in two parameters
    let arr = rating//array is now our ratings array
    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (left[0] < right[0]) {//choosing the smallest unchosen elemeent in the array
            arr.push(left.shift())  //pushes the left onto empty array
        } else {
            arr.push(right.shift()) //pushes onto right subarray
        }
    }
    // Concatenating the leftover element
    return [ ...arr, ...left, ...right ]//this is just incase we did not go through the whole array
}






  const [task,SetTask] = useState('')
  const [taskItems , SetTaskItems] = useState('')
  const [modalOpen,SetmodalOpen] = useState(false)
  
  const [body,Setbody] = useState('')//state for the body initialised as empty string
  const [title, SetTitle] = useState('')//state for the title which is a string
  const [titleArray,SetTitleArray] = useState([''])//array to store titles
  const [bodyArray,SetbodyArray] = useState([''])
  const [rating ,Setrating] = useState('')//state for the rating
  const [ratingArray , SetratingArray] = useState(['']) 

 const handleAddTask = () =>{//adding items to the array of reviews 
    // SetTaskItems([...taskItems ,task ])
    // //adds new task to task items array 
    // SetTask(null);//clears our the task 
    SetTitleArray([...titleArray , title])
    SetTitle(null)
    SetbodyArray([...bodyArray,body])
    Setbody(null)
    SetratingArray([...ratingArray,rating])
    Setrating(null)
    SetmodalOpen(false)

 }

  return (
    <View style={styles.view}>
      <SafeAreaView style = {styles.taskWrapper}>
        <Modal animationType = 'slide' visible = {modalOpen} style = {styles.modalContent}>
          <View style = {styles.modalContent}>
          <Text style = {{marginBottom:25}}>hello world</Text>
          <Button title = 'close' onPress = {()=> SetmodalOpen(false)}/>


          <View style = {{marginTop:40}}>
            <TextInput  style = {styles.input}
                          value = {title}
                          placeholder = 'Title '
                          autoCorrect = {false}
                          onChangeText={title=>SetTitle(title)}/>
          
            <TextInput  style = {styles.input}
                          value = {body}
                          placeholder = 'Body '
                          autoCorrect = {false}
                          onChangeText={body=>Setbody(body)}/>


            <TextInput  style = {styles.input}
                          value = {rating}
                          placeholder = 'Rating '
                          autoCorrect = {false}
                          onChangeText={rating=>Setrating(rating)}/>
                        
            
            <TouchableOpacity style = {styles.submit} onPress = {handleAddTask}>
              <Text style = {{alignSelf:'center',justifyContent:'center'}}>Submit your review</Text>
            </TouchableOpacity>
          </View>
          

          </View>
        </Modal>
        <Text style = {styles.text}></Text>
        <View style = {{flexDirection:'row' ,alignItems:'center'}}> 
          
          <TouchableOpacity style = {styles.sendOpacity} onPress = {()=>SetmodalOpen(true)}>
            <Text>Write a review</Text>
          </TouchableOpacity>
        </View>
        <View style = {{flexDirection:'row', justifyContent:'space-evenly',marginTop:15}}>
          <Text style = {styles.text}>Sort from:</Text>
          <TouchableOpacity style = {styles.sortOpacity}>
            <Text>High to low</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.sortOpacity}>
            <Text>Low to High</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style = {styles.reviewContainer}>

        {
            bodyArray.map((item, index)=>{
                return (
                  <TouchableHighlight key = {index} style ={styles.messageTxt}>
                      <Text style = {{color:'white',marginLeft:10}} key = {index}>{item}
                      </Text>
                      
                  </TouchableHighlight>)
                })
              }

        </ScrollView>
      </SafeAreaView>

    </View>

 
  );
}

import StripeApp from '../components/StripeApp'
import { StripeProvider } from '@stripe/stripe-react-native';
//Profile Screen which is accessed through the tab navigation
function ProfileScreen(){

  const navigation = useNavigation()
  function logOut(){
    axios.get('http://localhost:4000/api/signout',{
        
    }).then(res=>{
        console.log(res)
        navigation.navigate('Home')
        
    })
  }
  return (
    <StripeProvider 
    publishableKey = 'pk_test_51Kxe4nHawKxdIkWuaxhqZA4KQNxMyv5dB39BkZEmzZCS1hZIshFnOmFfYnh3yMsoDzdjxP6xach2J0IkpvXmUBSp00EhbUdmu6'>
      <StripeApp/>
    </StripeProvider>
  )
}




//Booking Screen
function Booking (){ 
 const [date, SetDate] = useState(moment().format('DD-MM-YYYY'))//creating states for the date 
 const [time,SetTime]  = useState('')//creating state for the time
 const [barber,SetBarber] = useState('')//creating state for the barber chosen
   
  const rndm = (day) =>{
    setDate(day)
    console.log(date)

  }

  return(
   <View style = {styles.view}>
     <View style = {{alignItems:'center',justifyContent:'flex-end'}}>
       <Text style = {{justifyContent:'center', alignItems:'center'}}>Book Now</Text>
     </View>

     <View style = {{marginTop:40,alignItems:'center',flex:0.3 , marginLeft:20,marginRight:20}}>
       <MyCalendar style = {styles.calendar}/>


       <Text style = {styles.bookTxt}>Select the time below</Text>
       <View style = {{flexDirection:'row'}}>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>10:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>11:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>12:00</Text>
        </TouchableOpacity>
       </View>
       <View style = {{flexDirection:'row'}}>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>13:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>14:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>15:00</Text>
        </TouchableOpacity>
       </View>
       <View style = {{flexDirection:'row'}}>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>16:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>17:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>18:00</Text>
        </TouchableOpacity>
       </View>


       <View style ={{flexDirection:'row'}}>
         <TouchableOpacity style = {styles.icon}>
           <Text>Barber 1</Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.icon}>
           <Text>Barber 2</Text>
         </TouchableOpacity>
         <TouchableOpacity style = {styles.icon}>
           <Text>Barber 3</Text>
         </TouchableOpacity>
         
       </View>
       <Text style = {{color:'#fff',marginBottom:20}}>You have booked your appointment at</Text>
          <TouchableOpacity style = {{justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#fff', 
          width:200,height:75 ,
          alignSelf:'center', 
          borderRadius:50}} 
          onPress = {()=>Alert.alert('Error Must fill in all fields','Error Must fill in all fields'  [{text:'yes',text:'no'}])}>
            <Text style = {{fontWeight:'bold'}}>Confirm your booking</Text>
          </TouchableOpacity>
  </View>
        
    </View>
  ) 
}

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';//Importing the relevant package used
import Counter from '../components/Counter';
import { LinearGradient } from 'expo-linear-gradient';
import { setDate } from 'date-fns';
import moment from 'moment';


//Create materialBottomTabNavigator Hook which is used
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    //Tab navigator stored within navigation container
    //Independent ensures that the tab navigator and stack navigator do not mix
    <NavigationContainer independent>
      <Tab.Navigator
      //styling the tab navigator
      activeColor = '#fff'//Active color meaning when the icon is pressed
      style = {styles.tabBarNav}//Link to the stylesheet component
      barStyle={{ backgroundColor: '#00498D' }}
        screenOptions={({ route }) => ({//Allows navigation to different tab.screen components
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;//Icon name is our variable

            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home';
            } else if (route.name === 'Reviews') {//Checking if route name is 'Reviews'
              iconName = focused ? 'chatbox-ellipses-outline' : 'chatbox-ellipses-outline';//Checking if icon name is focused
            }//Displaying the calendar icon if route name is Book now 
            else if (route.name === 'Book Now'){
              iconName = focused ? 'calendar-outline': 'calendar-outline';//Checking if icon name is focused
            }//Displaying profile icon if that is the correct route name 
            else if (route.name === 'Profile'){
              iconName = focused ? 'people-outline': 'people-outline'//Checking if icon name is focused
            }
            else if(route.name === 'Messages'){
              iconName = focused ? 'chatbox-ellipses-outline':'chatbox-ellipses-outline';
            }

            //Icon component has been rendered here from Ionicons
            return <Ionicons name={iconName} size={26} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: '#00498D',
        })}
      >
        {/* Displays the different components within the tab Navigator
        Similar to stack navigator has corresponding components  */}
        <Tab.Screen color = '#00498D' name="Home" component={HomeScreen} options = {{headerShown:false}} />
        <Tab.Screen name = 'Book Now' component = {Booking}/>
        <Tab.Screen name = 'Messages' component = {MessagingScreen}/>
        <Tab.Screen name="Reviews" component={ReviewScreen} options = {{headerShown:false}} />
        <Tab.Screen name = 'Profile' component = {ProfileScreen} />
      
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    padding: 24,
    resizeMode:'contain',
    
  }, 
  opacity:{
        flex:1,
        width:'100%',
        backgroundColor:'#6a6b48',
        paddingHorizontal:'100%',
        paddingVertical:10,
        borderRadius:10,
        marginTop:5,
        alignItems:'flex-end',
        
        
  }, 
  view:{
    flex:1,
    backgroundColor:'#00498D',

    
  },
  view1:{
    marginLeft:10,
    marginRight:10,
    
  },
  view2:{
    width:'100%',
    flex: 1,
    flexDirection:'row',
    
    alignItems: 'center',
    backgroundColor: '#00498D',
  }, 
  text:{
      justifyContent:'center', 
       color:'white',
      fontWeight:'700',
      fontSize:16,
      

  }, 
  logo:{
    width:100,
    height:100,
    margin:4,
    marginTop:40,
    marginLeft:10,
    alignSelf:'flex-end',
    flexDirection:'column',
    backgroundColor:'white',
    borderRadius:10,
  }, 
  Image:{ resizeMode:"contain",
  width:'100%',
  height:'80%',
  borderRadius:300,
  alignItems:'center',
  }, 
  taskWrapper:{
    paddingHorizontal:20,
    paddingTop:80,
    margin:30
  },
  sectionTitle:{
    fontSize:24,
    fontWeight:'bold',
    color:'#fff'
  },
  items:{
    marginTop:30
  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  input:{
    paddingVertical:15,
    width:250,
    paddingHorizontal:15,
    backgroundColor:'white',
    borderRadius:10,
    borderColor:'#C0C0C0',
    borderWidth:1,
    height:100,


  },
  addWrapper:{
    width:60,
    height:60,
    borderRadius:60,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#C0C0C0'
    
  },
  tabBarNav:{
    backgroundColor:'#00498D',
    
  },
  time:{
    backgroundColor:'#00498D',
    width:100,
    height:50,
    margin:10,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:10,
    borderRadius:10,
    borderWidth:2,
    borderRadius:10,
    borderColor:'white'
  },
  icon:{
    width:100,
    height:100,
    backgroundColor:'white',
    margin:15,
    borderRadius:100,
    justifyContent:'center',
    alignItems:'center'
  },
  calendar:{
    width:400,
    borderRadius:25,
   
  },
  timeTxt:{
    color:'white',
    fontSize:20,
  },
  bookTxt:{
    color:'white',
    fontSize:17,
    marginTop:8
  },
  reviewContainer:{
    borderWidth:2,
    borderColor:'white',
    borderRadius:20,
    height:'85%',
    marginTop:25,
    backgroundColor:'white'
  },
  sendOpacity:{
    width:350,
    height:45,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
    marginLeft:5,
  },
  sortOpacity:{
    backgroundColor:'grey',
    width:90,
    height:25,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,

  },
  modalContent:{
    alignItems:'center',
    justifyContent:'center'
  },
  submit:{
    borderColor:'black',
    borderWidth:2,
    marginTop:20,
    borderRadius:10,
    height:50,
    justifyContent:'center'
  },
  messageTxt:{
    backgroundColor:'#285794',
    marginTop:5,
    height:40,
    justifyContent:'center'
  }


  })
