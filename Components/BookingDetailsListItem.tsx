import React from 'react';
import {Button, Card, Text} from '@rneui/themed';
import {TBookingDetails} from '../Types/types';
import {StyleSheet, View} from 'react-native';
import {changeDateFormat, subtractDates} from '../Utils/functions';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';

function CurrentBookingsListItem({item}: {item: TBookingDetails}) {
  const BookingColor = () => {
    return item.booking_color ? (
      <View
        style={{
          width: '100%',
          height: 40,
          backgroundColor: item.booking_color,
        }}></View>
    ) : null;
  };

  const MoreInfo = () => {
    return (
      <Button
        title="More Info"
        buttonStyle={{
          borderColor: 'rgba(78, 116, 289, 1)',
        }}
        type="outline"
        raised
        titleStyle={{color: 'rgba(78, 116, 289, 1)'}}
        containerStyle={{
          width: '100%',
          marginHorizontal: 0,
          marginVertical: 16,
        }}
      />
    );
  };

  const RoomStatus = () => {
    const status = item.booking_room.room_id.status_id.status_name;
    const Dot = ({status}: {status: string}) => {
      const isStatus = status ? status : '';
      const statusToLowerCase = isStatus.toLowerCase();
      const statusColor =
        statusToLowerCase === 'available'
          ? 'green'
          : statusToLowerCase === 'occupied'
          ? 'red'
          : statusToLowerCase === 'under maintenance'
          ? 'orange'
          : 'gray';
      return (
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: `${statusColor}`,
            borderRadius: 100,
          }}></View>
      );
    };
    return (
      <View
        style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
        <Text style={{alignSelf: 'center', marginVertical: 4}}>
          Room status:
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>{status} </Text>
          <Dot status={status} />
        </View>
      </View>
    );
  };

  const PaymentStatus = () => {
    const status = item.payment_status.payment_status_name;
    const Dot = ({status}: {status: string}) => {
      const isStatus = status ? status : '';
      const statusToLowerCase = isStatus.toLowerCase();
      const statusColor =
        statusToLowerCase === 'paid'
          ? 'green'
          : statusToLowerCase === 'cancelled'
          ? 'red'
          : statusToLowerCase === 'pending'
          ? 'orange'
          : 'gray';
      return (
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: `${statusColor}`,
            borderRadius: 100,
          }}></View>
      );
    };
    return (
      <View
        style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
        <Text style={{alignSelf: 'center', marginVertical: 4}}>
          Payment status:
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>{status} </Text>
          <Dot status={status} />
        </View>
      </View>
    );
  };

  const checkin_date = changeDateFormat(item ? item.checkin_date : '');
  const checkout_date = changeDateFormat(item ? item.checkout_date : '');
  const currentISODate = useSelector(
    (state: RootState) => state.currentISODate.value,
  ); //2024-03-13
  //const daysUntilCheckout=checkout_date-currentISODate

  const differenceDays = subtractDates(currentISODate, checkout_date);

  const BookingDuration = () => {
    return (
      <View style={{width: '100%'}}>
        <Text style={{alignSelf: 'center', marginVertical: 4}}>
          Booking duration
        </Text>
        <Text style={styles.textStyle}>Check in: {checkin_date}</Text>
        <Text style={styles.textStyle}>Check out: {checkout_date}</Text>
        <Text style={styles.textStyle}>
          Days until check-out: {differenceDays}
        </Text>
      </View>
    );
  };
  const NumberOfGuests = () => {
    const {num_adults, num_children} = item;
    return (
      <View style={{width: '100%'}}>
        <Text style={{alignSelf: 'center', marginVertical: 4}}>
          Number of Guests:
        </Text>
        {!!num_adults && num_adults > 0 && <Text>Adults: {num_adults}</Text>}
        {!!num_children && num_children > 0 && (
          <Text>Children: {num_children}</Text>
        )}
      </View>
    );
  };
  //const fullName=item.guest_id.first_name&&item.guest_id.last_name?item.guest_id.first_name +" "+item.guest_id.last_name:null
  const GuestName = () => {
    const first_name = item.guest_id.first_name;
    const last_name = item.guest_id.last_name;
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <Text h4 style={styles.textStyle}>
          {first_name + ' ' + last_name}
        </Text>
      </View>
    );
  };

  const BookingPrice = () => {
    const price = item.booking_amount ? item.booking_amount : null;
    return item.booking_amount ? (
      <View
        style={{width: '100%', alignItems: 'center', flexDirection: 'column'}}>
        <Text style={{alignSelf: 'center', marginVertical: 4}}>
          Booking Price:
        </Text>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text>{price} </Text>
        </View>
      </View>
    ) : null;
  };

  return (
    <Card>
      <GuestName />
      <BookingColor />
      <Card.Divider />
      <BookingDuration />
      <Card.Divider />
      <NumberOfGuests />
      <RoomStatus />
      <Card.Divider />
      <PaymentStatus />
      <Card.Divider />
      <BookingPrice />
      <Card.Divider />
      <MoreInfo />
    </Card>
  );
}

export default CurrentBookingsListItem;

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 4,
  },
});
