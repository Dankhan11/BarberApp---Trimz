import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
const SellingItems = (props) => {
  const alertitem = ()=>{
    alert('Comb added to basket ')
  }
  return (
    <View>
        <View style = {{flexDirection:'row'}}>
          <TouchableOpacity onPress = {alertitem} style = {styles.opacity}>
            <View style = {{justifyContent:"center"}}>
                <View style = {{alignSelf:"center"}}>
                  <Image style = {{resizeMode:'contain',
                                   width:150,
                                   height:170,
                                   borderRadius:300, }}
                                   source = {props.imageSource}/>
                  <Text style = {{color:'#fff', alignSelf:'center', fontWeight:'700'}}>{props.name}</Text>
                  <Text style = {{color:'#fff', alignSelf:'center', fontWeight:'700'}}>{props.price}</Text>
                </View>
                  <TouchableOpacity style = {{flexDirection:'row' ,alignSelf:'center',marginTop:15,}}>
                  <Ionicons name = 'cart-outline' size = {32} style = {{color:'#fff'}}/>
                  <Text style = {{alignSelf:'center',color:'#fff'}}>Add to basket</Text>
                  </TouchableOpacity>
             </View>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default SellingItems

const styles = StyleSheet.create({
  opacity:{
    padding:20,
    marginBottom:0,
    marginTop:30,
    backgroundColor:'#3167bd',
    width:180,
    height:300,
    borderRadius:50 ,
    marginLeft:17
  }
})