import { useEffect, useState } from 'react';
import { Button, Image, Input, message, Modal, Popconfirm, Space } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

interface FilePreview {
  file: File;
  preview: string;
}

interface FileUploadProps {
  onFile?: (files: File[]) => void;
}
export const FileUpload = ({ onFile }: FileUploadProps) => {
  const [fileUpload, setFileUpload] = useState<FilePreview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => {
    setFileUpload([]);
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (files.length > 5) {
      message.error('최대 5개까지 업로드 가능합니다.');
      return;
    }

    // 파일 미리보기 생성
    const newFiles: FilePreview[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFileUpload(newFiles);
  };

  // 컴포넌트 언마운트 시 미리보기 URL 정리
  useEffect(() => {
    return () => {
      fileUpload.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [fileUpload]);

  const handleUpload = () => {
    onFile?.(fileUpload.map((f) => f.file));
    hideModal();
  };

  const handleDelete = (index: number) => {
    setFileUpload((prev) => {
      // 삭제할 파일의 미리보기 URL 해제
      URL.revokeObjectURL(prev[index].preview);
      // 해당 인덱스의 파일을 제외한 새 배열 반환
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <>
      <Button icon={<UploadOutlined />} type="primary" onClick={showModal}>
        파일 업로드
      </Button>
      <Modal
        title="파일 업로드"
        open={isModalOpen}
        closeIcon={null}
        okText="업로드"
        cancelText="취소"
        width={800}
        footer={
          <Space>
            <Button onClick={hideModal}>닫기</Button>
            <Popconfirm
              title="파일 업로드"
              description="첨부한 파일들을 업로드하시겠습니까?"
              okText="예"
              cancelText="아니오"
              onConfirm={handleUpload}
            >
              <Button type="primary">업로드</Button>
            </Popconfirm>
          </Space>
        }
      >
        <Input type="file" multiple onChange={handleChange} />

        {/* 이미지 미리보기 */}
        <div
          style={{
            marginTop: 16,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 8,
          }}
        >
          {fileUpload.map((file, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {file.file.type.startsWith('image/') ? (
                <>
                  <Image
                    src={file.preview}
                    alt={file.file.name}
                    style={{ width: '100%', height: 150, objectFit: 'cover' }}
                  />
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      background: 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </>
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: 150,
                    background: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 8,
                    position: 'relative',
                  }}
                >
                  {file.file.name}
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(index)}
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
