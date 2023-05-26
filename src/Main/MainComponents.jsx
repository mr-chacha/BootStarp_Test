import React, { useEffect, useRef, useState } from "react";
import MyImage from "../Image/1.jpeg";
import { Carousel, Col, Container, Image, Row } from "react-bootstrap";
import { styled } from "styled-components";
import Typewriter from "typewriter-effect/dist/core";
import Image1 from "../img/icon_google_partner.png";
import Image2 from "../img/icon_targeting.png";
import Image3 from "../img/icon_time_saving.png";
import MainImage from "./Components/MainImage";

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

  //폴더내에 이미지 전부 저장해놓음
  const file = [
    "01.png",
    "01.svg",
    "02.png",
    "02.svg",
    "03.png",
    "03.svg",
    "04.png",
    "04.svg",
    "05.png",
    "05.svg",
    "06.png",
    "06.svg",
    "07.png",
    "07.svg",
    "08.png",
    "08.svg",
    "2022_1.png",
    "2022_2.png",
    "campaign-1-1.png",
    "campaign-1-2.png",
    "campaign-1-3.png",
    "campaign-2-1.png",
    "campaign-2-2.png",
    "challenge.png",
    "client_1.png",
    "client_2.png",
    "client_3.png",
    "client_4.png",
    "client_5.png",
    "client_6.png",
    "client_7.png",
    "client_8.png",
    "client_9.png",
    "client_10.png",
    "client_11.png",
    "client_12.png",
    "client_13.png",
    "client_14.png",
    "client_15.png",
    "client_16.png",
    "client_17.png",
    "client_18.png",
    "client_19.png",
    "client_20.png",
    "client_21.png",
    "client_22.png",
    "client_23.png",
    "client_24.png",
    "client_25.png",
    "client_26.png",
    "client_27.png",
    "client_28.png",
    "client_29.png",
    "client_30.png",
    "client_31.png",
    "client_32.png",
    "client_33.png",
    "client_34.png",
    "client_35.png",
    "client_36.png",
    "client_37.png",
    "client_38.png",
    "client_39.png",
    "client_40.png",
    "client_41.png",
    "client_42.png",
    "client_43.png",
    "client_44.png",
    "client_45.png",
    "client_46.png",
    "client_47.png",
    "client_48.png",
    "client_49.png",
    "client_50.png",
    "client_51.png",
    "client_52.png",
    "client_53.png",
    "client_54.png",
    "client_55.png",
    "client_56.png",
    "client_57.png",
    "client_58.png",
    "client_59.png",
    "client_60.png",
    "communication.png",
    "dashboard-1-1.png",
    "dashboard-1-2.png",
    "dashboard-1-3.png",
    "dashboard-2-1.png",
    "dashboard-2-2.png",
    "favicon.png",
    "icon_google_partner.png",
    "icon_targeting.png",
    "icon_time_saving.png",
    "location.png",
    "logo.png",
    "mo_client_01.png",
    "mo_client_02.png",
    "mo_client_03.png",
    "mo_client_04.png",
    "mo_client_05.png",
    "mo_client_06.png",
    "mo_client_07.png",
    "mo_client_08.png",
    "mo_client_09.png",
    "mo_client_10.png",
    "mo_client_11.png",
    "mo_client_12.png",
    "mo_client_13.png",
    "mo_client_14.png",
    "mo_client_15.png",
    "mo_client_16.png",
    "mo_client_17.png",
    "mo_client_18.png",
    "mo_client_19.png",
    "mo_client_20.png",
    "mo_client_21.png",
    "mo_client_22.png",
    "mo_client_23.png",
    "mo_client_24.png",
    "mo_client_25.png",
    "mo_client_26.png",
    "mo_client_27.png",
    "mo_client_28.png",
    "mo_client_29.png",
    "mo_client_30.png",
    "mo_client_31.png",
    "mo_client_32.png",
    "mo_client_33.png",
    "mo_client_34.png",
    "mo_client_35.png",
    "mo_client_36.png",
    "mo_client_37.png",
    "mo_client_38.png",
    "mo_client_39.png",
    "mo_client_40.png",
    "mo_client_41.png",
    "mo_client_42.png",
    "mo_client_43.png",
    "mo_client_44.png",
    "mo_client_45.png",
    "mo_client_46.png",
    "mo_client_47.png",
    "mo_client_48.png",
    "mo_client_49.png",
    "mo_client_50.png",
    "mo_client_51.png",
    "mo_client_52.png",
    "mo_client_53.png",
    "mo_client_54.png",
    "mo_client_55.png",
    "mo_client_56.png",
    "mo_client_57.png",
    "mo_client_58.png",
    "mo_client_59.png",
    "mo_client_60.png",
    "mo_partner_01.png",
    "mo_partner_02.png",
    "mo_partner_03.png",
    "mo_partner_04.png",
    "mo_partner_05.png",
    "mo_SNS_blog.png",
    "mo_SNS_facebook.png",
    "mo_SNS_youtube.png",
    "og_image.png",
    "partner1_pacemaker.png",
    "partner2_kmong.png",
    "partner3_lab543.png",
    "partner4_ably.png",
    "partner5_tmb.png",
    "recruit.png",
    "report-1.png",
    "report-2.png",
    "report-3.png",
    "responsibility.png",
    "SNS_01.png",
    "SNS_02.png",
    "SNS_03.png",
    "solution-1.png",
    "solution-2.png",
    "solution-3.png",
    "solution-4.png",
    "solution-5.png",
    "solution-6.png",
    "solution-off-1.png",
    "solution-off-2.png",
    "solution-off-3.png",
    "solution-off-4.png",
    "solution-off-5.png",
    "solution-off-6.png",
  ];

  return (
    <div className="mainLayot">
      {width < 768 ? (
        <div className="textdiv">
          <p className="texttitle">
            구글 [<p ref={textCarouselRef} style={{ color: "#FF4C17" }}></p>]
          </p>

          <p className="texttitle">광고는 팡고</p>
          <p style={{ fontSize: "18px" }}>
            구글 광고는 팡고 이전과 이후로 나뉜다.
          </p>
        </div>
      ) : (
        <div className="textdiv">
          <p className="texttitle">
            구글 [<p ref={textCarouselRef} style={{ color: "#FF4C17" }}></p>
            ]광고는 팡고
          </p>
          <p className="texttitle2">구글 광고는 팡고 이전과 이후로 나뉜다</p>
        </div>
      )}

      {/* 동영상 */}
      <iframe
        className="vedio"
        src="https://www.youtube.com/embed/6zcuY7cjVdc"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      />
      {/* 구글 카드 */}
      <div className="carddiv">
        <img className="cardImg" src={Image1} alt="구글파트너 팡고" />
        {width < 768 ? (
          <Col>
            <p className="texttitle2">
              Goole
              <span className="emphasis-text emphasis-dot">파</span>
              <span className="emphasis-text emphasis-dot">트</span>
              <span className="emphasis-text emphasis-dot">너</span>
              <span className="emphasis-text emphasis-dot">스</span>
              팡고
            </p>

            <p className="texttitle4">
              <br />
              Google Ads 인증을 획득한 구글 전문 빅데이터팀에서 광고 효율 상승을
              위해 지속적으로 다양한 엔진을 개발합니다.
            </p>
          </Col>
        ) : (
          <Col>
            <p className="texttitle2">
              Goole
              <span className="emphasis-text emphasis-dot">파</span>
              <span className="emphasis-text emphasis-dot">트</span>
              <span className="emphasis-text emphasis-dot">너</span>
              <span className="emphasis-text emphasis-dot">스</span>
              팡고
            </p>

            <p className="texttitle4">
              <br />
              Google Ads 인증을 획득한 구글 전문 빅데이터팀에서
              <br />
              광고 효율 상승을 위해 지속적으로 다양한 엔진을 개발합니다.
            </p>
          </Col>
        )}
      </div>

      {/* 에드태크 */}
      <div className="carddiv">
        {width <= 768 ? (
          <img className="cardImg2" src={Image2} alt=" 팡고 ai 타겟팅" />
        ) : (
          ""
        )}

        {width < 768 ? (
          <Col>
            <p className="texttitle2">
              Ad-tech
              <span className="emphasis-text ">N</span>
              <span className="emphasis-text ">o</span>
              <span className="emphasis-text ">.</span>
              <span className="emphasis-text ">1</span>
            </p>
            <p className="texttitle2"> 팡고 구글 광고 플랫폼은</p>

            <p className="texttitle4">
              <br />
              자체 개발한 자동화 AI Bot이 애드테크 솔루션 기반으로 빅데이터를
              활용해 구글 광고 성과를 향상 시킵니다.
            </p>
          </Col>
        ) : (
          <Col>
            {width < 920 ? (
              <>
                <p className="texttitle2">
                  <span> Ad-tech</span>
                  <span className="emphasis-text ">N</span>
                  <span className="emphasis-text ">o</span>
                  <span className="emphasis-text ">.</span>
                  <span className="emphasis-text ">1</span>
                </p>

                <p className="texttitle2"> 팡고 구글 광고 플랫폼은</p>
              </>
            ) : (
              <p className="texttitle2">
                <span> Ad-tech</span>
                <span className="emphasis-text ">N</span>
                <span className="emphasis-text ">o</span>
                <span className="emphasis-text ">.</span>
                <span className="emphasis-text ">1</span>
                팡고 구글 광고 플랫폼은
              </p>
            )}

            <p className="texttitle4">
              <br />
              자체 개발한 자동화 AI Bot이 애드테크 솔루션 기반으로
              <br />
              빅데이터를 활용해 구글 광고 성과를 향상 시킵니다.
            </p>
          </Col>
        )}
        {width > 768 ? (
          <img className="cardImg2" src={Image2} alt=" 팡고 ai 타겟팅" />
        ) : (
          ""
        )}
      </div>

      {/* "팡고 마켓팅 시간 절약 */}
      <div className="carddiv">
        <img className="cardImg" src={Image3} alt=" 팡고 마켓팅 시간 절약" />
        {width < 768 ? (
          <Col>
            <p className="texttitle2">
              월간 마케팅 시간
              <span className="emphasis-text emphasis-dot">9</span>
              <span className="emphasis-text emphasis-dot">2</span>
              <span className="emphasis-text">%</span>
              <span className="emphasis-text ">절</span>
              <span className="emphasis-text ">약</span>
            </p>

            <p className="texttitle4">
              <br />
              광고 운영, 최적화, 리포트 작성 및 분석까지 자동화로 편리하게 월간
              마케팅 시간은 절약하면서 광고 실적을 올려보세요.
            </p>
          </Col>
        ) : (
          <Col>
            <p className="texttitle2">
              월간 마케팅 시간
              <span className="emphasis-text emphasis-dot">9</span>
              <span className="emphasis-text emphasis-dot">2</span>
              <span className="emphasis-text">%</span>
              <span className="emphasis-text ">절</span>
              <span className="emphasis-text ">약</span>
            </p>

            <p className="texttitle4">
              <br />
              광고 운영, 최적화, 리포트 작성 및 분석까지 자동화로 편리하게
              <br />
              월간 마케팅 시간은 절약하면서 광고 실적을 올려보세요.
            </p>
          </Col>
        )}
      </div>
      {width < 768 ? (
        <div className="carddiv2">
          <p className="texttitle2" style={{ marginBottom: "5px" }}>
            팡고 플랫폼을{" "}
          </p>
          <p className="texttitle2"> 이용하는 고객</p>
          <br />
          <p className="texttitle5">
            광고 대행사 분들은 물론 다양한 브랜드 <br />
            마케팅 담당자와 소상공인 사장님들까지
            <br /> 폭넓게 사용하고 계십니다.
          </p>
        </div>
      ) : (
        <div className="carddiv2">
          <p className="texttitle2">팡고 플랫폼을 이용하는 고객</p>
          <br />
          <p className="texttitle5">
            광고 대행사 분들은 물론 다양한 브랜드 마케팅 담당자와
            <br />
            소상공인 사장님들까지 폭넓게 사용하고 계십니다.
          </p>
        </div>
      )}

      {/*이미지 넣는곳 아래꺼 활용할거*/}
      {/* {file.map((item) => {
        return (
          <>
            <img src={require(`../img/${item}`)} alt="Icon: Time Saving" key ={item}/>;
          </>
        );
      })} */}

      <Container>
        <Row>
          <Col>
            {/* width 값이 760 크면 이미지를 보여줌*/}
            {width > 760 ? (
              <>
                <Row className="Rowdiv">
                  <Col xs={6} md={4} lg={2} className="ColImg">
                    <img
                      src={require("../img/mo_client_01.png")}
                      alt="팡고 클라이언트 일동제약"
                    />
                  </Col>
                  <Col xs={6} md={4} lg={2} className="ColImg">
                    <img
                      src={require("../img/mo_client_02.png")}
                      alt="팡고 클라이언트 일동제약"
                    />
                  </Col>
                  <Col xs={6} md={4} lg={2} className="ColImg">
                    <img
                      src={require("../img/mo_client_03.png")}
                      alt="팡고 클라이언트 오피스넥스"
                    />
                  </Col>
                  <Col xs={6} md={4} lg={2} className="ColImg">
                    <img
                      src={require("../img/mo_client_04.png")}
                      alt="팡고 클라이언트 미래에셋대우"
                    />
                  </Col>
                  <Col xs={6} md={4} lg={2} className="ColImg">
                    <img
                      src={require("../img/mo_client_05.png")}
                      alt="팡고 클라이언트 라비앙"
                    />
                  </Col>
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
                    <Row className="Rowdiv">
                      <Col className="ColImg">
                        <img
                          src={require("../img/mo_client_01.png")}
                          alt="팡고 클라이언트 일동제약"
                        />
                      </Col>
                      <Col className="ColImg">
                        <img
                          src={require("../img/mo_client_02.png")}
                          alt="팡고 클라이언트 일동제약"
                        />
                      </Col>
                      <Col className="ColImg">
                        <img
                          src={require("../img/mo_client_03.png")}
                          alt="팡고 클라이언트 오피스넥스"
                        />
                      </Col>
                      <Col className="ColImg">
                        <img
                          src={require("../img/mo_client_04.png")}
                          alt="팡고 클라이언트 미래에셋대우"
                        />
                      </Col>
                      <Col className="ColImg">
                        <img
                          src={require("../img/mo_client_05.png")}
                          alt="팡고 클라이언트 라비앙"
                        />
                      </Col>
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
////
