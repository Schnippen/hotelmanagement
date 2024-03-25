import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import RoomsScreen from './Screens/RoomsScreen';
import CurrentBookingsScreen from './Screens/CurrentBookingsScreen';
import CalendarScreen from './Screens/Calendar';
import HomeScreen from './Screens/Home';
import Settings from './Screens/Settings';
import {useDispatch, useSelector} from 'react-redux';
import {
  SET_CURRENT_ISO_DATE,
  SET_CURRENT_ISO_DATE_SHORT,
} from './Store/Reducers/createCurrentISODate';
import {RootState} from './Store/store';
import AddBookingCalendar from './Screens/AddBookingCalendar';
import RoomDetailsScreen from './Screens/RoomDetailsScreen';
import {AuthLoginScreen} from './Screens/AuthLoginScreen';
import {Session} from '@supabase/supabase-js';
import {supabase} from './Supabase/supabase';
import {SET_GLOBAL_AUTH_SESSION} from './Store/Reducers/setAuthSessionGlobal';

function MainApp() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

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
  }, []);

  //initial states for screens params
  const initialStateForBookingDetailsScreen = useSelector(
    (state: RootState) => state.currentISODate.value,
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
        <Stack.Screen name="AuthLoginScreen" component={AuthLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainApp;
