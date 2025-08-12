import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import useToken from '../hooks/useToken';
import Header from '../components/Header';

function DefaultLayout() {
  console.log('DefaultLayout');
  const navigate = useNavigate();
  const { getToken, verify } = useToken();

  useEffect(() => {
    const accessToken = getToken('access');
    const refreshToken = getToken('refresh');
    if ((!accessToken && !refreshToken) || !refreshToken) {
      navigate('/login');
    }
    if (accessToken) {
      verify(accessToken).then((res) => {
        if (!res) {
          //todo 토큰 재발급 요청
        }
      });
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
