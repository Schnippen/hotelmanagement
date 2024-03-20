import {Button, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {TRoom, TRoomDetailsComponentFull} from '../Types/types';
import {supabase} from '../Supabase/supabase';
import RoomComponentFull from '../Components/RoomComponentFull';

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
  const [state, setState] = useState<any>(null); //https://www.npmjs.com/package/flat
  const data: TRoom = route.params.roomDetails;
  //console.log(JSON.stringify(data, null, 2));
  const room_id = data.id; // WAŻNE
  console.log('state:', JSON.stringify(state, null, 2));
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
  let mockupState: TRoomDetailsComponentFull[] = [
    {
      id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
      status_id: {
        status_name: 'Available',
      },
      floor_id: {
        floor_number: '2nd Floor',
      },
      room_class_id: {
        base_price: 100,
        class_name: 'Standard',
        room_class_feature: [
          {
            feature_id: {
              feature_name: 'Grill accessories',
            },
          },
          {
            feature_id: {
              feature_name: 'Kettle',
            },
          },
        ],
        room_class_bed_type: [
          {
            num_beds: 2,
            bed_type_id: {
              bed_type_name: 'Single',
            },
          },
        ],
      },
    },
  ];

  //fetch inser data TODO use react querry  // czy dodąć params do state? xD
  const fetchData = async () => {
    try {
      console.log('trying to fetch');
      let {data: room, error} = await supabase
        .from('room') //room_class_id(class_name),status_id(status_name),floor_id(floor_number)
        .select(
          'id,status_id(status_name),floor_id(floor_number),room_class_id(class_name,room_class_bed_type(num_beds,bed_type_id(bed_type_name)),base_price,room_class_feature(feature_id(feature_name)))',
        )
        .eq('id', room_id);
      //console.log('rooms', room);
      //console.info('stringify:', JSON.stringify(room, null, 2));

      setState(room); //I dont know what is happening, where is the types mismatch
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
      <Button title="FETCH DATA" onPress={() => fetchData()}></Button>
      {state ? <RoomComponentFull props={state} /> : null}
    </ScrollView>
  );
};

export default RoomDetailsScreen;
