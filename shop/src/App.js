import './App.css';

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <Container>
        <Row>
          <Col md={4}>
            <img
              src="https://codingapple1.github.io/shop/shoes1.jpg"
              width="80%"
              alt="상품1"
            />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>
          <Col md={4}>
            <img
              src="https://codingapple1.github.io/shop/shoes2.jpg"
              width="80%"
              alt="상품2"
            />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>
          <Col md={4}>
            <img
              src="https://codingapple1.github.io/shop/shoes3.jpg"
              width="80%"
              alt="상품3"
            />
            <h4>상품명</h4>
            <p>상품정보</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
