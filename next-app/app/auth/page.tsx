'use client';
import { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFetch } from '~/common/useFetch';
import { useCookies } from 'next-client-cookies';

type ProcessStatusType = 'processing' | 'success' | 'error';
export default function AuthPage() {
  const router = useRouter();

  const [processing, setProcessing] = useState<ProcessStatusType>('processing');
  const [resultComponent, setResultComponent] = useState<React.ReactNode>(null);
  useEffect(() => {
    if (processing === 'success') {
      setResultComponent(
        <Result
          status="success"
          title="사용자 인증 성공"
          subTitle="잠시만 기다려 주세요."
        />
      );
    } else if (processing === 'processing') {
      setResultComponent(
        <Result
          icon={<SmileOutlined />}
          title="사용자 인증 중입니다."
          subTitle="잠시만 기다려 주세요."
        />
      );
    } else {
      setResultComponent(
        <Result
          status="error"
          title="사용자 인증 실패"
          subTitle="다시 로그인 해주세요."
          extra={
            <Button type="primary" onClick={() => router.push('/login')}>
              다시 시도
            </Button>
          }
        />
      );
    }
  }, [processing, router]);

  const fetchData = useFetch();
  const cookies = useCookies();
  const query = useSearchParams();
  const code = query.get('code');
  const state = query.get('state');
  useEffect(() => {
    (async () => {
      let url = '';
      if (state === 'kakao') {
        url = `/api/auth/kakao/callback?code=${code}`;
      } else {
        url = `/api/auth/google/callback?code=${code}`;
      }
      try {
        const res = await fetchData(url);
        cookies.set(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,
          res.access_token,
          { expires: res.expiry_date }
        );
        cookies.set(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!,
          res.refresh_token,
          { expires: res.expiry_date }
        );
        setProcessing('success');
        setTimeout(() => router.push('/'), 2000);
      } catch (e) {
        console.error(e);
        setProcessing('error');
      }
    })();
  }, [code, state]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {resultComponent}
    </div>
  );
}
