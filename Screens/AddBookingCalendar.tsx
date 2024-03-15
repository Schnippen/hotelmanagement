import React, { useState } from 'react'
import { View } from 'react-native'
import RoomComponent from '../Components/RoomComponent'
import { Calendar } from 'react-native-calendars'
import { changeDateFormat, subtractDates, subtractDatesForBookingCalendar } from '../Utils/functions'
import { roomInitialParams } from '../Utils/initialParamsNavigation'
import { Divider, Text } from '@rneui/themed'
import { TselectedDatesOnCalendar } from '../Types/types'
//TODO add types to navigation,states and maybe route
//TODO add globa color in future????
function AddBookingCalendar({navigation,route}:{navigation:any,route?:any}) {
  const roomDetails = route?.params?.roomDetails || roomInitialParams;
  //console.log(JSON.stringify(roomDetails, null, 2))

  const [selectedDatesOnCalendar, setSelectedDatesOnCalendar] = useState<TselectedDatesOnCalendar>({ startingDate: null, endingDate: null });

  const [markedDates,setMarkedDates]=useState<any>({})
//add marked 
  const handleDateSelection = (dayOnTheCalendar:string) => {
    const startDate = selectedDatesOnCalendar.startingDate
    const endingDate =selectedDatesOnCalendar.endingDate
    if (startDate === null) {
      setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, startingDate: dayOnTheCalendar });
      //one side marked
      handleFirstMarkedDate(dayOnTheCalendar)
    } else if (startDate !== null && endingDate === null) {
        setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, endingDate:  dayOnTheCalendar });
        //both sides marked
        handleMarkedDates(startDate,dayOnTheCalendar)
    }else if(startDate&&endingDate){
     setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, startingDate: dayOnTheCalendar,endingDate:null });
     //one side marked
     handleFirstMarkedDate(dayOnTheCalendar)
     console.info("Reseting endingDate handleDateSelection()")
    }
          //one side marked

    console.log(selectedDatesOnCalendar)
  };

  const handleMarkedDates = (startDate: string, dayOnTheCalendar: string) => {
    const reservationPeriod = { startingDate: startDate, endingDate: dayOnTheCalendar };
    const subtractedDates = subtractDatesForBookingCalendar(startDate, dayOnTheCalendar);
    if(subtractedDates===0){
      setSelectedDatesOnCalendar({ ...selectedDatesOnCalendar, startingDate: null,endingDate:null });
      setMarkedDates({})
      console.error("same day selected, intended")
      return null
    }
    const positiveSubtracredDates = subtractedDates < 0?Math.abs(subtractedDates-1):subtractedDates+1 
    const howManyDays =positiveSubtracredDates//subtractedDates+1 //subtracted + starting Day
    //console.log("howwManyDays",howManyDays)
    let currentDate = new Date(startDate);
    const markedDates = Array.from({ length: howManyDays }, (_, index) => {
        const dateToAdd = new Date(currentDate);
        const increment = subtractedDates < 0 ? -1 : 1; // Increment value based on positive or negative subtractedDates
        dateToAdd.setDate(dateToAdd.getDate() + increment * index);
        const isLastDay = index === howManyDays - 1;
        
/*         console.log("index",index,howManyDays,"currentDate:",currentDate,"dateTodate:",dateToAdd,"subtractedDates():",subtractedDates,increment) */
        const isStartingDay = increment === 1 ? index === 0 : isLastDay;
        const isEndingDay = increment === -1 ? index === 0 : isLastDay;
        return {
            [dateToAdd.toISOString().split('T')[0]]: {
                startingDay: isStartingDay,//index === 0,
                selected: true,
                color: 'green',
                endingDay: isEndingDay
            }
        };
    }).reduce((acc, day) => ({ ...acc, ...day }), {});
    //console.log(markedDates)
    setMarkedDates(markedDates)
};

const handleFirstMarkedDate=(startDate:string)=>{
  const firstDateToBeMarked= {[startDate]:{startingDay:true,selected:true,color:"green",endingDay:true}}
  console.log("firstDateToBeMarked",firstDateToBeMarked)
  setMarkedDates(firstDateToBeMarked)
  
}

  console.log(selectedDatesOnCalendar)

  const firstReservationDate=selectedDatesOnCalendar.startingDate
  const lastReservationDate=selectedDatesOnCalendar.endingDate

  return (
    <View style={{flex:1}}>
      <View style={{height:100,backgroundColor:"red",justifyContent:"center"}}>
        <Text h4>Check-in date: {firstReservationDate}</Text>
        <Text h4>Check-out date: {lastReservationDate}</Text>
      </View>
      <Divider inset={true} insetType="middle" />

      {/* <RoomComponent item={roomDetails}/> */}
      <Calendar
            // Collection of dates that have to be marked. Default = {}
            markingType={'period'}

            markedDates={{...markedDates}}
/*             markedDates={{
      '2024-03-19': {startingDay: true, selected: true,color: 'green'},
      '2024-03-20': {startingDay: false,selected: true, color: 'green'},
      '2024-03-21': {selected: true, endingDay: true, color: 'green'}}} */
            onDayPress={(day)=>{
              console.log("onDayPress()",day.dateString), 
              handleDateSelection(day.dateString)}}
            onDayLongPress={day => {
              //checkDayReservation(day.dateString,globalCalendarData)
              console.log('onDayLongPress()', day.dateString);
              handleMarkedDates('2024-03-12','2024-03-15')

            }}
          />
    </View>
  )
}

export default AddBookingCalendar