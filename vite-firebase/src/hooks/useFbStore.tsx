import { useEffect, useState } from 'react';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { useFirebaseApp } from './useFirebase';
import { useAuth } from './useAuth';
import { message } from 'antd';

export const useFbStorage = () => {
  const firebaseApp = useFirebaseApp();
  const storage = getStorage(firebaseApp);
  const db = getFirestore(firebaseApp);
  const FILE_PATH = 'react-storage';
  const COLLECTION_NAME = 'file';

  const { user } = useAuth();

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
    if (!user) {
      message.error('로그인 후 이용해주세요.');
      return;
    }
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
          [snapshot.metadata.name]: await getDownloadURL(snapshot.ref),
        }))
      );
      return downloadUrlArray;
    } catch (e) {
      console.error(e);
      throw new Error('파일 업로드 실패');
    }
  };

  // 파일 게시글 등록
  const fileBoardWrite = async (downloadUrl: { [key: string]: string }) => {
    if (!user) {
      message.error('로그인 후 이용해주세요.');
      return;
    }
    const storageFileName = Object.keys(downloadUrl)[0];
    const fileName = storageFileName.split('||')[1];
    const fileUrl = downloadUrl[storageFileName];
    try {
      await addDoc(collection(db, COLLECTION_NAME), {
        writerEmail: user.email,
        storageFileName,
        fileUrl,
        fileName,
        createdAt: new Date(),
        downloadCount: 0,
      });
    } catch (e) {
      console.error(e);
      throw new Error('파일 게시글 등록 실패');
    }
  };

  // 파일 다운로드
  const fileDownload = async (id: string) => {
    try {
      const docInfo = await getDoc(doc(db, COLLECTION_NAME, id));
      const data = docInfo.data();
      if (!data) return;
      const downloadUrl = data.fileUrl;
      const fileName = data.fileName;

      const response = await fetch(downloadUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 다운로드 수 증가
      await updateDoc(doc(db, COLLECTION_NAME, id), {
        downloadCount: data.downloadCount + 1,
      });
    } catch (err) {
      console.error(err);
      throw new Error('파일 다운로드 실패');
    }
  };

  // 파일 삭제
  const fileDelete = async (id: string) => {
    try {
      // 데이터 조회
      const docInfo = await getDoc(doc(db, COLLECTION_NAME, id));
      const data = docInfo.data();
      if (!data) return;
      // 파일 삭제
      const desertRef = ref(storage, `${FILE_PATH}/${data.storageFileName}`);
      await deleteObject(desertRef);
      // 게시글 삭제
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (e) {
      console.error(e);
      throw new Error('파일 삭제 실패');
    }
  };

  return {
    fileList,
    loading,
    fileUpload,
    fileBoardWrite,
    fileDownload,
    fileDelete,
  };
};
