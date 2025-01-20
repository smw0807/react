import { Row } from 'antd';
import Title from 'antd/es/typography/Title';

export default function Users() {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          회원목록
        </Title>
      </Row>
    </>
  );
}
