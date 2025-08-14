'use client';
import { useState } from 'react';
import { login } from '@/apis/auth';
import useToken from '@/hooks/useToken';
import { useRouter } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useToken();
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await login(email, password);
    const { message, success, token } = await res.json();
    if (!success) {
      alert(message);
      return;
    }

    setToken('access', token.access_token);
    setToken('refresh', token.refresh_token);
    router.push('/');
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          className="p-2 rounded-md"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
