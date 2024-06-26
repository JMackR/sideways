import { createSlice } from '@reduxjs/toolkit';
const errorSlice = createSlice({
  name: 'errorSlice',
  initialState: {
    message: '',
  },
  reducers: {
    error: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      state.message = action.payload;
    },
  },
});
const errorReducer = errorSlice.reducer;
export const { error } = errorSlice.actions;
export default errorReducer;
