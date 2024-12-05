import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

/**
 * styled-components 사용법
 * 1. styled.태그명
 * 2. styled.태그명`css 속성`
 * 페이지 로딩시간 단축
 * 스타일이 다른 js 파일로 오염되지 않음
 */
const YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`;
const CustomBtn = styled.button`
  background: ${(props) => props.bg || 'yellow'};
  color: ${(props) => props.color || 'black'};
  padding: 10px;
`;
const Box = styled.div`
  background: gray;
  padding: 20px;
`;
export default function Detail(props) {
  const { id } = useParams();
  const shoes = props.shoes.find((item) => item.id === Number(id));

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('.alert').style.display = 'none';
    }, 2000);
  });
  return !shoes ? (
    <div>데이터가 없습니다.</div>
  ) : (
    <Container>
      <Box>
        <CustomBtn bg="blue" color="white">
          버튼
        </CustomBtn>
        <YellowBtn>버튼</YellowBtn>
      </Box>
      <div className="alert alert-warning">2초 이내 구매시 할인</div>
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
