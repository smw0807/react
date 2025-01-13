import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const { Sider } = Layout;
export const NavigationComponent = ({ collapsed }: { collapsed: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Sider collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: '/',
            icon: <UserOutlined />,
            label: 'Home',
            onClick: () => {
              router.push('/');
            },
          },
        ]}
      />
    </Sider>
  );
};
