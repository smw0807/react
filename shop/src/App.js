import './App.css';
import { createContext, useState } from 'react';

import { Navbar, Container, Nav, Row, Col, Button } from 'react-bootstrap';
import { data } from './data.js';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js';

export const Context1 = createContext();

function App() {
  const [shoes] = useState(data);
  const [stock] = useState([10, 11, 12]);

  /**
   * useNavigate 함수는 페이지 이동을 할 수 있게 해주는 함수
   */
  const navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate('/about')}>About</Nav.Link>
            <Nav.Link onClick={() => navigate('/cart')}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<List shoes={shoes} />} />
        <Route
          path="/detail/:id"
          element={
            <Context1.Provider value={{ stock, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치임</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function ColData(props) {
  const navigate = useNavigate();
  return (
    <>
      <img
        src={props.shoes.img}
        width="80%"
        alt="상품"
        onClick={() => navigate(`/detail/${props.shoes.id}`)}
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </>
  );
}

function List(props) {
  const [shoes, setShoes] = useState(props.shoes);
  const [count, setCount] = useState(2);
  return (
    <>
      <div className="main-bg"></div>
      <Container>
        <Row>
          {shoes.map((v) => (
            <Col md={4} key={v.id}>
              <ColData shoes={v} />
            </Col>
          ))}
        </Row>
      </Container>
      <Button
        onClick={() => {
          axios
            .get(`https://codingapple1.github.io/shop/data${count}.json`)
            .then((res) => {
              console.log(res.data);
              const newData = [...shoes, ...res.data];
              setShoes(newData);
              console.log(newData);
              setCount(count + 1);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        더보기
      </Button>
    </>
  );
}

function About() {
  return (
    <div>
      <h4>회사소개임</h4>
      <Outlet />
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>이벤트임</h4>
      <Outlet />
    </div>
  );
}

export default App;
