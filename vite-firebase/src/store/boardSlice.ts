import { createSlice } from '@reduxjs/toolkit';

export type BoardDocumentType = {
  id: string;
  writerEmail: string;
  title: string;
  content: string;
  regDtime: Date;
  updDtime: Date;
};
const initialState: BoardDocumentType[] = [];

export const boardStore = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoard(state, actions) {
      state = actions.payload;
    },
  },
});

export const { setBoard } = boardStore.actions;
