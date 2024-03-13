import React from 'react'
import { Button, Card,Text } from '@rneui/themed';
import { TBookingDetails } from '../Types/types';
import { StyleSheet, View } from 'react-native';
import { changeDateFormat, subtractDates } from '../Utils/functions';
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store';


function BookingDetailsListItem({ item }: { item: TBookingDetails }) {

  const BookingColor = () => {
    return item.booking_color ? (
      <View style={{ width: '90%', height: 40, backgroundColor: item.booking_color }}></View>
    ) : null;
  };
  
  const MoreInfo=()=>{
    return(
      <Button
      title="More Info"
      buttonStyle={{
        borderColor: 'rgba(78, 116, 289, 1)',
      }}
      type="outline"
      raised
      titleStyle={{ color: 'rgba(78, 116, 289, 1)' }}
      containerStyle={{
        width: "90%",
        marginHorizontal:0,
        marginVertical: 16,
      }}
    />
    )
  }

  const RoomStatus=()=>{
    const status =item.booking_room.room_id.status_id.status_name
    const Dot=({status}:{status:string})=>{
      const isStatus=status?status:""
      const statusToLowerCase = isStatus.toLowerCase()
      const statusColor=statusToLowerCase==="available"?"green":statusToLowerCase==="occupied"
      ?"red":statusToLowerCase==="under maintenance"?"orange":"gray"
      return(
        <View style={{height:15,width:15,backgroundColor:`${statusColor}`,  borderRadius: 100,}}></View>
      )
    }
    return(
      <View style={{width:"100%",alignItems:"center",flexDirection:"row"}}>
        <Text h4>Room status: {status} </Text>
        <Dot status={status}/>
      </View>
    )
  }

  const PaymentStatus=()=>{
    const status =item.payment_status.payment_status_name
    const Dot=({status}:{status:string})=>{
      const isStatus=status?status:""
      const statusToLowerCase = isStatus.toLowerCase()
      const statusColor=statusToLowerCase==="paid"?"green":statusToLowerCase==="cancelled"
      ?"red":statusToLowerCase==="pending"?"orange":"gray"
      return(
        <View style={{height:15,width:15,backgroundColor:`${statusColor}`,  borderRadius: 100,}}></View>
      )
    }
    return(
      <View style={{width:"100%",alignItems:"center",flexDirection:"row"}}>
        <Text h4>Payment status: {status} </Text>
        <Dot status={status}/>
      </View>
    )
  }

  const checkin_date=changeDateFormat(item?item.checkin_date:"")
  const checkout_date=changeDateFormat(item?item.checkout_date:"")
  const currentISODate = useSelector((state:RootState) => state.currentISODate.value) //2024-03-13
  //const daysUntilCheckout=checkout_date-currentISODate

const differenceDays =subtractDates(currentISODate,checkout_date)

 const BookingDuration=()=>{
  return(
    <View style={{width:"100%"}}>
    <Text h3 style={{alignSelf:"center",marginVertical:8}}>Booking duration</Text>
    <Text h4 style={styles.textStyle}>Check in: {checkin_date}</Text>
    <Text h4 style={styles.textStyle}>Check out: {checkout_date}</Text>
    <Text h4 style={styles.textStyle}>Days until check-out: {differenceDays}</Text>
    </View>
  )
 }
 const NumberOfGuests = () => {
  const { num_adults, num_children } = item;

  return (
    <View style={{ width: '100%' }}>
      <Text h3 style={{ alignSelf: 'center', marginVertical: 8 }}>
        Number of Guests
      </Text>
      {num_adults && num_adults > 0 && (
        <Text h4>Adults: {num_adults}</Text>
      )}
      {num_children && num_children > 0 && (
        <Text h4>Children: {num_children}</Text>
      )}
    </View>
  );
};


  return (
    <Card>
         <Card.Title h3>room name</Card.Title>
         <BookingColor/>
        <Text>
        {item.id}
        </Text>
        <Card.Divider />
        <BookingDuration/>
        <Card.Divider />
        <NumberOfGuests/>
        <Card.Divider />
        <RoomStatus/>
        <Card.Divider />
        <PaymentStatus/>
        <Card.Divider />
        <MoreInfo/>
    </Card>
  )
}

export default BookingDetailsListItem

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 8,
  },
});