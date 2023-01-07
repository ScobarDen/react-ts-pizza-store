import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type SortTypeState = {
  name: string;
  sort: 'rating' | 'price' | 'alphabet';
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
    sort: 'rating',
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
    setSortType: (state, action:PayloadAction<SortTypeState>) => {
      state.sortType = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilterSlice: (state, action) => { // todo: :PayloadAction<FilterSliceState>
      state.indexOfCategory = Number(action.payload.category);
      state.sortType.sort = action.payload.sort.sort;
      state.sortType.name = action.payload.sort.name;
      state.sortType.order = action.payload.order;
      state.currentPage = Number(action.payload.page);
    },
    setSearchValue: (state, action:PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setIndexOfCategory, setSortType, setCurrentPage, setFilterSlice, setSearchValue } =
  filterSlice.actions;

export const selectFilters = (state: RootState) => state.filter;

export default filterSlice.reducer;
