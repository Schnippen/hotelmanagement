import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import {  Calendar, CalendarList, DateData } from 'react-native-calendars'
import { supabase } from '../Supabase/supabase'
import { TBooking, TBookingUpdated, periods } from '../Types/types'
import { calculateCurrentDate, calculateReservationDays, changeDateFormat, createReservationPeriod, populateCalendar, updateDateFormat } from '../Utils/functions'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Store/store'
import { TCalendarData, UPDATE_STATE } from '../Store/calendarData'

function CalendarScreen({navigation}:any) { //TODO add typescript to navigation
    const [data,setData]=useState<TBookingUpdated[] | null>(null)
    const [reservationPeriodsStates, setReservationPeriodsStates] = useState<{ id: string; periods: periods[] }[] | null>(null);
    const [datesReady,setMarkedDates]=useState<any>(null)
    const [loadingState,setLoadingState]=useState<boolean>(true)
    const [errorState,setError]=useState<any>(null)
    const fetchData = async (): Promise<void> => {
      try {
        setLoadingState(true)
        let { data: booking, error } = await supabase
          .from('booking')
          .select('checkin_date, checkout_date, id, booking_color');
    
        //console.log("SUPABASE DATA:", booking);
        console.log("KLIK");

        if (booking) {
          let updatedBookingFormatData = updateDateFormat(booking);
          //console.log("updatedBookingFormatData", updatedBookingFormatData)
          let bookingData = calculateReservationDays(updatedBookingFormatData);
          //console.info("BookingData:", bookingData);
          setData(bookingData);
          let updatedReservationPeriods= createReservationPeriod(bookingData)
          //console.log("updatedReservationPeriods:",updatedReservationPeriods)          
          //setReservationPeriodsStates(updatedReservationPeriods)
          let popuatedCalendar = populateCalendar(updatedReservationPeriods)
          //console.log("populatedCalendar:",popuatedCalendar)
          setMarkedDates(popuatedCalendar)
          console.log("datesReady:",datesReady)
        } else {
          console.error('No booking data found.');
        }
        if (error) {
          console.error('Error fetching data:', error);
          setData(null);
          setError(error);
          return;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setData(null);
      }finally {
        setLoadingState(false);
      }
    };
    

//console.log("state:",data)
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
  {"id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "periods": [{"color": "red", "date": "2024-03-20", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-03-21", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-22", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-23", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-24", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-25", "endingDay": true, "startingDay": false}]}, 
  //new
{"id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "periods": [{"color": "red", "date": "2024-03-01", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-03-02", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-03", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-04", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-05", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-06", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-07", "endingDay": true, "startingDay": false}]}, 
//new
{"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [{"color": "red", "date": "2024-03-10", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-03-11", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-12", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-13", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-14", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-03-15", "endingDay": true, "startingDay": false}]}]
let shit2=populateCalendar(shit)
const globalCalendarData = useSelector((state:RootState) => state.calendarData)
const dispatch =useDispatch()
//console.log(globalCalendarData?"jest":"niei maa")
console.log("GLOBAL REDUX CALENDAR",globalCalendarData.data)
//dispatch(UPDATE_STATE(shit)),console.info("global st")


//TODO export this to functions?
const checkDayReservation = (day: string, globalCalendarData?: TCalendarData): boolean => {
  const selectedDay: string = day;
  //TODO maybe add moda  to show info
  if (globalCalendarData?.data && selectedDay in globalCalendarData.data) {
    console.info("Reservation data exists for the selected day:", globalCalendarData.data[selectedDay]);
    return true;
  } else {
    console.info("No reservation data found for the selected day.");
    return false;
  }
};

const navigateToDayDetails=(day:string)=>{
  const selectedDay:string=day
  if(checkDayReservation(selectedDay,globalCalendarData)){
    console.info("navigating")
    navigation.navigate("BookingDetails")
  }else{
    console.info("not navigating")
  }
  //navigation.navigate("BookingDetails")
}

  return (
    <View style={styles.container}> 
        <View style={styles.topcontainer}>
            <Text style={styles.textStyle}>djkasd</Text>
            <Button title='Fetch Data' onPress={()=>fetchData()}/>
            <Button title='populateCalendar()' onPress={()=>{dispatch(UPDATE_STATE(shit2)),setMarkedDates(shit2)}}/> 
        </View>
      <Calendar
        showWeekNumbers
        markingType="multi-period"
        markedDates={{...markedDates}}
        displayLoadingIndicator={loadingState}
        enableSwipeMonths={true} //TODO make it a global setting
        onDayPress={()=>console.log("onDayPress()")}
        onDayLongPress={day => {
          //checkDayReservation(day.dateString,globalCalendarData)
          console.log('selected day', day.dateString);
          navigateToDayDetails(day.dateString)
          //console.log("pdpss:",datesReady);
        }}/>
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

/* 
{
  '2024-03-21': {
    periods: [
      {startingDay: true, endingDay: false, color: 'green'},
    ]
  },
  '2024-03-23': {
    periods: [
      {startingDay: false, endingDay: true, color: 'green',},
    ]
  },'2024-03-16': {
    periods: [
      {startingDay: true, endingDay: false, color: 'red',},
    ]
  },'2024-03-17': {
    periods: [
      {startingDay: false, endingDay: false, color: 'red',},
    ]
  },
  '2024-03-20': {
    periods: [
      {startingDay:false, endingDay: true, color: 'red',},
    ]
  },
} */