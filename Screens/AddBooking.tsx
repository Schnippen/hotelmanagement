import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@rneui/themed';
import { decrement, increment, incrementByAmount } from '../Store/counterSlice'
import { RootState } from '../Store/store';

//TODO use react elements, try to use some kind of form library
function AddBooking() {
//const [state,setState]=useState(0)
//const count = useSelector((state) => state.counter.value)
const count = useSelector((state:RootState) => state.counter.value)


  const dispatch = useDispatch()

  return (
    <View>
        <Text>AddBooking</Text>
        <Text style={{color:"black"}}>{count}</Text>
        <Button title="increment" type="outline" onPress={()=>{console.log("click"),dispatch(increment())}} />
        <Button
              title="decrement"
              buttonStyle={{ backgroundColor: 'rgba(39, 39, 39, 1)' }}
              containerStyle={{
                width: "100%",
                marginHorizontal: 0,
                marginVertical: 10,
              }}
              titleStyle={{ color: 'white', marginHorizontal: 0 }}
              onPress={()=>{console.log("click"),dispatch(decrement())}}
            />
        <Button title="increment by 5" type="outline" onPress={()=>{console.log("click"),dispatch(incrementByAmount(5))}} />
        <Text>Add booking manually</Text>
        <Text>Choose date,  calendar pops up</Text>
        <Text>select room etc beds</Text>
        <Text>Done</Text>
    </View>
  )
}

const  styles = StyleSheet.create({
    container:{
        justifyContent:"center",
    },
})

export default AddBooking