'use client';
import { Button, notification, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { useFetch } from '~/common/useFetch';
import { SignUp } from '~/components/user/SignUp';

export default function Users() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const fetchData = useFetch();
  const handleSignUp = async (values: any) => {
    try {
      const res = await fetchData('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      if (res.success) {
        api.success({
          message: '회원추가 성공',
          description: '회원추가가 완료되었습니다.',
        });
        setSignUpOpen(false);
      } else {
        api.error({
          message: '회원가입 실패',
          description: res.message,
        });
      }
    } catch (e: any) {
      console.error(e);
      api.error({
        message: '회원가입 실패',
        description: e.message,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          회원목록
        </Title>
        <Button type="primary" onClick={handleSignUpOpen}>
          회원추가
        </Button>
      </Row>
      <SignUp
        open={signUpOpen}
        onClose={handleSignUpClose}
        register={handleSignUp}
        confirmText="회원을 추가하시겠습니까?"
      />
    </>
  );
}
