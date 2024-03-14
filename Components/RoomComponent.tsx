import React, { lazy } from 'react'
import { TRoom } from '../Types/types'
import {  ActivityIndicator, View } from 'react-native'
import { Card,Text,Image, Button } from '@rneui/themed';
import Dot from './Dot';

//TODO type navigation
const RoomComponent=({ item, navigation }: { item: TRoom, navigation?: any })=>{
    const itemID=item.id
    const floor_number=item.floor_id.floor_number
    const roomClassName=item.room_class_id.class_name
    const room_number=item.room_number
    const room_status=item.status_id.status_name
    const room_statusLowerCase=room_status.toLowerCase()
    const buttonDisabled=room_statusLowerCase==="occupied"||room_statusLowerCase==="under maintenance"
    const URL = 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg'
    

    const navigateToAddBookingCalendar=(item:any)=>{
        return navigation.navigate("AddBookingCalendar",{roomDetails:item})
    }

    return(
        <Card>
            <Card.Title>{floor_number}, Room: {room_number} {roomClassName}</Card.Title>
            <Card.Divider/>
            <Image source={{uri:URL}} 
            style={{aspectRatio: 1,
                width: "100%",
                height:150,
                flex: 1,}}
                PlaceholderContent={<ActivityIndicator size={'large'} />}/>
            <View style={{width:"100%",flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:8}}>
            <Text h3 >{room_status} </Text>
            <Dot status={room_status}/>
            </View>
            <Button disabled={buttonDisabled} disabledStyle={{borderColor:"gray" }} disabledTitleStyle={{ color:'gray' }}
            title="Choose" type="outline" onPress={()=>{console.log("choose navigating"), navigateToAddBookingCalendar(item)}} />
        </Card>
    )
  }

export default RoomComponent 