import { createSlice } from '@reduxjs/toolkit';

export const userStore = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    setUser(state, actions) {
      state.user = actions;
    },
  },
});

export const { setUser } = userStore.actions;
