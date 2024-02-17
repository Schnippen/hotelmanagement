import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import {  CalendarList } from 'react-native-calendars'
import { supabase } from '../Supabase/supabase'

function CalendarScreen() {
    const [data,setData]=useState<any>()
    const  fetchData=async()=>{   
        let { data: booking, error } = await supabase
              .from('booking')
              .select('checkin_date,checkout_date')
              console.log("SUPABASE DATA:", booking)     
            console.log("KLIK")
            setData(booking)            
        if (error) {
                console.error('Error fetching data:', error);
                return;}}
                
  return (
    <View style={styles.container}> 
        <View style={styles.topcontainer}>
            <Text style={styles.textStyle}>djkasd</Text>
            <Button title='Fetch Data' onPress={()=>fetchData()}/>
        </View>
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
    topcontainer:{
        height:100,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"lightpink",
    },
    textStyle:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"red"
    }
})

export default CalendarScreen