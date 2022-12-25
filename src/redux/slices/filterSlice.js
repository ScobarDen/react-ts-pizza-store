import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  indexOfCategory: 0,
  sortType: {
    name: 'популярности',
    sort: 'rating',
    order: 'asc',
  },
  currentPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setIndexOfCategory, setSortType, setCurrentPage } = filterSlice.actions;

export const statesOfFilters = (state) => state.filter;

export default filterSlice.reducer;
