import { Text } from '@rneui/themed';
import React from 'react'
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';

function AgendaScreen() {
  return (
  <Agenda
    // The list of items that have to be displayed in agenda. If you want to render item as empty date
    // the value of date key has to be an empty array []. If there exists no value for date key it is
    // considered that the date in question is not yet loaded
    items={{
      'pootis': [{name:"pootis",height:80,day:"2024-03-22"}],
      '2024-03-23': [],
      '2024-03-24': [],
      '2024-03-25': []
    }}
    // Callback that gets called when items for a certain month should be loaded (month became visible)
    loadItemsForMonth={month => {
      console.log('trigger items loading');
    }}
    // Callback that fires when the calendar is opened or closed
    onCalendarToggled={calendarOpened => {
      console.log("calendarOpened",calendarOpened);
    }}
    // Callback that gets called on day press
    onDayPress={day => {
      console.log('day pressed');
    }}
    // Callback that gets called when day changes while scrolling agenda list
    onDayChange={day => {
      console.log('day changed');
    }}
    // Initially selected day
    selected={'2024-03-16'}
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    //minDate={'2024-03-10'}
    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
    //maxDate={'2024-03-30'}
    // Max amount of months allowed to scroll to the past. Default = 50
    pastScrollRange={50}
    // Max amount of months allowed to scroll to the future. Default = 50
    futureScrollRange={50}
    // Specify how each item should be rendered in agenda
    renderItem={(item, firstItemInDay) => {
      return <View><Text>item</Text></View>;
    }}
    // Specify how each date should be rendered. day can be undefined if the item is not first in that day
    renderDay={(day, item) => {
      return <View><Text>item</Text></View>;
    }}
    // Specify how empty date content with no items should be rendered
    renderEmptyDate={() => {
      return  <View><Text>empty</Text></View>;
    }}
    // Specify how agenda knob should look like
    renderKnob={() => {
      return <View><Text>knob</Text></View>;
    }}
    // Override inner list with a custom implemented component
    /*renderList={listProps => {
      ;
    }}*/
    // Specify what should be rendered instead of ActivityIndicator
    renderEmptyData={() => {
      return <View><Text>empty</Text></View>;
    }}
    // Specify your item comparison function for increased performance
    /*rowHasChanged={(r1, r2) => {
      return r1.text !== r2.text;
    }}*/
    // Hide knob button. Default = false
    hideKnob={false}
    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
    showClosingKnob={false}
    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
    markedDates={{
      '2024-03-16': {selected: true, marked: true},
      '2024-03-17': {marked: true},
      '2024-03-18': {disabled: true}
    }}
    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
    disabledByDefault={false}
    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
    onRefresh={() => console.log('refreshing...')}
    // Set this true while waiting for new data from a refresh
    refreshing={false}
    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
    //refreshControl={null}
    // Agenda theme
    theme={{
      //...calendarTheme,
      agendaDayTextColor: 'yellow',
      agendaDayNumColor: 'green',
      agendaTodayColor: 'red',  
      agendaKnobColor: 'blue'
    }}
    // Agenda container style
    style={{}}
  />
    );
    
}

export default AgendaScreen