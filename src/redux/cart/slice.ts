import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, CartSliceState } from './types';

const { totalPrice, totalCount, items } = getCartFromLocalStorage();

const initialState: CartSliceState = {
  totalPrice,
  totalCount,
  items,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((pizzaObject) => pizzaObject.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    removeOneItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((pizzaObject) => pizzaObject.id === action.payload);
      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter((pizzaObject) => pizzaObject.id !== findItem.id);
        }
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeOneItem } = cartSlice.actions;

export default cartSlice.reducer;