import { configureStore } from '@reduxjs/toolkit';
import { userStore } from './userSlice';

const store = configureStore({
  reducer: {
    userStore: userStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
