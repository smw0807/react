import { createSlice } from '@reduxjs/toolkit';
// useEffect 와 비슷한 역할을 하는 함수
export const user = createSlice({
  name: 'user',
  initialState: {
    name: 'song',
    age: 33,
  },
  reducers: {
    addName(state, action) {
      state.name = state.name + action.payload;
    },
    addAge(state) {
      state.age = state.age + 1;
    },
  },
});
