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
      const response = await axios.get("http://localhost:3001/post"); // 데이터를 가져올 엔드포인트 URL을 사용합니다.
      setData(response.data); // 응답 데이터를 상태로 설정합니다.
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>팡고소식</h1>
      <button
        onClick={() => {
          navigate("/postadd");
        }}
      >
        글작성
      </button>
      {news?.map((news) => {
        return (
          <Card style={{ width: "18rem" }}>
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
              ></Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
