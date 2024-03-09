import React from 'react'
import { Card,Text } from '@rneui/themed';
import { TBookingDetails } from '../Types/types';
function BookingDetailsListItem(BookingDetails:TBookingDetails) {
  return (
    <Card>
         <Card.Title>CARD WITH DIVIDER</Card.Title>
        <Text>
        howno
        </Text>
    </Card>
  )
}

export default BookingDetailsListItem