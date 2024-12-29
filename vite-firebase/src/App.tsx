import { useState } from 'react';
import { Layout, Menu, theme, Typography, Button, Row, Col } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import RoutesComponent, { items } from './routes';
const { Header, Content, Footer, Sider } = Layout;
import { LoginOutlined } from '@ant-design/icons';

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
        style={{ display: 'flex', alignItems: 'center', padding: '0 0 0 25px' }}
      >
        <Row
          justify="space-between"
          align="middle"
          gutter={32}
          style={{ width: '100%' }}
        >
          <Col>
            <Typography.Title level={2} style={{ color: 'white', margin: 0 }}>
              React Firebase
            </Typography.Title>
          </Col>
          <Col style={{ paddingRight: 0 }}>
            <Button icon={<LoginOutlined />}>로그인</Button>
          </Col>
        </Row>
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
            items={items}
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
              <RoutesComponent />
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
