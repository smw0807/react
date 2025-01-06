import { useEffect, useState } from 'react';
import { getStorage } from 'firebase/storage';
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

export const useFbStorage = () => {
  const firebaseApp = useFirebaseApp();
  const storage = getStorage(firebaseApp);
  const db = getFirestore(firebaseApp);
  const FILE_PATH = 'react-storage';
  const COLLECTION_NAME = 'file';

  // 파일 리스트
  const [fileList, setFileList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const q = query(collection(db, COLLECTION_NAME));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fileList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setFileList(fileList);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });

  // 파일 업로드
  const fileUpload = async (file: FIle[]) => {
    console.log(file);
  };

  // 파일 게시글 등록

  // 파일 다운로드

  // 파일 삭제

  return {
    fileList,
    loading,
  };
};
