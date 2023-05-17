import React, { useEffect, useRef, useState } from "react";
import MyImage from "../Image/1.jpeg";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Typewriter from "typewriter-effect/dist/core";
import Image1 from "../img/icon_google_partner.png";
import Image2 from "../img/icon_targeting.png";
import Image3 from "../img/icon_time_saving.png";

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

  // Text 캐러셀
  const textCarouselRef = useRef(null);

  useEffect(() => {
    const typewriter = new Typewriter(textCarouselRef.current, {
      loop: true,
      delay: 100,
    });

    typewriter
      .typeString("검색")
      .pauseFor(1000)
      .deleteChars(2)
      .typeString("GDN")
      .pauseFor(1000)
      .deleteChars(3)
      .typeString("유튜브")
      .pauseFor(1000)
      .start();

    return () => {
      typewriter.stop();
    };
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 0px",
      }}
    >
      <Textdiv>
        <TextP className="title">
          구글 [<p ref={textCarouselRef} style={{ color: "#FF4C17" }}></p>
          ]광고는 팡고
        </TextP>
        <TextP className="head">구글 광고는 팡고 이전과 이후로 나뉜다</TextP>
      </Textdiv>
      {/* 동영상 */}
      <Ifames
        width={width <= 410 ? "390px" : "1024px"}
        height={width <= 410 ? "220px" : "576pxpx"}
        src="https://www.youtube.com/embed/6zcuY7cjVdc"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      <Carddiv>
        <CardImg src={Image1} alt="구글파트너 팡고" />
        <div>
          <p className="head">
            Goole
            <span className="emphasis-text emphasis-dot">파</span>
            <span className="emphasis-text emphasis-dot">트</span>
            <span className="emphasis-text emphasis-dot">너</span>
            <span className="emphasis-text emphasis-dot">스</span>
            팡고
          </p>
          <p className="head-body">
            <br />
            Google Ads 인증을 획득한 구글 전문 빅데이터팀에서
            <br />
            광고 효율 상승을 위해 지속적으로 다양한 엔진을 개발합니다.
          </p>
        </div>
      </Carddiv>
      <Carddiv>
        <div>
          <p className="head">
            Ad-tech
            <span className="emphasis-text ">N</span>
            <span className="emphasis-text ">o</span>
            <span className="emphasis-text ">.</span>
            <span className="emphasis-text ">1</span>
            팡고 구글 광고 플랫폼은
          </p>
          <p className="head-body">
            <br />
            자체 개발한 자동화 AI Bot이 애드테크 솔루션 기반으로
            <br />
            빅데이터를 활용해 구글 광고 성과를 향상 시킵니다.
          </p>
        </div>
        <CardImg2 src={Image2} alt="팡고 ai 타겟팅" />
      </Carddiv>
      <Carddiv>
        <CardImg src={Image3} alt="팡고 마켓팅 시간 절약" />
        <div>
          <p className="head">
            월간 마케팅 시간
            <span className="emphasis-text emphasis-dot">9</span>
            <span className="emphasis-text emphasis-dot">2</span>
            <span className="emphasis-text">%</span>
            <span className="emphasis-text ">절</span>
            <span className="emphasis-text ">약</span>
          </p>
          <p className="head-body">
            <br />
            광고 운영, 최적화, 리포트 작성 및 분석까지 자동화로 편리하게
            <br />
            월간 마케팅 시간은 절약하면서 광고 실적을 올려보세요.
          </p>
        </div>
      </Carddiv>
      <div style={{ marginTop: "120px", textAlign: "center" }}>
        <p className="head">팡고 플랫폼을 이용하는 고객</p>
        <br />
        <p className="head-body">
          광고 대행사 분들은 물론 다양한 브랜드 마케팅 담당자와
          <br />
          소상공인 사장님들까지 폭넓게 사용하고 계십니다.
        </p>
      </div>
      {/*이미지 넣는곳 */}

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
const Ifames = styled.iframe`
  margin-top: 50px;
  border-radius: 10px;
`;

const TextP = styled.p`
  display: flex;
  gap: 10px;
  font-weight: bold;
`;

const Textdiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Carddiv = styled.div`
  display: flex;
  padding: 80px;
  border-bottom: 0.3px solid gray;
`;
const CardImg = styled.img`
  margin-right: 75px;
`;
const CardImg2 = styled.img`
  margin-left: 75px;
`;
