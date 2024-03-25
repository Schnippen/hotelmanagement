import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {supabase} from '../Supabase/supabase';
import {Button, Skeleton} from '@rneui/themed';
import {useQuery} from '@tanstack/react-query';
import LinearGradient from 'react-native-linear-gradient';
import {CheckBox} from '@rneui/themed/dist/CheckBox';

type Task = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
};

function TaskListScreen() {
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
  });

  console.info('QUERY:', JSON.stringify(data, null, 2));

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Skeleton
          LinearGradientComponent={LinearGradient}
          animation="wave"
          width={300}
          height={200}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{error.message}</Text>
      </View>
    );
  }

  const TaskComponent = (item: Task) => {
    return (
      <View style={{borderStartColor: 'lightgray'}}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{item.due_date}</Text>
        <CheckBox checked size={32} />
        <Text>{item.completed ? 'COMPLETED' : 'NOT DONE'}</Text>
      </View>
    );
  };

  if (isSuccess) {
    const taskList = data as Task[];
    return (
      <View>
        <Text>TaskListScreen</Text>
        <Button title="FETCH DATA" onPress={fetchData} />
        {taskList.map(item => (
          <TaskComponent key={item.id} {...item} />
        ))}
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
