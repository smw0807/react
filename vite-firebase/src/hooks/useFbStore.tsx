import { useEffect, useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  collection,
  DocumentData,
  getFirestore,
  onSnapshot,
  query,
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
  const fileUpload = async (file: File[]) => {
    if (file.length === 0) return;
    const uploadPromises = file.map((file) => {
      const fileRef = ref(
        storage,
        `${FILE_PATH}/${new Date().getTime()}||${file.name}`
      );
      return uploadBytesResumable(fileRef, file);
    });
    try {
      const snapshotArray = await Promise.all(uploadPromises);
      const downloadUrlArray = await Promise.all(
        snapshotArray.map(async (snapshot) => ({
          [snapshot.metadata.name.split('||')[1]]: await getDownloadURL(
            snapshot.ref
          ),
        }))
      );
      return downloadUrlArray;
    } catch (e) {
      console.error(e);
      throw new Error('파일 업로드 실패');
    }
  };

  // 파일 게시글 등록

  // 파일 다운로드

  // 파일 삭제

  return {
    fileList,
    loading,
    fileUpload,
  };
};
