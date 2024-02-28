import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import {  Calendar, CalendarList } from 'react-native-calendars'
import { supabase } from '../Supabase/supabase'
import { TBooking, TBookingUpdated, periods } from '../Types/types'
import { calculateCurrentDate, calculateReservationDays, changeDateFormat, createReservationPeriod, populateCalendar, updateDateFormat } from '../Utils/functions'

function CalendarScreen() {
    const [data,setData]=useState<TBookingUpdated[] | null>(null)
    const [reservationPeriodsStates, setReservationPeriodsStates] = useState<{ id: string; periods: periods[] }[] | null>(null);
    const [datesReady,setMarkedDates]=useState<any>(null)
    const fetchData = async (): Promise<void> => {
      try {
        let { data: booking, error } = await supabase
          .from('booking')
          .select('checkin_date, checkout_date, id');
    
        console.log("SUPABASE DATA:", booking);
        console.log("KLIK");

        if (booking) {
          let updatedBookingFormatData = updateDateFormat(booking);
          console.log("updatedBookingFormatData", updatedBookingFormatData)
          let bookingData = calculateReservationDays(updatedBookingFormatData);
          console.info("BookingData:", bookingData);
          setData(bookingData);
          let updatedReservationPeriods= createReservationPeriod(bookingData)
          //console.log("updatedReservationPeriods:",updatedReservationPeriods)          
          //setReservationPeriodsStates(updatedReservationPeriods)
          let popuatedCalendar = populateCalendar(updatedReservationPeriods)
          console.log("populatedCalendar:",popuatedCalendar)
          setMarkedDates(popuatedCalendar)
          console.log("datesReady:",datesReady)
        } else {
          console.error('No booking data found.');
        }
        if (error) {
          console.error('Error fetching data:', error);
          setData(null);
          return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData(null);
      }
    };
    

console.log("state:",data)
console.log("datesReady:",datesReady)

const formattedDate = calculateCurrentDate();//[formattedDate]
const templatePeriod = {
  [formattedDate]: {
    periods: [
      {startingDay: true, endingDay: false, color: 'pink'},
    ]
  }
};//{color: 'transparent'},
/* //add color argumenr, export that to function in futures
const createReservationPeriod = (state: TBookingUpdated[]) => {
  let color = 'red';
  const updatedReservationPeriods= state.map(({ id, reservation_dates }) => {
    const periods = reservation_dates.map((date, index) => ({
      date,
      startingDay: index === 0,
      endingDay: index === reservation_dates.length - 1,
      color: colorr
    }));
    console.log("createReservationPeriod:",{ id, periods })
    return { id, periods };
  });
  return updatedReservationPeriods
  //return setReservationPeriodsStates(updatedReservationPeriods);
}; */

const markedDates= datesReady?datesReady:templatePeriod

const shit = [
  //new
  {"id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "periods": [{"color": "red", "date": "2024-02-20", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-21", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-22", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-23", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-24", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-25", "endingDay": true, "startingDay": false}]}, 
  //new
{"id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "periods": [{"color": "red", "date": "2024-02-01", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-02", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-03", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-04", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-05", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-06", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-07", "endingDay": true, "startingDay": false}]}, 
//new
{"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [{"color": "red", "date": "2024-02-10", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-11", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-12", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-13", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-14", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-15", "endingDay": true, "startingDay": false}]}]

  return (
    <View style={styles.container}> 
        <View style={styles.topcontainer}>
            <Text style={styles.textStyle}>djkasd</Text>
            <Button title='Fetch Data' onPress={()=>fetchData()}/>
            <Button title='populateCalendar()' onPress={()=>populateCalendar(shit)}/> 
        </View>
      <Calendar
        showWeekNumbers
        markingType="multi-period"
        markedDates={{...markedDates}}
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



/* 
{
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
} */