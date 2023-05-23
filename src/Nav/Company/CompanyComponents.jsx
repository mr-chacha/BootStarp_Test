import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";

export default function CompanyComponents() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/news"); // 데이터를 가져올 엔드포인트 URL을 사용합니다.
      setData(response.data); // 응답 데이터를 상태로 설정합니다.
    } catch (error) {
      console.error(error);
      // 에러 처리
    }
  };

  console.log("t", data);
  return (
    <div>
      <h1>팡고소개</h1>
      {data?.map((news) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={news.titleImg} />
            <Card.Body>
              <Card.Title>{news?.title}</Card.Title>
              <Card.Text>
                <div
                  className="quill"
                  dangerouslySetInnerHTML={{ __html: news?.contents }}
                ></div>
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
