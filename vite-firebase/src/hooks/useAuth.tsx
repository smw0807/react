import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { useFirebaseApp } from './useFirebase';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '~/store';
import { setUser } from '~/store/userSlice';

export const useAuth = () => {
  const user = useSelector((state: RootState) => state.userStore.user);
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
      const { user } = await signInWithPopup(getFirebaseAuth(), getProvider());
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );
    } catch (e) {
      console.error(e);
      throw new Error('구글 로그인 실패');
    }
  };

  /**
   * 로그아웃
   */
  const googleSignout = (): void => {
    signOut(getFirebaseAuth());
    dispatch(setUser(null));
  };

  /**
   * 현재 로그인 중인 사용자 정보 조회
   * 현재 사용자를 가져올 때 권장하는 방법(공식문서).
   * Auth 객체에 관찰자 설정.
   * https://firebase.google.com/docs/auth/web/manage-users?hl=ko&authuser=0
   *
   * Firebase 인증 상태는 비동기적으로 변경되기 때문에 콜백 패턴을 사용한다.
   * 구독패턴(subscription pattern)의 한 종류로, 이벤트가 발생하면 콜백함수가 실행되는 방식이다.
   */
  const getNowUserAuth = (): void => {
    try {
      onAuthStateChanged(getFirebaseAuth(), (user) => {
        if (user) {
          dispatch(
            setUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
        } else {
          dispatch(setUser(null));
        }
      });
    } catch (e) {
      console.error(e);
      throw new Error('현재 사용자 정보 가져오기 실패');
    }
  };

  return { user, googleSignin, googleSignout, getNowUserAuth };
};
