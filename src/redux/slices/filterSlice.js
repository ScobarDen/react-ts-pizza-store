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
    setFilterSlice: (state, action) => {
      state.indexOfCategory = Number(action.payload.category);
      state.sortType.sort = action.payload.sort.sort;
      state.sortType.name = action.payload.sort.name;
      state.sortType.order = action.payload.order;
      state.currentPage = Number(action.payload.page);
    },
  },
});

export const { setIndexOfCategory, setSortType, setCurrentPage, setFilterSlice } = filterSlice.actions;

export const selectFilters = (state) => state.filter;

export default filterSlice.reducer;
