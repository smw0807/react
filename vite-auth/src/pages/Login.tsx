import useToken from '../hooks/useToken';

import LoginForm from '../components/form/Login';

function Login() {
  const { handleLogin } = useToken();
  const onSubmit = async (username: string, password: string) => {
    await handleLogin(username, password);
  };
  return (
    <div>
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default Login;
