'use client';
import { useEffect, useMemo, useState } from 'react';
import { Button, Descriptions, Modal } from 'antd';
import { useFetch } from '~/common/useFetch';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { HeaderComponent } from '~/components/Header';
import { useToken } from '~/common/useToken';
import { useRouter } from 'next/navigation';

type UserType = {
  email: string;
  name: string;
  type: string;
  role: string;
  status: string;
  lastLoginAt: string;
  profileImage: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  point: {
    point: number;
    pointHistory: {
      point: number;
      reason: string;
      createdAt: string;
    }[];
  };
};

export default function User() {
  const [user, setUser] = useState<UserType>();

  // 포인트 상세보기
  const [pointModal, setPointModal] = useState(false);
  const handlePointModal = () => {
    setPointModal(true);
  };

  const items = useMemo(
    () => [
      {
        key: 'email',
        label: '이메일',
        children: `${user?.email}`,
      },
      {
        key: 'name',
        label: '이름',
        children: `${user?.name}`,
      },

      {
        key: 'type',
        label: '로그인 타입',
        children: `${user?.type}`,
      },
      {
        key: 'role',
        label: '역할',
        children: user?.role === 'ADMIN' ? '관리자' : '사용자',
      },
      {
        key: 'status',
        label: '상태',
        children: `${user?.status}`,
      },
      {
        key: 'lastLoginAt',
        label: '마지막 로그인',
        children:
          user?.lastLoginAt &&
          `${dayjs(user?.lastLoginAt).format('YYYY-MM-DD HH:mm:ss')}`,
      },
      {
        key: 'profileImage',
        label: '프로필 이미지',
        children: `${user?.profileImage}`,
      },
      {
        key: 'phoneNumber',
        label: '전화번호',
        children: `${user?.phoneNumber}`,
      },
      {
        key: 'createdAt',
        label: '생성일',
        children:
          user?.createdAt &&
          `${dayjs(user?.createdAt).format('YYYY-MM-DD HH:mm:ss')}`,
      },
      {
        key: 'updatedAt',
        label: '수정일',
        children:
          user?.updatedAt &&
          `${dayjs(user?.updatedAt).format('YYYY-MM-DD HH:mm:ss')}`,
      },
      {
        key: 'point',
        label: '포인트',
        children: user?.point && (
          <>
            {user?.point.point}점
            <Button
              size="small"
              icon={<SearchOutlined />}
              onClick={handlePointModal}
            />
          </>
        ),
      },
    ],

    [user]
  );
  const fetchData = useFetch();
  useEffect(() => {
    (async () => {
      const res = await fetchData('/api/user/myInfo');
      if (res.success) {
        setUser(res.user);
      }
    })();
  }, []);

  const { removeToken } = useToken();
  const [api, modal] = Modal.useModal();
  const router = useRouter();
  const handleLogout = () => {
    api.confirm({
      title: '정말 로그아웃 하시겠습니까?',
      content: '로그아웃 하면 다시 로그인 해야합니다.',
      okText: '로그아웃',
      cancelText: '취소',
      onOk: () => {
        removeToken('all');
        router.push('/login');
      },
    });
  };

  return (
    <div>
      {modal}
      <HeaderComponent handleLogout={handleLogout} />
      <Descriptions title="내 정보" bordered items={items} />
    </div>
  );
}
