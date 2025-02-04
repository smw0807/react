import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Row, theme } from 'antd';

const { Header } = Layout;
export const HeaderComponent = ({
  collapsed,
  setCollapsed,
  handleLogout,
}: {
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  handleLogout?: () => void;
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Row justify="space-between" align="middle">
        {setCollapsed && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        )}
        {handleLogout && (
          <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>
            로그아웃
          </Button>
        )}
      </Row>
    </Header>
  );
};
