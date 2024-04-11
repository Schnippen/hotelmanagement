import {CheckBox, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {dateDiffInDays, formatDate} from '../Utils/functionsTasks';
import {Task} from '../Screens/TaskListScreen';
import {supabase} from '../Supabase/supabase';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/FontAwesome';

//TODO filter by id, delete, edit etc
const updateTaskCompletion = async (
  id: string,
  newValue: boolean,
): Promise<void> => {
  try {
    console.log('Trying to update task with ID:', id);
    const {data: updatedTasks, error} = await supabase
      .from('todo_table_class')
      .update({completed: newValue})
      .eq('id', id)
      .select();

    if (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
    console.log('Task successfully updated:', updatedTasks);
    return;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};
const deleteTask = async (id: string): Promise<void> => {
  try {
    console.log('Trying to delete task with ID:', id);
    const {data: updatedTasks, error} = await supabase
      .from('todo_table_class')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to update task');
    }
    console.log('Task successfully updated:', updatedTasks);
    return;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

const TaskComponent = (item: Task) => {
  const ID = item.id;
  const initial = item.completed;
  const [done, setDone] = useState<boolean>(initial);
  const currentDay = new Date();
  //console.log(item.id, done, item.completed, 'DONE', done);
  const client = useQueryClient();
  const {mutate: updateTask} = useMutation({
    mutationFn: () => updateTaskCompletion(ID, !done),
    onError: error => {
      // An error happened!
      console.log(`onError: ${error}`);
    },
    onSuccess: () => {
      // Boom baby!
      console.log("I'm first!");
      //handleCompleted();
      setDone(!done);
      client.invalidateQueries(['tasks']);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
      console.log("Mutation completed - I'm second!");
    },
  });
  const {mutate: removeTask} = useMutation({
    mutationFn: () => deleteTask(ID),
    onError: error => {
      console.log(`onError: ${error}`);
    },
    onSuccess: () => {
      console.log('Task deletion successful!');
      // Optionally, you can invalidate the queries here as well
      client.invalidateQueries(['tasks']);
    },
    onSettled: (data, error, variables, context) => {
      console.log('Mutation completed!');
    },
  });
  const CheckBoxContainer = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'lightblue',
          flex: 1,
        }}>
        <CheckBox
          containerStyle={{backgroundColor: 'pink'}}
          wrapperStyle={{backgroundColor: 'red'}}
          checked={item.completed}
          size={32}
          onPress={async () => {
            await updateTask();
          }}
          title={item.completed ? 'COMPLETED' : 'NOT DONE'}
        />
      </View>
    );
  };

  const DaysLeft = () => {
    const dueToDate = new Date(item.due_date);
    const daysLeft = dateDiffInDays(currentDay, dueToDate);
    //console.log('due:', dueToDate, currentDay, daysLeft);
    return daysLeft;
  };
  const DueTo = formatDate(item.due_date);
  return (
    <View
      style={{
        backgroundColor: 'gray',
        minHeight: 200,
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

        <Text h3>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{DueTo}</Text>
        <DaysLeft />
        <CheckBoxContainer />
      </View>
    </View>
  );
};

export default TaskComponent;

/* 
        <TouchableOpacity
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            top: 0,
            right: 0,
            backgroundColor: 'red',
            borderTopRightRadius: 10,
          }}
          onPress={() => console.log('pressed')}>
          <Icon name="trash" color="white" />
        </TouchableOpacity>; */
