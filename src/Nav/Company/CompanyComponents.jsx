import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function CompanyComponents() {
  //해당페이지의 디테일 페이지로 이동하게
  const navigate = useNavigate();
  //디비에 있는걸 전부가져온뒤
  const [data, setData] = useState([]);
  //카테고리가 팡고소식인거만 모아줌
  const news = data.filter((post) => post?.category === "팡고소식");

  // DB에서 데이터 가져오기
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://main-page-admin.pango-gy.com/notice"
      ); // 데이터를 가져올 엔드포인트 URL을 사용합니다.
      setData(response.data); // 응답 데이터를 상태로 설정합니다.
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //로그인 여부 확인
  const Login = sessionStorage.getItem("admin");
  return (
    <div>
      <h1>팡고소식</h1>
      <button
        onClick={() => {
          navigate("/postadd");
        }}
        style={{ display: Login ? "block" : "none" }}
      >
        글작성
      </button>
      {news?.map((news) => {
        return (
          <Card style={{ width: "18rem" }} key={news}>
            <div style={{ border: "1px solid" }}>
              <Card.Img variant="top" src={news?.titleImg} />
            </div>
            <Card.Body>
              <Card.Title>{news?.title}</Card.Title>
              <Button
                variant="primary"
                onClick={() => {
                  navigate(`/postdetail/${news.id}`);
                }}
              >
                팡고 소식 보러가기
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
