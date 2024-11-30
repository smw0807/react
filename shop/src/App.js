import './App.css';
import { useState } from 'react';

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { data } from './data.js';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [shoes] = useState(data);
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" to="/">
              Home
            </Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<List shoes={shoes} />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </div>
  );
}

function ColData(props) {
  return (
    <>
      <img src={props.shoes.img} width="80%" alt="상품" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </>
  );
}

function List(props) {
  return (
    <>
      <div className="main-bg"></div>
      <Container>
        <Row>
          {props.shoes.map((v) => (
            <Col md={4} key={v.id}>
              <ColData shoes={v} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

function Detail() {
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
export default App;
