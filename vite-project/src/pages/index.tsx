import { hasToken } from '../common/Token';
import { Navigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { clearAllTokens } from '~/common/Token';
const IndexPage = () => {
  // 토큰 없을 경우 로그인 페이지로
  if (!hasToken()) {
    return <Navigate to="/signin" />;
  }
  return (
    <div>
      <Button variant="contained" onClick={clearAllTokens}>
        로그아웃
      </Button>
    </div>
  );
};

export default IndexPage;
