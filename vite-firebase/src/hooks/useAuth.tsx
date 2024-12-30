import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { useFirebaseApp } from './useFirebase';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '~/store';
import { setUser } from '~/store/userSlice';

export const useAuth = () => {
  const dispatch: AppDispatch = useDispatch();

  const firebaseApp = useFirebaseApp();

  const getFirebaseAuth = (): Auth => {
    return getAuth(firebaseApp);
  };

  const getProvider = (): GoogleAuthProvider => {
    return new GoogleAuthProvider();
  };

  /**
   * 구글 로그인
   * 성공 시 상태 저장
   */
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

  /**
   * 로그아웃
   */
  const googleSignout = () => {
    signOut(getFirebaseAuth());
    dispatch(setUser(null));
  };

  return { googleSignin, googleSignout };
};
