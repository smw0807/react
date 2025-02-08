import { cookies } from 'next/headers';
type TokenName = 'access_token' | 'refresh_token';

export const tokenForSSR = async () => {
  const setToken = async (name: TokenName, token: string, options?: any) => {
    const cookiesStore = await cookies();
    if (name === 'access_token') {
      cookiesStore.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,

        token,
        options
      );
    } else {
      cookiesStore.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!,
        token,
        options
      );
    }
  };

  const removeToken = async (name: TokenName | 'all') => {
    const cookiesStore = await cookies();
    if (name === 'access_token') {
      cookiesStore.delete(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    } else if (name === 'refresh_token') {
      cookiesStore.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    } else {
      cookiesStore.delete(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
      cookiesStore.delete(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    }
  };

  const getToken = async (name: TokenName) => {
    const cookiesStore = await cookies();
    if (name === 'access_token') {
      return cookiesStore.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
    } else {
      return cookiesStore.get(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!);
    }
  };

  return { setToken, getToken, removeToken };
};
