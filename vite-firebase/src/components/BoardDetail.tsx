import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { Button, Form, Input, Modal, Popconfirm } from 'antd';
import { useFbBoard } from '~/hooks/useFbBoard';
import { useAuth } from '~/hooks/useAuth';

export const BoardDetail = ({ row }: { row: DocumentData }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const { boardUpdate } = useFbBoard();
  const handleUpdate = () => {
    const formData = form.getFieldsValue();
    boardUpdate({ ...formData, id: row.id });
  };

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        title: row.title,
        writerEmail: row.writerEmail,
        content: row.content,
      });
    }
  }, [isModalOpen, form, row]);

  // 작성자 여부 확인
  const { user } = useAuth();
  useEffect(() => {
    if (user?.email === row.writerEmail) setIsMine(true);
    else setIsMine(false);
  }, [user, row]);

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
        footer={
          <>
            <Button onClick={hideModal}>닫기</Button>
            {isMine && (
              <Popconfirm
                title="수정"
                description="수정하시겠습니까?"
                onConfirm={handleUpdate}
                okText="예"
                cancelText="아니오"
              >
                <Button type="primary">수정</Button>
              </Popconfirm>
            )}
          </>
        }
      >
        <Form form={form}>
          <Form.Item label="제목" name="title" key="title">
            <Input readOnly={!isMine} />
          </Form.Item>
          <Form.Item label="작성자" name="writerEmail" key="writerEmail">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="내용" name="content" key="content">
            <Input.TextArea rows={10} readOnly={!isMine} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
