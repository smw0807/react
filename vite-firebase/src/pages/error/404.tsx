import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="페이지를 찾을 수 없습니다."
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          메인으로 돌아가기
        </Button>
      }
    />
  );
};
