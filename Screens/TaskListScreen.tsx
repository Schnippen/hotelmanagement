import React, {useState} from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import {supabase} from '../Supabase/supabase';
import {Button, Skeleton, Text} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from '@rneui/themed/dist/CheckBox';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';

type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  color: string;
};

function TaskListScreen() {
  const currentDay = new Date();
  console.log(currentDay);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  //const [tasks, setTasks] = useState< Task[]|null>(null);
  const fetchData = async () => {
    try {
      console.log('trying to fetch');
      let {data: tasks, error} = await supabase
        .from('todo_table_class')
        .select('*');
      //setTasks(tasks);
      if (error) {
        console.error('Error fetching data:', error);
        return {error}; // Return error object
      }

      return tasks; // Return fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      return {error};
    }
  };

  const {data, isLoading, error, isSuccess} = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchData,
    staleTime: 30000,
  });

  console.info('QUERY:', JSON.stringify(data, null, 2));

  if (isLoading) {
    const SkeletonTaskComponent = () => {
      return (
        <View style={{marginVertical: 10, marginHorizontal: 10}}>
          <Skeleton
            LinearGradientComponent={LinearGradient}
            animation="wave"
            width={windowWidth - 20}
            height={200}
            style={{borderRadius: 10}}
          />
        </View>
      );
    };
    return (
      <FlatList
        data={['1', '2']}
        renderItem={({item, index}) => <SkeletonTaskComponent />}
      />
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{error.message}</Text>
      </View>
    );
  }
  function dateDiffInDays(a: Date, b: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const TaskComponent = (item: Task) => {
    const [done, setDone] = useState<boolean>(false);
    const dueToDate = new Date(item.due_date);
    const daysLeft = dateDiffInDays(currentDay, dueToDate);
    console.log(daysLeft + ' days');
    console.log('due:', dueToDate, currentDay);
    const CheckBoxContainer = () => {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'lightblue',
          }}>
          <CheckBox checked={done} size={32} onPress={() => setDone(!done)} />
          <Text>{item.completed ? 'COMPLETED' : 'NOT DONE'}</Text>
        </View>
      );
    };

    return (
      <View
        style={{
          backgroundColor: 'red',
          height: 200,
          marginVertical: 10,
          marginHorizontal: 10,
          flexDirection: 'row',
          borderRadius: 10,
        }}>
        <View
          style={{
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            height: 200,
            width: 20,
            backgroundColor: item.color ? item.color : 'lightgray',
          }}
        />
        <View style={{flexDirection: 'column', flex: 1, padding: 10}}>
          {/* <Text>{item.id}</Text> */}
          <Text h4>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.due_date}</Text>
          <CheckBoxContainer />
        </View>
      </View>
    );
  };

  if (isSuccess) {
    const taskList = data as Task[];
    return (
      <View style={{flex: 1}}>
        <Text>TaskListScreen</Text>
        <Button title="FETCH DATA" onPress={fetchData} />
        <FlatList
          data={taskList}
          renderItem={({item, index}) => (
            <TaskComponent key={item.id} {...item} />
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    );
  }

  return null;
}

export default TaskListScreen;

const QUERY = {
  status: 'success',
  fetchStatus: 'idle',
  isPending: false,
  isSuccess: true,
  isError: false,
  isInitialLoading: false,
  isLoading: false,
  data: [
    {
      id: 'bcd9d9a2-fca7-4c8f-9b07-ad1a76e5cb19',
      title: 'Cleaning',
      description: 'Cleaning the apartament ',
      due_date: '2024-03-25T19:23:17+00:00',
      completed: false,
    },
  ],
  dataUpdatedAt: 1711398533576,
  error: null,
  errorUpdatedAt: 1711398243564,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 4,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isRefetching: false,
  isLoadingError: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isStale: true,
};
/* export const useEntriesQuery = (enabled = true) =>
  useQuery(
    entriesKeys.all,
    async () => {
      const {data} = await supabase.from('entries').select(`
      id,
      created_at,
      entry_items ( id )
    `);

      return data;
    },
    {
      enabled,
      staleTime: 5000, // staleTime in ms
    },
  ); */
