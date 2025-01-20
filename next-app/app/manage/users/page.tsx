'use client';
import { useEffect, useState } from 'react';
import { Button, notification, Row, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { useFetch } from '~/common/useFetch';
import { SignUp } from '~/components/user/SignUp';
type User = {
  type: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  lastLoginAt: string;
};
export default function Users() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const fetchData = useFetch();
  const handleSignUp = async (values: any) => {
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
  };

  const columns = [
    {
      title: '회원타입',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      key: 'email',
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
    },
    {
      title: '마지막 로그인',
      dataIndex: 'lastLoginAt',
      key: 'lastLoginAt',
    },
  ];
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchData('/api/user').then((res) => {
      setUsers(res.user.users);
    });
  }, []);
  return (
    <>
      {contextHolder}
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          회원목록
        </Title>
        <Button type="primary" onClick={handleSignUpOpen}>
          회원추가
        </Button>
      </Row>
      <Table columns={columns} dataSource={users} rowKey="email" />
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
