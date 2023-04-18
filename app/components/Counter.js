import { View, Text,TouchableOpacity } from 'react-native'
import React , {useState}from 'react'

const Counter = () => {

    const [count,Setcount] = useState(0)
    function increment(){
      Setcount(count+1)
    }
    function decrement(){
      Setcount(count-1)
    }
   

  return (
    <View style = {{justifyContent:'center',flexDirection:"row"}}>
        <TouchableOpacity onPress = {()=>Setcount(count+1)}>
          <Text style = {{}}>add</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>Setcount(count-1)}>
          <Text style = {{}}>subtract</Text>
          </TouchableOpacity>
          <Text style = {{}}>{count}</Text>
        </View>
  )
}

export default Counter