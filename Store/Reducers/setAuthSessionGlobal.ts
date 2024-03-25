import {createSlice} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {Session} from '@supabase/supabase-js';

interface TcreateCurrentISODate {
  value: Session | null;
}

const initialState: TcreateCurrentISODate = {
  value: null,
};

export const setAuthSession = createSlice({
  name: 'authGlobal',
  initialState,
  reducers: {
    SET_GLOBAL_AUTH_SESSION: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {SET_GLOBAL_AUTH_SESSION} = setAuthSession.actions;

export default setAuthSession.reducer;
