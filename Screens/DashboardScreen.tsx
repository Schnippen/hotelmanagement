import { Text } from '@rneui/themed'
import React, { useRef, useState } from 'react'
import { Button, Dimensions, FlatList, View } from 'react-native' 
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';
import { supabase } from '../Supabase/supabase';

function DashboardScreen() {

  return (
    <View style={{flex:1}}>
<Text>Dashboard</Text>
        <Text>Bookings made today</Text>
        <Text>Bookings made pas 7 days</Text>
        <Text>room nights blocked for next 30 days</Text>
        <Text>sold out dates for next 30 days</Text>
        <Text>Check-ins today</Text>
        <Text>Check-outs today</Text> 
    </View>
  )
}

export default DashboardScreen




{/* <Text>Dashboard</Text>
        <Text>{todayDate}</Text>
        <Text>Bookings made today</Text>
        <Text>Bookings made pas 7 days</Text>
        <Text>room nights blocked for next 30 days</Text>
        <Text>sold out dates for next 30 days</Text>
        <Text>Check-ins today</Text>
        <Text>Check-outs today</Text> */}  
/*         const horizontalFlatListRef = useRef();
        ref={horizontalFlatListRef}
        const handleScroll = (event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          console.log('Current scroll offset:', offsetX);
          // Scroll other horizontal FlatLists
          if (horizontalFlatListRef.current) {
            horizontalFlatListRef.current.scrollToOffset({ offset: offsetX, animated: false });
          }
        }; */