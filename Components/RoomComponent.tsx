import React, { lazy } from 'react'
import { TRoom } from '../Types/types'
import {  ActivityIndicator, View } from 'react-native'
import { Card,Text,Image, Button } from '@rneui/themed';
import Dot from './Dot';
const RoomComponent=({item}:{item:TRoom})=>{
    const itemID=item.id
    const floor_number=item.floor_id.floor_number
    const roomClassName=item.room_class_id.class_name
    const room_number=item.room_number
    const room_status=item.status_id.status_name
    const room_statusLowerCase=room_status.toLowerCase()
    const buttonDisabled=room_statusLowerCase==="occupied"||room_statusLowerCase==="under maintenance"
    const URL = 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg'

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
            title="Choose" type="outline" onPress={()=>{console.log("choose")}} />
        </Card>
    )
  }

export default RoomComponent 
{/* <View>
<Text>{item.id}</Text>
</View> */}
/* item: {
    aspectRatio: 1,
    width: '100%',
    flex: 1,
  }, */
{/* <ListItem bottomDivider style={{marginVertical:8}}>
<ListItem.Content>
    <ListItem.Title>{floor_number}, Room: {room_number} {roomClassName}</ListItem.Title>

    <ListItem.Subtitle>{room_status}</ListItem.Subtitle>
</ListItem.Content>
</ListItem> */}