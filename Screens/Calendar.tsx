import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import {  Calendar, CalendarList } from 'react-native-calendars'
import { supabase } from '../Supabase/supabase'
import { TBooking, TBookingUpdated, periods } from '../Types/types'
import { calculateReservationDays, changeDateFormat, updateDateFormat } from '../Utils/functions'

function CalendarScreen() {
    const [data,setData]=useState<TBookingUpdated[] | null>(null)
    const [reservationPeriodsStates, setReservationPeriodsStates] = useState<{ id: string; periods: periods[] }[] | null>(null);
    const [dates,setMarkedDates]=useState(null)
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
          createReservationPeriod(bookingData)
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
  let mockupData=[{"checkin_date": "2024-02-20T00:00:00+00:00", "checkout_date": "2024-02-25T00:00:00+00:00", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01T00:00:00+00:00", "checkout_date": "2024-03-07T00:00:00+00:00", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10T00:00:00+00:00", "checkout_date": "2024-04-15T00:00:00+00:00", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
  
  let mockupUpdatedData:TBooking[]= [{"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "id": "3134840e-7e5e-4623-bc76-a57228f53d5f"}, {"checkin_date": "2024-03-01", "checkout_date": "2024-03-07", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5"}, {"checkin_date": "2024-04-10", "checkout_date": "2024-04-15", "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00"}]
let mockupState:TBookingUpdated [] = [{"checkin_date": "2024-02-20", "checkout_date": "2024-02-25", "difference_in_days": 5, "id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "reservation_dates": ["2024-02-20", "2024-02-21", "2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"]}, {"checkin_date": "2024-03-01", "checkout_date": "2024-03-07", "difference_in_days": 6, "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "reservation_dates": ["2024-03-01", "2024-03-02", "2024-03-03", "2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07"]}, {"checkin_date": "2024-04-10", "checkout_date": "2024-04-15", "difference_in_days": 5, "id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "reservation_dates": ["2024-04-10", "2024-04-11", "2024-04-12", "2024-04-13", "2024-04-14", "2024-04-15"]}]

let reservationPeriodMockup = {"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [{"color": "red", "date": "2024-02-10", "endingDay": false, "startingDay": true}, {"color": "red", "date": "2024-02-11", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-12", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-13", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-14", "endingDay": false, "startingDay": false}, {"color": "red", "date": "2024-02-15", "endingDay": true, "startingDay": false}]}
/* reservationPeriodsStates [{"id": "3134840e-7e5e-4623-bc76-a57228f53d5f", "periods": [[Object], [Object], [Object], [Object], [Object], [Object]]}, {"id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "periods": [[Object], [Object], [Object], [Object], [Object], [Object], [Object]]}, {"id": "9daa7c6e-804b-4e45-8c35-9351512bdf00", "periods": [[Object], [Object], [Object], [Object], [Object], [Object]]}] */
const createReservationPeriod = (state: TBookingUpdated[]) => {
  let color = 'red';
  const updatedReservationPeriods= state.map(({ id, reservation_dates }) => {
    const periods = reservation_dates.map((date, index) => ({
      date,
      startingDay: index === 0,
      endingDay: index === reservation_dates.length - 1,
      color: color
    }));
    console.log("createReservationPeriod:",{ id, periods })
    return { id, periods };
  });
  return setReservationPeriodsStates(updatedReservationPeriods);
};
/*  const update=(state:any)=>{
  const updatedReservationPeriods = createReservationPeriod(state);
  setReservationPeriodsStates(updatedReservationPeriods);
  console.log("reservationPeriodsStates:",reservationPeriodsStates)
}  */

//console.log("reservationPeriodsStates",reservationPeriodsStates)


const populateCalendar = (reservationPeriods: any[]) => {
  if(reservationPeriodMockup===null)return
  const markedDates: Record<string, { periods: any[] }> = {}; // Initialize markedDates object

  // Iterate over each reservation period
  reservationPeriods.forEach(({ id, periods }) => {
    // Iterate over each period in the reservation
    periods.forEach(({ date, startingDay, endingDay, color }:{date:string, startingDay:string, endingDay:string, color:string }) => {
      // Create or update the markedDates object with the current period
      markedDates[date] = {
        periods: [
          ...(markedDates[date]?.periods || []), // Keep existing periods for the date
          { startingDay, endingDay, color } // Add the new period
        ]
      };
    });
  });

  setMarkedDates(markedDates) // Return the populated markedDates object
};
const markedDates = populateCalendar([reservationPeriodMockup]);
console.log("markedDates", markedDates["2024-04-10"]);
  return (
    <View style={styles.container}> 
        <View style={styles.topcontainer}>
            <Text style={styles.textStyle}>djkasd</Text>
            <Button title='Fetch Data' onPress={()=>fetchData()}/>
            <Button title='reservationPeriodsStates()' onPress={()=>console.log(reservationPeriodsStates)}/>
            <Button title='reservationPeriodsStates()' onPress={()=>populateCalendar(reservationPeriodsStates)}/>
        </View>
        <Calendar
        showWeekNumbers
  markingType="multi-period"
  markedDates={dates}
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