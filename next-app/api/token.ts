/**
 * 토큰 관련 api
 */

const fetchAPI = async (url: string, token: string) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    });
    return await res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * 토큰 정보 확인
 * @param token
 * @returns
 */
export const userInfo = (token: string) =>
  fetchAPI(`${process.env.NEXT_API_URL}/api/auth/verify/token`, token);

/**
 * 리프레시 토큰 이용해 토큰 갱신
 * @param token
 * @returns
 */
export const getRefreshToken = (token: string) =>
  fetchAPI(`${process.env.NEXT_API_URL}/api/auth/refresh/token`, token);
