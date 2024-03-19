import React from 'react';
import {Text, View} from 'react-native';

function Settings() {
  //TODO make custom format for displaing dates in settings
  return (
    <View style={{flex: 1}}>
      <Text>Settings</Text>
      <Text>Date format</Text>
      <Text>Switch for dark mode</Text>
    </View>
  );
}

export default Settings;
