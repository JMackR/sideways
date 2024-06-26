/**
 * Redux authentication used to force log the user out on expiration
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  userData: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUserData: (state, action) => {
      state.userData = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { initializeUserData, updateUserData } = userSlice.actions;
export default userSlice.reducer;
