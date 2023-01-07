import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { SortTypeState } from './filterSlice';

export enum StatusFetch {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaItemState = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export type AsyncParams = {
  indexOfCategory: number;
  sortType: SortTypeState;
  searchValue: string;
  currentPage: number;
  limit: string;
};

export const fetchPizzasItems = createAsyncThunk<PizzaItemState[], AsyncParams>(
  'pizzas/fetchPizzasItemsStatus',
  async ({ indexOfCategory, sortType, searchValue, currentPage, limit }) => {
    const category = indexOfCategory ? `category=${indexOfCategory}` : '';
    const sortBy = `&sortBy=${sortType.sort}&order=${sortType.order}`;
    const search = searchValue ? `&search=${searchValue}` : '';
    const { data } = await axios.get<PizzaItemState[]>(
      `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}&page=${currentPage}&limit=${limit}`,
    );
    return data;
  },
);

interface PizzaSliceState {
  pizzasItems: PizzaItemState[];
  status: StatusFetch; // loading | success | error
}

const initialState: PizzaSliceState = {
  pizzasItems: [],
  status: StatusFetch.LOADING, // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzasItems: (state, action: PayloadAction<PizzaItemState[]>) => {
      state.pizzasItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzasItems.pending, (state) => {
      state.status = StatusFetch.LOADING;
      state.pizzasItems = [];
    });
    builder.addCase(fetchPizzasItems.fulfilled, (state, action) => {
      state.pizzasItems = action.payload;
      state.status = StatusFetch.SUCCESS;
    });
    builder.addCase(fetchPizzasItems.rejected, (state) => {
      state.status = StatusFetch.ERROR;
      state.pizzasItems = [];
    });
  },
});

export const { setPizzasItems } = pizzasSlice.actions;

export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
