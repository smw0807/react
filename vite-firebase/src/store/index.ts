import { configureStore } from '@reduxjs/toolkit';
import { userStore } from './userSlice';

export default configureStore({
  reducer: {
    userStore: userStore.reducer,
  },
});
