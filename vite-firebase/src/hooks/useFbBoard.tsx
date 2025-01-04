import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
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
  const boardWrite = async (data: DocumentData) => {
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

  // 글수정
  const boardUpdate = async (data: DocumentData) => {
    try {
      const id = data.id;
      delete data.id;
      await updateDoc(doc(db, COLLECTION_NAME, id), {
        ...data,
        updDtime: new Date(),
      });
    } catch (e) {
      console.error('글수정 실패 : ', e);
    }
  };

  //글삭제
  const boardDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.error('글삭제 실패 : ', e);
    }
  };

  return { board, loading, boardWrite, boardUpdate, boardDelete };
};
