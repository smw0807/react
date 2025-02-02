import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    email: string;
    name: string;
    role: string;
    type: string;
    profileImage: string;
  } | null;
}

const initialState: UserState = {
  user: null,
};

export const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userStore.actions;
