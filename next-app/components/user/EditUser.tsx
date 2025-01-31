'use client';
import { useEffect, useState, useCallback } from 'react';
import { Button, Form, Input, Modal, Popconfirm, Row, Select } from 'antd';
import { useFetch } from '~/common/useFetch';

export type Role = 'ADMIN' | 'USER';
export type Status = 'ACTIVE' | 'INACTIVE';
type Props = {
  email: string;
  handleEdit: (values: FormValues) => void;
};
export type FormValues = {
  email: string;
  name: string;
  phoneNumber: string;
  role: Role;
  status: Status;
};
export const EditUser = ({ email, handleEdit }: Props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  const handleOk = useCallback(() => {
    const values = form.getFieldsValue();
    handleEdit({
      email: values.email,
      name: values.name,
      phoneNumber: values.phoneNumber,
      role: values.role,
      status: values.status,
    });
    setIsModalOpen(false);
  }, [form, handleEdit]);
  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const fetchData = useFetch();
  useEffect(() => {
    if (isModalOpen) {
      fetchData(`/api/user/${email}`).then((res) => {
        if (res.success) {
          form.setFieldValue('email', res.user.email);
          form.setFieldValue('name', res.user.name);
          form.setFieldValue('phoneNumber', res.user.phoneNumber);
          form.setFieldValue('role', res.user.role);
          form.setFieldValue('status', res.user.status);
          if (res.user.point) {
            form.setFieldValue('point', res.user.point.point);
          }
        }
      });
    }
    return () => {
      if (isModalOpen) {
        form.resetFields();
      }
    };
  }, [email, isModalOpen]);
  return (
    <>
      <Button type="link" onClick={showModal}>
        {email}
      </Button>
      <Modal title="회원정보 수정" open={isModalOpen} footer={null}>
        <Form form={form}>
          <Form.Item name="email" label="이메일">
            <Input disabled />
          </Form.Item>
          <Form.Item name="name" label="이름">
            <Input />
          </Form.Item>
          <Form.Item name="phoneNumber" label="휴대폰번호">
            <Input />
          </Form.Item>
          <Form.Item name="role" label="권한">
            <Select
              options={[
                { label: '관리자', value: 'ADMIN' },
                { label: '사용자', value: 'USER' },
              ]}
            />
          </Form.Item>
          <Form.Item name="status" label="상태">
            <Select
              options={[
                { label: '활성', value: 'ACTIVE' },
                { label: '비활성', value: 'INACTIVE' },
              ]}
            />
          </Form.Item>
          <Form.Item name="point" label="포인트">
            <Input disabled />
          </Form.Item>
          <Row justify="end">
            <Button onClick={handleCancel}>취소</Button>
            <Popconfirm
              title="회원정보를 수정하시겠습니까?"
              onConfirm={handleOk}
              okText="네"
              cancelText="아니요"
            >
              <Button type="primary" htmlType="submit">
                수정
              </Button>
            </Popconfirm>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
