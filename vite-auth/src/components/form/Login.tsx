import { useRef, useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (usernameRef.current && usernameRef.current.value === '') {
      usernameRef.current.focus();
      return;
    }
    if (passwordRef.current && passwordRef.current.value === '') {
      passwordRef.current.focus();
      return;
    }
    onSubmit(username, password);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={usernameRef}
        className="border border-gray-300 rounded-md p-2"
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        ref={passwordRef}
        className="border border-gray-300 rounded-md p-2"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white rounded-md p-2"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;
