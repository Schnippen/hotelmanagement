import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { changeDateFormat } from '../../Utils/functions'

interface TgetCurrentDayInIsoString {
  value: string
  monthNumber:number
  monthName:string
  monthFullName:string
}//currentDay

const initialState: TgetCurrentDayInIsoString = {
  value: "",
  monthNumber:0,
  monthName:"",
  monthFullName:"",
}
const getCurrentDayInIsoString=()=>{
    const event = new Date()
    const currentDay=event.toISOString()
    //console.log(currentDay,typeof currentDay)
    return currentDay
  }
export const createCurrentISODate = createSlice({
  name: 'currentISODate',
  initialState,
  reducers: {
    SET_CURRENT_ISO_DATE: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
     state.value = getCurrentDayInIsoString()
    },
    SET_CURRENT_ISO_DATE_SHORT:(state)=>{
      const currentDay=getCurrentDayInIsoString()
      state.value = changeDateFormat(currentDay) //change the ISOString  2024-03-09T15:36:25.492Z => 2024-03-09
    },
    SET_CURRENT_MONTH:(state)=>{
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthsOfYearFullName = Array.from({ length: 12 }, (_, i) => {
        const date = new Date(2000, i, 1);
        return date.toLocaleString('en-US', { month: 'long' });
    });
      state.monthNumber=currentMonth
      state.monthName=monthsOfYear[currentMonth]
      state.monthFullName=monthsOfYearFullName[currentMonth]
    }
  },
})

// Action creators are generated for each case reducer function
export const { SET_CURRENT_ISO_DATE,SET_CURRENT_ISO_DATE_SHORT,SET_CURRENT_MONTH} = createCurrentISODate.actions

export default createCurrentISODate.reducer

