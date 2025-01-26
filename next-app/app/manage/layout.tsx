'use client';
import { useState } from 'react';
import { Layout, Modal, theme } from 'antd';
import { NavigationComponent } from '~/components/Navigation';
import { HeaderComponent } from '~/components/Header';
import { Footer } from 'antd/es/layout/layout';
import { useToken } from '~/common/useToken';
import { useRouter } from 'next/navigation';

const { Content } = Layout;
export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const { removeToken } = useToken();
  const router = useRouter();
  const [api, modal] = Modal.useModal();
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
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <Layout>
          <HeaderComponent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            handleLogout={handleLogout}
          />

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {modal}
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}
