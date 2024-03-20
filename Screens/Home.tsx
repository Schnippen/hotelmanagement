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

function HomeScreen({navigation}: any) {
  const isDarkMode = useColorScheme() === 'dark';

  /* const  fetchData=async()=>{   
    let { data: booking, error } = await supabase
          .from('booking')
          .select('checkin_date,checkout_date')
          console.log("SUPABASE DATA:", booking)     
        console.log("KLIK")
        if (error) {
            console.error('Error fetching data:', error);
            return;
          }
} */
  //name={`${OS ? "ios" : "md"}-stepforward`}
  let OS = Platform.OS === 'ios';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const myIcon = <Icon name="rocket" size={30} color="#900" />;

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
          style={{marginVertical: 8}}
        />
        <Button
          title="Go to RoomsScreen"
          onPress={() => navigation.navigate('RoomsScreen')}
          style={{marginVertical: 8}}
        />
        <Button
          title="Go to CurrentBookingsScreen"
          onPress={() => navigation.navigate('CurrentBookingsScreen')}
          style={{marginVertical: 8}}
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
          style={{marginVertical: 8}}
        />
        {myIcon}
        <Text>TODO:</Text>
        <Text>CREATE FEATURE LIST</Text>
        <Text>CREATE EDGE FUNCTION WITH CRON JOBS</Text>
        <Text>START USING TANSTACK QUERY - REACT QUERY for REACT NATIVE</Text>
        <Text>Create SCREEN FOR SETTING ROOM</Text>
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
