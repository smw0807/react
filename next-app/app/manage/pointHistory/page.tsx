import { Row } from 'antd';
import Title from 'antd/es/typography/Title';

export default function PointHistory() {
  return (
    <>
      <Row justify="space-between" align="middle">
        <Title level={2} style={{ margin: 0 }}>
          적립금 내역 조회
        </Title>
      </Row>
    </>
  );
}
