import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useToken from './useToken';
import { User, useUserStore } from '@/store/user';
import { refreshToken, verifyToken } from '@/apis/auth';

const handleVerifyToken = async (accessToken: string) => {
  try {
    const res = await verifyToken(accessToken);
    const result = await res.json();
    if (result.success) {
      return result.data as User;
    } else {
      return null;
    }
  } catch (err) {
    console.error('토큰 검증 실패 : ', err);
    return null;
  }
};

const handleRefreshToken = async (refreshTokenValue: string) => {
  try {
    const res = await refreshToken(refreshTokenValue);
    const result = await res.json();
    if (result.success && result.token) {
      return {
        accessToken: result.token.access_token,
        refreshToken: result.token.refresh_token,
      };
    }
    return null;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    return null;
  }
};

export default function useAuth() {
  const { setToken, getToken, removeToken } = useToken();
  const router = useRouter();
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const verifyAndRefreshToken = async () => {
    const accessToken = getToken('access');
    const refreshTokenValue = getToken('refresh');

    // 토큰이 전혀 없는 경우
    if (!accessToken && !refreshTokenValue) {
      setIsLoading(false);
      return;
    }

    // Access token이 있는 경우 먼저 검증
    if (accessToken) {
      const userData = await handleVerifyToken(accessToken);
      if (userData) {
        useUserStore.setState({ user: userData });
        setIsLoading(false);
        return;
      }
    }

    // Access token이 없거나 만료된 경우 refresh token으로 갱신
    if (refreshTokenValue) {
      const newTokens = await handleRefreshToken(refreshTokenValue);
      if (newTokens) {
        setToken('access', newTokens.accessToken);
        setToken('refresh', newTokens.refreshToken);

        // 갱신된 토큰에서 사용자 정보 추출 (중복 검증 제거)
        const userData = await handleVerifyToken(newTokens.accessToken);
        if (userData) {
          useUserStore.setState({ user: userData });
        } else {
          handleLogout();
        }
      } else {
        // Refresh token도 실패한 경우 로그아웃
        handleLogout();
      }
    } else {
      // Refresh token도 없는 경우 로그아웃
      handleLogout();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 한 번만 실행
    if (!user) {
      verifyAndRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []); // 빈 의존성 배열로 변경

  // 경로 변경 시 로딩 상태만 업데이트 (불필요한 API 호출 방지)
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [pathname, user]);

  const handleLogout = () => {
    removeToken('access');
    removeToken('refresh');
    useUserStore.setState({ user: null });
    router.push('/login');
  };

  return { user, handleLogout, isLoading };
}
