import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { UserState, setUser } from '~/store/userSlice';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.userStore.user);
  const dispatch: AppDispatch = useDispatch();

  const dispatchUser = (user: UserState) => {
    console.log(user);
    dispatch(setUser(user));
  };

  return { user, dispatchUser };
};
