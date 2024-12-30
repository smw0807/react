import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { useFirebaseApp } from './useFirebase';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { setUser } from '~/store/userSlice';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();
  // const userStore = useSelector((state: RootState) => state.userStore);

  const firebaseApp = useFirebaseApp();

  const getFirebaseAuth = (): Auth => {
    return getAuth(firebaseApp);
  };

  const getProvider = (): GoogleAuthProvider => {
    return new GoogleAuthProvider();
  };

  const googleSignin = async (): Promise<void> => {
    try {
      const signinResult = await signInWithPopup(
        getFirebaseAuth(),
        getProvider()
      );
      dispatch(setUser(signinResult.user));
    } catch (e) {
      console.error(e);
      throw new Error('Google Signin Error');
    }
  };

  return { googleSignin };
};
