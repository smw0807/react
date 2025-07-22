import Link from 'next/link';

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href="/parallel">Home</Link>
        <Link href="/parallel/setting">Setting</Link>
      </div>
      {sidebar}
      {children}
      {feed}
    </div>
  );
}
