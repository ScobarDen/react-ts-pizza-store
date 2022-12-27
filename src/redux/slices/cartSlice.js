import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      /*state.items.push(action.payload);
                              state.totalPrice = state.items.reduce(
                                (sum, item) => sum + item.price,
                                0,
                              );*/
      const findItem = state.items.find((pizzaObject) => pizzaObject.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });
      state.totalPrice = state.items.reduce((sum, item) => sum + item.price * item.count, 0);
    },
    removeItem(state, action) {
      state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export const statesOfCart = (state) => state.cart;

export default cartSlice.reducer;
