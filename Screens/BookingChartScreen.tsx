import { Button, Icon, Text } from '@rneui/themed'
import React, { useState } from 'react'
import { Dimensions, FlatList, Touchable, TouchableOpacity, View } from 'react-native'


function BookingChartScreen() {
const [state,setState]=useState<any>(null)

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const IconCalendar = <Icon name="edit-calendar" size={30} color="black" />;

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Satur'];
const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const date = new Date();
const dayIndex = date.getDay();
const monthIndex = date.getMonth();
const dayName = daysOfWeek[dayIndex];
const monthName = monthsOfYear[monthIndex];
const shit = new Date().getDate()
//console.log("date:",date,windowHeight,windowWidth,monthName,dayName,shit)

const nextThreeDays: string[] = []; // Change type to string[]
for (let i = 0; i < 3; i++) {
  const nextDate = new Date();
  nextDate.setDate(date.getDate() + i);
  nextThreeDays.push(nextDate.toDateString());
}

const DayPanel = ({ date }: { date: string }) => {    
    const dateSplited=date.split(" ")
    const dayName=dateSplited[0]
    const month = dateSplited[1]
    const dayNumber = dateSplited[2]
    //console.log(dateSplited)
  return (
    <View style={{ height: 80,flex:1,backgroundColor:"white",borderWidth: 1,borderColor:"lightgray" }}>
      <Text>{dayName}</Text>
      <Text>{month}</Text>
      <Text>{dayNumber}</Text>
    </View>
  );
}

const TopPanel = () => {
  const DaysToRender = nextThreeDays.map((date, index) => {
    return <DayPanel date={date} key={date+index}/>
  });
  //TODO make a calendar Button
  return (
    <View >
        <Text h4>MONTH</Text>
    <View style={{ height: 80, backgroundColor: "red", width: windowWidth, flexDirection: 'row' }}>
    <TouchableOpacity style={{width:windowWidth/6,justifyContent:"center",alignItems:"center",}} activeOpacity={0.2} onPress={()=>console.log("press")}>
        {IconCalendar} 
    </TouchableOpacity>
      {DaysToRender}
      </View>
    </View>
  );
}

type Tdata={
    id: string;
    text: string;
}
const data:Tdata[]= [
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' },
    { id: '5', text: 'Item 5' },
    { id: '6', text: 'Item 6' },

    // Add more data as needed
  ];

  const RoomItem = ({ item }: { item: Tdata }) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 80,backgroundColor:"white",borderWidth: 1,borderColor:"lightgray",width:windowWidth/3 }}>
      <Text>{item.text}</Text>
    </View>
  );
const RoomsOccupancyList=()=>{
    return(
        <View style={{backgroundColor:"red", width:windowWidth,flexDirection:"row"}}>
        <View style={{backgroundColor:"lightblue",width:windowWidth/6,height:80,justifyContent:'center',alignItems:"center"}}>
            <Text>Room TYPE</Text>
        </View>
        <FlatList
        //horizontal={true}
        data={data.slice(0,3)}// TODO change that
        keyExtractor={(item, index:number) => item.id}
        renderItem={RoomItem}
        numColumns={3}
        //getItemLayout
      />
        </View>
    )
}
return (
  <View style={{ flex: 1, backgroundColor: "pink" }}>
    <TopPanel/>
    <Text>BookingChartScreen SEPARATOR</Text>
    <RoomsOccupancyList/>
    <Button title={"fetch data"} onPress={()=>fetchData()}/>
  </View>
);
}
export default BookingChartScreen