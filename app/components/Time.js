import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Time = (props) => {
  return (
    <View>
       <TouchableOpacity style = {styles.time}>
          <Text style = {styles.timeTxt}>{time.props}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Time

const styles = StyleSheet.create({})