import { createSlice } from '@reduxjs/toolkit'
import { TCalendarBooking } from '../Types/types'
interface TCalendarData{
    loading:boolean,
    data:TCalendarBooking|null,
    error:any|null,
}
const initialState:TCalendarData={
    loading:true,
    data:[],
    error:"",
}

export const calendarDataSlice = createSlice({
  name: 'calendarData',
  initialState,
  reducers: {
    UPDATE_STATE:(state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },
    SET_LOADING: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.     
      state.loading = action.payload;  
    },
    SET_ERROR:(state,action)=>{
        state.error = action.payload;
        state.loading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { UPDATE_STATE,SET_LOADING,SET_ERROR} = calendarDataSlice.actions

export default calendarDataSlice.reducer