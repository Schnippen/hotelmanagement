import {Button, CheckBox, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import {dateDiffInDays, formatDate} from '../Utils/functionsTasks';
import {Task} from '../Screens/TaskListScreen';
import {supabase} from '../Supabase/supabase';
import {useMutation, useQueryClient} from '@tanstack/react-query';

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

const TaskComponent = (item: Task) => {
  const ID = item.id;
  const initial = item.completed;
  const [done, setDone] = useState<boolean>(initial);
  const currentDay = new Date();
  console.log(item.id, done, item.completed, 'DONE', done);
  const client = useQueryClient();
  const {mutate} = useMutation({
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
      console.log("I'm second!");
    },
  });
  /*   const handleCompleted = () => {
    const newDone = !done;
    setDone(newDone);
    console.log('DONE:', done);
    updateTaskCompletion(ID, newDone);
  }; */

  const CheckBoxContainer = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'lightblue',
        }}>
        <CheckBox
          checked={item.completed}
          size={32}
          onPress={async () => {
            //handleCompleted();
            //await updateTaskCompletion(ID, newDone);
            await mutate();
          }}
        />
        <Text>{item.completed ? 'COMPLETED' : 'NOT DONE'}</Text>
        {/*         <Button title={'sda'} onPress={() => handleCompleted()}></Button>
         */}
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
