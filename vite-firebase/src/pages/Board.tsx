import { Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import {
  collection,
  DocumentData,
  Timestamp,
  getFirestore,
  onSnapshot,
  query,
  addDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirebaseApp } from '~/hooks/useFirebase';
import BoardWrite from '~/components/BoardWrite';
import { useAuth } from '~/hooks/useAuth';

const COLLECTION_NAME = 'board';
const columns = [
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
    render: (content: string) => (
      <span>
        {content.length > 10 ? content.slice(0, 10) + '...' : content}
      </span>
    ),
  },
  {
    title: '작성자',
    dataIndex: 'writerEmail',
    key: 'writerEmail',
  },
  {
    title: '작성일',
    dataIndex: 'regDtime',
    key: 'regDtime',
    render: (date: Timestamp) => <span>{date.toDate().toLocaleString()}</span>,
  },
];
export default function Board() {
  const [board, setBoard] = useState<DocumentData[]>([]);
  const firebaseApp = useFirebaseApp();
  const db = getFirestore(firebaseApp);
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

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          게시판
        </Title>
        <BoardWrite handlWrite={handleWrite} />
      </Row>
      <Table columns={columns} dataSource={board} rowKey="id" />
    </div>
  );
}
