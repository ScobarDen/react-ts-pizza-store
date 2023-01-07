import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

export const { LOADING, SUCCESS, ERROR }: Record<string, StatusFetch> = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

type PizzaItemState = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export const fetchPizzasItems = createAsyncThunk<PizzaItemState[], Record<string, string>>(
  'pizzas/fetchPizzasItemsStatus',
  async ({ category, sortBy, search, currentPage, limit }) => {
    const { data } = await axios.get<PizzaItemState[]>(
      `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}&page=${currentPage}&limit=${limit}`,
    );
    return data;
  },
);

type StatusFetch = 'loading' | 'success' | 'error';

interface PizzaSliceState {
  pizzasItems: PizzaItemState[];
  status: StatusFetch; // loading | success | error
}

const initialState: PizzaSliceState = {
  pizzasItems: [],
  status: LOADING, // loading | success | error
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
      state.status = LOADING;
      state.pizzasItems = [];
    });
    builder.addCase(fetchPizzasItems.fulfilled, (state, action) => {
      state.pizzasItems = action.payload;
      state.status = SUCCESS;
    });
    builder.addCase(fetchPizzasItems.rejected, (state) => {
      state.status = ERROR;
      state.pizzasItems = [];
    });
  },
});

export const { setPizzasItems } = pizzasSlice.actions;

export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
