import { useState } from 'react';
import { Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import dayjs from 'dayjs';
export type PointHistory = {
  point: number;
  reason: string;
  createdAt: string;
};
type Props = {
  point: number;
  pointHistory: PointHistory[];
};
const columns = [
  {
    title: '포인트',
    dataIndex: 'point',
    key: 'point',
  },
  {
    title: '이유',
    dataIndex: 'reason',
    key: 'reason',
  },
  {
    title: '날짜',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
  },
];
export const PointHistoryList = ({ point, pointHistory }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button
        size="small"
        icon={<SearchOutlined />}
        onClick={handleModalOpen}
      />
      <Modal open={isModalOpen} onCancel={handleModalClose} footer={null}>
        <div>
          <h1>포인트 내역</h1>
          <p>총 포인트: {point}점</p>
        </div>
        <Table columns={columns} dataSource={pointHistory} />
      </Modal>
    </>
  );
};
