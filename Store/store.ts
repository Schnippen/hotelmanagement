import {configureStore} from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import {calendarDataSlice} from './calendarData';
import createCurrentISODate from './Reducers/createCurrentISODate';
import {setAuthSession} from './Reducers/setAuthSessionGlobal';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    calendarData: calendarDataSlice.reducer,
    currentISODate: createCurrentISODate,
    authGlobal: setAuthSession.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

//TODO add typescript to redux
/* // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch */
