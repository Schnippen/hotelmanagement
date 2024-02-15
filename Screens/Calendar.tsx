import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {  CalendarList } from 'react-native-calendars'
function CalendarScreen() {
  return (
    <View style={styles.container}>
        <Text  style={styles.textcontainer}>Calendar</Text>
        <CalendarList
        onDayPress={day => {
            console.info(day);
          }}
  // Callback which gets executed when visible months change in scroll view. Default = undefined
  //onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
  // Max amount of months allowed to scroll to the past. Default = 50
  pastScrollRange={1}
  // Max amount of months allowed to scroll to the future. Default = 50
  futureScrollRange={1}
  // Enable or disable scrolling of calendar list
  scrollEnabled={true}
  // Enable or disable vertical scroll indicator. Default = false
  showScrollIndicator={true}
  //...calendarParams
  //calendarStyle
  //calendarHeight
  //calendarWidth
/>
    </View>
  )
}

const  styles = StyleSheet.create({
    container:{
        justifyContent:"center",
    },
    textcontainer:{
        height:50
    }
})

export default CalendarScreen