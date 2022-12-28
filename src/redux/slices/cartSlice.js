import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((pizzaObject) => pizzaObject.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count,0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count,0);
    },
    removeOneItem(state, action) {
      const findItem = state.items.find((pizzaObject) => pizzaObject.id === action.payload);
      findItem.count--;
      if (findItem.count === 0) {
        state.items = state.items.filter((pizzaObject) => pizzaObject.id !== findItem.id);
      }
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
      state.totalCount = state.items.reduce((sum, item) => sum + item.count,0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, removeOneItem } = cartSlice.actions;

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((pizzaObject) => pizzaObject.id === id);

export default cartSlice.reducer;
