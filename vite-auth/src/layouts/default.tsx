import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import useToken from '../hooks/useToken';

function DefaultLayout() {
  const navigate = useNavigate();
  const { getToken } = useToken();

  useEffect(() => {
    const accessToken = getToken('access');
    if (!accessToken) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
