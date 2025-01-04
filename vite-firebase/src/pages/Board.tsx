import { Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { DocumentData, Timestamp } from 'firebase/firestore';
import { BoardWrite } from '~/components/BoardWrite';
import { BoardDetail } from '~/components/BoardDetail';
import { useFbBoard } from '~/hooks/useFbBoard';

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
    render: (_content: string, row: DocumentData) => <BoardDetail row={row} />,
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
  const { board, loading, boardWrite } = useFbBoard();

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          게시판
        </Title>
        <BoardWrite handleWrite={boardWrite} />
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={board}
        rowKey="id"
      />
    </div>
  );
}
