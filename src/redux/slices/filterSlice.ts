import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortEnum {
  RATING = 'rating',
  PRICE = 'price',
  ALPHABET = 'alphabet',
}

export type SortTypeState = {
  name: string;
  sort: SortEnum;
  order: 'asc' | 'desc';
};

interface FilterSliceState {
  indexOfCategory: number;
  sortType: SortTypeState;
  currentPage: number;
  searchValue: string;
}

const initialState: FilterSliceState = {
  indexOfCategory: 0,
  sortType: {
    name: 'популярности',
    sort: SortEnum.RATING,
    order: 'asc',
  },
  currentPage: 1,
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setIndexOfCategory: (state, action: PayloadAction<number>) => {
      state.indexOfCategory = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortTypeState>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilterSlice: (state, action:PayloadAction<FilterSliceState>) => {
      state.indexOfCategory = action.payload.indexOfCategory;
      state.sortType = action.payload.sortType;
      state.currentPage = action.payload.currentPage;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setIndexOfCategory, setSortType, setCurrentPage, setFilterSlice, setSearchValue } =
  filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export default filterSlice.reducer;
