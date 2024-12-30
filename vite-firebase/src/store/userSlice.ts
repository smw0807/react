import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

interface UserState {
  user: {
    uid: string | null;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  } | null;
}

const initialState: UserState = {
  user: null,
};

export const userStore = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, actions) {
      if (actions.payload) {
        const { uid, email, displayName, photoURL } = actions.payload as User;
        state.user = {
          uid,
          email,
          displayName,
          photoURL,
        };
      } else {
        state.user = null;
      }
    },
  },
});

export const { setUser } = userStore.actions;
