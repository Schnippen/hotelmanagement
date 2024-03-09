import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { supabase } from '../Supabase/supabase'
import { Button } from '@rneui/base';
import { TBooking, TBookingDetails } from '../Types/types';
import { MOCKUPbookingDetailsFETCHdata } from '../Types/mockup';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { changeDateFormat } from '../Utils/functions';
import BookingDetailsListItem from '../Components/BookingDetailsListItem';
function BookingDetails({navigation,route}:any) {

  
const [state,setState]=useState<any>(null)

const {selectedDay}= route.params //selectedDay from previous screen  
console.log("params",selectedDay)
//2024-03-05

const formattedSelectedDay = `${selectedDay}T00:00:00Z`

const fetchData= async ()=>{
  try {
    console.log("trying to fetch")
    let { data: booking, error } = await supabase
    .from('booking')
    .select('*,payment_status(payment_status_name), booking_room(room_id(status_id(status_name)))')
    .filter('checkin_date', 'lte', formattedSelectedDay)
    .filter('checkout_date', 'gte', formattedSelectedDay)

    console.log("booking",booking)
    console.info("stringify:",JSON.stringify(booking, null, 2))
    
    setState(booking)
    if (error) {
      console.error('Error fetching data:', error);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return error
  }
}
let exampleData:TBooking[]=[{"booking_amount": 400, "booking_color": "#5f4868", "checkin_date": "2024-03-01T00:00:00+00:00", "checkout_date": "2024-03-07T00:00:00+00:00", "guest_id": "278f8945-f6cd-4ef5-b070-91d24eb9c28d", "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5", "num_adults": 1, "num_children": 1, "payment_status_id": 2}] 

// working on fetch
'booking_amount,booking_color,checkin_date,checkout_date,guest_id,id,num_adults,num_children,payment_status_id' 
//'booking_room(room_id(status_id(status_name)))'
/* .select('booking_amount,booking_color,checkin_date,checkout_date,guest_id,id,num_adults,num_children, payment_status(id,payment_status_name)') */
//payment_status(*),booking_room(room_id(*))

let MockupbookingDetails:TBookingDetails[] = [
  {
    "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5",
    "guest_id": "278f8945-f6cd-4ef5-b070-91d24eb9c28d",
    "payment_status_id": 2,
    "checkin_date": "2024-03-01T00:00:00+00:00",
    "checkout_date": "2024-03-07T00:00:00+00:00",
    "num_adults": 1,
    "num_children": 1,
    "booking_amount": 400,
    "booking_color": "#5f4868",
    "payment_status": {
      "id": 2,
      "payment_status_name": "Pending"
    },
    "booking_room": {
      "room_id": {
        "status_id": {
          "status_name": "Available"
        }
      }
    }
  }
]
const List = ({ state }: { state: TBookingDetails[] | null }) => {
  
  return state && state.length > 0 ? (
    state.map((item: any, index: number) => (
      <>
      <View key={index}>
        <Text>Index: {index}</Text>
        <Text>booking_amount: {item.booking_amount}</Text>
        <Text>booking_color: {item.booking_color}</Text>
        <Text>checkin_date: {changeDateFormat(item.checkin_date)}</Text>
        <Text>checkout_date: {changeDateFormat(item.checkout_date)}</Text>
        <Text>guest_id: {item.guest_id}</Text>
        <Text>id: {item.id}</Text>
        <Text>num_adults: {item.num_adults}</Text>
        <Text>checkin_date: {item.checkin_date}</Text>
        <Text>payment_status_id: {item.payment_status.payment_status_name}</Text>
        <Text>payment_status_id: {item.booking_room.room_id.status_id.status_name}</Text>
        <Text>status of booking??? </Text>
        <Text>CLICK FOR MORE DETAILS???</Text>
      </View>
      <BookingDetailsListItem BookingDetails={}/>
      </>
    ))
  ) : (
    <View>
      <Text>Nothing to map</Text>
    </View>
  );
};


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
            <Button type='outline' title={"local dataa"} onPress={()=>console.log("dsas")}></Button>
            <Text>On THIS DAy you havee reserved:</Text>
            <List state={MockupbookingDetails}/>
   </View>
  )
}

export default BookingDetails



/* SELECT *
FROM booking
WHERE '2021-08-25T00:00:00Z' BETWEEN checkin_date AND checkout_date; */