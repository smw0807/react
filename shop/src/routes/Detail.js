import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Context1 } from '../App';
import { addItem } from '../store';
import { useDispatch } from 'react-redux';
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

  const [tab, setTab] = useState(0);

  const dispatch = useDispatch();

  // 재렌더링마다 코드를 실행하고 싶을 때
  useEffect(() => {});
  // mount시 1회 코드를 실행하고 싶을 때
  useEffect(() => {
    const watched = localStorage.getItem('watched');
    if (watched) {
      const watchedList = JSON.parse(watched);
      watchedList.push(shoes.id);
      const set = new Set(watchedList);
      localStorage.setItem('watched', JSON.stringify(Array.from(set)));
    } else {
      localStorage.setItem('watched', JSON.stringify([shoes.id]));
    }
  }, []);
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
    // console.log('count', count);
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

  const [fade, setFade] = useState('');
  useEffect(() => {
    setFade('end');
    return () => {
      setFade('');
    };
  }, []);

  const addCart = (item) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.title,
        count: 1,
      })
    );
  };
  return !shoes ? (
    <div>데이터가 없습니다.</div>
  ) : (
    <div className={`start ${fade}`}>
      <Container>
        <Box>
          <CustomBtn
            bg="blue"
            color="white"
            onClick={() => setCount(count + 1)}
          >
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
            <button className="btn btn-danger" onClick={() => addCart(shoes)}>
              주문하기
            </button>
          </Col>
        </Row>

        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link eventKey="link0" onClick={() => setTab(0)}>
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link1" onClick={() => setTab(1)}>
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link2" onClick={() => setTab(2)}>
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab} />
        {/* <TabContent tab={tab} shoes={props.shoes} /> */}
      </Container>
    </div>
  );
}

function TabContent({ tab }) {
  // const test = useContext(Context1);
  // console.log(test);
  const { shoes } = useContext(Context1);
  const [fade, setFade] = useState('');
  useEffect(() => {
    const setFadeTimeout = setTimeout(() => setFade('end'), 100);
    return () => {
      clearTimeout(setFadeTimeout);
      setFade('');
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {
        [<div>{shoes[0].title}</div>, <div>content1</div>, <div>content2</div>][
          tab
        ]
      }
    </div>
  );
}
