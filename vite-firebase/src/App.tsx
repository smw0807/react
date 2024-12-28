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
      <Header
        style={{ display: 'flex', alignItems: 'center', paddingLeft: '25px' }}
      >
        <Typography.Title level={2} style={{ color: 'white' }}>
          React Firebase
        </Typography.Title>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            defaultSelectedKeys={[location.pathname]}
            mode="inline"
            items={MenuItems}
            onClick={(e) => navigate(e.key)}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: '15px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height: '100%',
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
    </Layout>
  );
}

export default App;
