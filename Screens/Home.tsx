import React, {PropsWithChildren} from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {supabase} from '../Supabase/supabase';
//import { supabase } from '../Supabase/supabase';
import {Button} from '@rneui/base';
import {Icon} from '@rneui/themed';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';

function HomeScreen({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';

    //name={`${OS ? "ios" : "md"}-stepforward`}
  let OS = Platform.OS === 'ios';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const myIcon = <Icon name="rocket" size={30} color="#900" />;
  const GLOBALAUTH = useSelector((state: RootState) => state.authGlobal.value);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
          flex: 1,
        }}>
        <Button
          title="Go to calendar"
          onPress={() => navigation.navigate('CalendarScreen')}
        />
        <Button
          title="Go to RoomsScreen"
          onPress={() => navigation.navigate('RoomsScreen')}
        />
        <Button
          title="Go to CurrentBookingsScreen"
          onPress={() => navigation.navigate('CurrentBookingsScreen')}
        />
        <Button
          onPress={() => navigation.navigate('Settings')}
          radius={'md'}
          size="sm"
          type="outline"
          style={{marginVertical: 8, justifyContent: 'center'}}>
          Go to Settings screen
          <Icon name={`settings`} size={20} color="black" />
        </Button>
        <Button
          title="AddBookingCalendar"
          onPress={() => navigation.navigate('AddBookingCalendar')}
        />
        <Button
          title="AuthLoginScreen"
          onPress={() => navigation.navigate('AuthLoginScreen')}
        />
        <Button
          title="TaskListScreen"
          onPress={() => navigation.navigate('TaskListScreen')}
        />
        <Button title="AgendaScreen"
          onPress={() => navigation.navigate('AgendaScreen')}/>
          <Button title="DashboardScreen"
          onPress={() => navigation.navigate('DashboardScreen')}/>
        <Button title="BookingChartScreen"
        onPress={() => navigation.navigate('BookingChartScreen')}/>
         <Button title="MahjongScreen"
        onPress={() => navigation.navigate('MahjongScreen')}/>
        {myIcon}
        <Text>{GLOBALAUTH?.user.email}</Text>
        <Text>TODO:</Text>
        <Text>CREATE FEATURE LIST</Text>
        <Text>CREATE EDGE FUNCTION WITH CRON JOBS</Text>
        <Text>START USING TANSTACK QUERY - REACT QUERY for REACT NATIVE</Text>
        <Text>Create SCREEN FOR SETTING ROOM</Text>
        <Text>Create Logout</Text>
        <Text>Create TODO LIST</Text>
        <Text>Create Dashboard</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeScreen;
// /https://play.google.com/store/apps/details?id=com.djubo.flushroom&hl=pl&gl=US
//https://apps.apple.com/pl/app/azhotel-hotel-management/id1528011931?l=pl