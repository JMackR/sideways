/**
 * Redux authentication used to force log the user out on expiration
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { BOB } from './wizard-api';
export interface AuthState {
  isAuth: boolean;
  forcedLogout: boolean;
  genericError: boolean;
  wizardSteps: any;
}

const initialState: AuthState = {
  isAuth: false,
  forcedLogout: false,
  genericError: false,
  wizardSteps: BOB,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeOnboardingNav: (state, action) => {
      state.wizardSteps = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setNextPrevSteps: (state, action: any) => {
      state.forcedLogout = action.payload;
    },
  },
});

export const { setAuth, setNextPrevSteps, initializeOnboardingNav } = authSlice.actions;
export default authSlice.reducer;
