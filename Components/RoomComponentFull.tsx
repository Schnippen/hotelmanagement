import {Card, Text} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import {changeDateFormat} from '../Utils/functions';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';
import {TRoomDetailsComponentFull} from '../Types/types';
//TODO add Type to props

const RoomComponentFull= ({ item }:{item:TRoomDetailsComponentFull}) => {
  console.log('RoomComponentFull', item);
  const roomFeaturesToMap: { feature_id: { feature_name: string } }[] = item.room_class_id.room_class_feature;
  const MappedFeatures = ({features}:{features: { feature_id: { feature_name: string } }[];
  }) => {
    return (
      <>
        {features.map((item, index) => (
          <Text key={index}>Feature: {item.feature_id.feature_name}</Text>
        ))}
      </>
    );
  }
  return (
    <Card>
      <View>
        <Text>RoomComponentFull</Text>
        <Text>ID {item.id}</Text>
        <Text>floor {item.floor_id.floor_number}</Text>
        <Text>status name:{item.status_id.status_name}</Text>

        <Text>base price {item.room_class_id.base_price}</Text>
        <Text>class name {item.room_class_id.class_name}</Text>
        <Text>bed_type_name: {item.room_class_id.room_class_bed_type[0].bed_type_id.bed_type_name}</Text>
        <Text>num_beds: {item.room_class_id.room_class_bed_type[0].num_beds}</Text>
        <Text>num_beds: {item.room_class_id.room_class_feature[0].feature_id.feature_name}</Text>
        <Text>num_beds: {item.room_class_id.room_class_feature[1].feature_id.feature_name}</Text>
        <MappedFeatures features={roomFeaturesToMap} />
        </View>
    </Card>
  );
};

export default RoomComponentFull;

/* let mockupState: TRoomDetailsComponentFull[] = [
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
]; */