import { useState } from 'react';
import { Row, Table } from 'antd';
import Title from 'antd/es/typography/Title';

import { FileUpload } from '~/components/FileUpload';
import { useFbStorage } from '~/hooks/useFbStore';
import { Timestamp } from 'firebase/firestore';

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
    render: (date: Timestamp) => <span>{date.toDate().toLocaleString()}</span>,
  },
  {
    title: '다운로드 수',
    dataIndex: 'downloadCount',
    key: 'downloadCount',
  },
];
export const FileStorage = () => {
  const { fileList, loading, fileUpload, fileBoardWrite } = useFbStorage();
  /**
   * 3. 파일 다운로드
   * 4. 파일 삭제
   *  - 파일 삭제 시 게시글 삭제
   */
  const handleFile = async (files: File[]) => {
    console.log(files.map((f) => console.log(f)));
    // 파이어베이스 스토리지에 파일 저장
    const downloadUrlArray = await fileUpload(files);
    if (!downloadUrlArray || downloadUrlArray.length === 0) return;
    // 게시글 작성
    for (const downloadUrl of downloadUrlArray) {
      await fileBoardWrite(downloadUrl);
    }
    console.log(downloadUrlArray);
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
