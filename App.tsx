/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/Home';
import CalendarScreen from './Screens/Calendar';
import store from './Store/store';
import { Provider } from 'react-redux';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {


//useEffect for initializing Supabase, is it necessary

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  </Provider>
  );
}

export default App;
