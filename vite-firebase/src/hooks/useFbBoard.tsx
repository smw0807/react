import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  DocumentData,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useFirebaseApp } from './useFirebase';
import { useAuth } from '~/hooks/useAuth';

export const useFbBoard = () => {
  const firebaseApp = useFirebaseApp();
  const db = getFirestore(firebaseApp);
  const COLLECTION_NAME = 'board';

  // 게시글
  const [board, setBoard] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME));
    const unsubscirbe = onSnapshot(q, (snapshot) => {
      const boardList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBoard(boardList);
      setLoading(false);
    });
    return () => {
      unsubscirbe();
    };
  }, [db]);

  // 글쓰기
  const { user } = useAuth();
  const handleWrite = async (data: DocumentData) => {
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        writerEmail: user?.email,
        regDtime: new Date(),
        updDtime: new Date(),
      });
    } catch (e) {
      console.error('글쓰기 실패 : ', e);
    }
  };

  return { board, loading, handleWrite };
};
