import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

export const userStore = createSlice({
  name: 'user',
  initialState: {
    user: {} as User,
  },
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload;
    },
  },
});

export const { setUser } = userStore.actions;
