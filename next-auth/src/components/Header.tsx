'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Header() {
  const pathname = usePathname();

  if (pathname === '/login') {
    return null;
  }

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/board">Board</Link>
      </div>
    </div>
  );
}

export default Header;
