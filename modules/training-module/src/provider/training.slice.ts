/**
 * Redux authentication used to force log the user out on expiration
 */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TrainingState {
  activity: Activity;
}
export type Activity = {
  id: string | null;
  date: string | null;
  startTime: string | null;
  endTime: string | null;
  startCoord: MapPoints[];
  endCoord: MapPoints[];
  coords: MapPoints[][] | null;
};
export type MapPoints = {
  lat: string;
  long: string;
};
const initialState: TrainingState = {
  activity: { id: null, date: null, startTime: null, endTime: null, startCoord: [], endCoord: [], coords: [[]] },
};

export const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    setActivity: (state, action: PayloadAction<Activity>) => {
      state.activity = action.payload;
    },
  },
});

export const { setActivity } = trainingSlice.actions;
export default trainingSlice.reducer;
