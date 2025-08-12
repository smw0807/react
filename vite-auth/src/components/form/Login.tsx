import { useState } from 'react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

function LoginForm({ onSubmit }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        className="border border-gray-300 rounded-md p-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
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
