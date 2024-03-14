import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import AddBooking from './Screens/AddBooking';
import BookingDetails from './Screens/BookingDetails';
import CalendarScreen from './Screens/Calendar';
import HomeScreen from './Screens/Home';
import Settings from './Screens/Settings';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_ISO_DATE, SET_CURRENT_ISO_DATE_SHORT } from './Store/Reducers/createCurrentISODate';
import { RootState } from './Store/store';
import AddBookingCalendar from './Screens/AddBookingCalendar';


function MainApp() {

const Stack = createNativeStackNavigator();
const dispatch =useDispatch()

useEffect(()=>{
console.info("first useEffect()")
  dispatch(SET_CURRENT_ISO_DATE()) // 2024-03-09T15:36:25.492Z
  dispatch(SET_CURRENT_ISO_DATE_SHORT()) // 2024-03-09 for initial state of BookingDetails Screen
},[])

//initial states for screens params
const initialStateForBookingDetailsScreen = useSelector((state:RootState) => state.currentISODate.value)

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="AddBooking" component={AddBooking} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} 
        initialParams={ {selectedDay: initialStateForBookingDetailsScreen }}/>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AddBookingCalendar" component={AddBookingCalendar} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default MainApp