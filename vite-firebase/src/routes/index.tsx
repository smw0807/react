import Board from '~/pages/Board';
import Main from '~/pages';
import { Route, Routes } from 'react-router-dom';
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

export const items: MenuItem[] = [
  getItem('홈', '/', <HomeOutlined />),
  getItem('게시판', '/board', <TableOutlined />),
];

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
};
