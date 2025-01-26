'use client';
import { useEffect, useState } from 'react';
import { Col, Pagination, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { useFetch } from '~/common/useFetch';
import Search from 'antd/es/input/Search';

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
        <Col>
          <Title level={2} style={{ margin: 0 }}>
            적립금 내역 조회 ({totalCount}건)
          </Title>
        </Col>
        <Col>
          <Search
            placeholder="이메일 또는 사유 검색"
            enterButton="검색"
            size="large"
            loading={loading}
            onSearch={(value) => setKeyword(value)}
          />
        </Col>
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
        showSizeChanger={false}
        onChange={(page) => {
          setPage(page);
        }}
      />
    </>
  );
}
