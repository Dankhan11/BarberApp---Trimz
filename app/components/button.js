import React, {Component} from "react";
import { ReactDOM } from "react";
import { StyleSheet, TouchableOpacity,Text , View, TouchableWithoutFeedbackBase} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const ButtonWithBackGround = props =>{
  const content = (
    
    <View style ={[styles.button, {backgroundColor: props.color}]}>
  <LinearGradient style = {styles.gradient}  colors={[ '#00172D','#FFDF01',]}/>  
     <Text style={styles.text}>{props.text}</Text>
     </View>
  )
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}


const styles = StyleSheet.create({
  button:{
    padding:15,
    marginBottom:15,
    width: 200,
    height:55,
    borderRadius:32,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'flex-end',
  

  },
text:{
  color:'white',
  fontSize:20,
  alignItems:'center',
  fontFamily:'AvenirNext-DemiBold'

}
  
});


export default ButtonWithBackGround;


//export const ButtonContext = createButtonContext();

//class ButtonCont extends React.Component {
  //  state={
  //      isLightTheme: true,
        //creating different objects or instances 
    //    light: {colour:'#555' , ui:'#ddd',bg:'#eee' },
      //  dark:{colour:'#ddd', ui:'#333',bg:'#555'}

    //}
    //render() { 
      //  return(
        //    <Button.Provider value={{...this.state}}>
                

          //  </Button.Provider>
        //);
   // }
//}
 
//export default ButtonCont;

