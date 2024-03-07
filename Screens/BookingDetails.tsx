import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { supabase } from '../Supabase/supabase'
import { Button } from '@rneui/base';

function BookingDetails({navigation,route}:any) {
  const {selectedDay}= route.params //selectedDay from previous screen  
console.log("params",selectedDay)
//2024-03-05

const formattedSelectedDay = `${selectedDay}T00:00:00Z`

const [state,setState]=useState<any>(null)
const fetchData= async ()=>{
  try {
    const selectedDate = '2024-03-14T00:00:00Z'

    console.log("trying to fetch")
    let { data: booking, error } = await supabase
    /* .from('booking')
    .select('*')
    .gte('checkin_date', selectedDate) // Check if checkin_date is greater than or equal to selectedDate
    .lte('checkout_date', selectedDate); // Check if checkout_date is less than or equal to selectedDate */
    .from('booking')
    .select('*')
    .filter('checkin_date', 'lte', selectedDate)
    .filter('checkout_date', 'gte', selectedDate)

    console.log("booking",booking)
    setState(booking)
    if (error) {
      console.error('Error fetching data:', error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error
  }
}


  return (
    <View>
        <Text>Booking Details {selectedDay}</Text>
        <Button onPress={()=>fetchData()}
              title="fetch data"
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
            />
            <Button type='outline' title={"ISO TIME"} onPress={()=>null}></Button>
    </View>
  )
}

export default BookingDetails



/* SELECT *
FROM booking
WHERE '2021-08-25T00:00:00Z' BETWEEN checkin_date AND checkout_date; */