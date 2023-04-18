import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'


const ChatMessage = (props) => {
  return (
    <View>
      <TouchableOpacity>
          <Text>{props.Text}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default ChatMessage

const styles = StyleSheet.create({})