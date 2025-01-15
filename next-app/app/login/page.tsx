'use client';
import React, { FormEvent } from 'react';
import { Form, Input, Button, Card, Typography, Divider, Image } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
const { Title } = Typography;

interface Values {
  username: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const onFinish = (values: Values) => {
    console.log('Received values of form: ', values);
    if (values.remember) {
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
    }
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log('Handle registration logic here');
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Title level={2}>UserAccess Hub </Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your E-mail!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="E-mail"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
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
              htmlType="submit"
              className="login-form-button"
              block
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
        <Button block style={{ marginBottom: '10px' }}>
          <Image src="/google.svg" alt="google" style={{ width: '20px' }} />
          구글로그인
        </Button>
        <Button block>
          <Image src="/kakaotalk.svg" alt="kakao" style={{ width: '20px' }} />
          카카오 로그인
        </Button>
      </Card>
    </div>
  );
}
