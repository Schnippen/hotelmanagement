import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import RoomComponent from '../Components/RoomComponent';
import {Calendar} from 'react-native-calendars';
import {
  changeDateFormat,
  getDayInfo,
  subtractDatesForBookingCalendar,
} from '../Utils/functions';
import {roomInitialParams} from '../Utils/initialParamsNavigation';
import {Button, Divider, Text} from '@rneui/themed';
import {TselectedDatesOnCalendar} from '../Types/types';
import {supabase} from '../Supabase/supabase';
//TODO add types to navigation,states and maybe route
//TODO add globa color in future????
function AddBookingCalendar({
  navigation,
  route,
}: {
  navigation: any;
  route?: any;
}) {
  const roomDetails = route?.params?.roomDetails || roomInitialParams;
  //console.log(JSON.stringify(roomDetails, null, 2))

  const [selectedDatesOnCalendar, setSelectedDatesOnCalendar] =
    useState<TselectedDatesOnCalendar>({startingDate: null, endingDate: null});
  const [markedDates, setMarkedDates] = useState<any>({}); //TODO TYPES
  const [fetchedData, setFetchedData] = useState<any>(null); //numbers of available bookings
  //add marked
  const handleFirstMarkedDate = (startDate: string) => {
    const firstDateToBeMarked = {
      [startDate]: {
        startingDay: true,
        selected: true,
        color: '#2596be',
        endingDay: true,
      },
    };
    //console.log("firstDateToBeMarked",firstDateToBeMarked)
    setMarkedDates(firstDateToBeMarked);
  };

  const handleDateSelection = (dayOnTheCalendar: string) => {
    const startDate = selectedDatesOnCalendar.startingDate;
    const endingDate = selectedDatesOnCalendar.endingDate;
    if (startDate === null) {
      setSelectedDatesOnCalendar({
        ...selectedDatesOnCalendar,
        startingDate: dayOnTheCalendar,
      });
      //one side marked
      handleFirstMarkedDate(dayOnTheCalendar);
    } else if (startDate !== null && endingDate === null) {
      setSelectedDatesOnCalendar({
        ...selectedDatesOnCalendar,
        endingDate: dayOnTheCalendar,
      });
      //both sides marked
      handleMarkedDates(startDate, dayOnTheCalendar);
    } else if (startDate && endingDate) {
      setSelectedDatesOnCalendar({
        ...selectedDatesOnCalendar,
        startingDate: dayOnTheCalendar,
        endingDate: null,
      });
      //one side marked
      handleFirstMarkedDate(dayOnTheCalendar);
      console.info('Reseting endingDate handleDateSelection()');
    }
    //one side marked

    console.log(selectedDatesOnCalendar);
  };

  const handleMarkedDates = (startDate: string, dayOnTheCalendar: string) => {
    const reservationPeriod = {
      startingDate: startDate,
      endingDate: dayOnTheCalendar,
    };
    const subtractedDates = subtractDatesForBookingCalendar(
      startDate,
      dayOnTheCalendar,
    );
    if (subtractedDates === 0) {
      setSelectedDatesOnCalendar({
        ...selectedDatesOnCalendar,
        startingDate: null,
        endingDate: null,
      });
      setMarkedDates({});
      console.error('same day selected, intended');
      return null;
    }
    const positiveSubtracredDates =
      subtractedDates < 0 ? Math.abs(subtractedDates - 1) : subtractedDates + 1;
    const howManyDays = positiveSubtracredDates; //subtractedDates+1 //subtracted + starting Day
    //console.log("howManyDays",howManyDays)
    let choosenDate = new Date(startDate);
    const markedDates = Array.from({length: howManyDays}, (_, index) => {
      const dateToAdd = new Date(choosenDate);
      const increment = subtractedDates < 0 ? -1 : 1; // Increment value based on positive or negative subtractedDates
      dateToAdd.setDate(dateToAdd.getDate() + increment * index);
      const isLastDay = index === howManyDays - 1;

      console.log(
        'index',
        index,
        'howmanyDays:',
        howManyDays,
        /*  'choosenDate:',
        choosenDate, */
        'dateTodate:',
        dateToAdd,
        'subtractedDates():',
        subtractedDates,
        //increment,
      );
      const isStartingDay = increment === 1 ? index === 0 : isLastDay;
      const isEndingDay = increment === -1 ? index === 0 : isLastDay;
      const colorGrading = index === 0 || isLastDay ? '#2596be' : '#3ba1c5'; //BUG when selecting dates from 31 march to 1 april, there is problem with getDate()
      return {
        [dateToAdd.toISOString().split('T')[0]]: {
          startingDay: isStartingDay, //index === 0,
          selected: true,
          color: colorGrading,
          endingDay: isEndingDay,
        },
      };
    }).reduce((acc, day) => ({...acc, ...day}), {});
    //console.log('markedDates:', JSON.stringify(markedDates, null, 2));
    setMarkedDates(markedDates);
  };
  const fetchData = async () => {
    try {
      const firstDate = selectedDatesOnCalendar.startingDate
        ? selectedDatesOnCalendar.startingDate
        : '';
      const secondDate = selectedDatesOnCalendar.endingDate
        ? selectedDatesOnCalendar.endingDate
        : '';
      const subtractedDates = subtractDatesForBookingCalendar(
        firstDate,
        secondDate,
      );
      const isPositiveSubtracredDates = subtractedDates > 0;
      const formattedFirstDate = `${selectedDatesOnCalendar.startingDate}T00:00:00Z`;
      const formattedLastDate = `${selectedDatesOnCalendar.endingDate}T00:00:00Z`;
      const earlier_date = isPositiveSubtracredDates
        ? formattedFirstDate
        : formattedLastDate;
      const later_date = isPositiveSubtracredDates
        ? formattedLastDate
        : formattedFirstDate;
      //console.log("trying to fetch",subtractedDates,"positive:?",isPositiveSubtracredDates,firstParam,secondParam)
      let {
        data: booking,
        error,
        count,
      } = await supabase
        .from('booking')
        .select('*', {count: 'exact', head: false}) //, { count: 'exact', head: true }
        .filter('checkin_date', 'lte', later_date) // be sure thr hours in supabase are T00:00:00Z //later_date
        .filter('checkout_date', 'gte', earlier_date); //earlier_date
      //'booking_room(room_id(status_id(status_name)))'
      console.log(
        'booking',
        booking,
        count,
        earlier_date,
        later_date,
        isPositiveSubtracredDates,
      );
      console.info(
        'stringify:',
        JSON.stringify(booking, null, 2),
        'length:',
        count,
      );

      setFetchedData(count);
      if (error) {
        console.error('Error fetching data:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };
  useEffect(() => {
    if (
      selectedDatesOnCalendar.startingDate &&
      selectedDatesOnCalendar.endingDate
    ) {
      console.log('useEffect()');
      //fetchData()
    }
  }, [
    selectedDatesOnCalendar.startingDate,
    selectedDatesOnCalendar.endingDate,
  ]);
  console.log(selectedDatesOnCalendar);
  //TODO maybe add default current ISO date from global state, to prevennt bugs?
  const firstReservationDate = selectedDatesOnCalendar.startingDate;
  const lastReservationDate = selectedDatesOnCalendar.endingDate;
  const firstDayName = firstReservationDate
    ? getDayInfo(firstReservationDate)
    : null;
  const lastDayName = lastReservationDate
    ? getDayInfo(lastReservationDate)
    : null;

  const AvailableRooms = () => {
    const displayString =
      fetchedData > 0 ? `Available Rooms: ${fetchedData}` : 'Choose Dates';
    return (
      <View style={{marginVertical: 8}}>
        <Divider inset={true} insetType="middle" color="#2596be" />
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: 'null',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text h4>{displayString}</Text>
        </View>
        <Divider inset={true} insetType="middle" color="#2596be" />
      </View>
    );
  };
  const GoToRoomScreen = () => {
    return (
      <View style={{marginVertical: 8}}>
        <Button
          title="See available rooms"
          disabled={fetchedData < 0}
          type="outline"
          onPress={() => {
            console.log('press');
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 120,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text>Check-in date: </Text>
          <Text h4>
            {firstDayName?.dayName} {firstDayName?.dayNumber}{' '}
            {firstDayName?.monthName} {firstDayName?.year}
          </Text>
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text>Check-out date:</Text>
          <Text h4>
            {' '}
            {lastDayName?.dayName} {lastDayName?.dayNumber}{' '}
            {lastDayName?.monthName} {lastDayName?.year}
          </Text>
        </View>
      </View>
      <Divider inset={true} insetType="middle" color="#2596be" />

      {/* <RoomComponent item={roomDetails}/> */}
      <Calendar
        // Collection of dates that have to be marked. Default = {}
        markingType={'period'}
        markedDates={{...markedDates}}
        onDayPress={day => {
          console.log('onDayPress()', day.dateString),
            handleDateSelection(day.dateString);
        }}
        onDayLongPress={day => {
          null;
        }}
      />
      <Button
        title="fetch data"
        type="outline"
        onPress={() => {
          console.log('press'), fetchData();
        }}
      />
      <AvailableRooms />
      <GoToRoomScreen />
    </View>
  );
}

export default AddBookingCalendar;
