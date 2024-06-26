import { createSlice } from '@reduxjs/toolkit';
export const initialSlice = createSlice({
  name: 'initial',
  initialState: { data: 'initial' },
  reducers: {
    select: (state, action) => {
      state.data = { ...state, ...action.payload };
    },
  },
});

export const { select } = initialSlice.actions;
export default initialSlice.reducer;
