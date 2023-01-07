import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  items: CartItem[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
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
      if (findItem){
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

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((pizzaObject) => pizzaObject.id === id);

export default cartSlice.reducer;
