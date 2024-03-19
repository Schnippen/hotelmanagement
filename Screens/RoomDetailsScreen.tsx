import {Button, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TRoom} from '../Types/types';
import {supabase} from '../Supabase/supabase';

interface Props {
  route: {
    params: {
      roomDetails: TRoom;
    };
  };
}
/* const RoomDetailsScreen: React.FC<Props> = ({ route }) => {
  const { roomDetails } = route.params; */
/*  <Text>ID: {roomDetails.id}</Text>
      <Text>Floor Number: {roomDetails.floor_id.floor_number}</Text>
      <Text>Class Name: {roomDetails.room_class_id.class_name}</Text>
      <Text>Room Number: {roomDetails.room_number}</Text> */
//TODO add  item type and navigation types
const RoomDetailsScreen = ({route}: {route: any}) => {
  const [state, setState] = useState<any>(null);
  const data: TRoom = route.params.roomDetails;
  //console.log(JSON.stringify(data, null, 2));
  const room_id = data.id;
  const floor_number = data.floor_id.floor_number;
  const class_name = data.room_class_id.class_name;
  const room_number = data.room_number;
  const array = [room_id, floor_number, class_name, room_number];
  const shit = array.map(item => <Text>{item}</Text>);
  //Fetch for room data???
  //REDIRECTION TO WHICH BOOKING CURRENTLY OCCUPIES ROOM
  //THE DATE OF OCCUPATION OF THE ROOM
  //roomID
  //floor number
  //room class id - classname - STANDARD
  //StatuS id - status name - AVailable
  //Room number - 1
  //room class id - roomclass bedtype - king -- bed_type
  ////room class id room_class_feature - feature

  //fetch inser data TODO use react querry
  const fetchData = async () => {
    try {
      console.log('trying to fetch');
      let {data: rooms, error} = await supabase
        .from('room')
        .select('id,room_class_id(base_price)')
        .eq('id', room_id);
      console.log('rooms', rooms);
      console.info('stringify:', JSON.stringify(rooms, null, 2));

      setState(rooms);
      if (error) {
        console.error('Error fetching data:', error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };
  //room_class_id(class_name),status_id(status_name),floor_id(floor_number)
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'pink'}}>
      <Text>RoomDetailsScreen</Text>
      <Text> IMAGE OF THE ROOM</Text>
      {shit}
      <Button title="FETCH DATA" onPress={() => fetchData()}></Button>
    </ScrollView>
  );
};

export default RoomDetailsScreen;
