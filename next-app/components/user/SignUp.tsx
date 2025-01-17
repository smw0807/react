'use client';
import { Button, Form, Input, Modal } from 'antd';

type SignUpProps = {
  open: boolean;
  onClose: () => void;
  register: (values: FieldType) => void;
};
type FieldType = {
  email: string;
  name: string;
  password: string;
  passwordCheck: string;
};
export const SignUp = ({ open, register, onClose }: SignUpProps) => {
  const [form] = Form.useForm();

  const emailRules = [
    { required: true, message: '이메일을 입력해주세요.' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '이메일 형식이 올바르지 않습니다.',
    },
  ];
  const nameRules = [
    { required: true, message: '이름을 입력해주세요.' },
    {
      pattern: /^[^\s]+$/,
      message: '이름에 공백이 포함될 수 없습니다.',
    },
    {
      min: 2,
      message: '이름은 2자 이상이어야 합니다.',
    },
    {
      max: 10,
      message: '이름은 10자 이하이어야 합니다.',
    },
  ];
  const passwordRules = [
    { required: true, message: '비밀번호를 입력해주세요.' },
    {
      pattern: /^[^\s]+$/,
      message: '비밀번호에 공백이 포함될 수 없습니다.',
    },
  ];
  const passwordCheckRules = [
    { required: true, message: '비밀번호를 입력해주세요.' },
    {
      pattern: /^[^\s]+$/,
      message: '비밀번호에 공백이 포함될 수 없습니다.',
    },
    ({ getFieldValue }: { getFieldValue: (password: string) => string }) => ({
      validator(_, value: string) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
      },
    }),
  ];
  const handleSubmit = async () => {
    const valid = await form.validateFields();
    if (valid.errorFields && valid.errorFields.length > 0) {
      console.log(valid.errorFields);
      return;
    }
    const values = form.getFieldsValue();
    register(values);
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
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
      {open && (
        <Modal open={open} onCancel={onClose} closeIcon={null} footer={null}>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="이메일"
              name="email"
              rules={emailRules}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType> label="이름" name="name" rules={nameRules}>
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="비밀번호"
              name="password"
              rules={passwordRules}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="비밀번호 확인"
              name="passwordCheck"
              rules={passwordCheckRules}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <Button onClick={handleClose}>닫기</Button>
              <Button type="primary" onClick={handleSubmit}>
                회원가입
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};
