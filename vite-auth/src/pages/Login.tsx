import { useNavigate } from 'react-router';
import { login } from '../api/auth';
import useToken from '../hooks/useToken';

import LoginForm from '../components/form/Login';

function Login() {
  const navigate = useNavigate();
  const { setToken } = useToken();
  const onSubmit = async (username: string, password: string) => {
    const res = await login(username, password);

    const { message, success, token } = await res.json();
    console.log('message : ', message);
    if (success) {
      setToken('access', token.access_token);
      setToken('refresh', token.refresh_token);
      navigate('/');
    }
  };
  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default Login;
