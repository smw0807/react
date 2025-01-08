import { Button, Popconfirm, Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';

import { FileUpload } from '~/components/FileUpload';
import { useFbStorage } from '~/hooks/useFbStorage';
import { DocumentData, Timestamp } from 'firebase/firestore';

export const FileStorage = () => {
  const {
    fileList,
    loading,
    fileUpload,
    fileBoardWrite,
    fileDownload,
    fileDelete,
  } = useFbStorage();
  const columns = [
    {
      title: '파일명',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: '등록자',
      dataIndex: 'writerEmail',
      key: 'writerEmail',
    },
    {
      title: '등록일',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: Timestamp) => (
        <span>{date.toDate().toLocaleString()}</span>
      ),
    },
    {
      title: '다운로드 수',
      dataIndex: 'downloadCount',
      key: 'downloadCount',
    },
    {
      title: '-',
      key: 'action',
      render: (_: string, record: DocumentData) => (
        <>
          <Button
            color="primary"
            variant="solid"
            icon={<DownloadOutlined />}
            onClick={() => fileDownload(record.id)}
          />
          <Popconfirm
            title="파일 삭제"
            description="파일을 삭제하시겠습니까?"
            okText="삭제"
            cancelText="취소"
            onConfirm={() => fileDelete(record.id)}
          >
            <Button color="danger" variant="solid" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleFile = async (files: File[]) => {
    // 파이어베이스 스토리지에 파일 저장
    const downloadUrlArray = await fileUpload(files);
    if (!downloadUrlArray || downloadUrlArray.length === 0) return;
    // 게시글 작성
    for (const downloadUrl of downloadUrlArray) {
      await fileBoardWrite(downloadUrl);
    }
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          파일 저장소
        </Title>
        <FileUpload onFile={handleFile} />
      </Row>
      <Table
        columns={columns}
        dataSource={fileList}
        loading={loading}
        rowKey="id"
      />
    </>
  );
};
