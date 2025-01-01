import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import {
  collection,
  DocumentData,
  Timestamp,
  getFirestore,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useFirebaseApp } from '~/hooks/useFirebase';

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
    const q = query(collection(db, 'board'));
    const unsubscirbe = onSnapshot(q, (snapshot) => {
      const boardList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setBoard(boardList);
      console.log(boardList);
    });
    return () => {
      unsubscirbe();
    };
  }, [db]);

  return (
    <div>
      <Title level={2} style={{ margin: 0 }}>
        게시판
      </Title>
      <Table columns={columns} dataSource={board} />
    </div>
  );
}
