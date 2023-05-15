import React, { useEffect, useState } from "react";
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
import MyImage from "../Image/1.jpeg";

export default function Router() {
  //width 값
  const [width, setWidth] = useState(window.innerWidth);

  // width 값이 변할때마다 바로 캐치하게함
  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
    return () => {
      window.removeEventListener("resize", () => setWidth(window.innerWidth));
    };
  }, []);
  const [more, setMore] = useState(12);
  const moreClick = () => [setMore(more + 6)];
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">팡고지와이</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">솔루션</Nav.Link>
              <Nav.Link href="#link">프로덕트</Nav.Link>
              <Nav.Link href="#link">회사소개</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>어떤 내용들</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nam animi
          culpa. Iusto, vel quasi. Fugiat cupiditate quod ducimus, facilis error
          at sapiente excepturi sequi tempore. Tempore, doloribus aliquam? Iure.
        </p>
        <Col xs={6} md={4}>
          <Image src={MyImage} thumbnail />
        </Col>
        <br />
        <h1>어떤 내용들2</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nam animi
          culpa. Iusto, vel quasi. Fugiat cupiditate quod ducimus, facilis error
          at sapiente excepturi sequi tempore. Tempore, doloribus aliquam? Iure.
        </p>
        <Col xs={6} md={4}>
          <Image src={MyImage} thumbnail />
        </Col>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <Col>
            {/* width 값이 760 크면 이미지를 보여줌*/}
            {width > 760 ? (
              <Row>
                {Array.from({ length: more }).map((_, index) => (
                  <Col xs={6} md={2} key={index}>
                    <Image src={MyImage} thumbnail />
                  </Col>
                ))}
                {more > 30 ? " " : <button onClick={moreClick}>더보기</button>}
              </Row>
            ) : (
              <Carousel>
                {/* width 값이 760 보다 작으면 캐러셀로 6개씩 이미지를 보여줌*/}
                {Array.from({ length: 30 }).map((_, index) => (
                  <Carousel.Item key={index}>
                    <Row>
                      {Array.from({ length: 6 }).map((_, index2) => (
                        <Col xs={6} md={2.4} key={index2}>
                          <Image src={MyImage} thumbnail />
                        </Col>
                      ))}
                    </Row>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
