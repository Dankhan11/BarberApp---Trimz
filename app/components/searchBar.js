import { Keyboard, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Feather, Entypo  } from '@expo/vector-icons'
import { Button} from 'react-native-paper'

const searchBar = ({clicked, searchPhrase, setSearchPhrase,setClicked}) => {
  return (
    <View style = {styles.container}>
      <View style = {clicked ? styles.searchBar_clicked : styles.searchBar_unclicked}>
        <Feather name = 'search' size = {20} color = 'black' style = {{marginLeft:1}}/>
        <TextInput style = {styles.input} placeholder = 'Search' value = {searchPhrase} onChangeText = {setSearchPhrase} 
                    onFocus = {() =>{
                        setClicked(true);
                    }}/>
        {clicked && (
            <Entypo name = 'cross' size = {20} color = 'black' style = {{padding:1}} onPress = {()=>{
                setSearchPhrase('')
            }}/>
        )}
        {clicked && (
            <View>
                <Button title = 'Cancel' onPress = {()=>{
                    Keyboard.dismiss();
                    setClicked(false);
                }}/>  
            </View>
        )}

      </View>
    </View>
  )
}

export default searchBar

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        margin:15,
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row',
        width:'90%',
    },
    searchBar_unclicked:{
        padding:10,
        flexDirection:'row',
        width:"95%",
        backgroundColor:'gray',
        borderRadius:15,
        alignItems:'center',
    },
    searchBar_clicked:{
        padding:10,
        flexDirection:'row',
        width:'80%',
        backgroundColor:'gray',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    input:{
        fontSize:20,
        marginLeft:10,
        color:'gray',
        width:'90%'
    }
})