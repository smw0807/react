import { configureStore, createSlice } from '@reduxjs/toolkit';

// useEffect 와 비슷한 역할을 하는 함수
const user = createSlice({
  name: 'user',
  initialState: 'song',
  reducers: {
    addName(state, action) {
      return state + action.payload;
    },
  },
});

export const { addName } = user.actions;

const stockStore = createSlice({
  name: 'stock',
  initialState: [10, 11, 12],
});

const cartStore = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
});
export default configureStore({
  reducer: {
    userStore: user.reducer,
    stockStore: stockStore.reducer,
    cartStore: cartStore.reducer,
  },
});
