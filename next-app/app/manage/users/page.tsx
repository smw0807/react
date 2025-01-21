'use client';
import { useEffect, useState } from 'react';
import { Button, notification, Row, Table, Tag } from 'antd';
import Title from 'antd/es/typography/Title';
import { useFetch } from '~/common/useFetch';
import { SignUp } from '~/components/user/SignUp';
import dayjs from 'dayjs';
import { EditUser, FormValues, Role, Status } from '~/components/user/EditUser';

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
  ];
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = async () => {
    const res = await fetchData('/api/user');
    setUsers(res.user.users);
  };
  useEffect(() => {
    getUsers();
  }, []);

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
