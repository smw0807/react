'use client';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
export default function Home() {
  /**
   * todo
   * 1. 토큰 정보를 이용해 사용자 정보 가져오기
   * 2. 가져온 사용자 정보를 상태관리에 저장하기
   * 3. 관리자 또는 사용자 여부에 따라 페이지 이동시키기
   */
  const router = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Result icon={<SmileOutlined />} title="잠시만 기다려주세요..." />
    </div>
  );
}
