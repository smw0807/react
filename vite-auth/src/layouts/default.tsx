import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import useToken from '../hooks/useToken';
import Header from '../components/Header';

function DefaultLayout() {
  const navigate = useNavigate();
  const { getToken } = useToken();

  useEffect(() => {
    //todo accessToken 없을 시 재발급 로직 추가
    const refreshToken = getToken('refresh');
    if (!refreshToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
