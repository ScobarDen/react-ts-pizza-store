import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  indexOfCategory: 0,
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIndexOfCategory: (state, action) => {
      state.indexOfCategory = action.payload;
    },
  },
});

export const { setIndexOfCategory } = filterSlice.actions;

export default filterSlice.reducer;
