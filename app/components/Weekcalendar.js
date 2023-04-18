// React Native Calendar Picker using react-native-calendar-picker
// https://aboutreact.com/react-native-calendar-picker/

// import React in our code
import React, {useState} from 'react';

// import all the components we are going to use
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';

//import CalendarPicker from the package we installed
import CalendarPicker from 'react-native-calendar-picker';

const MyCalendar = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {//on date change function taking in the date and type as parameters
    //function to handle the date change
    if (type === 'END_DATE') {//checking if it is the end date
      setSelectedEndDate(date);//set date selected to our end date 
    } else {
      setSelectedEndDate(null);//else will return null 
      setSelectedStartDate(date);//and set the start date to the selected date 
    }
  };

  return (
    <SafeAreaView >
      <View>
       
        <CalendarPicker
        style = {styles.CalendarPicker}
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date(2018, 1, 1)}
          maxDate={new Date(2050, 6, 3)}
          weekdays={
            [
              'Mon', 
              'Tue', 
              'Wed', 
              'Thur', 
              'Fri', 
              'Sat', 
              'Sun'
            ]}
          months={[
            'January',
            'Febraury',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          previousTitle="Previous"
          nextTitle="Next"
          height = {400}
          
          todayBackgroundColor="#e6ffe6"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          scaleFactor={380}
          textStyle={{
            color: '#fff',
            
          }}
          onDateChange={onDateChange}
        />
        
      </View>
    </SafeAreaView>
  );
};
export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'white',
    marginBottom:250
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
  CalendarPicker:{
  
  }
});