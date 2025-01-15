import { Spin } from 'antd';

export const LoadingComponent = ({ content }: { content?: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin tip="로딩중" size="large">
        {content ? content : '잠시만 기다려주세요.'}
      </Spin>
    </div>
  );
};
