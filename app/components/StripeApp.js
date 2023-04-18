import { StyleSheet, Text, View ,TextInput,Button, Alert} from 'react-native'
import  React from 'react'
import { useState } from 'react'
import { CardField , useConfirmPayment} from '@stripe/stripe-react-native'

const API_URL = 'exp://127.0.0.1:19000'//api url is our local host url 

const StripeApp = () => {
   
  const [email, Setemail] = useState('')//state for our email input 
  const [cardDetails, SetcardDetails] = useState('')//state for card details which are inputted 

  //object wehere we will access the confirmed payment 
  const {confirmPayment,loading} = useConfirmPayment();//making use of useconfirmpayment hook 
 
//getting client secret
const fetchPaymentIntentClientSecret = async () =>{//asynchrous function 
  const response = await fetch(`${API_URL}
  create-payment-intent`,{//using fetch api to fetch client secret
    method: 'POST',//create-payment-intent will be a post metohd 
    headers:{
      "Content-type":'application/json'//header to indicate content type
    }
  })
  const {clientSecret, error} = await response.json();
  return {clientSecret,error}
}



  //creating handle pay press method
  const handlePayPress = async() =>{

    //get customers billing info
    if (!cardDetails?.complete || !email) {
      Alert.alert('Fill in all details')
    }
    const billingDetails = {//billing details object
      email: email//pass in our email into the object 
    }

    //fetch intent client secret from backend
    try{
      const {clientSecret,error}= await fetchPaymentIntentClientSecret();//get client secret and get client secret
      if(error){//if there is an error
        console.log('unable to process payment')//will ouput error message
      }else{//if there is no error 
        const {paymentIntent, error} = await confirmPayment(clientSecret,{//extract payment intent which was from use payment hook
          type:'Card',//options which are type 
          billingDetails: billingDetails//billing details which are specified
        });
        if (error){//check if error
          alert(`Payment confirmation error ${error.message}`)//appropriate message outputted 
        }else if (paymentIntent){
          alert('payment successful',paymentIntent)//appropriate message outputted
          console.log('payment successful')//appropriate message outputted
        }
      }

    }catch(error){//catch error if exists 
  console.log(error)//appropriate message outputted
    }
    //confirm the payment with card details 
  }

  //below is design which is returned for the user 
  return (
    <View style = {styles.container}>
      <Text style = {styles.text}>Pay for your booking now </Text>
      <TextInput
        autoCapitalize= 'none'
        placeholder = 'Email'
        keyboardType = 'email-address' 
        onChangeText = {value =>Setemail(value)}
        style = {styles.txtinput}/>
      <CardField
        postalCodeEnabled= {true}
        placeholder = {{number: '42424242'}}
        cardStyle = {styles.card}
        style = {styles.cardContainer}
        onCardChange = {cardDetails => SetcardDetails(cardDetails)}/>

        <Button title = 'Pay Now' onPress = {handlePayPress} disabled = {loading}/>
      
    </View>
  )
}

export default StripeApp

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#fff',
    flex:1,
    
    alignItems:'center',
    justifyContent:'center'

  },
  txtinput:{
    backgroundColor:'#efefef',
    fontSize:20,
    height:50,
    padding:10,
    width:'90%'
  },
  card:{
    backgroundColor:'#efefef',
  },
  cardContainer:{
    height:50,
    marginVertical:30,
    width:'90%'
  },
  text:{
    fontSize:25,
    marginBottom:35,
    color:'white'
  }
})