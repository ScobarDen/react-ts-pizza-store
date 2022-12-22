import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  indexOfCategory: 0,
  sortType: {
    name: 'популярности',
    sort: 'rating',
    order: 'asc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIndexOfCategory: (state, action) => {
      state.indexOfCategory = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
});

export const { setIndexOfCategory, setSortType } = filterSlice.actions;

export const selectFilter = (state) => state.filter;

export default filterSlice.reducer;
