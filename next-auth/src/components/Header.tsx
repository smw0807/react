import Link from 'next/link';

function Header() {
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
