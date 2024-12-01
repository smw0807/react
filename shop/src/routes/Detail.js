import { Container, Row, Col } from 'react-bootstrap';
export default function Detail() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
            alt="상품"
          />
        </Col>
        <Col md={6}>
          <h4 className="pt-5">상품명</h4>
          <p>상품설명</p>
          <p>120000원</p>
          <button className="btn btn-danger">주문하기</button>
        </Col>
      </Row>
    </Container>
  );
}
