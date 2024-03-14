import React, { useState } from 'react'
import { View } from 'react-native'
import RoomComponent from '../Components/RoomComponent'
import { Calendar } from 'react-native-calendars'
import { subtractDatesForBookingCalendar } from '../Utils/functions'

function AddBookingCalendar({navigation,route}:any) {
  const {roomDetails}= route.params
  console.log(JSON.stringify(roomDetails, null, 2))

  const [selectedDatesOnCalendar,setSelectedDatesOnCalendar]=useState<any>({startingDate:null,endingDate:null})

  const handleDateSelection = (dayOnTheCalendar:string) => {
    const startDate = selectedDatesOnCalendar.startingDate
    const endingDate =selectedDatesOnCalendar.endingDate
    if (startDate === null) {
      setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, startingDate: dayOnTheCalendar });
    } else if (startDate !== null && endingDate === null) {
      setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, endingDate: dayOnTheCalendar });
    }else if(startDate&&endingDate){
      const shit= subtractDatesForBookingCalendar(startDate,endingDate)
      setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, startingDate: dayOnTheCalendar });

      console.log("shit:",shit)
    } 

    console.log("handle():", selectedDatesOnCalendar)
    //return dayOnTheCalendar
    //setSelectedDatesOnCalendar({ startingDate: startDate, endingDate: endDate });
  };
  console.log(selectedDatesOnCalendar)
  return (
    <View style={{flex:1}}>
      {/* <RoomComponent item={roomDetails}/> */}
      <Calendar
            // Collection of dates that have to be marked. Default = {}
            markedDates={{
              '2024-03-16': {selected: true, marked: true, selectedColor: 'blue'},
              '2024-03-17': {marked: true},
              '2024-03-18': {marked: true, dotColor: 'red', activeOpacity: 0},
              '2024-03-19': {disabled: true, disableTouchEvent: true}
            }}
            onDayPress={(day)=>{
              console.log("onDayPress()",day.dateString), 
              handleDateSelection(day.dateString)}}
            onDayLongPress={day => {
              //checkDayReservation(day.dateString,globalCalendarData)
              console.log('onDayLongPress()', day.dateString);
             

            }}
          />
    </View>
  )
}

export default AddBookingCalendar