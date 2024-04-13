import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import RoomsScreen from './Screens/RoomsScreen';
import CurrentBookingsScreen from './Screens/CurrentBookingsScreen';
import CalendarScreen from './Screens/CalendarScreen';
import HomeScreen from './Screens/Home';
import Settings from './Screens/Settings';
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_CURRENT_ISO_DATE,
  SET_CURRENT_ISO_DATE_SHORT,
  SET_CURRENT_MONTH,
} from './Store/Reducers/createCurrentISODate';
import {RootState} from './Store/store';
import AddBookingCalendar from './Screens/AddBookingCalendar';
import RoomDetailsScreen from './Screens/RoomDetailsScreen';
import {AuthLoginScreen} from './Screens/AuthLoginScreen';
import {supabase} from './Supabase/supabase';
import {SET_GLOBAL_AUTH_SESSION} from './Store/Reducers/setAuthSessionGlobal';
import TaskListScreen from './Screens/TaskListScreen';
import AgendaScreen from './Screens/AgendaScreen';
import BookingChartScreen from './Screens/BookingChartScreen';
import DashboardScreen from './Screens/DashboardScreen';
import MahjongScreen from './Utils/mahjong';

function MainApp() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  //https://tanstack.com/query/v5/docs/framework/react/react-native
  //SUPABASE AUTH SESSION
  //const [AUTHsession, setSession] = useState<Session | null>(null); //make it in REDUX
  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      //setSession(session);
      dispatch(SET_GLOBAL_AUTH_SESSION(session));
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      //setSession(session);
      dispatch(SET_GLOBAL_AUTH_SESSION(session));
    });
  }, []);
  //console.log('AUTHsession:', JSON.stringify(AUTHsession, null));
  //const GLOBALAUTH = useSelector((state: RootState) => state.authGlobal.value);
  //console.log('GLOBALAUTH', GLOBALAUTH);

  useEffect(() => {
    console.info('first useEffect()');
    dispatch(SET_CURRENT_ISO_DATE()); // 2024-03-09T15:36:25.492Z
    dispatch(SET_CURRENT_ISO_DATE_SHORT()); // 2024-03-09 for initial state of BookingDetails Screen
    dispatch(SET_CURRENT_MONTH())
  }, []);

  //initial states for screens params
  const initialStateForBookingDetailsScreen = useSelector(
    (state: RootState) => state.currentISODate.value
  );
  const monthFullName = useSelector(
    (state: RootState) => state.currentISODate.monthFullName
  );
  const monthNumber = useSelector(
    (state: RootState) => state.currentISODate.monthNumber
  );
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="RoomsScreen" component={RoomsScreen} />
        <Stack.Screen name="RoomDetailsScreen" component={RoomDetailsScreen} />
        <Stack.Screen
          name="CurrentBookingsScreen"
          component={CurrentBookingsScreen}
          initialParams={{selectedDay: initialStateForBookingDetailsScreen}}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="AddBookingCalendar"
          component={AddBookingCalendar}
        />
        <Stack.Screen
        name="AgendaScreen"
        component={AgendaScreen}
        />
      <Stack.Screen
        name="BookingChartScreen"
        component={BookingChartScreen}
        initialParams={{currentDay: initialStateForBookingDetailsScreen,monthFullName:monthFullName,monthNumber:monthNumber}}
        />
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        <Stack.Screen name="TaskListScreen" component={TaskListScreen} />
        <Stack.Group //Auth Screens
          screenOptions={{headerStyle: {backgroundColor: 'papayawhip'}}}>
          <Stack.Screen name="AuthLoginScreen" component={AuthLoginScreen} />
        </Stack.Group>
        <Stack.Screen
        name="MahjongScreen"
        component={MahjongScreen}
        />
      </Stack.Navigator>  
    </NavigationContainer>
  );
}

export default MainApp;
/*         <Stack.Group navigationKey={isSignedIn ? 'user' : 'guest'}>
          screens 
        </Stack.Group>; */
