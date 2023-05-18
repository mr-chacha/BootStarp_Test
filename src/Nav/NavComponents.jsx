import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import Img from "../img/logo.png";
import "../App.css";
export default function NavComponents() {
  return (
    <NavbarWrapper>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img src={Img} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div>
            <Navbar.Collapse
              className="navlink-font"
              id="basic-navbar-nav"
              style={{
                gap: "60px",
              }}
            >
              <Link to="/solution" className="nav-link">
                솔루션
              </Link>
              <Link to="/product" className="nav-link">
                프로덕트
              </Link>
              <Link to="/company" className="nav-link">
                회사소개
              </Link>
            </Navbar.Collapse>
          </div>

          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav
                className="me-auto"
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  to="https://app.pango-gy.com/account/login"
                  className="nav-link login-button-background button-font"
                >
                  로그인
                </Link>
                <Link
                  to="/contact"
                  className="nav-link button-font button-background"
                >
                  문의하기
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0px 7px 7px #00000029;
  background-color: white;
  padding: 8px 0px;
  z-index: 999;
`;
