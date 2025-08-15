import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import useToken from './useToken';
import { User, useUserStore } from '@/store/user';

export default function useAuth() {
  const { getToken, removeToken } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  useEffect(() => {
    const accessToken = getToken('access');
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      useUserStore.setState({ user: decoded as User });
    }
  }, [pathname]);

  const handleLogout = () => {
    removeToken('access');
    removeToken('refresh');
    useUserStore.setState({ user: null });
    router.push('/login');
  };
  return { user, handleLogout };
}
