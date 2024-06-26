import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Button} from '@rneui/themed';
import {decrement, increment, incrementByAmount} from '../Store/counterSlice';
import {RootState} from '../Store/store';
import {supabase} from '../Supabase/supabase';
import {TRoom} from '../Types/types';
import RoomComponent from '../Components/RoomComponent';
import {ButtonGroup} from '@rneui/themed';
import SkeletonRoomComponent from '../Components/Skeletons/SkeletonRoomComponent';

//TODO use react elements, try to use some kind of form library
function RoomsScreen({navigation}: any) {
  let mockupRoomsData: TRoom[] = [
    {
      id: '4fac5959-62c8-41a8-855a-e149e4fc6c76',
      floor_id: {
        floor_number: '1st Floor',
      },
      room_class_id: {
        class_name: 'Deluxe',
      },
      status_id: {
        status_name: 'Occupied',
      },
      room_number: '2',
    },
    {
      id: '0fad24a2-035e-4d12-9964-9ba84b4373c2',
      floor_id: {
        floor_number: '2nd Floor',
      },
      room_class_id: {
        class_name: 'Standard',
      },
      status_id: {
        status_name: 'Available',
      },
      room_number: '1',
    },
    {
      id: 'b79b8ae7-e19a-4485-8f03-4215b943aca6',
      floor_id: {
        floor_number: '3rd Floor',
      },
      room_class_id: {
        class_name: 'Suite',
      },
      status_id: {
        status_name: 'Under Maintenance',
      },
      room_number: '3',
    },
  ];

  const [state, setState] = useState<TRoom[] | null>(mockupRoomsData);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const filteredByAvailability = state?.filter(
    item => item.status_id.status_name.toLocaleLowerCase() === 'available',
  );
  const filteredByOccupancy = state?.filter(
    item => item.status_id.status_name.toLocaleLowerCase() !== 'available',
  );

  //fetch inser data TODO use react querry
  const fetchData = async () => {
    try {
      console.log('trying to fetch');
      let {data: rooms, error} = await supabase
        .from('room')
        .select(
          '*,room_class_id(class_name),status_id(status_name),floor_id(floor_number)',
        );
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

  const FilteringButtonGroup = () => {
    return (
      <ButtonGroup
        buttons={['ALL', 'AVAILABLE', 'OCCUPIED']}
        selectedIndex={selectedIndex}
        onPress={value => {
          setSelectedIndex(value);
        }}
        containerStyle={{marginBottom: 20}}
      />
    );
  };

  //TODO add skeleton
  return (
    <View style={styles.container}>
      <Text>RoomsScreen</Text>
      <Text>Add booking manually</Text>
      <Text>Choose date, calendar pops up</Text>
      <Text>select room etc beds</Text>
      <Text>Done</Text>
      <Button
        title="fetch"
        type="outline"
        onPress={() => {
          fetchData();
        }}
      />
      <FlatList
        ListHeaderComponent={<FilteringButtonGroup />}
        ListEmptyComponent={<SkeletonRoomComponent />}
        style={{backgroundColor: 'red', height: '100%'}}
        data={
          selectedIndex === 0
            ? state
            : selectedIndex === 1
            ? filteredByAvailability
            : selectedIndex === 2
            ? filteredByOccupancy
            : null
        }
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <RoomComponent item={item} navigation={navigation} />
        )}
        contentContainerStyle={{paddingBottom: 50}}
      />
      {/* <List state={MockupbookingDetails}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RoomsScreen;
