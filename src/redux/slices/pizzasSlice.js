import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const { LOADING, SUCCESS, ERROR } = { LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' };

export const fetchPizzasItems = createAsyncThunk(
  'pizzas/fetchPizzasItemsStatus',
  async ({ category, sortBy, search, currentPage, limit }) => {
    const { data } = await axios.get(
      `https://63a096f1e3113e5a5c41fd8d.mockapi.io/items?${category}${sortBy}${search}&page=${currentPage}&limit=${limit}`,
    );
    return data;
  },
);

const initialState = {
  pizzasItems: [],
  status: LOADING, // loading | success | error
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzasItems: (state, action) => {
      state.pizzasItems = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzasItems.pending]: (state) => {
      state.status = LOADING;
      state.items = [];
    },
    [fetchPizzasItems.fulfilled]: (state, action) => {
      state.pizzasItems = action.payload;
      state.status = SUCCESS;
    },
    [fetchPizzasItems.rejected]: (state) => {
      state.status = ERROR;
      state.items = [];
    },
  },
});

export const { setPizzasItems } = pizzasSlice.actions;

export const statesOfPizzas = (state) => state.pizzas;

export default pizzasSlice.reducer;
