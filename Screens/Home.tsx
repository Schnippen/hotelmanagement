import React, { PropsWithChildren } from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native'
import { Colors, Header, ReloadInstructions, DebugInstructions, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { supabase } from '../Supabase/supabase';
//import { supabase } from '../Supabase/supabase';
import { Button } from '@rneui/base';
import { Icon } from '@rneui/themed';

function HomeScreen({navigation}:any) {

type SectionProps = PropsWithChildren<{
    title: string;
  }>;
  
  function Section({children, title}: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {children}
        </Text>
      </View>
    );
}
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
let OS = Platform.OS ==="ios"
const backgroundStyle = {
  backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
};
const myIcon = <Icon name="rocket" size={30} color="#900" />;

  return (
    
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
                <Button title='Go to calendar' onPress={()=>navigation.navigate("CalendarScreen")} style={styles.buttonStyle}/>
                <Button title='Go to add booking' onPress={()=>navigation.navigate("AddBooking")} style={styles.buttonStyle}/>
                <Button title='Go to BookingDetails' onPress={()=>navigation.navigate("BookingDetails")} style={styles.buttonStyle}/>
                <Button onPress={()=>navigation.navigate("Settings")} radius={"md"} size="sm" type="outline" style={{marginVertical:8,justifyContent:'center'}}>
                Go to Settings screen
                <Icon
                name={`settings`}
                size={20}
                color="black"
                />
                </Button>
                <Button title='AddBookingCalendar' onPress={()=>navigation.navigate("AddBookingCalendar")} style={styles.buttonStyle}/>
                {myIcon}
            <Section title="Step One">
              Edit <Text style={styles.highlight}>App.tsx</Text> to change this
              screen and then come back to see your edits.
            </Section>
            <Section title="See Your Changes">
              <ReloadInstructions />
            </Section>
            
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
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
    buttonStyle:{
      marginVertical:8,
    }
  });
  

export default HomeScreen