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
  const [count, setCount] = useState(0);
  const [alert, setAlert] = useState(true);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  // 재렌더링마다 코드를 실행하고 싶을 때
  useEffect(() => {});
  // mount시 1회 코드를 실행하고 싶을 때
  useEffect(() => {}, []);
  // 특정 state 변경시에만 실행하고 싶을 때
  useEffect(() => {}, [count]);
  // unmount 시 1회 코드실행하고 싶을 때
  useEffect(() => {
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 2000);
    console.log('count', count);
    // clean up function
    return () => {
      // useEffect 동작 전에 실행됨
      clearTimeout(timer);
      // unmount 시 실행
    };
    // count가 변경될 때마다 실행, [] 빈 배열은 mount될 때만 실행함
  }, [count]);

  useEffect(() => {
    const reg = /^[0-9]*$/g;
    const result = reg.test(input);
    if (!result) {
      setError(true);
    } else {
      setError(false);
    }
  }, [input]);
  return !shoes ? (
    <div>데이터가 없습니다.</div>
  ) : (
    <Container>
      <Box>
        <CustomBtn bg="blue" color="white" onClick={() => setCount(count + 1)}>
          버튼
        </CustomBtn>
        <YellowBtn>버튼</YellowBtn>
        <input type="text" onChange={(e) => setInput(e.target.value)} />
      </Box>
      {alert ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {error ? (
        <div className="alert alert-danger">숫자만 입력하세요.</div>
      ) : null}
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
