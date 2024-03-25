import {createSlice} from '@reduxjs/toolkit';
import {TCalendarBooking} from '../Types/types';

export interface TCalendarData {
  loading: boolean;
  data: TCalendarBooking | null;
  error: any | null;
}

let shit = [
  //mockup data
  //new
  {
    id: '3134840e-7e5e-4623-bc76-a57228f53d5f',
    periods: [
      {color: 'red', date: '2024-03-20', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-03-21', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-22', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-23', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-24', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-25', endingDay: true, startingDay: false},
    ],
  },
  //new
  {
    id: '4e39c081-6889-45ba-b02b-ba42e55bb5c5',
    periods: [
      {color: 'red', date: '2024-03-01', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-03-03', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-03', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-04', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-05', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-06', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-07', endingDay: true, startingDay: false},
    ],
  },
  //new
  {
    id: '9daa7c6e-804b-4e45-8c35-9351512bdf00',
    periods: [
      {color: 'red', date: '2024-03-10', endingDay: false, startingDay: true},
      {color: 'red', date: '2024-03-11', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-12', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-13', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-14', endingDay: false, startingDay: false},
      {color: 'red', date: '2024-03-15', endingDay: true, startingDay: false},
    ],
  },
];
//TODO remove temporary shit mockup data for developement purposes
const initialState: TCalendarData = {
  loading: true,
  data: shit,
  error: '',
};
export const calendarDataSlice = createSlice({
  name: 'calendarData',
  initialState,
  reducers: {
    UPDATE_STATE: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    SET_LOADING: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.loading = action.payload;
    },
    SET_ERROR: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {UPDATE_STATE, SET_LOADING, SET_ERROR} = calendarDataSlice.actions;

export default calendarDataSlice.reducer;
