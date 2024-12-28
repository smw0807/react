import type { MenuProps } from 'antd';
import { HomeOutlined, TableOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('홈', '/', <HomeOutlined />),
  getItem('데이터', '/login', <TableOutlined />),
];

export default items;
