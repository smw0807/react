import { Outlet } from 'react-router';
import useToken from '../hooks/useToken';
import Header from '../components/Header';

function DefaultLayout() {
  useToken();

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
