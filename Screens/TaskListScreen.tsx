import React, {useState} from 'react';
import {FlatList, View, Dimensions} from 'react-native';
import {supabase} from '../Supabase/supabase';
import {Button, Skeleton, Text} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from '@rneui/themed/dist/CheckBox';
import TaskComponent from '../Components/TaskComponent';
import SkeletonTaskComponent from '../Components/Skeletons/SkeletonTaskComponent';

export type Task = {
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
  //const [tasks, setTasks] = useState< Task[]|null>(null);

  const fetchTasksData = async () => {
    try {
      console.log('trying to fetch- fetchTasksData()');
      let {data: tasks, error} = await supabase
        .from('todo_table_class')
        .select('*');
      //setTasks(tasks);
      if (error) {
        console.error('Error fetching data:', error);
        return {error}; // Return error object
      }
      console.log('tasks:', JSON.stringify(tasks));
      return tasks; // Return fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      return {error};
    }
  };

  const {data, isLoading, error, isSuccess} = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasksData,
    staleTime: 30000,
  });

  //console.info('QUERY:', JSON.stringify(data, null, 2));

  if (isLoading) {
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

  if (isSuccess) {
    const taskList = data as Task[];
    //console.log('tasks Sort:', taskList.sort()); //TODO create timestamp with date of creation on the backEnd
    return (
      <View style={{flex: 1}}>
        <Text>TaskListScreen</Text>
        {/* <Button title="update DATA" onPress={updateFetchData} /> */}
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
