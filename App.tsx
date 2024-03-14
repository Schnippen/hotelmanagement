/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import store from './Store/store';
import { Provider } from 'react-redux';
import MainApp from './MainApp';

function App(): React.JSX.Element {
//useEffect for initializing Supabase, is it necessary



  return (
  <Provider store={store}>
      <MainApp/>
  </Provider>
  );
}

export default App;
