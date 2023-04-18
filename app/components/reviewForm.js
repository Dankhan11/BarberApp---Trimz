import { StyleSheet, Text, View ,TextInput,Button} from 'react-native'
import React from 'react'
import { Formik } from 'formik'


const FormReview = () => {
  return (
    <View style = {{alignContent:'center'}}> 

        <Formik style = {styles.formik} initialValues = {{title:'',body:'',rating:''}}//initial values of our form 
                onSubmit = {(values)=>{//function will run when form is submitted
                //takes in value in 3 different fields of title body and rating
                console.log(values)
                }}>
                  {
                    (props)=>{//function which will return jsx 
                      <View style = {{alignItems:'center'}}>
                        <TextInput style = {styles.input}
                                   placeholder = 'Review'
                                   onChangeText= {props.handleChange('title')}
                                   value = {props.values.title}/>

                        <TextInput style = {styles.input}
                                   placeholder = 'Body'
                                   onChangeText= {props.handleChange('body')}
                                   value = {props.values.body}/>

                        <TextInput style = {styles.input}
                                   placeholder = 'Rating (1-5)'
                                   onChangeText= {props.handleChange('rating')}
                                   value = {props.values.rating}/>

                          <Button title = 'Submit' color = 'maroon' onPress = {props.handleSubmit}/>
                      </View>
                  }}
            </Formik>

      <Text>reviewForm</Text>
    </View>
  )
}


export default FormReview

const styles = StyleSheet.create({

  input:{
    borderWidth:2,
    borderColor:'black',
    width:200,
    height:100,
    backgroundColor:'black'

  },
  formik:{
    alignItems:'center',
    justifyContent:'center'
  },
   
})