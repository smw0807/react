import { boardStore, setBoard } from '~/store/boardSlice';

import { useFirestoreDB } from './useFirestoreDB';
import { useDispatch } from 'react-redux';

const COLLECTION_NAME = 'board';

export const useBoard = () => {
  const { getFirestoreData } = useFirestoreDB();
  const dispatch = useDispatch();

  const getBoard = async () => {
    const board = await getFirestoreData(COLLECTION_NAME);
    console.log(board);
    // dispatch(setBoard(board));
  };

  return {
    getBoard,
  };
};
