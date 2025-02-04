'use client';
import { Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from '~/common/useFetch';
import { LoadingComponent } from '~/components/Loading';
export default function User() {
  const [user, setUser] = useState();
  const fetchData = useFetch();
  useEffect(() => {
    (async () => {
      const res = await fetchData('/api/user/myInfo');
      if (res.success) {
        const keys = Object.keys(res.user);
        const items = keys.map((key) => ({
          key,
          label: key,
          children: `${res.user[key]}`,
        }));
        console.log(items);
        setUser(items);
      }
    })();
  }, []);

  return (
    <div>
      <Descriptions title="User Info" bordered items={user} />;
    </div>
  );
}
