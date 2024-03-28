import { Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native' 
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';

function DashboardScreen() {

  const todayDate = useSelector(
    (state: RootState) => state.currentISODate.value,
  );

  return (
    <View>
        <Text>Dashboard</Text>
        <Text>{todayDate}</Text>
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