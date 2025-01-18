import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFetch } from '~/common/useFetch';
import { useToken } from '~/common/useToken';
type ResponseType = {
  success: boolean;
  data: AuthUserType;
};
type AuthUserType = {
  email: string;
  name: string;
  role: string;
  profileImage: string;
  type: string;
};
export const useAuth = () => {
  const router = useRouter();
  const fetchData = useFetch();
  const { getToken } = useToken();

  const accessToken = getToken('access_token');

  if (!accessToken) {
    router.push('/login');
  }

  const [user, setUser] = useState({});
  useEffect(() => {
    if (accessToken) {
      console.log('accessToken');
      console.log(accessToken);
      (async () => {
        const res: ResponseType = await fetchData('/api/auth/verify/token', {
          method: 'POST',
          headers: {
            Authorization: `${accessToken}`,
          },
        });
        console.log(res);
        if (res.success) {
          setUser(res.data);
        }
      })();
    }
  }, []);

  return { accessToken, user };
};
