import {
  getFirestore,
  Query,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { useFirebaseApp } from './useFirebase';

// 파이어베이스 데이터 리스트 타입용
export type FirestoreDocType = (DocumentData & { id: string })[] | [];

// 파이어베이스 검색조건 타입용
export type FirestoreWhereType = {
  field: string;
  operator:
    | '<'
    | '<='
    | '=='
    | '>'
    | '>='
    | 'array-contains'
    | 'in'
    | 'array-contains-any';
  value: any;
};

export const useFirestoreDB = () => {
  const firebaseApp = useFirebaseApp();
  const db = getFirestore(firebaseApp);

  /**
   * 파이어베이스 컬렉션 데이터 가져오기
   * @param collectionName 컬렉션 이름 (가져오 컬렉션 이름)
   * @param searchQuery 검새조건 (쿼리를 이용해 가져올 경우 사용)
   */
  const getFirestoreData = async (
    collectionName: string,
    searchQuery?: FirestoreWhereType[] | null
  ): Promise<FirestoreDocType> => {
    let result: FirestoreDocType = [];
    try {
      if (!collectionName) throw new Error('Need CollectionName.');
      let search: Query = collection(db, collectionName);
      // 검색조건이 있을 경우
      if (searchQuery && searchQuery.length) {
        searchQuery.forEach((condition) => {
          search = query(
            search,
            where(condition.field, condition.operator, condition.value)
          );
        });
      }
      const querySnapshot = await getDocs(search);
      if (!querySnapshot.empty) {
        result = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      }
    } catch (err) {
      console.error(err);
      throw new Error('데이터 가져오기 실패');
    }
    return result;
  };

  return { getFirestoreData };
};
