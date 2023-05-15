import React, { useEffect, useState } from "react";
import MyImage from "../Image/1.jpeg";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
export default function MainComponents() {
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
  // 더보기 버튼
  const moreClick = () => [setMore(more + 6)];
  return (
    <div>
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
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/6zcuY7cjVdc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
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
