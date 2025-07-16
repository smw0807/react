import Searchbar from '@/components/searchbar';
import { Suspense } from 'react';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar /> {/* 사전 렌더링 과정에서 배제 */}
      </Suspense>
      {children}
    </div>
  );
}
