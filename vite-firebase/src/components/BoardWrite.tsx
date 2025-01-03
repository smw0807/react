import { Button, Form, Input, Modal, Popconfirm, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function BoardWrite({
  handleWrite,
}: {
  handleWrite: (value: any) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const [form] = Form.useForm();
  const handleOk = () => {
    const title = form.getFieldValue('title');
    const content = form.getFieldValue('content');
    handleWrite({ title, content });
    setIsModalOpen(false);
    resetFields();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    resetFields();
  };

  const resetFields = () => {
    form.setFieldValue('title', '');
    form.setFieldValue('content', '');
  };
  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        글쓰기
      </Button>
      <Modal
        title="글쓰기"
        open={isModalOpen}
        footer={
          <Space>
            <Button variant="outlined" onClick={handleCancel}>
              취소
            </Button>
            <Popconfirm
              title="게시글을 등록"
              description="게시글을 등록하시겠습니까?"
              okText="예"
              cancelText="아니오"
              onConfirm={handleOk}
            >
              <Button type="primary">등록</Button>
            </Popconfirm>
          </Space>
        }
      >
        <Form form={form} name="boardWrite">
          <Form.Item label="제목" name="title" key="title">
            <Input />
          </Form.Item>
          <Form.Item label="내용" name="content" key="content">
            <Input.TextArea rows={10} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
