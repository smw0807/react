import { useEffect, useState } from 'react';
import { useFetch } from '~/common/useFetch';
import { LoadingComponent } from '~/components/Loading';

export default function User() {
  const fetchData = useFetch();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchData('/api/user/info').then((res) => {
  //     setUser(res);
  //     setLoading(false);
  //   });
  // }, []);
  return (
    <div>
      <LoadingComponent content="유저 페이지 작업 대기중입니다." />
    </div>
  );
}
