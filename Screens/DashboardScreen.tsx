import { Text } from '@rneui/themed'
import React, { useState } from 'react'
import { Button, View } from 'react-native' 
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { supabase } from '../Supabase/supabase';
let BOOKING =[
  {
    "booking_color": "#5f4868",
    "checkin_date": "2024-04-01T00:00:00+00:00",
    "checkout_date": "2024-04-07T00:00:00+00:00",
    "booking_room": {
      "room_id": {
        "id": "0fad24a2-035e-4d12-9964-9ba84b4373c2",
        "floor_id": 5,
        "status_id": 7,
        "room_number": "1",
        "room_class_id": {
          "id": 7,
          "base_price": 100,
          "class_name": "Standard"
        }
      }
    },
    "guest_id": {
      "last_name": "Smith",
      "first_name": "Jane"
    }
  }
]
 let ROOM= [
  {
    "id": "4fac5959-62c8-41a8-855a-e149e4fc6c76",
    "room_number": "2",
    "room_class_id": {
      "class_name": "Deluxe"
    },
    "floor_id": {
      "floor_number": "1st Floor"
    }
  },
  {
    "id": "0fad24a2-035e-4d12-9964-9ba84b4373c2",
    "room_number": "1",
    "room_class_id": {
      "class_name": "Standard"
    },
    "floor_id": {
      "floor_number": "2nd Floor"
    }
  },
  {
    "id": "b79b8ae7-e19a-4485-8f03-4215b943aca6",
    "room_number": "3",
    "room_class_id": {
      "class_name": "Suite"
    },
    "floor_id": {
      "floor_number": "3rd Floor"
    }
  }
]




