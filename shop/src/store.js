import { configureStore, createSlice } from '@reduxjs/toolkit';
import { user } from './store/userSlice';
import { cartStore } from './store/cartSlice';
export const { addName, addAge } = user.actions;
export const { addCount, minusCount, addItem, removeItem } = cartStore.actions;

const stockStore = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

export default configureStore({
  reducer: {
    userStore: user.reducer,
    stockStore: stockStore.reducer,
    cartStore: cartStore.reducer,
  },
});
