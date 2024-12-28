import Login from './pages/Login';
import Main from './pages';
import { useState } from 'react';
import { Layout, Menu, theme, Typography } from 'antd';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import MenuItems from './routes';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{ height: 50, background: 'red' }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={MenuItems}
          onClick={(e) => navigate(e.key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Typography.Title level={1}>Title</Typography.Title>
        </Header>
        <Content style={{ margin: '20px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
