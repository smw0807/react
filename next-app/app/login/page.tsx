'use client';
import React, { FormEvent } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  Image,
  notification,
} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useCookies } from 'next-client-cookies';
import { useFetch } from '~/common/useFetch';
import { useRouter } from 'next/navigation';

const { Title } = Typography;
export default function Login() {
  const fetchData = useFetch();
  const cookies = useCookies();
  const router = useRouter();

  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const emailRules = [
    { required: true, message: '이메일을 입력해주세요.' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '이메일 형식이 올바르지 않습니다.',
    },
  ];

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log('Handle registration logic here');
  };

  const handleLogin = async () => {
    const valid = await form.validateFields();
    if (valid.errorFields && valid.errorFields.length > 0) {
      console.log(valid.errorFields);
      return;
    }
    const inputValues = form.getFieldsValue();

    try {
      const res = await fetchData('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(inputValues),
      });
      if (!res.success) {
        api.error({
          message: '로그인 실패',
          description: res.message,
        });
        return;
      }
      console.log(res.token);
      cookies.set(
        process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!,
        res.token.access_token,
        { expires: res.token.expiry_date }
      );
      cookies.set(
        process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME!,
        res.token.refresh_token,
        { expires: res.token.expiry_date }
      );
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetchData('/api/auth/google/signin');
      if (res.success) {
        window.location.href = res.url;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleKakaoLogin = async () => {
    try {
      const res = await fetchData('/api/auth/kakao/signin');
      if (res.success) {
        window.location.href = res.url;
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 이미 로그인 되어있으면 메인페이지로 이동
  const accessToken = cookies.get(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME!);
  if (accessToken) {
    router.push('/');
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {contextHolder}
      <Card style={{ width: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title level={2}>UserAccess Portal </Title>
        </div>
        <Form form={form} name="normal_login" className="login-form">
          <Form.Item name="email" rules={emailRules}>
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '패스워드를 입력해주세요.' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="login-form-button"
              block
              onClick={handleLogin}
            >
              로그인
            </Button>
            <span>아직 회원이 아니신가요? </span>
            <a href="" onClick={handleRegister}>
              회원가입
            </a>
          </Form.Item>
        </Form>
        <Divider>or</Divider>
        <Button
          block
          style={{ marginBottom: '10px' }}
          onClick={handleGoogleLogin}
        >
          <Image src="/google.svg" alt="google" style={{ width: '20px' }} />
          구글 로그인
        </Button>
        <Button block onClick={handleKakaoLogin}>
          <Image src="/kakaotalk.svg" alt="kakao" style={{ width: '20px' }} />
          카카오 로그인
        </Button>
      </Card>
    </div>
  );
}
