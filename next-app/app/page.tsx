'use client';
import { Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
export default function Home() {
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