function DashboardScreen() {
  const [state,setState]=useState<any>(null)
  const [roomDetail,setRoomDetails]=useState<any>(null)
  const [roomTypes,setRoomTypes]=useState<null>(null)
  const [matchingBookingsSTATE,setMatchingBookings]=useState(null)

  const todayDate = useSelector(
    (state: RootState) => state.currentISODate.value,
  );

function organizeBookingsIntoGrid(bookings, rooms, startDate, endDate) {
  // Create an object to store bookings grouped by room type and room number
  const bookingGrid = {};

  // Create an array of dates between the start and end date
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Initialize the booking grid with empty arrays for each room type and room number
  rooms.forEach(room => {
    const roomType = room.room_class_id.class_name;
    if (!bookingGrid[roomType]) {
      bookingGrid[roomType] = {};
    }
    bookingGrid[roomType][room.room_number] = [];
  });

  // Populate the booking grid with bookings
  bookings.forEach(booking => {
    const roomType = booking.booking_room.room_id.room_class_id.class_name;
    const roomNumber = booking.booking_room.room_id.room_number;
    const checkinDate = new Date(booking.checkin_date);
    const checkoutDate = new Date(booking.checkout_date);
  
    console.log('Room type:', roomType);
    console.log('Room number:', roomNumber);
  
    // Check if the booking falls within the date range
    if (checkinDate <= endDate && checkoutDate >= startDate) {
      // Iterate over dates and add the booking to the corresponding room and date
      dates.forEach(date => {
        if (date >= checkinDate && date <= checkoutDate) {
          if (!bookingGrid[roomType][roomNumber]) {
            bookingGrid[roomType][roomNumber] = [];
          }
          bookingGrid[roomType][roomNumber].push({
            date: date.toISOString().split('T')[0],
            booking
          });
        }
      });
    }
  });
  console.log("bookingGrid:",JSON.stringify(bookingGrid))
  console.log("DATES:",JSON.stringify(dates))

  //console.log(bookingGrid);
  //console.log(dates);
  return { bookingGrid, dates };
}

function organizeBookingsIntoGrid2(bookings, rooms, startDate, endDate) {
  // Create an object to store bookings grouped by room type and room number
  const bookingGrid = {};

  // Create an array of dates between the start and end date
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Initialize the booking grid with empty arrays for each room type and room number
  rooms.forEach(room => {
    const roomType = room.room_class_id.class_name;
    if (!bookingGrid[roomType]) {
      bookingGrid[roomType] = {};
    }
    bookingGrid[roomType][room.room_number] = [];
  });

  // Populate the booking grid with booking IDs
  bookings.forEach(booking => {
    const roomType = booking.booking_room.room_id.room_class_id.class_name;
    const roomNumber = booking.booking_room.room_id.room_number;
    const checkinDate = new Date(booking.checkin_date);
    const checkoutDate = new Date(booking.checkout_date);

    // Check if the booking falls within the date range
    if (checkinDate <= endDate && checkoutDate >= startDate) {
      // Iterate over dates and add the booking ID to the corresponding room and date
      dates.forEach(date => {
        if (date >= checkinDate && date <= checkoutDate) {
          if (!bookingGrid[roomType][roomNumber]) {
            bookingGrid[roomType][roomNumber] = [];
          }
          bookingGrid[roomType][roomNumber].push(booking.id);
        }
      });
    }
  });

  // Return the booking grid and dates
  console.log("bookingGrid:",JSON.stringify(bookingGrid))
  console.log("DATES:",JSON.stringify(dates))

  return { bookingGrid, dates };
}
// Call the function with the list of bookings, rooms, and date range
const startDate = new Date('2024-03-01');
const endDate = new Date('2024-03-10');
const { bookingGrid, dates } = organizeBookingsIntoGrid(BOOKING, ROOM, startDate, endDate);
//console.log(bookingGrid);
//console.log(dates);

  const currentDate = new Date();
  console.log("currentDate:",currentDate)
  // Create a new Date object for 5 days later
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 3);
  // Format the dates to ISO 8601 string format
  const later_date = futureDate.toISOString();
  const earlier_date = currentDate.toISOString();

  const fetchData = async () => {
    try {
      console.log('trying to fetch');
  
      // Fetch booking and room data simultaneously
      const [bookingResponse, roomResponse] = await Promise.all([
        supabase.from('booking')
          .select('booking_room(room_id(*,room_class_id(*,id))),guest_id(first_name,last_name),booking_color,checkin_date,checkout_date')
          .filter('checkin_date', 'lte', later_date)
          .filter('checkout_date', 'gte', earlier_date),
        supabase.from('room')
          .select('id,room_number,room_class_id(class_name),floor_id(floor_number)'),
      ]);
  
      const { data: booking, error: bookingError } = bookingResponse;
      const { data: room, error: roomError } = roomResponse;
  
      console.log('booking', booking);
      console.log('room', room);
  
      console.info('stringify booking:', JSON.stringify(booking, null, 2));
      console.info('stringify room:', JSON.stringify(room, null, 2));
  
      setState(booking);
      setRoomDetails(room);
  
      // Handle errors from both requests
      if (bookingError) {
        console.error('Error fetching booking data:', bookingError);
      }
      if (roomError) {
        console.error('Error fetching room data:', roomError);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };
  
  const fetchData2 = async () => {
    try {
      console.log('trying to fetch');
      let {data: room, error} = await supabase
        .from('room_class') //fetching room types
        .select(
          'class_name',
        )//'id,room_number,room_class_id(class_name),floor_id(floor_number)',
      console.log('room_class', room);
      console.info('stringify:', JSON.stringify(room, null, 2));
      setRoomTypes(room);
      if (error) {
        console.error('Error fetching data:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };

  return (
    <View>
    <Button title={"fetch data bookings"} onPress={()=>fetchData()}/>
    <Button title={"fetch data rooms"} onPress={()=>fetchData2()}/>
    <Button title={"mapBookingsToRows"} onPress={()=> organizeBookingsIntoGrid(BOOKING, ROOM, startDate, endDate)}/>
        <Text>Dashboard</Text>
        <Text>{todayDate}</Text>
        <Text>Bookings made today</Text>
        <Text>Bookings made pas 7 days</Text>
        <Text>room nights blocked for next 30 days</Text>
        <Text>sold out dates for next 30 days</Text>
        <Text>Check-ins today</Text>
        <Text>Check-outs today</Text>
    </View>
  )
}

export default DashboardScreen


//if room matches than create items that will be put into the grid


let rows = [{"roomType":"Standard","bookings":[{"dates":["2024-04-01T00:00:00.000Z","2024-04-02T00:00:00.000Z","2024-04-03T00:00:00.000Z","2024-04-04T00:00:00.000Z","2024-04-05T00:00:00.000Z","2024-04-06T00:00:00.000Z","2024-04-07T00:00:00.000Z"],"booking":{"booking_color":"#5f4868","checkin_date":"2024-04-01T00:00:00+00:00","checkout_date":"2024-04-07T00:00:00+00:00","booking_room":{"room_id":{"id":"0fad24a2-035e-4d12-9964-9ba84b4373c2","floor_id":5,"status_id":7,"room_number":"1","room_class_id":{"id":7,"base_price":100,"class_name":"Standard"}}},"guest_id":{"last_name":"Smith","first_name":"Jane"}}}]}]