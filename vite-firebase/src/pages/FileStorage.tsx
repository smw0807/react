import { Row } from 'antd';
import Title from 'antd/es/typography/Title';

import { FileUpload } from '~/components/FileUpload';

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
  },
  {
    title: '다운로드 수',
    dataIndex: 'downloadCount',
    key: 'downloadCount',
  },
];
export const FileStorage = () => {
  // const { fileList, loading } = useFbStorage();
  /**
   * 1. 파일 업로드
   *  - 파일 업로드 시 게시글 작성
   * 2. 파일 리스트
   *  - 게시글과 파일 매핑
   * 3. 파일 다운로드
   * 4. 파일 삭제
   *  - 파일 삭제 시 게시글 삭제
   */

  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          파일 저장소
        </Title>
        <FileUpload />
      </Row>
      {/* <Table columns={columns} dataSource={fileList} loading={loading} /> */}
    </>
  );
};
