import { useEffect } from 'react';
import { useBoard } from '~/hooks/useBoard';

export default function Login() {
  const { getBoard } = useBoard();

  useEffect(() => {
    getBoard();
  }, []);

  return <div>Login</div>;
}
