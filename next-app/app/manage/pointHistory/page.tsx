'use client';
import { useEffect, useState } from 'react';
import { Pagination, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { useFetch } from '~/common/useFetch';

export default function PointHistory() {
  const fetchData = useFetch();

  const [pageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pointHistory, setPointHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');

  const columns = [
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '총 적립금',
      dataIndex: 'totalPoint',
      key: 'totalPoint',
    },
    {
      title: '적립금',
      dataIndex: 'point',
      key: 'point',
    },
    {
      title: '사유',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: '적립일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
  ];

  const getPointHistory = async () => {
    try {
      const res = await fetchData(
        `/api/point/history?size=${pageSize}&page=${page}&keyword=${keyword}`
      );
      console.log(res);
      if (res.success) {
        setPointHistory(res.data.pointHistoryList);
        setTotalCount(res.data.totalCount);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPointHistory();
  }, [page, pageSize, keyword]);
  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          적립금 내역 조회
        </Title>
      </Row>
      <Table
        loading={loading}
        columns={columns}
        dataSource={pointHistory}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        align="center"
        defaultCurrent={page}
        total={totalCount}
        pageSize={pageSize}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </>
  );
}
