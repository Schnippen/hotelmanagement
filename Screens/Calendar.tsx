import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import {  Calendar, CalendarList } from 'react-native-calendars'
import { supabase } from '../Supabase/supabase'
import { TBooking } from '../Types/types'
import { changeDateFormat } from '../Utils/functions'

function CalendarScreen() {
    const [data,setData]=useState<TBooking[] | null>(null)
    const  fetchData=async()=>{   
        let { data: booking, error } = await supabase
              .from('booking')
              .select('checkin_date,checkout_date,id')
              console.log("SUPABASE DATA:", booking)     
            console.log("KLIK")
            if (error) {
              console.error('Error fetching data:', error);
              return;}
            if(booking){
              let updatedBookingData = updateDateFormat(booking)
              console.info("updatedBookingData:",updatedBookingData)
              setData(updatedBookingData)            
            }
        }

  let mockupData=[{"checkin_date": "2024-02-20T00:00:00+00:00", "checkout_date": "2024-02-25T00:00:00+00:00", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01T00:00:00+00:00", "checkout_date": "2024-03-07T00:00:00+00:00", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10T00:00:00+00:00", "checkout_date": "2024-04-15T00:00:00+00:00", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
  
  let mockupUpdatedData=[{"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01", "checkout_date": "2024-03-07", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10", "checkout_date": "2024-04-15", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
 
  const updateDateFormat = (fetchedData:TBooking[]) => {
    return fetchedData.map(item => ({
      ...item,
      checkin_date: changeDateFormat(item.checkin_date),
      checkout_date: changeDateFormat(item.checkout_date)
    }));
  };
  
  return (
    <View style={styles.container}> 
        <View style={styles.topcontainer}>
            <Text style={styles.textStyle}>djkasd</Text>
            <Button title='Fetch Data' onPress={()=>fetchData()}/>
        </View>
        <Calendar
        showWeekNumbers
  markingType="multi-period"
  markedDates={{
    '2024-02-21': {
      periods: [
        {startingDay: true, endingDay: false, color: 'green'},
      ]
    },
    '2024-02-23': {
      periods: [
        {startingDay: false, endingDay: true, color: 'green',},
      ]
    },'2024-02-16': {
      periods: [
        {startingDay: true, endingDay: false, color: 'red',},
      ]
    },'2024-02-17': {
      periods: [
        {startingDay: false, endingDay: false, color: 'red',},
      ]
    },
    '2024-02-20': {
      periods: [
        {startingDay:false, endingDay: true, color: 'red',},
      ]
    },
  }}
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


{/* <CalendarList
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
/> */}