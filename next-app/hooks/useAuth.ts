import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { UserState, setUser } from '~/store/userSlice';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.userStore.user);
  const dispatch: AppDispatch = useDispatch();

  const dispatchUser = (user: UserState) => {
    dispatch(setUser(user));
  };

  const cookieStore = useCookies();
  useEffect(() => {
    if (!user) {
      const userInfo = cookieStore.get(process.env.NEXT_PUBLIC_USER_INFO_NAME!);
      if (userInfo) {
        dispatchUser(JSON.parse(userInfo));
      }
    }
  }, [user]);
  return { user, dispatchUser };
};

export default useAuth;
