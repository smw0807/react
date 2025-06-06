import { Route, Routes } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  TableOutlined,
  FolderOpenFilled,
} from '@ant-design/icons';
import { Main } from '~/pages';
import { Board } from '~/pages/Board';
import { FileStorage } from '~/pages/FileStorage';
import { Error404 } from '~/pages/error/404';

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
  getItem('파일 저장소', '/fileStorage', <FolderOpenFilled />),
];

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/board" element={<Board />} />
      <Route path="/fileStorage" element={<FileStorage />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};
