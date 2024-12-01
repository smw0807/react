import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
export default function Detail(props) {
  const { id } = useParams();
  const shoes = props.shoes.find((item) => item.id === Number(id));
  return !shoes ? (
    <div>데이터가 없습니다.</div>
  ) : (
    <Container>
      <Row>
        <Col md={6}>
          <img src={shoes.img} width="100%" alt="상품" />
        </Col>
        <Col md={6}>
          <h4 className="pt-5">{shoes.title}</h4>
          <p>{shoes.content}</p>
          <p>{shoes.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </Col>
      </Row>
    </Container>
  );
}
