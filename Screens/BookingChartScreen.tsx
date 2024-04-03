import { Button, Icon, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { Dimensions, FlatList, Touchable, TouchableOpacity, View } from 'react-native'
import { supabase } from '../Supabase/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

interface TroomTypes {
  class_name: string;
}
type TRoomDetails = {
  id: string;
  room_number: string;
  room_class_id: {
    class_name: string;
  };
  floor_id: {
    floor_number: string;
  };
};

function BookingChartScreen({navigation, route}: any) {
  let shitSTATE=  [
    {
      "class_name": "Standard"
    },
    {
      "class_name": "Deluxe"
    },
    {
      "class_name": "Suite"
    }
  ]
  let PUPUstate:TRoomDetails[]=  [
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
const [state,setState]=useState<any>(null)
const [roomTypes,setRoomTypes]=useState<TroomTypes[]|null>(shitSTATE)
const [roomDetail,setRoomDetails]=useState<any>(PUPUstate)

const {currentDay,monthFullName,monthNumber} = route.params;
const [monthState,setMonthState]=useState<number>(monthNumber)
const [data,setData]=useState<any>([ 
  { id: 1, room_number: '101', room_class: 'Standard' },
{ id: 2, room_number: '102', room_class: 'Deluxe' },
{ id: 3, room_number: '201', room_class: 'Standard' }]) //for populating room rows

const fullNames =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const roomTypesToDisplay= roomTypes?"roomTypes":"ROOM TYPE"
//console.log("FullMonth",fullNames[monthNumber])

const currentDate = new Date(currentDay);
  // Create a new Date object for 5 days later
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 3);
  // Format the dates to ISO 8601 string format
  const later_date = futureDate.toISOString();
  const earlier_date = currentDate.toISOString();
  console.log("later_date",later_date,"earlier_date",earlier_date)

  const fetchData = async () => {
    try {
      console.log('trying to fetch');
  
      // Fetch booking and room data simultaneously
      const [bookingResponse, roomResponse] = await Promise.all([
        supabase.from('booking')
          .select('booking_room(room_id(*)),guest_id(first_name,last_name),booking_color')
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

//TODO fetch room type and ROOms for ROOM TYPE in room occupancy component
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />;

const date = new Date();
//console.log("date:",date,windowHeight,windowWidth,monthName,dayName)
/* const data:Tdata[]= [
  { id: '1', text: "" },
  { id: '2', text: 'Item 2' },
  { id: '3', text: 'Item 3' },
  // Add more data as needed
]; */
const nextThreeDays: string[] = []; // Change type to string[]
const nextThreeDaysFull: string[] = []; // Change type to string[]

for (let i = 0; i < 3; i++) {
  const nextDate = new Date();
  nextDate.setDate(date.getDate() + i);
  nextThreeDays.push(nextDate.toDateString());
  nextThreeDaysFull.push(nextDate.toISOString().split("T")[0].concat("T00:00:00Z"))
  //console.log(nextDate.toISOString().split("T")[0].concat("T00:00:00Z"))
} console.log(nextThreeDaysFull)
const DayPanel = ({ date }: { date: string }) => {    
    const dateSplited=date.split(" ")
    const dayName=dateSplited[0]
    const month = dateSplited[1]
    const dayNumber = dateSplited[2]
    //console.log(dateSplited)
  return (
    <View style={{ height: 80,flex:1,backgroundColor:"white",borderWidth: 1,borderColor:"lightgray"}}>
      <Text>{dayName}</Text>
      <Text>{month}</Text>
      <Text>{dayNumber}</Text>
    </View>
  );
}
//        <Text h4>{displayMonthFullName}</Text>
const MonthPanel=()=>{
  const leftArrow = <Icon name="arrow-left" size={30} color="white" />;
  const rightArrow = <Icon name="arrow-right" size={30} color="white" />;
  const handleMonthChange=(direction:string)=>{
    fullNames.length
    console.log(monthState,fullNames.length)
    if (direction === 'right') {
      monthState===11?setMonthState((monthState)=>0):
      setMonthState((monthState)=>monthState+1)
  } else if (direction === 'left') {
    monthState===0?setMonthState((monthState)=>11):
    setMonthState((monthState)=>monthState-1)
  }}

  return(
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:"space-around",height:60}}>
      <Button onPress={()=>handleMonthChange("left")} style={{height:40,width:40,backgroundColor:"red"}} title={"chuj"}>{leftArrow}</Button>
      <Text h4 >{fullNames[monthState]}</Text>
      <Button onPress={()=>handleMonthChange("right")} style={{height:40,width:40,backgroundColor:"red"}} title={"chuj"}>{rightArrow}</Button>
    </View>
  ) 

}

const TopPanel = () => {
  const DaysToRender = nextThreeDays.map((date, index) => {
    return <DayPanel date={date} key={date+index}/>
  });
  //TODO make a calendar Button
  return (
    <View >
    <View style={{ height: 80, backgroundColor: "red", width: windowWidth, flexDirection: 'row' }}>
    <TouchableOpacity style={{width:windowWidth/6,justifyContent:"center",alignItems:"center",}} activeOpacity={0.2} onPress={()=>console.log("press Calendar")}>
        {IconCalendar} 
    </TouchableOpacity>
      {DaysToRender}
      </View>
    </View>
  );
}

type Tdata={
    id: string;
    text: string;
}


/* function hasMatchingRooms(){ let data = BOOKING  
  const bookingRoomIds= data.map(data=>data.booking_room.room_id.id) 
  console.log(bookingRoomIds)
  const hasMatchingRoom = ROOM.filter(ROOM => bookingRoomIds.includes(ROOM.id));
  console.log(hasMatchingRoom)
  const matchingBookings = BOOKING.filter(booking => bookingRoomIds.includes(booking.booking_room.room_id.id));
  console.log(matchingBookings);
} */

  const RoomItem = ({ item }: { item: any }) => {
    //console.log("ROOM ITEM:",item)

    return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 80,backgroundColor:"white",borderWidth: 1,borderColor:"lightgray",width:windowWidth/3 }}>
      <Text>"sa"</Text>
    </View>
  )};
const RoomsOccupancyList=()=>{
    return(
        //here flatlist to do more nesting
        <View style={{backgroundColor:"red", width:windowWidth,flexDirection:"row"}}>
        <View style={{backgroundColor:"lightblue",width:windowWidth/6,height:80,justifyContent:'center',alignItems:"center"}}>
            <Text>{roomTypesToDisplay}</Text>
        </View>
        <FlatList
        //horizontal={true}
        data={data.slice(0,3)}// TODO change that //state
        keyExtractor={(item, index:number) => `${index}`}
        renderItem={RoomItem}
        numColumns={3}
        //getItemLayout
      />
      </View>
    )
}
//TODO consider if I really need FLATLISTS xD? 
const RoomsOccupancyList2 = () => {
  // Assuming roomTypesToDisplay is an array of room types
  const RenderRoomType = ({ item }:{item:TRoomDetails}) => {
    //console.log(item)
    return(
      <View style={{ backgroundColor: "red", width: windowWidth, flexDirection: "row" }}>
          <View style={{ backgroundColor: "lightblue", width: windowWidth / 6, height: 80, justifyContent: 'center', alignItems: "center" }}>
              <Text>{item.room_class_id.class_name}</Text>
              <Text>{item.room_number}</Text>
              <Text>{item.floor_id.floor_number}</Text>
          </View>
          <FlatList
            horizontal
              data={data.slice(0, 3)} // Assuming data contains occupancy data for each room type
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={RoomItem}
          />
      </View>
  )}

  return (
   < View>
    <TopPanel2/>
      <FlatList
          data={roomDetail}
          keyExtractor={(item, index) => `${index}`}
          renderItem={RenderRoomType}
          
      />
      </View>
  );
}
const TopPanel2 = () => {
  const DayPanel = ({ date }: { date: string }) => {    
    const dateSplited = date.split(" ");
    const dayName = dateSplited[0];
    const month = dateSplited[1];
    const dayNumber = dateSplited[2];
  
    return (
      <View style={{width:windowWidth/3, height: 80, flex: 1, backgroundColor: "white", borderWidth: 1, borderColor: "lightgray" }}>
        <Text>{dayName}</Text>
        <Text>{month}</Text>
        <Text>{dayNumber}</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: string }) => <DayPanel date={item} />;

  return (
    <View>
      <View style={{ height: 80, backgroundColor: "red", width: windowWidth, flexDirection: 'row' }}>
        <TouchableOpacity style={{ width: windowWidth / 6, justifyContent: "center", alignItems: "center" }} activeOpacity={0.2} onPress={() => console.log("press Calendar")}>
          {IconCalendar} 
        </TouchableOpacity>
        <FlatList
        horizontal
          data={nextThreeDays}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}


return (
  <View style={{ flex: 1, backgroundColor: "pink" }}>
    <MonthPanel/>
    <TopPanel/>
    <RoomsOccupancyList/>
    <Text>BookingChartScreen SEPARATOR</Text>
    <Button title={"fetch data bookings"} onPress={()=>fetchData()}/>
    <Button title={"fetch data rooms"} onPress={()=>fetchData2()}/>
{/*     <Button title={"shit"} onPress={()=>shit()}/>h*/}
    <RoomsOccupancyList2/>
  </View>
);
}
export default BookingChartScreen
//TODO Unify styles
let mockupFETCh=  [
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

/*   <View style={{backgroundColor:"red", width:windowWidth,flexDirection:"row"}}>
        <View style={{backgroundColor:"lightblue",width:windowWidth/6,height:80,justifyContent:'center',alignItems:"center"}}>
            <Text>roomTypes state</Text>
        </View>
        <FlatList
        //horizontal={true}
        data={data.slice(0,3)}// TODO change that
        keyExtractor={(item, index:number) => item.id}
        renderItem={RoomItem}
        numColumns={3}
        //getItemLayout
      />
        </View> */
        