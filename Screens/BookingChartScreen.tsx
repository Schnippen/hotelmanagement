import { Button, Icon, Text } from '@rneui/themed'
import React, { useRef, useState } from 'react'
import { Dimensions, FlatList, ScrollView, Touchable, TouchableOpacity, View } from 'react-native'
import { supabase } from '../Supabase/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
/* const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />;
<TouchableOpacity style={{width:windowWidth/6,justifyContent:"center",alignItems:"center",}} activeOpacity={0.2} onPress={()=>console.log("press Calendar")}>
{IconCalendar} 
</TouchableOpacity> */
let BOOKING =
  [
    {
      "id": "4e39c081-6889-45ba-b02b-ba42e55bb5c5",
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
function BookingChartScreen({navigation, route}: any) {
  const [state,setState]=useState<any>(null)
  const [roomDetails,setRoomDetails]=useState(null)
  const [bookingGrid, setBookingGrid] = useState({});
  const [dates, setDates] = useState(null);
  const [dateVariable,setDateVariable]=useState(3)
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const cellWidth = windowHeight/5
  const cellBorderColor ="lightgray"
  const cellBackgroundColor= "white"
  const defaultColor="#B185A7"
  const cellColumnColor1="#E8DBC5"
  const cellColumnColor2="#FFF4E9"

  const todayDate = useSelector(
    (state: RootState) => state.currentISODate.value,
  );

  console.log("state:",state)
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
    //console.log(roomType)
    if (!bookingGrid[roomType]) {
      bookingGrid[roomType] = {};
      //console.log(bookingGrid[roomType])
    }
    bookingGrid[roomType][room.room_number] = [];
    //console.log("as",bookingGrid[roomType][room.room_number])
  });

  // Populate the booking grid with booking IDs
  bookings.forEach(booking => {
    const roomType = booking.booking_room.room_id.room_class_id.class_name;
    const roomNumber = booking.booking_room.room_id.room_number;
    const checkinDate = new Date(booking.checkin_date);
    const checkoutDate = new Date(booking.checkout_date);
    console.log(checkinDate,checkoutDate,endDate,startDate)
    // Check if the booking falls within the date range
    if (checkinDate <= endDate && checkoutDate >= startDate) {
      // Iterate over dates and add the booking ID to the corresponding room and date
      dates.forEach(date => {
        if (date >= checkinDate && date <= checkoutDate) {
          if (!bookingGrid[roomType][roomNumber]) {
            //console.log(bookingGrid[roomType][roomNumber])
            bookingGrid[roomType][roomNumber] = [];
          }
          bookingGrid[roomType][roomNumber].push(booking.id);
          //console.log("działam")
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

//const { bookingGrid, dates } = organizeBookingsIntoGrid(BOOKING, ROOM, startDate, endDate);

const handleStates=()=>{
  //console.log("PIIPIPIP",startDate,endDate,earlier_date,later_date)
  const { bookingGrid, dates } = organizeBookingsIntoGrid(BOOKING, ROOM, startDate, endDate);
  setBookingGrid(bookingGrid);
  const arrayOfDatesStrings = dates.map((item)=> item.toISOString())
  setDates(arrayOfDatesStrings);
  //console.log("setState:",bookingGrid);
//console.log("setStateDates:",dates);
//console.log(arrayOfDatesStrings.map((item)=> typeof item))
}
  const handleReachedEnd=()=>{
    setDateVariable((dateVariable)=>dateVariable+3)
    handleStates()
  }
  const currentDate = new Date();
  console.log("currentDate:",currentDate)
  // Create a new Date object for 5 days later
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + dateVariable);
  // Format the dates to ISO 8601 string format
  const later_date = futureDate.toISOString().split("T")[0].concat("T00:00:00Z");// Dates for supabase
  const earlier_date = currentDate.toISOString().split("T")[0].concat("T00:00:00Z");// Dates for supabase
  const startDate = new Date(earlier_date); // Dates for organizeBookingsIntoGrid
  const endDate = new Date(later_date); // Dates for organizeBookingsIntoGrid

  //console.log("DZIEN:","startDate:",startDate,"endDate:",endDate,"futureDate:",futureDate,"later_date:",later_date,"early_date:",earlier_date)
  const fetchData = async () => {
    try {
      console.log('trying to fetch');
  
      // Fetch booking and room data simultaneously
      const [bookingResponse, roomResponse] = await Promise.all([
        supabase.from('booking')
          .select('id,booking_room(room_id(*,room_class_id(*,id))),guest_id(first_name,last_name),booking_color,checkin_date,checkout_date')
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

  const DayPanel = ({ date,index }: { date: any,index:number }) => {    
    const dateString = date;
  const toChange = new Date(dateString);
  const dayName = toChange.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = String(toChange.getDate());
  const month =toChange.toLocaleDateString('en-US', { month: 'short' });
    //console.log(dayNumber,month, dayName)
    const columnRemainder=index%2===0
  return (
    <View style={{width:cellWidth,backgroundColor:columnRemainder?cellColumnColor1:cellColumnColor2,borderWidth: 1,borderColor:cellBorderColor,paddingLeft:10 }}>
        <Text h4>{dayName}</Text>
        <Text h4>{dayNumber}</Text>
        <Text h4>{month}</Text>
      </View>
  );
  }
  const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />
  const horizontalFlatListRef = useRef();

const handleScroll = (event) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  //console.log('Current scroll offset:', offsetX);
  // Scroll other horizontal FlatLists
  if (horizontalFlatListRef.current) {
    horizontalFlatListRef.current.scrollToOffset({ offset: offsetX, animated: false });
  }
};
  const TOPITEM=()=>{
    return(
      <View style={{ flexDirection: 'row', flex: 1 }}>
      <View style={{width:80,height:100}}>
      <TouchableOpacity style={{width:80,justifyContent:"center",alignItems:"center", flex: 1,backgroundColor:"#8D6B94",borderWidth: 1 }} activeOpacity={0.2} onPress={()=>console.log("press Calendar")}>
      {IconCalendar} 
      </TouchableOpacity>
      </View>
      <FlatList
        style={{flex:1}}
        data={dates} //tutaj daty
        renderItem={({ item,index }) => <DayPanel date={item} index={index}/>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        onScroll={handleScroll}
        //onEndReached={()=>{console.log("END REACHED"),handleReachedEnd()}}
      /></View>
    )}
    // Render each cell in the FlatList
    const RenderItem = ({ item ,index }) => {
      console.log("renderITEM-INDEX:",item)
      const columnRemainder=index%2===0
      if (!item.trim()) {
        return (
          <View style={{ width: cellWidth, borderWidth: 1,borderColor:cellBorderColor,backgroundColor:columnRemainder?cellColumnColor1:cellColumnColor2,justifyContent:"center",alignItems:"center"
           }}>
            <Text>EMPTY</Text>
          </View>
        );
      }
    
      if (!state) {
        return  (<View style={{ width: cellWidth, borderWidth: 1,borderColor:cellBorderColor,justifyContent:"center",alignItems:"center",backgroundColor:columnRemainder?cellColumnColor1:cellColumnColor2 }}>
        <Text>NO STATE</Text>
      </View>); // or handle the case when state is not available
      }
    
      const getObjectById = (id) => {
        return state.find((obj) => obj.id === id);
      };
    
      const foundObject = getObjectById(item);
      if (foundObject) {
        const cellColor = foundObject.booking_color;
        const cellFirstName =foundObject.guest_id.first_name
        const cellLastName =foundObject.guest_id.last_name
        const objCheckIn=foundObject.checkin_date.split("T")[0]
        const objCheckOut=foundObject.checkout_date.split("T")[0]
        const checkInStyle=objCheckIn===dates[index].split("T")[0]
        const checkOutStyle=objCheckOut===dates[index].split("T")[0]
        //console.log("foundObject:",objCheckIn,objCheckOut,checkInStyle,checkOutStyle,dates[index])
        return (
          <View style={{ width: cellWidth, borderWidth: 1, paddingTop:5,paddingLeft: checkInStyle?5:0,  paddingBottom:5, paddingRight:checkOutStyle?5:0,borderColor:cellBorderColor,borderRightWidth:checkOutStyle?1:0,borderLeftWidth:checkInStyle?1:0, backgroundColor:columnRemainder?cellColumnColor1:cellColumnColor2}}>
            <View style={{backgroundColor:cellColor?cellColor:"yellow",borderTopRightRadius:checkOutStyle? 20:0,borderBottomLeftRadius:checkInStyle? 20:0,borderTopLeftRadius:checkInStyle?5:0, flex:1,borderBottomRightRadius:checkOutStyle?5:0,paddingLeft:15}}>
              {index===0?<><Text>{cellFirstName}</Text><Text>{cellLastName}</Text></>:null}
            </View>
          </View>
        );//maybe add what kind of bed they sleep on?
      } else {
        return (
          <View style={{ width: cellWidth, borderWidth: 1,borderColor:cellBorderColor,justifyContent:"center",alignItems:"center",backgroundColor:columnRemainder?cellColumnColor1:cellColumnColor2 }}>
            <Text>NOT FOUND</Text>
          </View>
        );
      }
    };
    
/* const RENDERROW=({ item })=>{
  const roomTypeName= item[0]
  const roomNumber= Object.keys(item[1])[0];
  const emptyArray = Array.from({ length: dates.length }, (_, index) => "");
  //console.log(dates)  //TODO DO SPRAWDZENIA CAŁY SYSTEM ROBIENIA ARRAY
  let shit = item[1][1]===undefined?undefined:item[1][1].length
  let shit2 = item[1][1]!==undefined?item[1][1].concat(Array.from({ length:item[1][1].length }, (_, index) => " ")):undefined
  
  const renderSingleCellData=item[1][1]===undefined?emptyArray:shit2
  console.log("renderROW;", item[1][1],emptyArray.length,shit,shit2)
  return(
    <View style={{ flexDirection: 'row', flex: 1,height:100, }}>
      <View style={{height:100,width:80,justifyContent:"center",alignItems:'center',backgroundColor:defaultColor,borderWidth: 1}}>
      <Text >{roomTypeName}</Text>
      <Text >{roomNumber}</Text>
      </View>
    <FlatList
      data={renderSingleCellData}//['ASD','BSD','CSD']
      renderItem={RenderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal={true}
      extraData={bookingGrid}
      />
  </View>
  )
} */

const RENDERROW=({ item })=>{
  const PEPE = Object.entries(item);
  
  // Map over each entry in item to extract room type, room number, and bookings
  const ROOMS = PEPE.map(([roomType, roomObject]) => {
    // Extract room numbers and their corresponding bookings
    const roomNumber = Object.keys(roomObject);
    const bookings = roomNumber.map(number => roomObject[number]).flat(); // Flatten the bookings array
    console.log("Room Type:", roomType);
    console.log("Room Numbers:", roomNumber[0]);
    console.log("Bookings:", bookings);
    return { roomType, roomNumber, bookings };
  });

  // Flatten the rows data
  const rowData = ROOMS.map(i => {
    const emptyArray = Array.from({ length: dates.length }, (_, index) => " ");
    const ROW = i.bookings;
    let shit2 = ROW.concat(Array.from({ length: ROW.length }, (_, index) => " ")) ;
    console.log("ROW:", ROW, shit2,typeof ROW);
    const renderSingleCellData = ROW.some(item => item !== " ")? shit2 : emptyArray;
    console.log("renderROW;", ROW, emptyArray.length, shit2);
    return { roomType: i.roomType, roomNumber: i.roomNumber[0], data: renderSingleCellData };
  }).flat();

  return (
    <View style={{backgroundColor:"gray",flexDirection:"row",flex:1}}>
      <FlatList
            data={rowData}
            renderItem={({ item, index }) => ( 
            <View style={{ flexDirection: 'column', height:100,width:80,justifyContent:"center",alignItems:'center',backgroundColor:defaultColor,borderWidth: 1}}>
            <Text>{item.roomType}</Text>
            <Text>{item.roomNumber}</Text>
          </View>   )}
      />    
      <FlatList data={[0]} 
        ref={horizontalFlatListRef}
        horizontal 
      style={{backgroundColor:"orange",flex:1}}
       renderItem={()=>( 
       <FlatList
      style={{backgroundColor:"yellow" }}
      data={rowData}
      renderItem={({ item, index }) => (
            <View style={{ flexDirection: 'row', flexWrap: 'nowrap',height:100 }}>
              {item.data.map((dataItem, dataIndex) => (
                <RenderItem key={dataIndex} item={dataItem} index={dataIndex} />
              ))}
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />)}/>
     
    </View>
  );
}
{/*   <FlatList
    data={renderSingleCellData}//['ASD','BSD','CSD']
    renderItem={RenderItem}
    keyExtractor={(item, index) => index.toString()}
    horizontal={true}
    extraData={bookingGrid}
    /> */}
console.log("bookingGrid:",Object.entries(bookingGrid))
  return (
    <View style={{flex:1}}>
    <Button title={"fetch data bookings"} onPress={()=>fetchData()}/>
    <Button title={"handleStates()"} onPress={()=>handleStates()}/>
    <Button title={"mapBookingsToRows"} onPress={()=> organizeBookingsIntoGrid(BOOKING, ROOM, earlier_date, later_date)}/>
       <FlatList
       style={{flex:1}}
       data={[bookingGrid]} //tutaj rodzaje Object.entries(bookingGrid)
       renderItem={RENDERROW}
       ListHeaderComponent={TOPITEM} //this is OK
       extraData={dateVariable}
        /> 
    </View>
  )
}

export default BookingChartScreen

/*   const horizontalFlatListRef = useRef();
  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    console.log('Current scroll offset:', offsetX);
    // Scroll other horizontal FlatLists
    if (horizontalFlatListRef.current) {
      horizontalFlatListRef.current.scrollToOffset({ offset: offsetX, animated: false });
    }
  }; */