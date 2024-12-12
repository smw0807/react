import { createSlice } from '@reduxjs/toolkit';
export const cartStore = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 },
  ],
  reducers: {
    addCount(state, actions) {
      const newState = state.find((v) => v.id === actions.payload);
      newState.count = newState.count + 1;
    },
    minusCount(state, actions) {
      const newState = state.find((v) => v.id === actions.payload);
      if (newState.count === 0) return state;
      newState.count = newState.count - 1;
    },
    removeItem(state, actions) {
      const findIndex = state.findIndex((v) => v.id === actions.payload);
      state.splice(findIndex, 1);
    },
    addItem(state, actions) {
      const findItem = state.find((v) => v.id === actions.payload.id);
      if (findItem) {
        findItem.count = findItem.count + 1;
      } else {
        state.push(actions.payload);
      }
    },
  },
});
