'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

function Header() {
  const pathname = usePathname();
  const { user, handleLogout, isLoading } = useAuth();

  if (pathname === '/login') {
    return null;
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/board">Board</Link>
        {isLoading ? (
          <div className="text-gray-500">로딩 중...</div>
        ) : (
          <>
            {user && <div>{user.email}</div>}
            {user && <button onClick={handleLogout}>Logout</button>}
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
