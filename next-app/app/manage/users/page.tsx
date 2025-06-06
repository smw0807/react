/**
 * columns는 렌더링마다 새로운 배열을 생성하므로 useMemo로 메모이제이션하면 불필요한 재생성을 방지할 수 있습니다.
 * 콜백 함수들은 useCallback으로 메모이제이션하여 불필요한 리렌더링을 방지하고, 자식 컴포넌트에 props로 전달될 때 안정적인 참조를 유지할 수 있습니다.
 * 특히 getUsers는 useEffect의 의존성 배열에 포함되어 있으므로, useCallback으로 메모이제이션하는 것이 중요합니다
 *
 */
'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Button, Col, notification, Pagination, Row, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { useFetch } from '~/common/useFetch';
import { SignUp } from '~/components/user/SignUp';
import dayjs from 'dayjs';
import { EditUser, FormValues, Role, Status } from '~/components/user/EditUser';
import Search from 'antd/es/input/Search';

type User = {
  type: string;
  email: string;
  name: string;
  phoneNumber: string;
  profileImage: string;
  role: Role;
  status: Status;
  createdAt: string;
  lastLoginAt: string;
};
export default function Users() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const getUsers = useCallback(async () => {
    try {
      const res = await fetchData(
        `/api/user?size=${pageSize}&page=${page}&keyword=${keyword}`
      );
      setUsers(res.user.users);
      setTotalCount(res.user.totalCount);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, keyword]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const fetchData = useFetch();
  const handleSignUp = useCallback(
    async (values: any) => {
      try {
        const res = await fetchData('/api/user/signup', {
          method: 'POST',
          body: JSON.stringify(values),
        });
        if (res.success) {
          api.success({
            message: '회원추가 성공',
            description: '회원추가가 완료되었습니다.',
          });
          setSignUpOpen(false);
          getUsers();
        } else {
          api.error({
            message: '회원가입 실패',
            description: res.message,
          });
        }
      } catch (e: any) {
        console.error(e);
        api.error({
          message: '회원가입 실패',
          description: e.message,
        });
      }
    },
    [api, fetchData, getUsers]
  );
  const handleEdit = (values: FormValues) => {
    fetchData(`/api/user/${values.email}`, {
      method: 'PUT',
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.success) {
        api.success({
          message: '회원정보 수정 성공',
          description: '회원정보가 수정되었습니다.',
        });
        getUsers();
      } else {
        api.error({
          message: '회원정보 수정 실패',
          description: res.message,
        });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        title: '로그인유형',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '이메일',
        dataIndex: 'email',
        key: 'email',
        render: (text: string) => {
          return <EditUser email={text} handleEdit={handleEdit} />;
        },
      },
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '휴대폰번호',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '권한',
        dataIndex: 'role',
        key: 'role',
        render: (text: string) => {
          return (
            <>
              <Tag color={text === 'ADMIN' ? 'geekblue' : 'orange'}>
                {text === 'ADMIN' ? '관리자' : '사용자'}
              </Tag>
            </>
          );
        },
      },
      {
        title: '상태',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => {
          return (
            <>
              <Tag color={text === 'ACTIVE' ? 'green' : 'red'}>
                {text === 'ACTIVE' ? '활성' : '비활성'}
              </Tag>
            </>
          );
        },
      },
      {
        title: '생성일',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text: string) => {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        },
      },
      {
        title: '마지막 로그인',
        dataIndex: 'lastLoginAt',
        key: 'lastLoginAt',
        render: (text: string) => {
          return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
      },
    ],
    []
  );

  return (
    <>
      {contextHolder}
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          회원목록 ({totalCount}명)
        </Title>
        <Button type="primary" onClick={handleSignUpOpen}>
          회원추가
        </Button>
      </Row>
      <Row justify="end" align="middle">
        <Col span={6}>
          <Search
            placeholder="이메일 또는 이름 검색"
            enterButton="검색"
            size="large"
            loading={loading}
            onSearch={(value) => setKeyword(value)}
          />
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="email"
        pagination={false}
        loading={loading}
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
      {signUpOpen && (
        <SignUp
          open={signUpOpen}
          onClose={handleSignUpClose}
          register={handleSignUp}
          confirmText="회원을 추가하시겠습니까?"
        />
      )}
    </>
  );
}
