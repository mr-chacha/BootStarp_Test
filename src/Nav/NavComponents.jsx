import React from "react";
import {
  Button,
  Carousel,
  Col,
  Container,
  Form,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
export default function NavComponents() {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Navbar.Brand href="/">팡고지와이</Navbar.Brand>
        </div>

        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/solution" className="nav-link">
                솔루션
              </Link>
              <Link to="/product" className="nav-link">
                프로덕트
              </Link>
              <Link to="/company" className="nav-link">
                회사소개
              </Link>
              <Link
                to="https://app.pango-gy.com/account/login"
                className="nav-link"
              >
                로그인
              </Link>
              <Link to="/contact" className="nav-link">
                문의하기
              </Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}
