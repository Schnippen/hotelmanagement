import React, { useState } from 'react'
import { FlatList, ScrollView, View } from 'react-native'
import { supabase } from '../Supabase/supabase'
import { Button ,Text} from '@rneui/base';
import { TBooking, TBookingDetails } from '../Types/types';
import { MOCKUPbookingDetailsFETCHdata } from '../Types/mockup';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { changeDateFormat } from '../Utils/functions';
import BookingDetailsListItem from '../Components/BookingDetailsListItem';
//TODO create types for navigation
function BookingDetails({navigation,route}:any) {

  
const [state,setState]=useState<TBookingDetails[]|null>(null)

const {selectedDay}= route.params //selectedDay from previous screen  
//console.log("params",selectedDay)
//2024-03-05

const formattedSelectedDay = `${selectedDay}T00:00:00Z`
//TODO fetch data on first screen render with react querry
//TODO good example of how to fetch availble room or booking by date 

const fetchData= async ()=>{
  try {
    console.log("trying to fetch")
    let { data: booking, error } = await supabase
    .from('booking')
    .select('*,payment_status(payment_status_name), booking_room(room_id(status_id(status_name))),guest_id(first_name,last_name)')
/*     .filter('checkin_date', 'lte', formattedSelectedDay)
    .filter('checkout_date', 'gte', formattedSelectedDay) */
    .lte('checkin_date',  formattedSelectedDay)
    .gte('checkout_date',formattedSelectedDay)
    //.filter('checkout_date', 'gte', second)

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


// working on fetch
'booking_amount,booking_color,checkin_date,checkout_date,guest_id,id,num_adults,num_children,payment_status_id' 
//'booking_room(room_id(status_id(status_name)))'
/* .select('booking_amount,booking_color,checkin_date,checkout_date,guest_id,id,num_adults,num_children, payment_status(id,payment_status_name)') */
//payment_status(*),booking_room(room_id(*)) guest_id(first_name,first_name)

let MockupbookingDetails: TBookingDetails[] = [
  {
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    payment_status_id: 3,
    checkin_date: '2024-03-10T01:00:00+00:00',
    checkout_date: '2024-03-15T01:00:00+00:00',
    num_adults: 2,
    num_children: 2,
    booking_amount: 600,
    booking_color: 'green',
    payment_status: {
      payment_status_name: 'Cancelled',
    },
    booking_room: {
      room_id: {
        status_id: {
          status_name: 'Under Maintenance',
        },
      },
    },
    guest_id: {
      last_name: "Powers",
      first_name: "Austin",
    },
  }
];
const List = ({ state }: { state: TBookingDetails[] | null }) => {
  return state && state.length > 0 ? (
    state.map((item: TBookingDetails, index: number) => (
      <BookingDetailsListItem item={item} key={item.id}/>
    ))
  ) : (
    <View>
      <Text>Nothing to map</Text>
    </View>
  );
};

//TODO use correct english terms for bookings
//TODO add skeleton
  return (
    <View>
        
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
            <Text h3 style={{alignSelf:"center"}}>Bookings on this day:</Text>
            <Text h4 style={{alignSelf:"center",marginVertical:4}}>{selectedDay}</Text>
            <FlatList  
              style={{backgroundColor:"red",height:"100%"}}
              data={state}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <BookingDetailsListItem item={item} />}
            />
      {/* <List state={MockupbookingDetails}/> */}
   </View>
  )
}

export default BookingDetails



/* SELECT *
FROM booking
WHERE '2021-08-25T00:00:00Z' BETWEEN checkin_date AND checkout_date; */