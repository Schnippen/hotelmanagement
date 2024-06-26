import {Button, Icon, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeScrollPoint,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from 'react-native';
import {supabase} from '../Supabase/supabase';
import {
  TBookingChart,
  TBookingGrid,
  TBookingObject,
  TRoomFetch,
} from '../Types/types';
import {useQuery} from '@tanstack/react-query';
import {organizeBookingsIntoGrid} from '../Utils/functions';
import {fetchBookingsAndRooms} from '../Utils/fetchFunctions';
/* const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />;
<TouchableOpacity style={{width:windowWidth/6,justifyContent:"center",alignItems:"center",}} activeOpacity={0.2} onPress={()=>console.log("press Calendar")}>
{IconCalendar} 
</TouchableOpacity> */
let BOOKING = [
  {
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    booking_color: '#5f4868',
    checkin_date: '2024-04-01T00:00:00+00:00',
    checkout_date: '2024-04-07T00:00:00+00:00',
    booking_room: {
      room_id: {
        id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
        floor_id: 5,
        status_id: 7,
        room_number: '1',
        room_class_id: {
          id: 7,
          base_price: 100,
          class_name: 'Standard',
        },
      },
    },
    guest_id: {
      last_name: 'Smith',
      first_name: 'Jane',
    },
  },
];
let ROOM = [
  {
    id: '4fac5959-62c8-41a8-855a-e149e4fc6c76',
    room_number: '2',
    room_class_id: {
      class_name: 'Deluxe',
    },
    floor_id: {
      floor_number: '1st Floor',
    },
  },
  {
    id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
    room_number: '1',
    room_class_id: {
      class_name: 'Standard',
    },
    floor_id: {
      floor_number: '2nd Floor',
    },
  },
  {
    id: 'b79b8ae7-e19a-4485-8f03-4215b943aca6',
    room_number: '3',
    room_class_id: {
      class_name: 'Suite',
    },
    floor_id: {
      floor_number: '3rd Floor',
    },
  },
];
type TDateStrings = string[];

function BookingChartScreen({navigation, route}: any) {
  const [state, setState] = useState<TBookingChart[] | null>(null);
  const [roomDetails, setRoomDetails] = useState<TRoomFetch[] | null>(null);
  const [bookingGrid, setBookingGrid] = useState<TBookingGrid<string>>({});
  const [dates, setDates] = useState<TDateStrings>([]);
  const [dateVariable, setDateVariable] = useState<number>(7); // maybe i will add a selectable time period
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [futureDate, setFutureDate] = useState<Date>(() => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7); // futureDate to currentDate + 7 days
    return nextWeek;
  });
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const cellWidth = windowHeight / 5;
  const cellBorderColor = 'lightgray'; //TODO create global styles for app in the future
  const cellBackgroundColor = 'white';
  const defaultColor = '#B185A7';
  const cellColumnColor1 = '#E8DBC5';
  const cellColumnColor2 = '#FFF4E9';
  const handleStates = () => {
    //console.log("PIIPIPIP",startDate,endDate,earlier_date,later_date)
    /*   const {bookingGrid, dates} = organizeBookingsIntoGrid(
      state,
      roomDetails,
      startDate,
      endDate,
    ); */
    setBookingGrid(bookingGrid);
    const arrayOfDatesStrings = dates.map(item => item.toISOString()); // IMPORTANT
    setDates(arrayOfDatesStrings); // HERE DATES ARE SET FOR FLATLIST
    //console.log("setState:",bookingGrid);
    //console.log("setStateDates:",dates);
    console.log(
      'arrayOfDatesStrings:',
      arrayOfDatesStrings.map(item => item),
    );
  };

  const handleAddWeek = () => {
    const nextWeek = new Date(futureDate);
    nextWeek.setDate(futureDate.getDate() + 7);
    setFutureDate(nextWeek);
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)));
  };
  const handleMinusWeek = () => {
    const prevWeek = new Date(futureDate);
    prevWeek.setDate(futureDate.getDate() - 7);
    setFutureDate(prevWeek);
    setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)));
  };
  const later_date: string = futureDate
    .toISOString()
    .split('T')[0]
    .concat('T00:00:00Z'); // Dates for supabase
  const earlier_date: string = currentDate
    .toISOString()
    .split('T')[0]
    .concat('T00:00:00Z'); // Dates for supabase
  const startDate: Date = new Date(earlier_date); // Dates for organizeBookingsIntoGrid
  const endDate: Date = new Date(later_date); // Dates for organizeBookingsIntoGrid
  /*  console.log(
    'DZIEN:',
    'startDate:',
    startDate,
    'endDate:',
    endDate,
    'futureDate:',
    futureDate,
    'later_date:',
    later_date,
    'early_date:',
    earlier_date,
  ); */

  const {
    data: result,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ['BookingChart', futureDate],
    queryFn: () => fetchBookingsAndRooms([later_date, earlier_date]),
    staleTime: 30000,
  });
  console.log(
    'result:',
    result?.booking,
    result?.room,
    later_date,
    earlier_date,
  );

  useEffect(() => {
    if (isSuccess && !isLoading && result) {
      setState(result?.booking);
      setRoomDetails(result?.room);
      const {bookingGrid, dates} = organizeBookingsIntoGrid(
        result?.booking,
        result?.room,
        startDate,
        endDate,
      );
      if (bookingGrid && dates) {
        console.log('fetching:', dates);
        setBookingGrid(bookingGrid);
        const arrayOfDatesStrings = dates.map(item => item.toISOString());
        setDates(arrayOfDatesStrings);
      }
    }
  }, [result, isLoading, isSuccess]);

  /*    if (booking && room) {
     setState(booking);
     setRoomDetails(room);

     const {bookingGrid, dates} = organizeBookingsIntoGrid(
       booking,
       room,
       startDate,
       endDate,
     );
     if (bookingGrid && dates) {
       console.log('fetching:', dates);
       setBookingGrid(bookingGrid);
       const arrayOfDatesStrings = dates.map(item => item.toISOString());
       setDates(arrayOfDatesStrings);
     }
   } */

  const DayPanel = ({date, index}: {date: any; index: number}) => {
    const dateString = date;
    const toChange = new Date(dateString);
    const dayName = toChange.toLocaleDateString('en-US', {weekday: 'short'});
    const dayNumber = String(toChange.getDate());
    const month = toChange.toLocaleDateString('en-US', {month: 'short'});
    //console.log(dayNumber,month, dayName)
    const columnRemainder = index % 2 === 0;
    return (
      <View
        style={{
          width: cellWidth,
          backgroundColor: columnRemainder
            ? cellColumnColor1
            : cellColumnColor2,
          borderWidth: 1,
          borderColor: cellBorderColor,
          paddingLeft: 10,
        }}>
        <Text h4>{dayName}</Text>
        <Text h4>{dayNumber}</Text>
        <Text h4>{month}</Text>
      </View>
    );
  };
  const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />;
  const horizontalFlatListRef = useRef<FlatList<number>>(null);
  const scrollIndex = useRef(null);

  const handleScrollHorizontal = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    //console.log('Current scroll offset:', offsetX);
    if (horizontalFlatListRef.current) {
      horizontalFlatListRef.current.scrollToOffset({
        offset: offsetX,
        animated: false,
      });
    }
  };
  function handleScroll2(event: NativeSyntheticEvent<NativeScrollEvent>): void {
    // if distanceFromStart.x === 0 we reach the start of the list
    const distanceFromStart: NativeScrollPoint =
      event.nativeEvent.contentOffset;
    if (distanceFromStart.x === 0) prependData();
  }
  const handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ): void => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const layoutMeasurementWidth = event.nativeEvent.layoutMeasurement.width;
    const contentSizeWidth = event.nativeEvent.contentSize.width;

    // if scrolled to the end of flatlist
    if (contentOffsetX + layoutMeasurementWidth >= contentSizeWidth) {
      //handleAddWeek();
      console.log('APPEND');
    }
  };

  function prependData(): void {
    console.log('prepend');
    //setDateVariable(dateVariable => dateVariable - 6);
    console.log('dateVariable:', dateVariable);
  }
  const handleReachedEnd = () => {
    setDateVariable(dateVariable => dateVariable + 6);
    console.log('dateVariable:', dateVariable);
    //handleStates();
    //const lastIndex = dates.length - 1;
    // targetIndex = lastIndex > 0 ? lastIndex - 1 : 0;

    // Scroll to the item before the last one
    //scrollIndex.current.scrollToIndex({index: targetIndex, animated: true});
  };
  const TOPITEM = () => {
    return (
      <View style={{flexDirection: 'row', flex: 1}}>
        <View style={{width: 80, height: 100}}>
          <TouchableOpacity
            style={{
              width: 80,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#8D6B94',
              borderWidth: 1,
            }}
            activeOpacity={0.2}
            onPress={() => console.log('press Calendar')}>
            {IconCalendar}
          </TouchableOpacity>
        </View>
        <FlatList
          style={{flex: 1}}
          data={dates} //tutaj daty
          renderItem={({item, index}) => <DayPanel date={item} index={index} />}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          ref={scrollIndex}
          //onScroll={handleScroll}
          onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>): void => {
            handleScroll2(event);
            handleScrollEnd(event);
            handleScrollHorizontal(event);
          }}
        />
      </View>
    );
  };
  // TRYING TO OPTIMIZE FLATLIST with callback :) ?
  const RenderItem = useCallback(
    ({item, index}: {item: TBookingObject; index: number}) => {
      const columnRemainder = index % 2 === 0;

      if (!item) {
        return (
          <View
            style={{
              width: cellWidth,
              borderWidth: 1,
              borderColor: cellBorderColor,
              backgroundColor: columnRemainder
                ? cellColumnColor1
                : cellColumnColor2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>EMPTY</Text>
          </View>
        );
      }

      if (!state) {
        return (
          <View
            style={{
              width: cellWidth,
              borderWidth: 1,
              borderColor: cellBorderColor,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: columnRemainder
                ? cellColumnColor1
                : cellColumnColor2,
            }}>
            <Text>NO STATE</Text>
          </View>
        );
      }

      const getObjectById = (id: TBookingObject) => {
        return state.find(obj => obj.id === id.bookingID);
      };

      const foundObject = getObjectById(item);

      if (foundObject) {
        //console.log(index, dates);
        const cellColor = foundObject.booking_color;
        const cellFirstName = foundObject.guest_id.first_name;
        const cellLastName = foundObject.guest_id.last_name;
        const objCheckIn = new Date(foundObject.checkin_date).toISOString();
        const objCheckOut = new Date(foundObject.checkout_date).toISOString();
        const dateAtIndex = dates[index]
          ? new Date(dates[index]).toISOString()
          : ' '; //TODO fix the render of dates

        const checkInStyle = objCheckIn === dateAtIndex;
        const checkOutStyle = objCheckOut === dateAtIndex;
        /*     console.log(
          'dateAtIndex:',
          dateAtIndex,
          'objCheckIn:',
          objCheckOut,
          checkInStyle,
          checkOutStyle,
          dates[index],
        ); */
        return (
          <View
            style={{
              width: cellWidth,
              borderWidth: 1,
              paddingTop: 5,
              paddingLeft: checkInStyle ? 5 : 0,
              paddingBottom: 5,
              paddingRight: checkOutStyle ? 5 : 0,
              borderColor: cellBorderColor,
              borderRightWidth: checkOutStyle ? 1 : 0,
              borderLeftWidth: checkInStyle ? 1 : 0,
              backgroundColor: columnRemainder
                ? cellColumnColor1
                : cellColumnColor2,
            }}>
            <View
              style={{
                backgroundColor: cellColor ? cellColor : 'yellow',
                borderTopRightRadius: checkOutStyle ? 20 : 0,
                borderBottomLeftRadius: checkInStyle ? 20 : 0,
                borderTopLeftRadius: checkInStyle ? 5 : 0,
                flex: 1,
                borderBottomRightRadius: checkOutStyle ? 5 : 0,
                paddingLeft: 15,
              }}>
              {index === 0 ? ( // FIX IT
                <>
                  <Text>{cellFirstName}</Text>
                  <Text>{cellLastName}</Text>
                </>
              ) : null}
            </View>
          </View>
        );
      } else {
        return (
          <View
            style={{
              width: cellWidth,
              borderWidth: 1,
              borderColor: cellBorderColor,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: columnRemainder
                ? cellColumnColor1
                : cellColumnColor2,
            }}>
            <Text>NOT FOUND</Text>
          </View>
        );
      }
    },
    [bookingGrid],
  );

  const RENDERROW = ({item}: {item: TBookingGrid<string>}) => {
    // console.log('RENDERROW ITEM:', item);
    const PEPE = Object.entries(item);
    //console.log('PEPE:', PEPE);
    // Map over each entry in item to extract room type, room number, and bookings
    const ROOMS = PEPE.map(([roomType, roomObject]) => {
      // Extract room numbers and their corresponding bookings
      const roomNumber = Object.keys(roomObject);
      const bookings = roomNumber.map(number => roomObject[number]).flat(); // Flatten the bookings array
      //console.log('Room Type:', roomType);
      //console.log('Room Numbers:', roomNumber[0]);
      //console.log('Bookings:', bookings);
      return {roomType, roomNumber, bookings};
    });

    // Flatten the rows data
    const rowData = ROOMS.map(i => {
      const emptyArray = Array.from({length: dates.length}, (_, index) => ' ');
      const ROW = i.bookings;
      let filledROW = ROW.concat(
        Array.from({length: dates.length - ROW.length}, (_, index) => ' '),
      );
      /*       console.log(
        'ROW:',
        ROW,
        'filledROW:',
        typeof ROW,
        ROW.length,
        filledROW.length,
        dates.length,
      ); */
      const renderSingleCellData = ROW.some(
        item => typeof item !== 'string' && item.bookingID !== null,
      )
        ? filledROW
        : emptyArray;

      //console.log('renderROW:', ROW, emptyArray.length, filledROW);
      return {
        roomType: i.roomType,
        roomNumber: i.roomNumber[0],
        data: renderSingleCellData,
      };
    }).flat();

    return (
      <View style={{backgroundColor: 'gray', flexDirection: 'row', flex: 1}}>
        <FlatList
          data={rowData}
          renderItem={(
            {item, index}, // make it into  component
          ) => (
            <View
              style={{
                flexDirection: 'column',
                height: 100,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: defaultColor,
                borderWidth: 1,
              }}>
              <Text>{item.roomType}</Text>
              <Text>{item.roomNumber}</Text>
            </View>
          )}
        />
        <FlatList
          data={[0]}
          ref={horizontalFlatListRef}
          horizontal
          style={{backgroundColor: 'lightgray', flex: 1}}
          renderItem={() => (
            <FlatList
              style={{backgroundColor: 'yellow'}}
              data={rowData}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    height: 100,
                  }}>
                  {item.data.map((dataItem, dataIndex) => (
                    <RenderItem
                      key={dataIndex}
                      item={dataItem}
                      index={dataIndex}
                    />
                  ))}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Button title={'handleStates()'} onPress={() => handleStates()} />
      <Button title={'NEXT_WEEK'} onPress={() => handleAddWeek()} />
      <Button title={'PREVIOUS_WEEK'} onPress={() => handleMinusWeek()} />
      <Button
        title={'ORGANIZE()'}
        onPress={() =>
          organizeBookingsIntoGrid(state, roomDetails, startDate, endDate)
        }
      />

      <FlatList
        style={{flex: 1}}
        data={[bookingGrid]} //tutaj rodzaje Object.entries(bookingGrid)
        renderItem={RENDERROW}
        ListHeaderComponent={TOPITEM} //this is OK
        extraData={dateVariable}
      />
    </View>
  );
}

export default BookingChartScreen;
