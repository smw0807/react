'use client';
import { useState } from 'react';
import { Layout, theme } from 'antd';
import { NavigationComponent } from '~/components/Navigation';
import { HeaderComponent } from '~/components/Header';
import { Footer } from 'antd/es/layout/layout';

const { Content } = Layout;
export default function ManageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationComponent collapsed={collapsed} />
        <Layout>
          <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />

          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
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
