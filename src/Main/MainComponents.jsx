import React, { useEffect, useState } from "react";
import MyImage from "../Image/1.jpeg";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { styled } from "styled-components";
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <iframe
        style={{ marginTop: "100px", marginBottom: "50px" }}
        width={width <= 410 ? "390px" : "1000px"}
        height={width <= 410 ? "220px" : "400px"}
        src="https://www.youtube.com/embed/6zcuY7cjVdc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <div>
        <Maindiv>
          <h1>어떤 내용들</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nam
            animi culpa. Iusto, vel quasi. Fugiat cupiditate quod ducimus,
            facilis error at sapiente excepturi sequi tempore. Tempore,
            doloribus aliquam? Iure.
          </p>
          <Col xs={6} md={4}>
            <Image src={MyImage} thumbnail style={{ marginBottom: "50px" }} />
          </Col>
        </Maindiv>
        <Maindiv>
          <br />
          <h1>어떤 내용들2</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. In nam
            animi culpa. Iusto, vel quasi. Fugiat cupiditate quod ducimus,
            facilis error at sapiente excepturi sequi tempore. Tempore,
            doloribus aliquam? Iure.
          </p>
          <Col xs={6} md={4}>
            <Image src={MyImage} thumbnail style={{ marginBottom: "50px" }} />
          </Col>
        </Maindiv>
      </div>

      <Container>
        <Row>
          <Col>
            {/* width 값이 760 크면 이미지를 보여줌*/}
            {width > 760 ? (
              <>
                <Row>
                  {Array.from({ length: more }).map((_, index) => (
                    <Col xs={6} md={2} key={index}>
                      <Image src={MyImage} thumbnail />
                    </Col>
                  ))}
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  {more > 30 ? (
                    " "
                  ) : (
                    <button onClick={moreClick}>더보기</button>
                  )}
                </div>
              </>
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
const Maindiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 0.5px solid gray;
`;
