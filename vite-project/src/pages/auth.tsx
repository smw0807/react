import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '~/common/Axios';
import { useNavigate } from 'react-router-dom';
import { setToken, TokenType } from '~/common/Token';

const socialSigninUrl = {
  google: '/api/auth/google/callback',
  kakao: '/api/auth/kakao/callback',
};

export default function Auth() {
  // query params 확인
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const code = params.get('code') as string;
  const state = params.get('state') as string;
  useEffect(() => {
    // 구글 로그인
    if (state) {
      handleSocialAuth(code, 'kakao');
    } else {
      handleSocialAuth(code, 'google');
    }
  }, []);

  const navigate = useNavigate();
  const handleSocialAuth = async (code: string, state: 'google' | 'kakao') => {
    try {
      console.log(socialSigninUrl[state]);
      const res = await axios.get(socialSigninUrl[state], {
        params: { code },
      });
      console.log(res);
      if (res.status === 200) {
        setToken(TokenType.ACCESS_TOKEN, res.data.access_token);
        setToken(TokenType.REFRESH_TOKEN, res.data.refresh_token);
        navigate('/');
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <h1>Auth</h1>
    </div>
  );
}
