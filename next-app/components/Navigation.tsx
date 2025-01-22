import { UserOutlined, HistoryOutlined } from '@ant-design/icons';
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
            key: '/manage/users',
            icon: <UserOutlined />,
            label: '사용자목록',
            onClick: () => {
              router.push('/manage/users');
            },
          },
          {
            key: '/manage/pointHistory',
            icon: <HistoryOutlined />,
            label: '적립금 내역 조회',
            onClick: () => {
              router.push('/manage/pointHistory');
            },
          },
        ]}
      />
    </Sider>
  );
};
