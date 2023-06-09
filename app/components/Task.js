import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const handleAddtask = () =>{
    
}
const Task = (props) => {
  return (
    <View style = {styles.item}>
        <View style = {styles.itemLeft}>
            <View style = {styles.square}></View>
            </View>
      <Text style = {styles.text}> {props.text}</Text>
      <View style = {styles.circular}></View>
    </View>
  )
}

export default Task

const styles = StyleSheet.create({
    item:{
        backgroundColor:'white',
        padding:15,
        borderRadius:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,


    },
    itemLeft:{
        flexDirection:'row' ,
        alignItems:'center',
        flexWrap:'wrap'
    },
    square:{
        width:24,
        height:24,
        backgroundColor:'#55BCF6', 
        borderRadius:5,
        opacity:0.4,
        
    },
    text:{
        maxWidth:'80%',
        
    },
    circular:{
        width:12,
        height:12,
        borderColor:'blue',
        borderWidth:2,
        borderRadius:5
    }

});

import { Text, View } from 'react-native'
import React, { Component } from 'react'
