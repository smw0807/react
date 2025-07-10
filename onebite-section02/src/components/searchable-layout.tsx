import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from './searchable-layout.module.css';

export default function SearchableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q as string;

  // 새로고침 시 검색어 유지
  useEffect(() => {
    if (q) {
      setSearch(q as string);
    }
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };
  return (
    <div>
      <div className={styles.searchbar_container}>
        <input
          type="text"
          placeholder="검색어를 입력하세요 ..."
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
