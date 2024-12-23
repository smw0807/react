import { hasToken } from '../common/Token';
import { Navigate } from 'react-router-dom';
const IndexPage = () => {
  // 토큰 없을 경우 로그인 페이지로
  if (!hasToken()) {
    return <Navigate to="/signin" />;
  }
  return <div>IndexPage</div>;
};

export default IndexPage;
