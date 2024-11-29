import './App.css';
import { useState } from 'react';

import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { data } from './data.js';

function App() {
  const [shoes] = useState(data);
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
          {shoes.map((v) => {
            return <ColData shoes={v} key={v.id} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

function ColData(props) {
  return (
    <Col md={4}>
      <img src={props.shoes.img} width="80%" alt="상품" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}
export default App;
