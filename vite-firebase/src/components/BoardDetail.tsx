import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { Button, Form, Input, Modal } from 'antd';

export default function BoardDetail({ row }: { row: DocumentData }) {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  useEffect(() => {
    form.setFieldsValue({
      title: row.title,
      writerEmail: row.writerEmail,
      content: row.content,
    });
  }, [form, row]);
  return (
    <div>
      <a onClick={showModal}>
        {row.content.length > 10
          ? row.content.slice(0, 10) + '...'
          : row.content}
      </a>
      <Modal
        open={isModalOpen}
        closeIcon={null}
        footer={<Button onClick={hideModal}>닫기</Button>}
      >
        <Form form={form}>
          <Form.Item label="제목" name="title" key="title">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="작성자" name="writerEmail" key="writerEmail">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="내용" name="content" key="content">
            <Input.TextArea rows={10} readOnly />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
