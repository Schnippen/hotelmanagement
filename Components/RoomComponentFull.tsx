import {Card, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {changeDateFormat} from '../Utils/functions';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';
import {TRoomDetailsComponentFull} from '../Types/types';
//TODO add Type to props
const RoomComponentFull = ({props}: {props: TRoomDetailsComponentFull}) => {
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
  let {id, floor_id, room_class_id, status_id} = mockupState[0]; //JUST MAKE IT FLAT
  console.log('RoomComponentFull', props, 'MOCKUP:', mockupState);
  return (
    <Card>
      <View>
        <Text>RoomComponentFull</Text>
      </View>
    </Card>
  );
};

export default RoomComponentFull;
